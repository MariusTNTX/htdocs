<?
  header('Content-Type: image/jpeg');
  $img = imagecreate(200,200);
  $idVerde = imagecolorallocate($img,0,255,0);
  $idRojo = imagecolorallocate($img,255,0,0);
  imagejpeg($img);
  imagedestroy($img);
  
?>