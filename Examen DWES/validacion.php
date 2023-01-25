<?
  //Siempre recibirá usuario, contraseña y la lista de usuarios (regis):
  $h = 'Location: ejercicio2.php?valido=true&usuario='.$_GET['usuario'].'&correo='.$_GET['correo'].'&regis='.$_GET['regis'];
  //Se redirige a Ejercicio2.php:
  header($h); 
?>