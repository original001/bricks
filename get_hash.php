<?php

  $name = $_POST['name'];
  $surname = $_POST['surname'];
  $OutSum = $_POST['outSum'];
  $InvId = $_POST['id'];

  $login = 'buyonebrickcom';
  $pass = 'original001';
  $cur = 'USD';
  $hash = md5($login . ':' . $OutSum . ':' . $InvId . ':' . $cur . ':' . $pass . ':Shp_name=' . $name . ':Shp_surname=' . $surname);

  die($hash);