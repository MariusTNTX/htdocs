<!-- Con la clase PHPMailer y utilizando Mercury-->
<?
//Primero hay que incluir la clase phpmailer para poder instanciar
//un objeto de la misma
      require "includes/class.phpmailer.php";

//Instanciamos un objeto de la clase phpmailer al que llamamos
//por ejemplo mail
      $mail = new phpmailer();

//Con PluginDir le indicamos a la clase phpmailer donde se
//encuentra la clase smtp
      $mail->PluginDir = "includes/";

//Asignamos a Host el nombre (IP) de nuestro servidor smtp
      $mail->Host = "localhost";

//Indicamos cual es nuestra direcci�n de correo y el nombre que
//queremos que vea el usuario que lee nuestro correo
      $mail->From = "angelmoraj@gmail.com";
      $mail->FromName = "Angel Mora Jimenez";

//Asignamos asunto y cuerpo del mensaje
//El cuerpo del mensaje lo ponemos en formato html, haciendo
//que se vea en negrita
      $mail->Subject = "Prueba de phpmailer";
      $mail->Body = "<b>Mensaje de prueba mandado con phpmailer  en formato html</b>";

//Definimos AltBody por si el destinatario del correo no admite
//email con formato html
      $mail->AltBody ="Mensaje de prueba mandado con phpmailer en formato texto";

//Indicamos el fichero a adjuntar si el usuario seleccion� uno en el formulario
      $mail->AddAttachment('Koala.jpg','Koala.jpg');

//Indicamos las direcciones de destino
      $mail->AddAddress('angelmoraj@gmail.com');
      $mail->AddAddress('angelmoraj@hotmail.com');

//Enviamos el Correo
    if($mail->Send()) echo "Mensaje con fichero adjunto enviado";
    else echo "<br/>".$email->ErrorInfo;
?>


