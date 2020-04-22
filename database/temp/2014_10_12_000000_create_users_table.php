<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('role_id')->default(1);
            $table->string('login')->unique();
            $table->string('email')->unique()->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->integer('uid')->nullable();
            $table->decimal('balance', 12, 2)->default(5000);
            $table->string('avatar')->nullable();
            $table->string('provider_id')->nullable();
            $table->string('provider')->nullable();
            $table->boolean('is_email_notification')->default(0);
            $table->boolean('is_push_notification')->default(0);
            $table->string('platform')->default('PC');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
