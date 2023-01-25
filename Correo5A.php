<!-- Con la clase PHPMailer -->
<?
//Incluimos la clase phpmailer para poder instanciar
//un objeto de la misma
	include "includes/class.phpmailer.php";
	//Creamos un objeto de la clase
	$email = new PHPMailer();

//Con PluginDir le indicamos a la clase phpmailer donde se
//encuentra la clase smtp
	$email->PluginDir = "includes/";

//Con la propiedad Mailer le indicamos que vamos a usar un servidor smtp
	$email->Mailer = "smtp";

//Asignamos a Host el nombre de nuestro servidor smtp
//estableciendo protocolo y puerto
	$email->SMTPSecure = "tls";
	$email->Host = "smtp.gmail.com";
	$email->Port = 587;
	//Alternativamente:
		//$email->SMTPSecure = 'tls';
		//$email->Host = "smtp.gmail.com";
		//$email->Port=587;
	//O tambien:
		//$email->Host = "tls://smtp.gmail.com:587";

//Le indicamos que el servidor smtp requiere autenticaci�n
	$email->SMTPAuth = true;

//Le decimos cual es nuestro nombre de usuario y password
	$email->Username = "molinamario.msc@gmail.com"; //alumnosdawes@cifpcuenca.es
	$email->Password = "wziyacgeahimiejh"; //oaikqunnhayotcfd

//Indicamos cual es nuestra direcci�n de correo y el nombre que
//queremos que vea el usuario que lee nuestro correo
/*
  $email->From = "angelmoraj@gmail.com";
	$email->FromName = "Angel";
*/
	$email->From = "molinamario.msc@gmail.com";
	$email->FromName = "Mario";

//Siguiendo recomendaciones del servidor lo establezco a 5 minutos (se establece en segundos)
	$email->Timeout=300;

//Indicamos cual es la direcci�n de destino del correo
	$email->AddAddress("molinamario.msc@gmail.com");

//Asignamos asunto y cuerpo del mensaje
//El cuerpo del mensaje lo ponemos en formato html, haciendo
//que se vea en negrita
	$email->Subject = "Prueba de phpmailer";
	$email->Body = "<b>Mensaje de prueba mandado con phpmailer en formato html</b>";

//Definimos AltBody por si el destinatario del correo no admite email con formato html
	$email->AltBody = "Mensaje de prueba mandado con phpmailer en formato solo texto";

//Enviamos el mensaje
	$exito = $email->Send();

//Si el mensaje no ha podido ser enviado muestra el error recibido del servidor
   if(!$exito){
		echo "Problemas enviando correo electrónico";
		echo "<br/>".$email->ErrorInfo;
   }
   else
		echo "Mensaje enviado correctamente";
?>