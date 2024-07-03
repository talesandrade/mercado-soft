<?php 

namespace App\Services;

use Exception;
use PDOException;
use App\Models\Type;

class TypeService
{
    public static function create(array $data)
    {
        try {
            $fields = [
                'nome'     => $data['nome']     ?? '',
                'imposto'    => $data['imposto']    ?? '',
            ];

            
            $produto = Type::save($fields);

            if (!$produto) return ['error' => 'Não conseguimos criar o tipo.'];

            return ['success' => 'Tipo criado com sucesso!'];

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

            $list = Type::list();

            if (!$list) return ['error'=> 'Nenhum tipo encontrado'];

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