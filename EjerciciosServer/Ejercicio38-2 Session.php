<?
  //Inicio o mantenimiento de la sesión
  session_start();
  
  //MODO IMAGEN
  if(isset($_GET['img'])){
    //Variables
    $img=imagecreate(700,100);
    $vlr=$_GET['img']*20;
    if($vlr > 300){
      $vlr=-300;
      $_SESSION['num']=-15;
    } 
    else if($vlr < -300){
      $vlr=300;
      $_SESSION['num']=15;
    } 
    //Colores
    imagecolorallocate($img,255,255,255);
    $negro=imagecolorallocate($img,0,0,0);
    $rojo=imagecolorallocate($img,255,0,0);
    //Formas
    imagefilledrectangle($img,50,45,700-50,55,$negro);
    imagefilledarc($img,300+$vlr+50,50,40,40,0,360,$rojo,IMG_ARC_PIE);
    //Impresión
    header("Content-type: image/png");
    imagepng($img);
    imagedestroy($img);

  //MODO SESIÓN
  } else {
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
    .centr{
      text-align: center;
      width: 700px;
    }
  </style>
</head>
<body>
  <form action="" method="get">
    <p>Haga clic en los botones para mover el punto:</p>
    <div class="centr">
      <input type="submit" name="menos" value="<--">
      <input type="submit" name="mas" value="-->">
    </div>
    <img src="http://localhost/ejerciciosserver/Ejercicio38-2.php?img=<?=$_SESSION['num']?>" alt="Rango">
    <div class="centr"><input type="submit" name="cero" value="Volver al centro"></div>
  </form>
</body>
</html>

<?}?>