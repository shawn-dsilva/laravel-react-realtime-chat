<?php

namespace App;

use Illuminate\Database\Eloquent\Model;


class UserDetail extends Model
{
    protected $fillable = ['avatar'];


    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
