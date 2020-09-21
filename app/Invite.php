<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invite extends Model
{

    protected $fillable = [
        'from_id',
        'to_id'
    ];
}
