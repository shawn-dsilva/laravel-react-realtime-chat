<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ImageUploadController extends Controller
{
    public function updateProfilePicture(Request $request) {
        $file = $request->file('profileImage');
     
        error_log('File Name: '.$file->getClientOriginalName());
        error_log('File Extension: '.$file->getClientOriginalExtension());
        error_log('File Real Path: '.$file->getRealPath());
        error_log('File Size: '.$file->getSize());
        error_log('File Mime Type: '.$file->getMimeType());

     }
}
