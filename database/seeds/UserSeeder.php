<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\User;
use App\Channel;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    public function run()
    {

        $userArray = [
            0 => [
                 "name" => "Shawn D'silva",
                 "email" => "shawn@shawndsilva.com"
             ],
            1 => [
                "name" => "Dio Brando",
                "email" => "dio.brando@cairo.eg"
            ],
            2 => [
                "name" => "Jotaro Kujo",
                "email" => "jojo@yahoo.co.jp"
            ],
            3 => [
                "name" => "Steven Armstrong",
                "email" => "senator@desperado-llc.com"
            ],
            4 => [
                "name" => "Samuel Rodriguez",
                "email" => "jetstream.sam@desperado-llc.com"
            ],
            ];

        // DB::table('users')->insert([
        //     'name' => "Shawn D'silva",
        //     'email' => 'shawn@shawndsilva.com',
        //     'password' => Hash::make('123456'),
        //     'avatar' => "avatars/Shawn D'silva-default.jpg",
        // ]);

        // $user = new User([
        //     'name' => "Shawn D'silva",
        //     'email' => "shawn@shawndsilva.com",
        //     'password' => Hash::make('123456'),
        // ]);
        // $user->save();

        // Avatar::create("Shawn D'silva")->save("storage/app/public/avatars/Shawn D'silva-default.jpg", 100);
        // $user->details()->updateOrCreate(['user_id' => $user->id], ['avatar'=> "avatars/Shawn D'silva-default.jpg"]);

        // $channel = Channel::find(1);
        // $channel->users()->attach($user->id);

        foreach( $userArray as $userItem ) {
            $user = new User([
                'name' => $userItem["name"],
                'email' => $userItem["email"],
                'password' => Hash::make('123456'),
            ]);
            $user->save();
    
            Avatar::create($userItem["name"])->save("storage/app/public/avatars/".$userItem["name"]."-default.jpg", 100);
            $user->details()->updateOrCreate(['user_id' => $user->id], ['avatar'=> "avatars/".$userItem["name"]."-default.jpg"]);
    
            $channel = Channel::find(1);
            $channel->users()->attach($user->id);
        }

    }
}
