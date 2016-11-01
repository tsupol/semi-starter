<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateBaseTables extends Migration {

	public function up()
	{
		/**
		 * Basic lookup table to store arbitrary information
		 * such as Logo, App Name, etc.
		 */
		Schema::create('settings', function(Blueprint $table)
		{
			$table->string('key')->primary();
			$table->string('value');
			$table->timestamps();

		});

		/**
		 * Don't need to delete this if not use
		 */
		Schema::create('branches', function(Blueprint $table) {
			$table->increments('id');
			$table->string('name', 50)->unique();
			$table->string('email', 255);
			$table->string('phone', 63);
			$table->string('fax', 63);
			$table->string('address', 255);
			$table->text('desc');
			$table->timestamps();
		});
	}

	public function down()
	{
		Schema::drop('settings');
		Schema::drop('branches');
	}
} 