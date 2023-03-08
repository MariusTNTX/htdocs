<?
	//Imprime el formulario inicial
	function imprimirFormulario(){?>
		<h1>Archivos Comprimidos</h1>
		<fieldset>
			<legend>&nbsp;Imagen JPEG&nbsp;</legend>
			<form action="" method="post" enctype="multipart/form-data">
				<br>
				<input type="file" name="img" id="file"><br><br>
				<input type="submit" name="subir" value="Subir" id="subir">
				<input type="submit" name="ver" value="Ver" id="ver"><br>
			</form>
		</fieldset><br><br><br>
	<?}
	
	//Devuelve true si la imagen subida es .JPG o .JPEG
	function esJPEG(){
		return is_numeric(stripos($_FILES['img']['type'],'jp')); 
	}
	
	//Obtiene la primera codificación compatible en el siguiente orden: GZIP, DEFLATE, ZLIB
	function getCodif(){
		$encod = $_SERVER['HTTP_ACCEPT_ENCODING'];
		if(is_numeric(stripos($encod,'gzip'))) return 'gzip';
		else if(is_numeric(stripos($encod,'deflate'))) return 'deflate';
		else if(is_numeric(stripos($encod,'zlib'))) return 'zlib';
	}
	
	//Comprime unos datos según la codificación dada
	function comprimir(&$data, $codif){
		switch($codif){
			case 'gzip': $data = gzencode($data);
				break;
			case 'deflate': $data = gzdeflate($data);
				break;
			case 'zlib': $data = gzcompress($data);
				break;
			default: echo "Error al identificar el tipo de compresión";
		}
	}
	
	//Guarda en el servidor FTP una imagen comprimida con una codificación compatible
	function guardarImagenFTP($user, $pass, $codif){
		//Obtener datos de la imagen temporal
		$fic = fopen($_FILES['img']['tmp_name'],'r');
		$data = fread($fic,$_FILES['img']['size']);
		fclose($fic);
		//Comprimir con una codificación compatible
		comprimir($data, $codif);
		//Sobreescribir información comprimida
		$fic = gzopen($_FILES['img']['tmp_name'],'w');
		gzwrite($fic,$data);
		gzclose($fic);
		//Subir imagen al servidor FTP
		$hftp = ftp_connect("localhost");
		ftp_login($hftp, $user, $pass);
		ftp_put($hftp,"/Mario/imagenes/".$_FILES['img']['name'],$_FILES['img']['tmp_name']);
		ftp_close($hftp);
	}
	
	//Devuelve un array con los nombres de las imagenes comprimidas en el servidor FTP
	function recuperarImagenesFTP($user, $pass){
		//Recuperación del array de ficheros sin procesar
		$hftp = ftp_connect("localhost");
		ftp_login($hftp, $user, $pass);
		$dir = ftp_nlist($hftp,'/Mario/imagenes');	
		ftp_close($hftp);
		//Eliminar [.], [..] y aislar el nombre de la imagen
		foreach($dir as $i => $vlr){
			$dir[$i] = str_replace("_",".",$vlr);
			$dir[$i] = substr($vlr,strrpos($vlr,'/')+1);
		}
		return $dir;
	}
	
	//Muestra las imagenes apiladas en una tabla de máximo 3 columnas
	function mostrarTablaFTP($dir, $codif){
		//Variables básicas
		$pos=1;
		$ruta = "http://localhost/ejerciciosserver/Ejercicio27/visor.php?img=";
		$cod = "&codif=".$codif;
		//Tabla
		echo "<table><h2>Imágenes Almacenadas:</h2>";
		while(count($dir)>0){
			$img = array_shift($dir);
			if($pos%3==1) echo "<tr>";
			//Se envía el nombre de la imagen y su codificación
			echo "<td><a href='".$ruta.$img.$cod."'><img src='".$ruta.$img.$cod."' alt='Imagen de ".$img."'></a></td>";
			if($pos%3==0) echo "</tr>";
			$pos++;
			if($pos>3) $pos=1;
		}
		if($pos>1) echo "</tr>";
		echo "</table>";
	}
?>