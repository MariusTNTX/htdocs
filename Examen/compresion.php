<?
if(isset($_POST['envio3'])){
  /* echo print_r($_FILES); */
  $file = $_FILES['foto2']['name'];
  $type = $_FILES['foto2']['type'];
  move_uploaded_file($_FILES['foto2']['tmp_name'],$file);
  header('Content-Encoding: gzip');
  header('Content-Type: '.$type);
  readgzfile($file);
} else {
  if(isset($_POST['envio1'])){
    $file = 'compr_'.$_FILES['foto1']['name'];
    move_uploaded_file($_FILES['foto1']['tmp_name'],$file);
    $fic = fopen($file,'r');
    $data = fread($fic,filesize($file));
    fclose($fic);
    unlink($file);
    $data = gzencode($data);
    $fic = gzopen($file,'w');
    gzwrite($fic,$data);
    gzclose($fic);
  } else if(isset($_POST['envio2'])){
    $file = substr($_FILES['foto2']['name'],6);
    move_uploaded_file($_FILES['foto2']['tmp_name'],$file);
    $fic = gzopen($file,'r');
    $data = gzread($fic,filesize($file));
    gzclose($fic);
    $data = gzdecode($data);
    $fic = fopen($file,'w');
    fwrite($fic,$data);
    fclose($fic);
  }
?>

<form action="" method="post" enctype="multipart/form-data">
  <input type="file" name="foto1"><br>
  <input type="submit" name="envio1" value="Comprimir"><br>
  <br><br>
  <input type="file" name="foto2"><br>
  <input type="submit" name="envio2" value="Descomprimir"><br>
  <input type="submit" name="envio3" value="Ver comprimido"><br>
</form>

<?}?>