<?
	include "C:/Apache24/Externos/usuarios.php";
	$imagen = $_GET['imagen'];
	$hftp=ftp_connect("localhost");
	ftp_login($hftp,$usuario,$password);
	ftp_get($hftp,"C:/Apache24/htdocs/ejercicios/ej27/".$imagen,"/jesus1/imagenes27/".$imagen,FTP_ASCII);
	ftp_close($hftp);
	
	//impresion
	header("Content-Encoding: gzip, deflate");
	header("Content-Type: image/jpeg");
	readgzfile("C:/Program Files/FileZilla Server/jesus1/imagenes27/".$imagen);

?>