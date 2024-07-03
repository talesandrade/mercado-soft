<?php 

namespace App\Services;

use Exception;
use PDOException;
use App\Models\Venda;

class VendaService
{
    public static function create(array $data)
    {
        
        $valorliquidototal = 0;
        $impostototal = 0;
        $valorbrutototal = 0;
         $produtotxt = "[";

        foreach($data as $item){
            $produto = $item['id'];
            $produtototal[] = $produto;
            $valorbruto = $item['valor']*$item['qtd'];
            $valorbrutototal += $valorbruto;
            $imposto = $item['imposto']*($valorbruto/100);
            $impostototal += $imposto;
            $valorliquido = $valorbruto-$imposto;
            $valorliquidototal += $valorliquido;
        }

        foreach($produtototal as $key => $produto){
            $produtotxt .= $produto.", ";

        }
        $produtotxt = rtrim($produtotxt, ', ');
        $produtotxt .= "]";

        try {
            $fields = [
                'produtos'          => $produtotxt ?? '',
                'valor_bruto'     => $valorbrutototal    ?? '',
                'valor_imposto'    => $impostototal    ?? '',
                'valor_liquido'    => $valorliquidototal    ?? '',
                'data'    =>        date("Y-m-d")    ?? '',
            ];

            
            $produto = Venda::save($fields);

            if (!$produto) return ['error' => 'Não conseguimos finalizar a venda.'];

            return ['success' => 'Venda concluída com sucesso!'];

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

            $list = Venda::list();

            if (!$list) return ['error'=> 'Nenhuma venda encontrada'];

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