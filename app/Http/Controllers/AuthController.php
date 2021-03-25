<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\User;
use App\Channel;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Validation\ValidationException;
// use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Avatar;
use Illuminate\Support\Facades\Cache;

class AuthController extends Controller
{

    use AuthenticatesUsers;

    protected function authenticated(Request $request, $user)
    {
        return response([
            $user->id,
            $user->name,
            $user->email,
        ]);
    }


    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */


    public function register(Request $request)
    {
        
        $messages = [
            "name.required" => "Name cannot be empty",
            "name.max" => "Name cannot be more than 50 characters",
            "email.required" => "Email cannot be empty",
            "email.email" => "Email is not valid",
            "password.required" => "Password cannot be empty",
            "password.min" => "Password must be at least 6 characters"
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:50',
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ], $messages);

        // Send appropriate error message if validation fails
        if ($validator->fails()) {
            return response(['message'=> $validator->getMessageBag()->first()], 422);
        } else if (!empty(User::where('email',$request->email)->first())) {
            return response(['message'=> "A User with that E-Mail already exists."], 422);

        } else {
            $user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password)
            ]);
            $user->save();

            // Default Avatar created from Initials and saved
            Avatar::create($request->name)->save('storage/avatars/'.$request->name.'-default.jpg', 100);

            $avatar = 'avatars/'.$request->name.'-default.jpg';
            $user->details()->updateOrCreate(['user_id' => $user->id], ['avatar'=> $avatar]);

            // Adds User to the default General Channel
            $channel = Channel::find(1);
            $channel->users()->attach($user->id);


            return response()->json([
                'message' => 'You have Registered Successfully! Redirecting you to the Login page'
            ], 201);
        }
    }


    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)
    {

        $messages = [
            "email.required" => "Email cannot be empty",
            "email.email" => "Email is not valid",
            "password.required" => "Password cannot be empty",
            "password.min" => "Password must be at least 6 characters"
        ];

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ], $messages);

        // Send appropriate error message if validation fails
        if ($validator->fails()) {
            return response(['message'=> $validator->getMessageBag()->first()], 422);
        } else {

            // Check if password and email exist and match
            $credentials = request(['email', 'password']);
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Incorrect password or the account does not exist.'
                ], 401);
            } else {
                $user = $request->user();
                $tokenResult = $user->createToken('Personal Access Token');
                $token = $tokenResult->token;
                // if ($request->remember_me)
                //     $token->expires_at = Carbon::now()->addWeeks(1);
                $token->save();
                return response()->json([
                    'user' => $request->user(),
                    'token' => $tokenResult->accessToken,
                ], 200)->cookie('jwt', $tokenResult->accessToken, 3600);
            }
        }
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        Cache::forget('user-is-online-'.$request->user()->id);
        return response()->json([
            'message' => 'Successfully logged out'
        ], 200)->cookie(Cookie::forget('jwt'));
    }

    /**
     * Get the authenticated User
     *
     * @return [json] user object
     */
    public function user(Request $request)
    {
        $user = $request->user();
        error_log($request->user());
         if(User::find($request->user()->id)->details) {
            $user->avatar = User::find($request->user()->id)->details->avatar;
            $user->desc = User::find($request->user()->id)->details->desc;

        };
        return response()->json($user);
    }

    public function allUsersList()
    {
        $allUsersList = User::with('details')->get();

        return response()->json($allUsersList);
    }
}
