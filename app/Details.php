<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Details extends Model
{
    // protected $primaryKey = "channel_id";

    protected $attributes = [
        'image' => null,
    ];

    protected $fillable = [
        'name', 'desc','visible','type'
    ];

    public function channel() {
        return $this->belongsTo(Channel::class);

    }

}
