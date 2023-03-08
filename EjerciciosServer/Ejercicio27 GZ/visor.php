<?
	//Credenciales
	include_once('C:/Apache24/includes/credenciales.php');
	
	//Variables básicas
	$img = $_GET['img'];
	$cod = $_GET['codif'];
	$type = "image/".substr($img,strrpos($img,'.')+1);
	$rutaR = "/Mario/imagenes/".$img;
	$rutaL = 'C:/Apache24/htdocs/EjerciciosServer/Ejercicio27/'.$img;
	
	//Obtención FTP de la imagen
	$hftp = ftp_connect("localhost");
	ftp_login($hftp, $usuario, $password);
	ftp_get($hftp,$rutaL,$rutaR,FTP_ASCII);
	ftp_close($hftp);
	
	//Impresión de la imagen
	header('Content-Encoding: '.$cod);
	header('Content-Type: '.$type);
	readgzfile($rutaL);
	
	//Eliminado de la imagen local
	unlink($rutaL);
?>