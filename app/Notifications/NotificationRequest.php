<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Broadcast;

class NotificationRequest extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($invite)
    {
        $this->invite = $invite;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->line('The introduction to the notification.')
                    ->action('Notification Action', url('/'))
                    ->line('Thank you for using our application!');
    }


    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    // public function toBroadcast($notifiable)
    // {
    //     $id = \Laravel\Spark\Notification::whereUserId($notifiable->id)->latest()->first()->id;

    //     $desc = "";

    //     switch($this->invite->type) {
    //         case "FRND":
    //             $desc = "wants to be friends!";
    //         break;

    //         case "JOIN":
    //             $desc = "wants to join your channel {$this->invite->to}!";
    //         break;

    //         case "INVT":
    //             $desc = "has invited you to join channel {$this->invite->to}!";
    //         default:
    //         break;
    //     }

    //     return new BroadcastMessage ( [
    //     'invite_id' => $this->invite->id,
    //     'desc' => $desc,
    //     'id' => $id,
    //     ]);
    // }

    public function toArray($notifiable)
    {
        $desc = "";

        switch($this->invite->type) {
            case "FRND":
                $desc = "wants to be friends!";
            break;

            case "JOIN":
                $desc = "wants to join your channel {$this->invite->to}!";
            break;

            case "INVT":
                $desc = "has invited you to join channel {$this->invite->to}!";
            default:
            break;
        }

        return [
        'sender_name' => $this->invite->name,
        'invite_id' => $this->invite->id,
        'type' => $this->invite->type,
        'desc' => $desc,
        'id' => $this->id,
        ];
    }
}
