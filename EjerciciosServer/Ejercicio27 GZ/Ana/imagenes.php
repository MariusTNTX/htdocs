<?php
	//Credenciales
	include_once "C:/Apache24/includes/CredencialesFTP.php";
	
	//Obtención FTP de la imagen
	$hftp = ftp_connect("localhost");
	ftp_login($hftp, $usuario, $clave);
	ftp_get($hftp,"C:/Apache24/htdocs/EJERCICIOS/ej27/".$_GET['imagen'],"/ana/imagenes/".$_GET['imagen'],FTP_ASCII);
	ftp_close($hftp);
	
	//Impresión de la imagen
    header("Content-Encoding: gzip, deflate");
    header("Content-Type: image/jpeg");
    readgzfile("C:/Apache24/htdocs/EJERCICIOS/ej27/".$_GET['imagen']);
	
	//Borrado de la imagen local
	unlink("C:/Apache24/htdocs/EJERCICIOS/ej27/".$_GET['imagen']);
?>
<!--
ERRORES:

 - Estas tratando de leer un archivo con una ruta relativa del servidor 
   HTTP, cuando la imagen se encuentra en el servidor FTP. Para ello se 
   requiere hacer un include del php del usuario/clave del servidor FTP, 
   conectarse, logarse, enviar el archivo al servidor HTTP y cerrar la 
   conexión. De esta forma se puede leer la imagen copiada en HTTP y 
   posteriormente eliminar dicha copia para que no se acumulen imagenes.
   
 - Has usado readfile() para leer un archivo comprimido gz. En php.net 
   se recomienda leerlos con readgzfile().
   
 - Al hacer una copia en local de la imagen, una vez leída debe ser 
   eliminada para que no se acumulen. Para ello se usa unlink() justo 
   después de imprimir la imagen.
-->