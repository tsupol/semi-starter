<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUserTables extends Migration
{

    public function up()
    {
        /**
         * Entrust's role
         */
        Schema::create('roles', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('display_name')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });
        /**
         * Basic user
         */
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('username'); // from name
            $table->string('email')->unique();
            $table->string('first_name'); // added
            $table->string('last_name'); // added
            $table->string('phone', 20);
            $table->string('phone_2', 20)->nullable();
            $table->string('password', 60);
            $table->string('status', 60)->nullable();
            $table->string('lang', 2)->default('en');
            $table->integer('branch_id')->unsigned();
            $table->foreign('branch_id')->references('id')->on('branches')->onDelete('restrict')->onUpdate('cascade');
            $table->rememberToken();
            $table->timestamps();

            $table->unique(['first_name', 'last_name']);
        });
        /**
         * Entrust's roles and users relationships
         */
        Schema::create('role_user', function (Blueprint $table) {
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->integer('role_id')->unsigned();
            $table->foreign('role_id')->references('id')->on('roles') ->onUpdate('cascade')->onDelete('cascade');
            $table->primary(['user_id', 'role_id']);
        });
        /**
         * Entrust's permissions
         */
        Schema::create('permissions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('display_name')->nullable();
            $table->string('description')->nullable();
            $table->timestamps();
        });
        /**
         * Entrust's permissions and roles relationships
         */
        Schema::create('permission_role', function (Blueprint $table) {
            $table->integer('role_id')->unsigned();
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade')->onUpdate('cascade');
            $table->integer('permission_id')->unsigned();
            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade')->onUpdate('cascade');
            $table->primary(['permission_id', 'role_id']);
        });
    }

    public function down()
    {
        Schema::drop('permission_role');
        Schema::drop('permissions');
        Schema::drop('role_user');
        Schema::drop('users');
        Schema::drop('roles');
    }
} 