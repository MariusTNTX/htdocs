<?
  //Inicio o mantenimiento de la sesión
  session_start(); 
  //Si no existe la variable de sesión "num" se inicializa a cero
  if(!isset($_SESSION['num'])) $_SESSION['num']=0;
  
  //Acciones:
  if(isset($_GET['mas'])) $_SESSION['num']++;
  else if(isset($_GET['menos'])) $_SESSION['num']--;
  else if(isset($_GET['cero'])) $_SESSION['num']=0;
?>

<html>
<head>
  <style>
    body, input{font-size: 24px;}
    .gig{font-size: 64px}
  </style>
</head>
<body>
  <form action="" method="get">
    <p>Haga clic en los botones para modificar el valor:</p>
    <div>
      <input type="submit" name="menos" value="-" class="gig">
      <span class="gig"><?=$_SESSION['num']?></span>
      <input type="submit" name="mas" value="+" class="gig">
    </div><br>
    <input type="submit" name="cero" value="Poner a cero">
  </form>
</body>
</html>