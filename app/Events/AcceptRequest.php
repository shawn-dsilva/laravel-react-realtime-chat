<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AcceptRequest implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $friendChannel;
    public $userId;
    public $type;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($friendChannel, $userId, $type)
    {
        $this->friendChannel = $friendChannel;
        $this->userId = $userId;
        $this->type = $type;

    }

    public function broadcastWith() {
        return [ '0' => $this->friendChannel,
                '1' => $this->type];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('event.acceptRequest.'.$this->userId);
    }
}
