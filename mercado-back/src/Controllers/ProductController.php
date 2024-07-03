<?php 

namespace App\Controllers;

use App\Services\ProductService;

class ProductController
{
    public static function store($input)
    {

        $productService = ProductService::create((array)$input);

        if (isset($productService['error'])) {
            return [
                'error'   => true,
                'success' => false,
                'message' => $productService['error']
            ];
        }

        echo json_encode([
            'error'   => false,
            'success' => true,
            'data'    => $productService
        ]);
    }

    public static function fetch()
    {

        $productService = ProductService::fetch();

        if (isset($productService['error'])) {
            return json_encode([
                'error'   => true,
                'success' => false,
                'message' => $productService['error']
            ]);
        }

        echo json_encode([
            'error'   => false,
            'success' => true,
            'data'    => $productService
        ]);
    }
}