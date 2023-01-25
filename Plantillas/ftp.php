<?
	if($ftp = ftp_connect("iespmercedescuenca.ddns.net")){
		if(ftp_login($ftp,"MolinaM","9]ss)'")){
			echo "Conexión exitosa";
			if(!ftp_put($ftp,'/web/Informatica/MolinaM/1eraOrdinaria/ejercicio1.php','./ejercicio1.php')){
				echo "Error al subir ejercicio1.php";
			}
			if(!ftp_put($ftp,'/web/Informatica/MolinaM/1eraOrdinaria/ejercicio2.php','./ejercicio2.php')){
				echo "Error al subir ejercicio2.php";
			}
			ftp_close($ftp);
		} else echo "Error al logear";
	} else echo "Error en el connect";
?>