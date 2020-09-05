<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChannelDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('channel_details', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->bigInteger('owner_id')->unsigned();
            $table->bigInteger('channel_id')->unsigned();
            $table->text('name');
            $table->text('desc');
            $table->text('image');
            $table->boolean('visible');
            $table->enum("type", array("public", "private"));

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('channel_details');
    }
}
