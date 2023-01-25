<?
	$zip = new ZipArchive();
	$zip->open("TextZip0.zip");
	//$zip->addFile("index.html","miIndex.html");
	echo $zip->getFromIndex(0);
	$zip->close();
	
	echo 'Archivo comprimido con éxito';
?>