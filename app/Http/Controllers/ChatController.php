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

    public function sendMessage(Request $request)
    {
        $message = auth()->user()->messages()->create([
            'message' => $request->message,
            'channel_id' => $request->channel_id
        ]);

		broadcast(new MessageSent($request->user(), $message, $request->channel_id));

        return ['status' => 'Message Sent!'];
    }

    public function directMessage(Request $request) {
        $sender = auth()->user()->id;
        $receiver = $request->receiver;


        $channelIsFound = Channel::where('type', 'dm')->whereHas('users', function($q) use ($sender) {
             $q->where('user_id',$sender  );
        })->whereHas('users', function($q) use ($receiver) {
            $q->where('user_id',$receiver);
        })->first();

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

        $detail = new Details;
        $detail->name = $request->name;
        $detail->desc = $request->desc;
        $detail->visible = $request->visible;
        $detail->type = $request->type;
        return response()->json($request);
    }
}
