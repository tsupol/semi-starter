<?php

use Illuminate\Database\Seeder;

class BillProductTableSeeder extends Seeder {

	/**
	 * Auto generated seed file
	 *
	 * @return void
	 */
	public function run()
	{
		\DB::table('bill_product')->delete();
        
	}

}
