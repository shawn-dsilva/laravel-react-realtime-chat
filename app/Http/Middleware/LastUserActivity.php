<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class LastUserActivity 
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check()) {
            $expiresAt = Carbon::now()->addMinutes(1);
            error_log("IN LASTUSERACTIVITY MIDDLEWARE");
            error_log(Auth::user()->id);
            $userData = Auth::user();
            Cache::put('user-is-online-' . Auth::user()->id, $userData, $expiresAt);
        }
        return $next($request);
    }
}