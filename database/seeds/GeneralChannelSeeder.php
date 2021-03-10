<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GeneralChannelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('channels')->insert([
            'name' => 'General',
            'type' => 'channel',
        ]);
    }
}
