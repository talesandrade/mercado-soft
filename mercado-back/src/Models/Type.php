<?php 

namespace App\Models;

use App\Models\Database;
use PDO;

class Type extends Database
{
    public static function save(array $data)
    {
        
        $pdo = self::getConnection();

        $stmt = $pdo->prepare("
            INSERT 
            INTO 
                tipos (nome, imposto)
            VALUES
                (?, ?)
        ");

        $imposto = str_replace(',','.',$data['imposto']);
        $stmt->bindParam(1, $data['nome']);
        $stmt->bindParam(2, $imposto);

        
        $stmt->execute();

        return $pdo->lastInsertId() > 0 ? true : false;
    }

    public static function list()
    {
        $pdo = self::getConnection();

        $stmt = $pdo->prepare('
            SELECT 
                id, nome, imposto
            FROM 
                tipos
            WHERE 
                status = 1
        ');

        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

}