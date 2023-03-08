<?
  $zip = new ZipArchive();
  /* $zip->open("compr.zip",ZipArchive::CREATE);
  $zip->addFile('compr_alex.jpg','fotos/c_alex.jpg');
  $zip->addFromString('saludo.txt', 'hola');
  $zip->close(); */
  $zip->open('descarga.zip',ZipArchive::CREATE);
  $zip->extractTo('extraccion','fotos/c_alex.jpg');
  $zip->close();
  /* header("Content-Disposition: attachment; filename=descarga.zip"); */
?>