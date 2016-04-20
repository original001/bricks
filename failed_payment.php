<?php
  $id = $_POST['InvId'];

  include 'access_db.php';

  $dbh = new PDO($dsn, $user, $password);

  $query = $dbh->query("UPDATE bricks SET disabled = 0 WHERE id = " . $id);

  die();
