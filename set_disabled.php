<?php
  
  $id = $_POST['id'];

  $dsn = 'mysql:dbname=bricks;host=127.0.0.1';
  $user = 'root';
  $password = 'root';

  $dbh = new PDO($dsn, $user, $password);

  $query = $dbh->query("UPDATE bricks SET disabled = 1 WHERE id = " . $id);

  die();
