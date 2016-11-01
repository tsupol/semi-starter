<?php namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Model;
class Customer extends Model {

    protected $table = 'customers';
    public $timestamps = true;
    protected $guarded = ['id', 'created_by', 'updated_by', 'created_at', 'updated_at'];

    public function customerBranches(){
        return $this->hasMany('App\Models\Customer\CustomerBranch');
    }
}