<?
	function mostrarFormulario(){?>
		<form enctype="multipart/form-data" action="" method="post" style="margin:0 auto; text-align:center; margin-top:20px;">
			<h1 style="margin-bottom:30px">Añadir Archivos:</h1>
			<b>Fichero 1</b>: <input type="file" name="fotos[]"><br>
			<b>Fichero 2</b>: <input type="file" name="fotos[]"><br>
			<b>Fichero 3</b>: <input type="file" name="fotos[]"><br>
			<b>Fichero 4</b>: <input type="file" name="fotos[]"><br><br><br>
			<input type="submit" name="enviar" value="Enviar">
		</form>
	<?}
	
	function almacenarArchivo($archivo,$usuario,$password){
		if($hftp = ftp_connect("localhost")){
			if(ftp_login($hftp, $usuario, $password)){
				if(!ftp_put($hftp,"/Mario/".$archivo['name'],$archivo["tmp_name"])){
					echo "<p style='color: red'>Error al Establecer el Fichero</p>";
				}
				if(!ftp_close($hftp)) echo "<p style='color: red'>Error al Cerrar la Conexión</p>";
			} else {
				echo "<p style='color: red'>Error al Logear el Usuario</p>";
				exit(); 
			}
		} else echo "<p style='color: red'>Error al Establecer la Conexión</p>";
	}
	
	function seleccionarArchivos(&$archivos){
		$min=['size'=>1000000];
		$max=['size'=>0];
		foreach($archivos as $i => $arch){
			if($arch['size']>$max['size']) $max=$arch;
			else if($arch['size']<$min['size']) $min=$arch;
		}
		$archivos=['min'=>$min,'max'=>$max];
	}
	
	function recuperarArchivos($archivos,$usuario,$password){
		$ruta = "C:/Apache24/htdocs/EjerciciosServer/Ejercicio25/archivos/";
		if($hftp = ftp_connect("localhost")){
			if(ftp_login($hftp, $usuario, $password)){
				if(!ftp_get($hftp,$ruta.$archivos['min']['name'],"/Mario/".$archivos['min']['name'],FTP_ASCII)){
					echo "<p style='color: red'>Error al Recuperar el Fichero</p>";
				}
				if(!ftp_get($hftp,$ruta.$archivos['max']['name'],"/Mario/".$archivos['max']['name'],FTP_ASCII)){
					echo "<p style='color: red'>Error al Recuperar el Fichero</p>";
				}
				if(!ftp_close($hftp)) echo "<p style='color: red'>Error al Cerrar la Conexión</p>";
			} else {
				echo "<p style='color: red'>Error al Logear el Usuario</p>";
				exit();
			}
		} else echo "<p style='color: red'>Error al Establecer la Conexión</p>";
	}
	
	function mostrarArchivos($archivos){
		$stlT=' style="border-collapse:collapse; margin:0 auto; text-align:center; width:600px; height:3s00px"';
		$stlH=' style="border:1px solid black; font-size:20px"';
		$stlD=' style="border:1px solid black"';
		$min=urlencode(serialize($archivos['min']));
		$max=urlencode(serialize($archivos['max']));
		echo '<form action="visor.php" method="post" target="_blank" style="text-align:center; margin-top:40px; width:100%">';
		echo "<table".$stlT."><tr><th></th><th".$stlH.">TAMAÑO MÍNIMO</th><th".$stlH.">TAMAÑO MÁXIMO</th></tr>";
		echo "<tr><th".$stlD.">Nombre</th><td".$stlD.">".$archivos['min']['name']."</td><td".$stlD.">".$archivos['max']['name']."</td></tr>";
		echo "<tr><th".$stlD.">Tipo</th><td".$stlD.">".$archivos['min']['type']."</td><td".$stlD.">".$archivos['max']['type']."</td></tr>";
		echo "<tr><th".$stlD.">Tamaño</th><td".$stlD.">".$archivos['min']['size']."</td><td".$stlD.">".$archivos['max']['size']."</td></tr>";
		echo "<tr><th></th><td".$stlD."><input type='submit' name='".$min."' value='Ver'></td>";
		echo "<td".$stlD."><input type='submit' name='".$max."' value='Ver'></td></tr></table></form>";
	}
?>