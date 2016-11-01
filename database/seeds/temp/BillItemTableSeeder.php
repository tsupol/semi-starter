<?php

use Illuminate\Database\Seeder;

class BillItemTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('bill_item')->delete();
        
	}

}
