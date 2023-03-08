<?
  ini_set('session.use_cookies',0);
  ini_set('session.use_only_cookies',0);
  ini_set('session.use_trans_sid',1);
  session_start();
  if(!isset($_SESSION['cont'])) $_SESSION['cont']=0;
  else $_SESSION['cont']++;
  echo $_SESSION['cont'];
?>