<?php

namespace App\Http\Controllers;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\UserDetail;
use App\User;


class ImageUploadController extends Controller
{
    public function updateProfilePicture(Request $request) {
        $image = $request->file('profileImage');

        // Stores the Image into a folder called Avatars, 
        // image name is generated and assigned to $path
        // disk("public") is the local directory storage/app/public

        $details = new UserDetail;
        $path = Storage::disk('public')->put('avatars', $image);
        $details->avatar = $path;

        $user = User::find(auth()->user()->id);

        $user->details()->updateOrCreate(['user_id' => auth()->user()->id],
        ['avatar'=> $path]);

        error_log('File Name: '.$image->getClientOriginalName());
        error_log('File Extension: '.$image->getClientOriginalExtension());
        error_log('File Real Path: '.$image->getRealPath());
        error_log('File Size: '.$image->getSize());
        error_log('File Mime Type: '.$image->getMimeType());
        error_log($path);

        return response()->json($path);


     }

     public function getProfilePicture(Request $request) {
        $user = User::find(auth()->user()->id);
        $avatar = User::find(1)->avatar;

     }
}
