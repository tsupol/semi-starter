<?php

namespace App\Models\User;

use App\Models\Calendar\Category;
use Zizaco\Entrust\Traits\EntrustUserTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
use BF;

class User extends Authenticatable
{
    use EntrustUserTrait;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $guarded = ['id', 'created_by', 'updated_by', 'created_at', 'updated_at'];
    protected $hidden = ['password', 'remember_token'];

    // local scope
    public function scopeCurrentBranch($query)
    {
        return $query->where('branch_id', \BF::getBranchId());
    }

    // Relationships
    public function roles()
    {
        return $this->belongsToMany('App\Models\User\Role');
    }

    public function branch()
    {
        return $this->belongsTo('App\Models\Main\Branch');
    }

    public function roleUser()
    {
        return $this->belongsToMany('App\Models\User\Role', 'role_user');
    }

    // Functions
    public function getAllPermissions()
    {
        $perms = [];
        $roles = $this->roles;
        foreach ($roles as $role) {
            $permissions = $role->permissions;
            foreach ($permissions as $permission) {
                $perms[] = $permission->name;
            }
        }
        return $perms;
    }

    public function getAllRoles()
    {
        $roles = [];
        foreach ($this->roles as $role) {
            $roles[] = $role->name;
        }
        return $roles;
    }
}