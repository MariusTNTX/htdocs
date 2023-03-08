<?
  $fuente = "C:/Windows/fonts/STENCIL.TTF"; //Stencil Normal
  $img = imagecreatefromjpeg('alex.jpg');
  $size = getimagesize('alex.jpg');
  $blanco = imagecolorallocate($img,255,255,255);
  $rojo = imagecolorallocate($img,255,0,0);
  imagefilledarc($img,$size[0]/2,$size[1]/2,200,80,0,360,$rojo,IMG_ARC_PIE);
  imagestring($img,12,100,100,"Holaaaaaaaaa",$rojo);
  imagettftext($img,16,12,150,150,$rojo,$fuente,"TeTeEfeeeee");

  header("Content-Type: image/jpeg");
  imagejpeg($img);
  imagedestroy($img);
?>