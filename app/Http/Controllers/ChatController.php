<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Message;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;
use App\Channel;
use App\Details;
use App\Invite;
use App\Notifications\NotificationRequest;

class ChatController extends Controller
{
    // public function __construct()
    // {
    //     $this->middleware('auth:api');
    // }

    // public function index()
    // {
    //     return view('chat');
    // }

    public function getMessages(Request $request, $channel_id)
    {
        return Message::where("channel_id", $channel_id)->with('user')->get();
    }

    public function getSubscribedChannels(Request $request) {
        $user = auth()->user()->id;
        $channels = Channel::whereHas('users', function($q) use ($user) {
                $q->where('user_id',$user  );
        })->join('details', 'channels.id', '=', 'details.channel_id')
        ->select('channels.id', 'channels.type','details.name')->get();

        return response()->json($channels);
    }

    public function sendMessage(Request $request)
    {
        $message = auth()->user()->messages()->create([
            'message' => $request->message,
            'channel_id' => $request->channel_id
        ]);

        error_log($message);
		broadcast(new MessageSent($request->user(), $message, $request->channel_id, $request->channel_type));

        return ['status' => 'Message Sent!'];
    }

    public function directMessage(Request $request) {
        $sender = auth()->user()->id;
        $receiver = $request->receiver;


        $channelIsFound = Channel::where('type','dm')->whereHas('users', function($q) use ($sender) {
             $q->where('user_id',$sender  );
        })->whereHas('users', function($q) use ($receiver) {
            $q->where('user_id',$receiver);
        })->first();
        error_log("CHANNEL FOUND");
        error_log($channelIsFound);
        if(!empty($channelIsFound)) {
            $channel = $channelIsFound;
            return response()->json($channel);
        } else {
            $channel = new Channel;
            $channel->name = "dm";
            $channel->type = "dm";
            $channel->save();
            $channel->users()->attach($sender);
            $channel->users()->attach($receiver);
            return response()->json($channel);

        }
    }

    public function createChannel(Request $request) {

        $user = auth()->user()->id;

        $channel = new Channel;
        $channel->type = "channel";
        $channel->name = "channel";
        $channel->save();
        $channelId = $channel->id;
        $channel->users()->attach($user);

        $detail = new Details;
        $detail->name = $request->channelName;
        $detail->desc = $request->description;
        $detail->visible = $request->visible;
        $detail->type = $request->type;
        $detail->owner_id = $user;
        $detail->channel_id = $channelId;
        $detail->image = "nothing";
        $detail->save();

        $createdChannel = Channel::where('channels.id', $channelId)
        ->join('details', 'channels.id', '=', 'details.channel_id')
        ->select('channels.id', 'details.name')->first();

         return response()->json($createdChannel);
    }


    public function createInvite(Request $request) {

        $userId = auth()->user()->id;

        $invite = new Invite;
        $invite->type = "FRND";
        $invite->from_id = $userId;
        $invite->to_id = $request->receiver;
        $invite->save();

        $user = User::find($userId);
        $user->notify(new NotificationRequest($invite));
        //  return response()->json($invite);

    }


}


