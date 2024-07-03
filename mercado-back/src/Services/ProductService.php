<?php 

namespace App\Services;

use Exception;
use PDOException;
use App\Models\Product;

class ProductService
{
    public static function create(array $data)
    {
        try {
            $fields = [
                'nome'     => $data['nome']     ?? '',
                'valor'    => $data['valor']    ?? '',
                'tipo'    => $data['tipo']    ?? '',
            ];

            
            $produto = Product::save($fields);

            if (!$produto) return ['error' => 'Não conseguimos criar o produto.'];

            return ['success' => 'Produto criado com sucesso!'];

        } 
        catch (PDOException $e) {
            if ($e->errorInfo[0] === '08006') return ['error' => 'Não conseguimos conectar ao banco de dados.'];
            return ['error' => $e->errorInfo[0]];
        }
        catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }

    public static function fetch()
    {
        try {

            $list = Product::list();

            if (!$list) return ['error'=> 'Nenhum produto encontrado'];

            return $list;
        } 
        catch (PDOException $e) {
            if ($e->errorInfo[0] === '08006') return ['error' => 'Não conseguimos conectar ao banco de dados.'];
            return ['error' => $e->errorInfo[0]];
        }
        catch (Exception $e) {
            return ['error' => $e->getMessage()];
        }
    }
}