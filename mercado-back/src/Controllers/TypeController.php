<?php 

namespace App\Controllers;

use App\Services\TypeService;

class TypeController
{
    public static function store($input)
    {

        $typeService = TypeService::create((array)$input);

        if (isset($typeService['error'])) {
            return [
                'error'   => true,
                'success' => false,
                'message' => $typeService['error']
            ];
        }

        echo json_encode([
            'error'   => false,
            'success' => true,
            'data'    => $typeService
        ]);
    }

    public static function fetch()
    {

        $typeService = TypeService::fetch();

        if (isset($typeService['error'])) {
            return json_encode([
                'error'   => true,
                'success' => false,
                'message' => $typeService['error']
            ]);
        }

        echo json_encode([
            'error'   => false,
            'success' => true,
            'data'    => $typeService
        ]);
    }
}