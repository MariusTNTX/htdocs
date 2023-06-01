<?php
  include 'oculto.php';
  $destinatario = "molinamario.msc@gmail.com";
  $asunto = "Mi Asunto";
  $mensaje = "Mi Texto";
  $encabezados = "";
  $encabezados .= "From: MetaList <".$hostEmail.">\r\n";

  echo "Destinatario: $destinatario <br>";
  echo "Asunto: $asunto <br>";
  echo "Mensaje: $mensaje <br>";
  echo "Encabezados: $encabezados <br>";

  try {
    mail($destinatario,$asunto,$mensaje,$encabezados);
    echo "El correo fue enviado correctamente";
  } catch (\Throwable $th) {
    echo "No se ha podido enviar el correo";
  }
?>