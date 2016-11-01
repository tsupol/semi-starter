<?php namespace App\Models\Main;

use Illuminate\Database\Eloquent\Model;
class Branch extends Model {

    protected $table = 'branches';
    public $timestamps = true ;
    protected $guarded = ['id', 'created_by', 'updated_by', 'created_at', 'updated_at'];

}