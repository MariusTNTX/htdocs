<?
  if(isset($_COOKIE['color'])){
    $color='class="'.$_COOKIE['color'].'"';
    $mensaje='Se ha elegido el color '.$_COOKIE['color'];
  } else $mensaje = 'No se ha seleccionado ningún color';

  if(isset($_GET['color'])){
    if(isset($_COOKIE['color'])) setcookie('color','');
    setrawcookie("color",$_GET['color'],time()+7200);
    header("location:http://localhost/ejerciciosserver/Ejercicio37-1.php");
  }
?>

<html>

<head>
  <style>
    body{text-align: center}
    .rojo{color: red}
    .verde{color: green}
    .azul{color: blue}
  </style>
</head>

<body>
  <h1 <?=$color?>>Selección de Colores</h1>
  <p <?=$color?>><?=$mensaje?></p>
  <p <?=$color?>>Cambio de color: </p>
  <a href="http://localhost/ejerciciosserver/Ejercicio37-1.php?color=rojo">Rojo</a> - 
  <a href="http://localhost/ejerciciosserver/Ejercicio37-1.php?color=verde">Verde</a> - 
  <a href="http://localhost/ejerciciosserver/Ejercicio37-1.php?color=azul">Azul</a> - 
  <a href="http://localhost/ejerciciosserver/Ejercicio37-1.php?color=null">Ninguno</a> <br><br>
</body>

</html>