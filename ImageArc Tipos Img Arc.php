<?
	header ("Content-type: image/jpeg");
	$img=imagecreate(400,400);
	$blanco=imagecolorallocate($img,255,255,255);
	$rojo=imagecolorallocate($img,255,0,0);
	imagefilledarc($img,200,200,300,300,0,90,$rojo,IMG_ARC_PIE);
	//imagefilledarc($img,200,200,300,300,0,90,$rojo,IMG_ARC_CHORD);
	//imagefilledarc($img,200,200,300,300,0,90,$rojo,IMG_ARC_NOFILL);
	//imagefilledarc($img,200,200,300,300,0,90,$rojo,IMG_ARC_EDGED);
	//imagefilledarc($img,200,200,300,300,0,90,$rojo,IMG_ARC_EDGED|IMG_ARC_NOFILL);
	//imagefilledarc($img,200,200,300,300,0,90,$rojo,IMG_ARC_PIE|IMG_ARC_NOFILL);
	imagejpeg($img);
?>