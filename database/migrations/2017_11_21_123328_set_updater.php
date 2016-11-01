<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SetUpdater extends Migration
{

    /**
     * Note: for secured project only (most projects do not need this, just leave this untouched)
     *
     * Only Soft-delete is not enough, you should know who update the record
     *
     * Specify here instead of individual table for
     */
    public $targets = [
        // todo: specify tables name
        // 'user',
    ];

    public function up()
    {
        foreach ($this->targets as $tableName) {
            Schema::table($tableName, function ($table) {
                // updater
                $table->integer('created_by')->unsigned()->default(0);
                $table->integer('updated_by')->unsigned()->default(0);
                $table->integer('deleted_by')->unsigned()->default(0);
                $table->softDeletes();
            });
        }
    }

    public function down()
    {
        foreach ($this->targets as $tableName) {
            Schema::table($tableName, function ($table) {
                $table->dropColumn('created_by', 'updated_by', 'deleted_by', 'deleted_at');
            });
        }
    }

}
