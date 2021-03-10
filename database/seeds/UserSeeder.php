<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        // DB::table('users')->insert([
        //     'name' => "Shawn D'silva",
        //     'email' => 'shawn@shawndsilva.com',
        //     'password' => Hash::make('123456'),
        //     'avatar' => "avatars/Shawn D'silva-default.jpg",
        // ]);

        $user = new User([
            'name' => "Shawn D'silva",
            'email' => "shawn@shawndsilva.com",
            'password' => Hash::make('123456'),
        ]);
        $user->save();

        Avatar::create("Shawn D'silva")->save("storage/app/public/avatars/Shawn D'silva-default.jpg", 100);
        $user->details()->updateOrCreate(['user_id' => $user->id], ['avatar'=> "avatars/Shawn D'silva-default.jpg"]);



    }
}
