<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Channel extends Model
{
    // protected $primaryKey = "channel_id";

    protected $attributes = [
        'name' => null,
    ];

    protected $fillable = [
        'name'
    ];

    public function users() {
        return $this->belongsToMany('App\User', 'user_channel')->withTimestamps();
    }

    public static function findOrNew($sender, $receiver) {
        $channelIsFound = Channel::where('type', 'dm')->whereHas('users', function($q) use ($sender) {
            $q->where('user_id',$sender  );
       })->whereHas('users', function($q) use ($receiver) {
           $q->where('user_id',$receiver);
       })->get();
    }
}
