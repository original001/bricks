<?php

  $dsn = 'mysql:dbname=bricks;host=127.0.0.1';
  $user = 'root';
  $password = 'root';


  $dbh = new PDO($dsn, $user, $password);

  $query = $dbh->query("SELECT bricks.*, segments.outSum FROM bricks, segments WHERE bricks.segment = segments.id");

  $array = $query->fetchAll();

  function calculateHash($brick){
    $login = 'buyonebrickcom';
    $pass = 'original001';
    $cur = 'USD';
    $hash = md5($login . ':' . $brick['outSum'] . ':' . $brick['id'] . ':' . $cur . ':' . $pass);
    array_push($brick, 'hash');
    $brick['hash'] = $hash;
    return $brick;
  }

  $mappedArray = array_map('calculateHash', $array);

  die(json_encode($mappedArray));
