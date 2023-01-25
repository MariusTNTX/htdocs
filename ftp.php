<?
	//INCLUDE DE LAS CREDENCIALES
	include "C:/Apache24/includes/credenciales.php";
	
	//ESTABLECIMIENTO DE LA CONEXIÓN
	if($hftp = ftp_connect("localhost")){
		echo "<p style='color: green'>Conexión Establecida</p>";
		
		//LOGIN
		if(ftp_login($hftp, $usuario, $password)){
			echo "<p style='color: green'>Usuario Logeado</p>";
			
			//ENVIAR ARCHIVOS
			/*if(ftp_put($hftp,"/Mario/fichero1.csv","PruebasCSV/USUARIOS.csv",FTP_ASCII)){
				echo "<p style='color: green'>Archivo Establecido con Éxito</p>";
			} else echo "<p style='color: red'>Error al Establecer el Fichero</p>";*/
			
			//RECIBIR ARCHIVOS
			if(ftp_get($hftp,"/Clases","/Mario/fichero1.csv",FTP_ASCII)){
				echo "<p style='color: green'>Archivo Recuperado con Éxito</p>";
			} else echo "<p style='color: red'>Error al Recuperar el Fichero</p>";
			
			//CIERRE DE LA CONEXIÓN
			if(ftp_close($hftp)) echo "<p style='color: green'>Conexión Cerrada con Éxito</p>";
			else echo "<p style='color: red'>Error al Cerrar la Conexión</p>";
		}
		else{
			echo "<p style='color: red'>Error al Logear el Usuario</p>";
			exit(); //Interrupción de la conexión (programa)
		}
	}
	else echo "<p style='color: red'>Error al Establecer la Conexión</p>";
?>