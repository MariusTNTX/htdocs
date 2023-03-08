<?
  $mensaje="Aún no has elegido ninguna opción";

  if(isset($_GET['crear'])){
    if(isset($_COOKIE['cookie37'])) $mensaje = "La cookie ya existe";
    else {
      setrawcookie("cookie37","Segunda+Parte",time()+$_GET['segs']);
      $mensaje = "La cookie ha sido creada. Se destruirá en ".$_GET['segs']." segundos";
    }
  }

  if(isset($_GET['comprobar'])){
    if(isset($_COOKIE['cookie37'])) $mensaje = "La cookie existe";
    else $mensaje = "La cookie no existe";
  }

  if(isset($_GET['destruir'])){
    if(isset($_COOKIE['cookie37'])){
      setcookie("cookie37","");
      $mensaje = "La cookie ha sido destruida";
    } else $mensaje = "Lo que ya está muerto no puede morir";
  }
?>

<html>

<head>
  <style>
    input[type='number']{width: 40px}
    .azul{color: blue}
  </style>
</head>

<body>
  <form action="" method="get">
    <h1>Creación y Destrucción de Cookies</h1>
    <p class="azul"><?=$mensaje?></p>
    <p>Elija una opción:</p>
    <ul>
      <li>
        Crear una cookie con una duración de&nbsp;
        <input type="number" name="segs" id="segs" min="10" max="60" width="20px" value="10">&nbsp;
        segundos (entre 1 y 60)&nbsp;
        <input type="submit" name="crear" value="Crear">
      </li>
      <li>
        Comprobar la cookie&nbsp;
        <input type="submit" name="comprobar" value="Comprobar">
      </li>
      <li>
        Destruir la cookie&nbsp;
        <input type="submit" name="destruir" value="Destruir">
      </li>
    </ul>
  </form>
</body>

</html>