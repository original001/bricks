<?php

  $dsn = 'mysql:dbname=bricks;host=127.0.0.1';
  $user = 'root';
  $password = 'root';


  $dbh = new PDO($dsn, $user, $password);

  $query = $dbh->query("SELECT bricks.*, rows.outSum FROM bricks, rows WHERE bricks.row = rows.id");

  $array = $query->fetchAll();

  die(json_encode($array));
