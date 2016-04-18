<?php

  //todo: must not allow disable bricks via console
  
  $id = $_POST['id'];

  include 'access_db.php';

  $dbh = new PDO($dsn, $user, $password);

  $query = $dbh->query("UPDATE bricks SET disabled = 1 WHERE id = " . $id);

  die();
