<?php

  $title = $_POST['title'];
  $OutSum = $_POST['outSum'];
  $InvId = $_POST['id'];

  $login = 'buyonebrickcom';
  $pass = 'original001';
  $cur = 'USD';
  $hash = md5($login . ':' . $OutSum . ':' . $InvId . ':' . $cur . ':' . $pass . ':Asp_title=' . $title);

  die($hash);