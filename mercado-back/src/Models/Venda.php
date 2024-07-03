<?php 

namespace App\Models;

use App\Models\Database;
use PDO;

class Venda extends Database
{
    public static function save(array $data)
    {
        
        $pdo = self::getConnection();

        $stmt = $pdo->prepare("
            INSERT 
            INTO 
                vendas (produtos, valor_bruto, valor_imposto, valor_liquido, data)
            VALUES
                (?, ?, ?, ?, ?)
        ");

        $stmt->bindParam(1, $data['produtos']);
        $stmt->bindParam(2, $data['valor_bruto']);
        $stmt->bindParam(3, $data['valor_imposto']);
        $stmt->bindParam(4, $data['valor_liquido']);
        $stmt->bindParam(5, $data['data']);

        $stmt->execute();

        return $pdo->lastInsertId() > 0 ? true : false;
    }

    public static function list()
    {
        $pdo = self::getConnection();

        $stmt = $pdo->prepare('
            SELECT 
                id, produtos, valor_bruto, valor_imposto, valor_liquido, data
            FROM 
                vendas
        ');

        $stmt->execute();

        $vendas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        
        foreach($vendas as $key => $item){

            $produtos = json_decode($item['produtos']);
            foreach($produtos as $id_produto){
                $stmt = $pdo->prepare('
                SELECT 
                    nome
                FROM 
                    produtos
                WHERE
                    id = ? ');
    
                $stmt->bindParam(1, $id_produto);
                $stmt->execute();
                $produto_atual = $stmt->fetchAll(PDO::FETCH_ASSOC);
                $produtos_venda .= $produto_atual[0]['nome'].", ";
            }
            
            $produtos_venda = rtrim($produtos_venda, ', ');
            $vendas[$key]['produtos'] = $produtos_venda;
            $vendas[$key]['valor_bruto'] = round($vendas[$key]['valor_bruto'],2);
            $vendas[$key]['valor_imposto'] = round($vendas[$key]['valor_imposto'],2);
            $vendas[$key]['valor_liquido'] = round($vendas[$key]['valor_liquido'],2);
            $produtos_venda = "";

            

        }

        return $vendas;
    }

}