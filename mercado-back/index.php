<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once __DIR__."/vendor/autoload.php";
require_once __DIR__."/src/Routes/route.php";

try {
    $uri = parse_url($_SERVER['REQUEST_URI'])['path'];
    $request = $_SERVER['REQUEST_METHOD'];
    
    if (!isset($router[$request])) {
      throw new Exception("A routa não existe");
    }

    if (!array_key_exists($uri, $router[$request])) {
      throw new Exception("A routa não existe");
    }

    $controller = $router[$request][$uri];
    $controller();

  } catch (Exception $e) {
    $e->getMessage();
  }