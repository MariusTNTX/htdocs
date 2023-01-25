<?
  if(isset($_POST['enviar'])){

    $cc = $_POST['cc'];
    $bcc = $_POST['bcc'];
    $texto = $_POST['texto'];
    $type = $_FILES['adjunto']['type'];
    $name = $_FILES['adjunto']['name'];
    $tmpName = $_FILES['adjunto']['tmp_name'];

	  $destinatario = $_POST['destinatario'];
    $asunto = $_POST['asunto'];

    $encabezados = "";
    $encabezados .= "From: Mario <molinamario.msc@gmail.com>\r\n";
    if($cc) $encabezados .= "Cc:$cc\r\n";
    if($bcc) $encabezados .= "Bcc:$bcc\r\n";
    $encabezados .= "MIME-Version: 1.0\r\n";
    $encabezados .= "Content-Type: multipart/mixed;";
    $encabezados .= " boundary=\"Separador_de_partes\"";
  
    $mensaje = "";
    $mensaje .= "--Separador_de_partes\r\n";
    $mensaje .= "Content-Type: text/plain; ";
    $mensaje .= "charset=iso-8859-1\r\n ";
    $mensaje .= "Content-Transfer-Encoding: 8bit\r\n";
    $mensaje .= "\r\n";
    $mensaje .= "$texto\r\n";
    $mensaje .= "\r\n";

    $mensaje .= "--Separador_de_partes\r\n";
    $mensaje .= "Content-Type: $type; ";
    $mensaje .= "name=\"$name\"\r\n";
    $mensaje .= "Content-Transfer-Encoding: base64\r\n";
    $mensaje .= "Content-Disposition: inline;";
    $mensaje .= "filename=\"$name\"\r\n";
    $mensaje .= "\r\n";

    $datos = file_get_contents($tmpName);
    $datos = chunk_split(base64_encode($datos));
    $mensaje .= "$datos\r\n";
    $mensaje .= "\r\n";
    $mensaje .= "--Separador_de_partes\r\n";

    mail($destinatario,$asunto,$mensaje,$encabezados) or die("No se ha podido enviar el correo");
    echo "<h1 style='color:green'>Correo enviado correctamente</h1>";
    /* ?><pre><?=print_r($_POST)?></pre><?
    ?><pre><?=print_r($_FILES)?></pre><? */
  } else {
?>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Ejercicio29</title>
  <style>
    form{
      display: flex;
      text-align: center;
      margin: 0 auto;
      justify-content: center;
      margin-top: 50px;
    }
    fieldset{padding: 10px;}
  </style>
</head>
<body>
  <form action="" method="post" enctype="multipart/form-data">
    <fieldset>
      <legend>Nuevo Correo</legend>
      <label for="destinatario">Destinatario: </label>
      <input type="text" name="destinatario" id="destinatario" required><br><br>
      <label for="cc">Cc: </label>
      <input type="text" name="cc" id="cc"><br><br>
      <label for="bcc">Bcc: </label>
      <input type="text" name="bcc" id="bcc"><br><br>
      <label for="asunto">Asunto: </label>
      <input type="text" name="asunto" id="asunto" required><br><br>
      <label for="adjunto">Adjuntos: </label>
      <input type="file" name="adjunto" id="adjunto"><br><br>
      <label for="texto">Texto: </label><br>
      <textarea name="texto" id="texto" cols="30" rows="10" required></textarea><br><br>
      <input type="submit" name="enviar" value="Enviar">
    </fieldset>
  </form>
</body>
</html>

<?}?>