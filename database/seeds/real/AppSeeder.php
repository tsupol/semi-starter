<?php
/**
 * Created by PhpStorm.
 * User: tonsu
 * Date: 11/4/2015
 * Time: 3:18 PM
 */

use Illuminate\Database\Seeder;
use App\ViewGenerator\ViewGeneratorManager as ViewGenerator;

/*
 * For Mobile App (QR Code)
 */
class AppSeeder extends Seeder {

    public function run()
    {
        \DB::table('users_app')->delete();
        \DB::table('users_app')->insert(array (
            0 =>
                array (
                    'id' => 1,
                    'email' => 'test@mail.com',
                    'full_name' => 'test test' ,
                    'password' => '7c4a8d09ca3762af61e59520943dc26494f8941b' ,
                    'Isfacebook' => 0 ,
                    'ScoreTotal' => 0 ,
                    'ScoreUse' => 0 ,
                    'ScoreRemain' => 0 ,
                    'created_at' => '2015-12-03 11:42:57',
                    'updated_at' => '2015-12-03 12:33:51',
                ),
        ));

        \DB::table('app_qrcode')->delete();
        \DB::table('app_qrcode')->insert(array (
            0 =>
                array (
                    'id' => 1,
                    'qrcodeId' => 'mtpc_159549',
                    'created_at' => '2015-12-03 11:42:57',
                    'updated_at' => '2015-12-03 12:33:51',
                ),
            1 =>
                array (
                    'id' => 2,
                    'qrcodeId' => 'mtpc_45931',
                    'created_at' => '2015-12-03 11:42:57',
                    'updated_at' => '2015-12-03 12:33:51',
                ),
            2 =>
                array (
                    'id' => 3,
                    'qrcodeId' => 'mtpc1463396088',
                    'created_at' => '2015-12-03 11:42:57',
                    'updated_at' => '2015-12-03 12:33:51',
                )


        ));
    }
}