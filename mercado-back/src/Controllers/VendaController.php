<?php 

namespace App\Controllers;

use App\Services\VendaService;

class VendaController
{
    public static function store($input)
    {
        $input = json_decode(file_get_contents('php://input'),true);

        $vendaService = VendaService::create((array)$input);

        if (isset($vendaService['error'])) {
            return [
                'error'   => true,
                'success' => false,
                'message' => $vendaService['error']
            ];
        }

        echo json_encode([
            'error'   => false,
            'success' => true,
            'data'    => $vendaService
        ]);
    }

    public static function fetch()
    {

        $vendaService = VendaService::fetch();

        if (isset($vendaService['error'])) {
            return json_encode([
                'error'   => true,
                'success' => false,
                'message' => $vendaService['error']
            ]);
        }

        echo json_encode([
            'error'   => false,
            'success' => true,
            'data'    => $vendaService
        ]);
    }
}