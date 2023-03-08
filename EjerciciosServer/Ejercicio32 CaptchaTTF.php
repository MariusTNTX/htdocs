<?
  if(isset($_GET['resp'])){
    header("Content-type: image/png");
    $img=imagecreate(600,300);
    $blanco=imagecolorallocate($img,255,255,255);
    $negro=imagecolorallocate($img,0,0,0);
    $fuente="C:/Windows/fonts/OLDENGL.TTF"; //C:\Apache24\htdocs\EjerciciosServer\comic.ttf
    $resp=unserialize(urldecode($_GET['resp']));

    for($i=0; $i<5; $i++){
      imagettftext($img,42,$resp[$i][1],100*$i+80,150,$negro,$fuente,chr($resp[$i][0]));
    }

    imagepng($img);
	  imagedestroy($img);

  } else {
    for($i=0; $i<5; $i++){
      switch(rand(1,6)){
        case 1: $resp[]=[rand(48,57),rand(0,45)];
          break;
        case 2: $resp[]=[rand(65,90),rand(0,45)];
          break;
        case 3: $resp[]=[rand(97,122),rand(0,45)];
          break;
        case 4: $resp[]=[rand(48,57),rand(315,359)];
          break;
        case 5: $resp[]=[rand(65,90),rand(315,359)];
          break;
        case 6: $resp[]=[rand(97,122),rand(315,359)];
          break;
      }
      $captcha.=chr($resp[$i][0]);
    }
?>
  <body style="text-align:center">
    <form action="" method="get" style="margin:0 auto">
      <img src="http://localhost/ejerciciosServer/Ejercicio32.php?resp=<?=urlencode(serialize($resp))?>" alt="Captcha" width="200"> <br><br>
      <input type="text" name="respuesta" id="respuesta" style="width:200px"><br><br>
      <input type="submit" name="enviar" value="Enviar"><br><br>
      <input type="hidden" name="captcha" value="<?=$captcha?>">
    </form>
<?}
  if(isset($_GET['enviar'])){
    if($_GET['respuesta'] == $_GET['captcha']) echo "<h3 style='color:green'>Respuesta Correcta</h3>";
    else echo "<h3 style='color:red'>Respuesta Incorrecta</h3>";
  }
?>
  </body>