<?
  //Inicio o mantenimiento de la sesión
  ini_set('session.use_cookies',1);
  ini_set('session.use_only_cookies',1);
  ini_set('session.use_trans_sid',0);
  session_start();
  
  //MODO IMAGEN
  if(isset($_GET['img'])){
    //Variables
    $img=imagecreate(600,100);
    $l=$_GET['img'];
    $vlr=$_GET['num']*20;
    //Colores
    imagecolorallocate($img,255,255,255);
    $negro=imagecolorallocate($img,0,0,0);
    $rojo=imagecolorallocate($img,255,0,0);
    //Formas
    imagefilledrectangle($img,50,45,600-50,55,$negro);
    imagefilledarc($img,30+$vlr,50,40,40,0,360,$rojo,IMG_ARC_PIE);
    //Impresión
    header("Content-type: image/png");
    imagepng($img);
    imagedestroy($img);

  //MODO SESIÓN
  } else {
    //Si no existe la variable de sesión "num" se inicializa a cero
    if(!isset($_SESSION['numA'])) $_SESSION['numA']=1;
    if(!isset($_SESSION['numB'])) $_SESSION['numB']=1;
    //Acciones:
    if(isset($_GET['inicio'])){
      //Se suma 1 a una letra aleatoria
      switch(rand(1,2)){
        case 1: $_SESSION['numA']++;
          break;
        case 2: $_SESSION['numB']++;
          break;
      }
      //Si una letra va a ganar se envía un win por URL
      if($_SESSION['numA']==26 || $_SESSION['numB']==26){
        if($_SESSION['numA']==26) $winA='win';
        else $winB='win';
      } else header('Refresh:0.5; url=http://192.168.2.30/ejerciciosserver/Ejercicio38-3.php?inicio=Inicio');
    } else if(isset($_GET['reset'])){
      $_SESSION['numA']=1;
      $_SESSION['numB']=1;
    }
?>

<html>
<head>
  <style>
    body, input{font-size: 24px}
    .centr{
      display: flex;
      align-items: center;
    }
    .big{font-size: 64px}
    .win{background-color:red}
  </style>
</head>
<body>
  <form action="" method="get">
    <div class="centr">
      <button class="big <?=$winA?>">A</button>
      <span><img src="http://192.168.2.30/ejerciciosserver/Ejercicio38-3.php?img=A&num=<?=$_SESSION['numA']?>" alt="RangoA"></span>
    </div>
    <div class="centr">
    <button class="big <?=$winB?>">B</button>
      <span><img src="http://192.168.2.30/ejerciciosserver/Ejercicio38-3.php?img=B&num=<?=$_SESSION['numB']?>" alt="RangoB"></span>
    </div>
    <input type="submit" name="inicio" value="Inicio">
    <input type="submit" name="reset" value="Reset">
  </form>
</body>
</html>

<?}?>