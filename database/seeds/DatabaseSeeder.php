<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // for fast switching between dev and production mode
        $devMode = true;

        // both mode need these
        $this->call(MainSeeder::class);

        // Address
        /*$this->call(TbAmphurTableSeeder::class);
        $this->call(TbCountryTableSeeder::class);
        $this->call(TbDistrictTableSeeder::class);
        $this->call(TbProvinceTableSeeder::class);
        $this->call(TbZipcodeTableSeeder::class);
        */

        if($devMode) {
            // todo: mocking data seeders
        } else {
            // todo: real data seeders (usually reverse seed)
        }
    }
}
