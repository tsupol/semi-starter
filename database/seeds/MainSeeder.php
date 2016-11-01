<?php
/**
 * Created by PhpStorm.
 * User: tonsu
 * Date: 11/4/2015
 * Time: 3:18 PM
 */

use Illuminate\Database\Seeder;
use App\ViewGenerator\ViewGeneratorManager as ViewGenerator;
use Carbon\Carbon;

class MainSeeder extends Seeder
{

    public function run()
    {
        $now = \Carbon\Carbon::now();
        
        \DB::table('branches')->insert([
            [
                'id' => 1,
                'name' => 'default branch',
                'email' => 'info@semicolon.com',
                'phone' => '029999999',
                'fax' => '029999999',
                'address' => '9/9 Thailand',
                'desc' => 'default',
                'created_at' => $now,
                'updated_at' => $now
            ],
        ]);

        // Roles
        $role_admin = \App\Models\User\Role::create(['name' => 'admin', 'display_name' => 'Administrator', 'description' => '']);

        // todo: permission here

        // Admin User: mandatory
        $user_admin = \App\Models\User\User::create([
            'username' => 'admin',
            'email' => 'admin@localhost.com',
            'password' => bcrypt('password'),
            'first_name' => 'Primary',
            'last_name' => 'Admin',
            'lang' => 'en',
            'branch_id' => 1,
            'phone' => '029999999',
            'phone_2' => '029999999',
            'status' => 'normal'
        ]);
        $user_admin->attachRole($role_admin);
    }
}