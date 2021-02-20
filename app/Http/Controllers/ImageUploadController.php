<?php

namespace App\Http\Controllers;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function updateProfilePicture(Request $request) {
        $image = $request->file('profileImage');

        // Stores the Image into a folder called Avatars, 
        // image name is generated and assigned to $path
        // disk("public") is the local directory storage/app/public
        $path = Storage::disk('public')->put('avatars', $image);


        error_log('File Name: '.$image->getClientOriginalName());
        error_log('File Extension: '.$image->getClientOriginalExtension());
        error_log('File Real Path: '.$image->getRealPath());
        error_log('File Size: '.$image->getSize());
        error_log('File Mime Type: '.$image->getMimeType());
        error_log($path);

     }
}
