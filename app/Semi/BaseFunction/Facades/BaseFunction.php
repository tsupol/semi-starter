<?php namespace App\Semi\BaseFunction\Facades;

use Illuminate\Support\Facades\Facade;

class BaseFunction extends Facade {

    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return 'basefunction';
    }

}