<?php namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Model;
class CustomerBranch extends Model {

    protected $table = 'customer_branch';
    public $timestamps = true;
    protected $guarded = ['id', 'created_by', 'updated_by', 'created_at', 'updated_at'];
    
    public function customer(){
        return $this->belongsTo('App\Models\Customer\Customer');
    }
}