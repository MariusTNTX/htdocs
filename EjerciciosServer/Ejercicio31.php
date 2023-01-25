<?
  header("Content-type: image/png");

  //VARIABLES

  $w=300; //Ancho de la imagen
  $h=(int) $w*2+$w/6; //Alto (El doble del ancho más 1/6 del ancho)
  $a=$w-1; //Ancho interno
  $b=$h-$w; //Alto de inicio del rectángulo inferior
  $m=(int) $w/2; //Mitad de la imagen
  $p1=(int) $w/20; //Padding 1 (1/20)
  $p2=(int) $w/10; //Padding 2 (1/10)

  //IMAGEN Y COLORES

  //Crear imagen
  $img=imagecreate($w,$h);

  //Establecer colores transparente, azul, amarillo, rojo y blanco
  $verde=imagecolorallocate($img,0,255,0);
  $azul=imagecolorallocate($img,0,0,255);
  $rojo=imagecolorallocate($img,255,0,0);
  $blanco=imagecolorallocate($img,255,255,255);
  $amarillo=imagecolorallocate($img,255, 233, 0);
  imagecolortransparent($img, $verde);

  //CUADRADO SUPERIOR

  //Crear cuadrado azul filled
  imagefilledrectangle($img,0,0,$a,$a,$azul);
  //Crear recuadro blanco
  imagerectangle($img,$p1,$p1,$a-$p1,$a-$p1,$blanco);
  //Crear cuadrado amarillo
  imagefilledrectangle($img,$p2,$p2,$a-$p2,$a-$p2,$amarillo);
  //Crear polígono blanco (array de puntos)
  $rombo1=[$m,$p2, $a-$p2, $m,$m, $a-$p2, $p2,$m];
  imagefilledpolygon($img,$rombo1,4,$blanco);

  //CUADRADO INFERIOR

  //Crear cuadrado azul filled
  imagefilledrectangle($img,0,$b,$a,$a+$b,$azul);
  //Crear recuadro blanco
  imagerectangle($img,$p1,$b+$p1,$a-$p1,$a-$p1+$b,$blanco);
  //Crear cuadrado amarillo
  imagefilledrectangle($img,$p2,$b+$p2,$a-$p2,$a-$p2+$b,$amarillo);
  //Crear poligono rojo (array de puntos)
  $rombo2=[$m,$p2+$b, $a-$p2,$m+$b, $m,$a-$p2+$b, $p2,$m+$b];
  imagepolygon($img,$rombo2,4,$rojo);
  //Crear arco redondo azul
  imagearc($img,$m,$m+$b,$a-$p2-$p2,$a-$p2-$p2,0,360,$azul);
  //Crear arco elipse rojo
  imagearc($img, $m,$m+$b, $a-$p2*2, $a-($w/3)-$p2*2, 0,360, $rojo);

  //IMPRESIÓN

  //Enviar imagen y destruir recurso
  imagepng($img);
	imagedestroy($img);
?>