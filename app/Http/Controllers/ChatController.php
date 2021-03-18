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
use App\Events\AcceptRequest;
use App\Events\UserOnline;
use App\Events\UserOffline;
use App\Invite;
use App\Notifications\NotificationRequest;
use Illuminate\Support\Facades\Cache;

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
        return Message::where("channel_id", $channel_id)->with('user.details')->get();
    }

    public function getSubscribedChannels(Request $request)
    {
        $user = auth()->user()->id;
        $channels = Channel::whereHas('users', function ($q) use ($user) {
            $q->where('user_id', $user);
        })->join('details', 'channels.id', '=', 'details.channel_id')
        ->join('users', 'users.id', '=', 'details.owner_id')
            ->select('channels.id', 'channels.type', 'details.name', 'users.name as owner', 'details.desc', 'details.type', 'details.visible', 'details.owner_id as owner_id')->get();

        return response()->json($channels);
    }

    public function getAllChannels(Request $request)
    {
        $user = auth()->user()->id;
        $channels = Channel::where('channels.type', 'channel')->join('details', 'channels.id', '=', 'details.channel_id')->join('users', 'users.id', '=', 'details.owner_id')
            ->select('channels.id', 'channels.type', 'details.name', 'users.name as owner', 'details.desc', 'details.type', 'details.visible', 'details.owner_id')->distinct()->get();

        return response()->json($channels);
    }

    public function sendMessage(Request $request)
    {
        $message = auth()->user()->messages()->create([
            'message' => $request->message,
            'channel_id' => $request->channel_id
        ]);

        $user = User::where('id', auth()->user()->id)->with('details')->first();

        broadcast(new MessageSent($user, $message, $request->channel_id, $request->channel_type));
    }

    public function directMessage(Request $request)
    {
        $sender = auth()->user()->id;
        $receiver = $request->receiver;


        $channelIsFound = Channel::where('type', 'dm')->whereHas('users', function ($q) use ($sender) {
            $q->where('user_id', $sender);
        })->whereHas('users', function ($q) use ($receiver) {
            $q->where('user_id', $receiver);
        })->first();
        error_log("CHANNEL FOUND");
        error_log($channelIsFound);
        if (!empty($channelIsFound)) {
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

    public function createChannel(Request $request)
    {

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
            ->select('channels.id', 'details.name', 'details.owner_id as owner_id')->first();

        return response()->json($createdChannel);
    }


    public function createInvite(Request $request)
    {

        $userId = auth()->user()->id;

        $invite = new Invite;
        $invite->type = "FRND";
        $invite->from_id = $userId;
        $invite->to_id = $request->receiver;
        $invite->save();

        $inviteJoin = Invite::where('invites.id', $invite->id)->join('users', 'invites.from_id', '=', 'users.id')
            ->select('users.name', 'invites.id', 'invites.from_id', 'invites.to_id', 'invites.type')->first();

        error_log($invite);
        error_log($inviteJoin);

        $receiver = User::find($request->receiver);
        $receiver->notify(new NotificationRequest($inviteJoin));
        //  return response()->json($invite);

    }

    public function acceptRequest(Request $request, $invite_id)
    {

        $userId = auth()->user()->id;

        $invite = Invite::where('id', $invite_id)->first();
        //  return response()->json($invite);
        error_log("INVITE TYPE");
        error_log($invite['type']);
        if($invite['type'] == 'FRND') {
            $channel = $this->acceptFriendRequest($invite, $userId);

            return response()->json($channel);
        } else if ($invite['type'] == 'JOIN') {
            $channel = $this->acceptJoinRequest($invite, $userId);

            return response()->json($channel);
        } else if ($invite['type'] == 'INVT') {
            $channel = $this->acceptInviteRequest($invite, $userId);

            return response()->json($channel);

        }

    }

    public function acceptFriendRequest($invite, $userId)
    {
        $sender = $invite->from_id;
        $receiver = $invite->to_id;
        error_log("SENDER");
        error_log($sender);
        error_log("RECEIVER");
        error_log($receiver);
        $channelIsFound = Channel::where('type', 'dm')->whereHas('users', function ($q) use ($sender) {
            $q->where('user_id', $sender);
        })->whereHas('users', function ($q) use ($receiver) {
            $q->where('user_id', $receiver);
        })->first();
        error_log("CHANNEL FOUND");
        error_log($channelIsFound);
        if (!empty($channelIsFound)) {
            $channel = $channelIsFound;
            $channel->users = $channel->users;

            foreach ($channel->users as $key => $element) {
                if ($channel->users[$key]->id != $sender) {
                    $channel->users[0] = $channel->users[$key];
                }
            }
            error_log($channel->users);
            broadcast(new AcceptRequest($channel, $sender, 'FRND'));

            foreach ($channel->users as $key => $element) {
                if ($channel->users[$key]->id != $userId) {
                    $channel->users[0] = $channel->users[$key];
                }
            }

            return $channel;
        } else {
            $channel = new Channel;
            $channel->name = "dm";
            $channel->type = "dm";
            $channel->save();
            $channel->users()->attach($sender);
            $channel->users()->attach($receiver);
            $channel->users = $channel->users;

            $senderObject = User::where('id', '=', $sender)->with('details')->first();
            $senderObject->avatar = $senderObject->details->avatar;
            if(Cache::has('user-is-online-'.$sender)) {
                $senderObject->is_online = 1;
            }

            $receiverObject = User::where('id', '=', $receiver)->with('details')->first();
            $receiverObject->avatar = $receiverObject->details->avatar;
            if(Cache::has('user-is-online-'.$receiver)) {
                $receiverObject->is_online = 1;
            }


            $channel->users[0] = $receiverObject;

            error_log($channel->users);
            broadcast(new AcceptRequest($channel, $sender, 'FRND'));

            $channel->users[0] = $senderObject;

            return $channel;
        }
    }

    public function acceptJoinRequest($invite, $userId)
    {
        $user = $invite->from_id;
        $privateChannel = $invite->to_id;

        // $channel = Channel::where('id', $invite->to_id)->first();

        $channelWithDataNew = Channel::where('channels.id', $privateChannel)->join('details', 'channels.id', '=', 'details.channel_id')
        ->select('channels.id as id', 'channels.type', 'details.name',  'details.desc', 'details.type', 'details.visible', 'details.owner_id as owner_id')->first();

        $channel = $channelWithDataNew;

        $details = Details::where('channel_id', $privateChannel)->first();
        // $channel->users()->attach($user);
        error_log('CHANNEL DATA BELOW');
        error_log($channel);
        
        // TODO Attach requesting user to channel
        $channel->users()->attach($user);

        // Add Channel to requesters channel list
        broadcast(new AcceptRequest($channel, $user, 'JOIN'));

        return $channel;
       
    }

    public function acceptInviteRequest($invite, $userId) {
        $channel_id = $invite->from_id;
        $user_id = $invite->to_id;

        // $channel_id = Channel::where('id', $invite->to_id)->first();

        $channel = Channel::where('channels.id', $channel_id)
        ->join('details', 'channels.id', '=', 'details.channel_id')
        ->join('users', 'users.id', '=', 'details.owner_id')
        ->select('channels.id as id', 'channels.type', 'details.name', 'users.name as owner', 'details.desc', 'details.type', 'details.visible', 'details.owner_id as owner_id')->first();

        // $details = Details::where('channel_id', $channel)->first();
        // $channel->users()->attach($user);
        error_log('CHANNEL DATA BELOW');
        error_log($channel);
        error_log("FROM_ID BELOW");
        error_log($channel_id);
        error_log("TO_ID BELOW");
        error_log($user_id);
        // TODO Attach requesting user to channel
        $channel->users()->attach($user_id);

        // Add Channel to requesters channel list
        // broadcast(new AcceptRequest($channel, $user_id, 'INVT'));

        return $channel;
    }


    public function getFriendsList(Request $request)
    {

        // ID of user that made this request
        $sender = auth()->user()->id;

        $friends = Channel::where('type', 'dm')->with(["users" => function ($query) use ($sender) {
            // Removes user data object from the users array that 
            // matches the id in $sender 
            $query->where("id", "!=", $sender); 
        }])->whereHas('users', function ($q) use ($sender) {
            // Only returns the channels that $sender has participated in
            $q->where('user_id', $sender);
        })->get();

        // Checks for Online status of Users
        $friends = $this->listOnlineUsers($friends);

        // Sets the Avatar URL for all friends
        foreach( $friends as $friend) {

            $user = $friend->users[0]->id;
            $avatar = null;

            // If avatar is found, send it over, else send the default image
            if(User::find($user)->details) {
                $avatar = User::find($user)->details->avatar;
            } else {
                $avatar = 'avatars/defaultuser.png';
            }

            $friend->users[0]->avatar = $avatar;
        }
        return response()->json($friends);
    }

    public function getNotifications(Request $request)
    {
        $output["notifications"] = auth()->user()->notifications()->limit(7)->get(['data', 'read_at', 'id']);
        $output["unread_count"] = auth()->user()->unreadNotifications()->count();
        return response()->json($output);
    }

    public function getAllNotifications(Request $request)
    {
        return response()->json(auth()->user()->notifications()->orderBy('timestamps','asc')->get(['data', 'read_at', 'id']));
    }

    public function markNotificationAsRead(Request $request, $id)
    {
        auth()->user()->unreadNotifications()->find($id)->markAsRead();
        return response()->json(auth()->user()->notifications()->where('id', $id)->get(['data', 'read_at', 'id']));
    }

    public function joinChannel(Request $request)
    {

        $userId = auth()->user()->id;

        $channelWithData = Channel::where('channels.type', 'channel')->where('channels.id', $request->receiver)
            ->join('details', 'channels.id', '=', 'details.channel_id')
            ->select(
                'channels.id',
                'channels.type as channel_type',
                'details.name',
                'details.desc',
                'details.type as detail_type',
                'details.visible',
                'details.owner_id'
            )->first();

        if ($channelWithData['detail_type'] == 'public') {
            // $channel = Channel::where('channels.type','channel')->where('channels.id', $request->receiver)->first();
            $channelWithData->users()->attach($userId);
            return response()->json($channelWithData);
        } else {

            // Creat new Invite of type JOIN for channel join request
            $invite = new Invite;
            $invite->type = "JOIN";
            $invite->from_id = $userId;
            $invite->to_id = $request->receiver;
            $invite->save();

            $inviteJoin = Invite::where('invites.id', $invite->id)->join('users', 'invites.from_id', '=', 'users.id')
            ->join('details', 'invites.to_id', '=', 'details.channel_id')
                ->select('users.name', 'invites.id', 'invites.from_id', 'invites.to_id', 'invites.type', 'details.name as recv_name')->first();

            error_log($invite);
            error_log($inviteJoin);

            // Get the ID of the channel owner
            $owner = User::where('id', $channelWithData['owner_id'])->first();
            // Send Notification to Owner about the join request
            $owner->notify(new NotificationRequest($inviteJoin));

            return response()->json("Join Request Sent");
        }
    }

    public function inviteToChannel(Request $request)
    {

        $userId = auth()->user()->id;

            $invite = new Invite;
            $invite->type = "INVT";
            $invite->from_id = $request->channel_id;
            $invite->to_id = $request->receiver;
            $invite->save();

            $inviteJoin = Invite::where('invites.id', $invite->id)
            ->join('details', 'invites.from_id', '=', 'details.channel_id')
            ->join('users', 'details.owner_id', '=', 'users.id')
            ->select('users.name', 'invites.id', 'invites.from_id', 'invites.to_id', 
            'invites.type', 'details.name as recv_name')->first();


            $receiver = User::where('id', $request->receiver)->first();
            $receiver->notify(new NotificationRequest($inviteJoin));
            return response()->json("Invite Sent Successfully");
        
    }
  
    public function isOnline(Request $request) {
        $user = auth()->user();
        broadcast(new UserOnline($user));

    }

    public function listOnlineUsers($users) {


        //TODO
        // Use userId to get all users in friends list
        // run Cache::get('user-is-online-'.$friendId) in a loop
        // store results in an array
        // send results in response
        error_log('IN LISTONLINEUSERS FUNCTION');
        
        foreach( $users as $channel) {
            $userId = $channel->users[0]->id;
            $userData = $channel->users[0];
            error_log(Cache::get('user-is-online-'.$userId));
            if(Cache::has('user-is-online-'.$userId)) {
                $channel->users[0]->is_online = 1;
            } else {
                $channel->users[0]->is_online = 0;
            }
        }

        return $users;
    }

    public function isOffline(Request $request , $user_id) {
        $user['id'] = $user_id;
        error_log("IN ISOFFLINE");
        Cache::forget('user-is-online-'.$user_id);
        broadcast(new UserOffline($user));

    }

    public function getChannelsUsers($channel_id) {
        $channel = Channel::where("type","channel")->where('id',$channel_id)->with(["users"])->get();

        $channel = $this->listOnlineUsers($channel);

        error_log("GET_CHANNELS_USERS USER LIST BELOW");
        error_log($channel);
        
        // Sets the Avatar URL for all users
        $users = $channel[0]->users;
        foreach( $users as $key=>$friend) {

            $id = $friend->id;
            $avatar = null;

            // If avatar is found, send it over, else send the default image
            if(User::find($id)->details) {
                $avatar = User::find($id)->details->avatar;
            } else {
                $avatar = 'avatars/defaultuser.png';
            }

            $friend->avatar = $avatar;
        }
        return response()->json($channel);
    }

    public function updateUserDesc ( Request $request) {
        $user = User::find(auth()->user()->id);

        $user->details()->updateOrCreate(['user_id' => auth()->user()->id],
        ['desc'=> $request->desc]);

        return response()->json($request->desc);
    }
}

