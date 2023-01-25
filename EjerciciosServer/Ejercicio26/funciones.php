<?
	function volver($ruta){
		$pos = strrpos($ruta,"/");
		return substr($ruta,0,$pos);
	}
	
	function borrar($ruta,$checked,$usuario,$password){
		$hftp = ftp_connect("localhost");
		ftp_login($hftp,$usuario,$password);
		foreach($checked as $fic){
			ftp_delete($hftp,$ruta.'/'.$fic);
		}
		ftp_close($hftp);
	}
	
	function mostrarArchivos($ruta,$usuario,$password){
		$hftp = ftp_connect("localhost");
		ftp_login($hftp, $usuario, $password);
		$archivos = ftp_mlsd($hftp,$ruta);
		ftp_close($hftp);
		
		$stF=" style='margin: 0 auto; margin-top:40px; text-align:center'";
		echo '<form action="" method="get"'.$stF.'>';
		echo '<h1>Explorador de Archivos:</h1>';
		echo "<h3 style='color:blue'>$ruta</h3>";
		foreach($archivos as $arch){
			if($arch['type']=='dir') mostrarDirectorio($ruta,$arch['name']);
			else if ($arch['type']=='file') mostrarFichero($ruta,$arch['name']);
		}
		if($ruta!="/Mario") echo '<input type="submit" name="volver" value="Volver" style="margin-top:30px">     ';
		echo '<input type="submit" name="borrar" value="Borrar" style="margin-top:30px">';
		echo '<input type="hidden" name="ruta" value="'.$ruta.'" style="margin-top:30px">';
		echo '</form>';
	}
	
	function mostrarDirectorio($ruta,$dir){
		$ruta = "http://localhost/ejerciciosserver/Ejercicio26/ejercicio26.php?ruta=".$ruta.'/'.$dir;
		echo '<a href="'.$ruta.'" style="display:block; width:fit-content; margin:0 auto;">'.$dir.'</a>';
	}
	
	function mostrarFichero($ruta,$fic){
		$url = "http://localhost/ejerciciosserver/Ejercicio26/visor.php?ruta=$ruta&archivo=$fic";
		echo '<div>'.$fic.'   ';
		echo '(<a href="'.$url.'">Ver</a>)  ';
		echo '<input type="checkbox" name="check[]" value="'.$fic.'"></div>';
	}
?>