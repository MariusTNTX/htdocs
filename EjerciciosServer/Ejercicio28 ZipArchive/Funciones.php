<?
	function setBackup(){
		$fec = new DateTime();
		$tiempo = $fec->format('d-m-Y_H-i-s');
		$nombre = "backup_$tiempo.zip";

		$zip = new ZipArchive();
		$zip->open($nombre,ZipArchive::CREATE);
		anadir($zip,'Proyecto');
		$zip->close();
		echo "<h3 class='green'>Backup creado con éxito</h3>";
		//descargar($nombre);
	}
	
	function anadir($zip, $ruta){
		if(filetype($ruta)=='file') $zip->addFile($ruta);
		else{
			$lista = array_splice(scandir($ruta),2);
			if(count($lista)==0) $zip->addEmptyDir($ruta);
			else foreach($lista as $vlr) anadir($zip,$ruta.'/'.$vlr);
		}
	}
	
	function descargar($archivo){
		$comando = "Content-Disposition: attachment; filename=".$archivo;
		header($comando);
		readfile($archivo);
		unlink($archivo);
	}
	
	function setRestore(){
		$rutaZip = $_FILES['archivo']['name'];
		$zip = new ZipArchive();
		$zip->open($rutaZip);
		$zip->extractTo('.');
		$zip->close();
		echo "<h3 class='green'>Archivos restaurados con éxito</h3>";
	}
?>