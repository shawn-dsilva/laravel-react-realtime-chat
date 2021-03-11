<?php

use Illuminate\Support\Facades\Broadcast;
use App\User;
/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('chat', function ($user) {
	return $user;
});

Broadcast::channel('chat.channel.{channel_id}', function ($user, $channel_id) {
	if($channel_id == 1) {
		return $user;
	} else {
		$data = 	User::where('id', $user->id)->whereHas('channels', function ($q) use ($channel_id) {
			$q->where('channel_id', $channel_id);
		})->first();

		error_log($data);
		return $data;
	}
	// return $user;
});

Broadcast::channel('chat.dm.{channel_id}', function ($user, $channel_id) {
	// return $user->id === Channel::find($channel_id)->user_id;
return 	User::where('id', $user->id)->whereHas('channels', function ($q) use ($channel_id) {
		$q->where('channel_id', $channel_id);
	})->first();
});

Broadcast::channel('App.User.{id}', function ($user, $id) {
	return (int) $user->id === (int) $id;
});

Broadcast::channel('event.acceptRequest.{id}', function ($user, $id) {
	return (int) $user->id === (int) $id;
});