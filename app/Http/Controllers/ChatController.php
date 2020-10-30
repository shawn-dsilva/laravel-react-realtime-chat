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

    public function getSubscribedChannels(Request $request)
    {
        $user = auth()->user()->id;
        $channels = Channel::whereHas('users', function ($q) use ($user) {
            $q->where('user_id', $user);
        })->join('details', 'channels.id', '=', 'details.channel_id')
            ->select('channels.id', 'channels.type', 'details.name', 'details.desc')->get();

        return response()->json($channels);
    }

    public function getAllChannels(Request $request)
    {
        $user = auth()->user()->id;
        $channels = Channel::where('channels.type', 'channel')->join('details', 'channels.id', '=', 'details.channel_id')->join('users', 'users.id', '=', 'details.owner_id')
            ->select('channels.id', 'channels.type', 'details.name', 'users.name as owner', 'details.desc', 'details.type', 'details.visible')->distinct()->get();

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
            ->select('channels.id', 'details.name')->first();

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

    public function acceptInvite(Request $request, $invite_id)
    {

        $userId = auth()->user()->id;

        $invite = Invite::where('id', $invite_id)->first();
        //  return response()->json($invite);
        if($invite['type'] == 'FRND') {
            $channel = $this->acceptFriendRequest($invite, $userId);

            return response()->json($channel);
        } else if ($invite['type'] == 'JOIN') {
            $channel = $this->acceptJoinRequest($invite, $userId);

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
        }
    }

    public function acceptJoinRequest($invite, $userId)
    {
        $user = $invite->from_id;
        $privateChannel = $invite->to_id;

        // $channel = Channel::where('id', $invite->to_id)->first();

        $channelWithDataNew = Channel::where('channels.id', $invite->to_id)->join('details', 'channels.id', '=', 'details.channel_id')
        ->select('details.*')->first();

        $channel = $channelWithDataNew;

        $details = Details::where('channel_id', $invite->to_id)->first();
        // $channel->users()->attach($user);
        error_log('CHANNEL DATA BELOW');
        error_log($channel);
        
        // TODO Attach requesting user to channel

        // Add Channel to requesters channel list
        broadcast(new AcceptRequest($channelWithDataNew, $user, 'JOIN'));

        return $channelWithDataNew;
       
    }
    public function getFriendsList(Request $request)
    {

        $sender = auth()->user()->id;

        $friends = Channel::where('type', 'dm')->with(["users" => function ($query) use ($sender) {
            $query->where("id", "!=", $sender);
        }])->whereHas('users', function ($q) use ($sender) {
            $q->where('user_id', $sender);
        })->get();

        // $friends = Channel::with("users")->where('type','dm')->get();
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
        return response()->json(auth()->user()->notifications()->get(['data', 'read_at', 'id']));
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
                ->select('users.name', 'invites.id', 'invites.from_id', 'invites.to_id', 'invites.type')->first();

            error_log($invite);
            error_log($inviteJoin);

            // Get the ID of the channel owner
            $owner = User::where('id', $channelWithData['owner_id'])->first();
            // Send Notification to Owner about the join request
            $owner->notify(new NotificationRequest($inviteJoin));

            return response()->json("Join Request Sent");
        }
    }
}
