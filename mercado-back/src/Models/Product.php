<?php 

namespace App\Models;

use App\Models\Database;
use PDO;

class Product extends Database
{
    public static function save(array $data)
    {
        
        $pdo = self::getConnection();

        $stmt = $pdo->prepare("
            INSERT 
            INTO 
                produtos (nome, valor, tipo)
            VALUES
                (?, ?, ?)
        ");

        $valor = str_replace(',','.',$data['valor']);
        $stmt->bindParam(1, $data['nome']);
        $stmt->bindParam(2, $valor);
        $stmt->bindParam(3, $data['tipo']);

        
        $stmt->execute();

        return $pdo->lastInsertId() > 0 ? true : false;
    }

    public static function list()
    {
        $pdo = self::getConnection();

        $stmt = $pdo->prepare('
            SELECT 
                p.id, p.nome, p.valor, t.imposto
            FROM 
                produtos p
            JOIN 
                tipos t 
            on 
                p.tipo = t.id
            WHERE 
                p.status = 1
        ');

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}