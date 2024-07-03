<?php 

   $router = [
    'GET' => [
        '/produtos' => fn() =>  load('ProductController','fetch'),
        '/tipos' => fn() =>  load('TypeController','fetch'),
        '/vendas' => fn() =>  load('VendaController','fetch'),
    ],
    'POST' => [
      '/cadastrar-produtos' => fn() =>  load('ProductController', 'store'),
      '/tipos/cadastrar' => fn() =>  load('TypeController', 'store'),
      '/finalizar-venda' => fn() =>  load('VendaController', 'store'),
    ]  
  ];

  function load(string $controller, string $action){
    
    try{
      $controllerNamespace = "App\\Controllers\\{$controller}";

      if (!class_exists($controllerNamespace)) {
        throw new Exception("O controller: {$controller} não existe."); 
      }

      $controllerInstance = new $controllerNamespace();

      if (!method_exists($controllerInstance,$action)) {
        throw new Exception
        ("O método: {$action} não existe no controller: {$controller}");   
      }
      
      $controllerInstance->$action((object)$_REQUEST);
  
    } catch(Exception $e){
      echo $e->getMessage();
    }
  }