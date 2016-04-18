<?php

  include 'access_db.php';

  $dbh = new PDO($dsn, $user, $password);

  $query = $dbh->query("SELECT bricks.*, rows.outSum FROM bricks, rows WHERE bricks.row = rows.id");

  $array = $query->fetchAll();

  die(json_encode($array));
