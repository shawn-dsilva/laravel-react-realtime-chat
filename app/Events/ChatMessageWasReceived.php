<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class ChatMessageWasReceived implements ShouldBroadcastNow
{
    use InteractsWithSockets, SerializesModels;

    public $chatMessage;
    public $user;

    public function __construct($chatMessage, $user)
    {
        $this->chatMessage = $chatMessage;
        $this->user = $user;
    }

    public function broadcastOn()
    {
        return new PresenceChannel("chat");
    }

    public function broadcastAs() {
        return "ChatMessageWasReceived";
    }
}
