<?
  include_once("C:/Apache24/includes/credenciales.php");
  $ftp = ftp_connect('localhost') or die('Error al establecer la conexión ftp');
  ftp_login($ftp,$usuario,$password) or die('Error al logearse en el servidor ftp');
  ftp_put($ftp,'/Mario/csv.php','./csv.php') or die('Error al enviar el archivo');
?>


  <pre><?=print_r(ftp_mlsd($ftp,'.'))?></pre><br>
  <pre><?=print_r(ftp_nlist($ftp,'/Mario/empleados'))?></pre><br>
  <pre><?=print_r(ftp_rawlist($ftp,'.'))?></pre><br>

  <?ftp_close($ftp);?>