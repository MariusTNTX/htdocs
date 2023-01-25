<?
	$SALTO1 = "\r\n";
	$SALTO2 = "\r\n\r\n";

	$destinatario = "molinamario.msc@gmail.com";
	$asunto = "Mensaje alternativo cont exto plano";
	$mensaje = '<html><head><meta charset="UTF-8"><title>Document</title></head><body style="background-color: #ff0000;"><p style="font-family: Arial, Helvetica, sans-serif; width: 10%;">Prueba HTML</p>Cualquier texto</body></html>';
	$responder = "Mario<molinamario.msc@gmail.com>";
	$remitente = "molinamario.msc@gmail.com";

	$separador = "\/\/";

	$cabecera = "Date: ".date('l j F Y, G:i');
	$cabecera.= "From: ".$remitente.$SALTO1;
	$cabecera.= "Cc: ".$remitente.$SALTO1;
	$cabecera.= "Reply-To: ".$responder.$SALTO1;

	//Acaba con un ;
	$cabecera.= "Content-Type: multipart/alternative;".$SALTO1;

	//Comienza por un espacio y termina por doble salto
	$cabecera.= " boundary=$separador".$SALTO2;

	$textoPlano = "--$separador".$SALTO1;
	$textoPlano.= "Content-Type: text/plain; charset=\"ISO-8859-1\"";
	$textoPlano.= "Content-Transfer-Encoding: 7bit".$SALTO2; //Solo los primeros 127 caracteres ASCII
	$textoPlano.= strip_tags(nl2br($mensaje));

	$textoHTML = $SALTO1."--$separador".$SALTO1;
	$textoHTML.= "Content-Type: text/plain; charset=\"ISO-8859-1\"";
	$textoHTML.= "Content-Transfer-Encoding: 7bit".$SALTO2;
	$textoHTML.= $mensaje.$SALTO1;

	$mensaje = $textoPlano.$textoHTML;
	
	$mensaje = strip_tags(nl2br("Esto es un mensaje\nEn dos líneas")); //Retira etiquetas HTML/PHP. Cambia \n por <br>
	$cabecera2 = "MIME-Version: 1.0
	Date: date('l j F Y, G:i')
	From: CursoDAWES <molinamario.msc@gmail.com>
	Reply-To: Mario<molinamario.msc@gmail.com>
	Cc: molinamario.msc@gmail.com
	Bcc: molinamario.msc@gmail.com
	X-Mailer: PHP/"

	//DIE detiene la ejecución del programa como exit, pero éste permite como parámetro un texto que mostrará antes de interrumpir el programa
	if(mail($destinatario,$asunto,$mensaje,$cabecera) or die("No se ha podido enviar el correo")) echo("Correo enviado");
	else echo "No se ha podido enviar el correo";
?>

<!-- smtp.gmail.com
587: STARTLS
alumnosdawes@cifpcuenca.es
oaikqunnhayotcfd -->