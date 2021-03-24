<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');

    Route::group([
      'middleware' => ['auth:api', 'auth.online']
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group([
    'middleware' => 'auth:api'
], function() {
    Route::post('messages', 'ChatController@sendMessage');
    Route::get('messages/{channel_id}', 'ChatController@getMessages');
    Route::get('getchannels', 'ChatController@getSubscribedChannels');
    Route::get('getusers/{channel_id}', 'ChatController@getChannelsUsers');
    Route::get('getallchannels', 'ChatController@getAllChannels');
    Route::post('makerequest', 'ChatController@createInvite');
    Route::get('acceptinvite/{invite_id}', 'ChatController@acceptRequest');
    Route::get('online/{user_id}', 'ChatController@isOnline');
    Route::get('offline/{user_id}', 'ChatController@isOffline');
    Route::get('getfriendslist', 'ChatController@getFriendsList');
    Route::get('notifications', 'ChatController@getNotifications');
    Route::get('allnotifications', 'ChatController@getAllNotifications');
    Route::get('markasread/{id}', 'ChatController@markNotificationAsRead');
    Route::post('directmessage', 'ChatController@directMessage');
    Route::get('allusers', 'AuthController@allUsersList');
    Route::post('createchannel', 'ChatController@createChannel');
    Route::post('joinchannel', 'ChatController@joinChannel');
    Route::post('invitetochannel', 'ChatController@inviteToChannel');
    Route::post('upload/profile', 'ImageUploadController@updateProfilePicture');
    Route::post('editdesc', 'ChatController@updateUserDesc');



});
