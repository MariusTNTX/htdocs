<?
  if(isset($_FILES['foto'])){
    header("Content-Type: ".$_FILES['foto']['type']);
    readfile($_FILES['foto']['tmp_name']);
    /* header('Content-Disposition: attachment; filename='.$_FILES['foto']['tmp_name']);  */
  } else {?>
    <form action="" method="post" enctype="multipart/form-data">
      <input type="file" name="foto"><br>
      <input type="submit" value="Enviar">
    </form>
  <?}
?>