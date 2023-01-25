<?
  if(isset($_GET['verif'])){
    if(isset($_COOKIE['check'])) $mensaje="El navegador acepta cookies";
    else $mensaje="El navegador NO acepta cookies";
  } else {
    setrawcookie("check","verificacion",time()+7200);
    $mensaje="La cookie ha sido creada";
  }
?>

<h1>Comprobación de Cookies</h1>
<p><?=$mensaje?></p>
<a href="http://localhost/ejerciciosserver/Ejercicio37-3.php?verif=check">Comprobar de nuevo</a>

