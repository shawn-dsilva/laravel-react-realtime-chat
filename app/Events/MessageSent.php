<?php

namespace App\Events;

use App\User;
use App\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * User that sent the message
     *
     * @var \App\User
     */
    public $user;

    /**
     * Message details
     *
     * @var \App\Message
     */
    public $message;


    public $channel;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user, $message, $channel)
    {
        $this->user = $user;

        $this->message = $message;

        $this->channel = $channel;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        if($this->channel == 5) {
            return new PresenceChannel("chat.channel.".$this->channel);
        } else {
            return new PresenceChannel("chat.dm.".$this->channel);
        }
    }
}
