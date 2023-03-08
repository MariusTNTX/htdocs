<?
	include_once("C:/Apache24/includes/credenciales.php");
	
	$mime = [
		'js'=>'application/javascript',
		'php'=>'application/octet-stream',
		'pdf'=>'application/pdf',
		'json'=>'application/json',
		'zip'=>'application/zip',
		'wav'=>'audio/x-wav',
		'gif'=>'image/gif',
		'jpeg'=>'image/jpeg',
		'png'=>'image/png',
		'webp'=>'image/webp',
		'css'=>'text/css',
		'csv'=>'text/csv',
		'html'=>'text/html',
		'txt'=>'text/plain',
		'xml'=>'text/xml',
		'mp4'=>'video/mp4'
	];
	
	$archivo = $_GET['archivo'];
	$rutaR = $_GET['ruta'].'/'.$archivo;
	$rutaL = 'C:/Apache24/htdocs/EjerciciosServer/Ejercicio26/archivos/'.$archivo;
	$ext = substr($archivo,strrpos($archivo,'.')+1);
	$tipo = $mime[$ext];
	
	$hftp = ftp_connect("localhost");
	ftp_login($hftp,$usuario,$password);
	ftp_get($hftp,$rutaL,$rutaR,FTP_ASCII);
	ftp_close($hftp);
	
	header('Content-Type: '.$tipo);
	echo file_get_contents($rutaL);
?>