<?
  function sendVerifyEmail($email, $code){
    $texto = "<html> <head> <meta charset='UTF-8'> <style> .container { text-align: center; padding: 1rem 3rem; background-color: #212529; margin: 3rem auto; border-radius: 0.375rem; width: 70%; max-width: 500px; color: white; box-shadow: 0 1rem 3rem rgba(0,0,0,.5); } .link{ text-decoration: none; color: #dc210e; } hr{ height: .5rem; background-color: #dc210e; margin: 2rem 0; border: 0px solid; border-radius: 0.375rem; } .parr1 { font-size: 1.5rem; margin-bottom: 2rem; text-align: center; } .parr2 { font-size: 1.25rem; margin-bottom: 3rem; } .codigoContainer{margin-bottom: 3rem;} .codigo { letter-spacing: 10px; border: 1px solid #dee2e6; border-radius: 0.375rem; box-shadow: 0 .5rem 1rem rgba(black, .15); font-size: 2.5rem; padding: 0.5rem 0.5rem 0.5rem 1rem; margin-bottom: 1.5rem; text-align: center; background-color: white; color: #212529; } </style> </head> <body> <div class='container'> <hr> <p class='parr1'>! Gracias por confiar en <a href='http://localhost/MetaList/index.html' target='_blank' class='link'>MetaList</a> ! </p> <p class='parr2'>Regresa a la ventana de verificación y pega el siguiente código:</p> <div class='codigoContainer'><b class='codigo'>$code</b></div> <hr> </div> </body> </html>";
	  $destinatario = $email;
    $asunto = "Verifica tu cuenta de MetaList";

    $encabezados = "";
    $encabezados .= "From: MetaList <molinamario.msc@gmail.com>\r\n";
    $encabezados .= "MIME-Version: 1.0\r\n";
    $encabezados .= "Content-Type: multipart/alternative;";
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
    $mensaje .= "Content-Type: text/html; ";
    $mensaje .= "charset=iso-8859-1\r\n ";
    $mensaje .= "Content-Transfer-Encoding: 8bit\r\n";
    $mensaje .= "\r\n";
    $mensaje .= "$texto\r\n";

    /* DESCOMENTAR SI SE VA A ENVIAR SÓLO TEXTO PLANO */
    /* $mensaje .= "\r\n";
    $mensaje .= "--Separador_de_partes\r\n"; */

    mail($destinatario,$asunto,$mensaje,$encabezados) or die("No se ha podido enviar el correo");
  }
  
  function generateNewPass(){
    $specials = ['!','#','$','%','&','/','(',')','=','?','¿','º','@','¡','^','*','+','-','_','.',':',',',';','<','>','ñ','ç'];
    $password = [];
    for($i=0;$i<3;$i++) array_push($password,$specials[rand(0,count($specials)-1)]);
    for($i=0;$i<3;$i++) array_push($password,chr(rand(48,57)));
    for($i=0;$i<3;$i++) array_push($password,chr(rand(65,90)));
    for($i=0;$i<3;$i++) array_push($password,chr(rand(97,122)));
    shuffle($password);
    return implode("",$password);
  }

  function sendNewPass($email, $pass, $user){
    $texto = "<html> <head> <meta charset='UTF-8'> <style> .container { text-align: center; padding: 2rem; background-color: #212529; margin: 3rem auto; border-radius: 0.375rem; width: 70%; max-width: 500px; color: white; box-shadow: 0 1rem 3rem rgba(0,0,0,.5); } .link{ text-decoration: none; color: #dc210e; } .marco{ border: 3px solid #dc210e; border-radius: 0.375rem; padding: .5rem 1rem; } .user{color: #ee371d;} .parr1 { font-size: 1.5rem; margin-bottom: 2rem; text-align: center; } .parr2 { font-size: 1.25rem; margin-bottom: 3rem; } .passContainer{margin-bottom: 3rem;} .pass { letter-spacing: 10px; border: 1px solid #dee2e6; border-radius: 0.375rem; box-shadow: 0 .5rem 1rem rgba(black, .15); font-size: 2rem; padding: 0.5rem 0.5rem 0.5rem 1rem; margin-bottom: 1.5rem; text-align: center; background-color: white; color: #212529; } </style> </head> <body> <div class='container'> <div class='marco'> <p class='parr1'>Hola <span class='user'>$user</span>,</p> <p class='parr2'>Tu contraseña original ha sido sustituida por la siguiente:</p> <div class='passContainer'><b class='pass'>$pass</b></div> <p class='parr2'>Para poder acceder a tu cuenta de nuevo deberás introducir ésta nueva contraseña. Es recomendable modificarla por otra más fácil de recordar una vez que logres iniciar sesión.</p> </div> </div> </body> </html>";
	  $destinatario = $email;
    $asunto = "Nueva contraseña de acceso de MetaList";

    $encabezados = "";
    $encabezados .= "From: MetaList <molinamario.msc@gmail.com>\r\n";
    $encabezados .= "MIME-Version: 1.0\r\n";
    $encabezados .= "Content-Type: multipart/alternative;";
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
    $mensaje .= "Content-Type: text/html; ";
    $mensaje .= "charset=iso-8859-1\r\n ";
    $mensaje .= "Content-Transfer-Encoding: 8bit\r\n";
    $mensaje .= "\r\n";
    $mensaje .= "$texto\r\n";

    /* DESCOMENTAR SI SE VA A ENVIAR SÓLO TEXTO PLANO */
    /* $mensaje .= "\r\n";
    $mensaje .= "--Separador_de_partes\r\n"; */

    mail($destinatario,$asunto,$mensaje,$encabezados) or die("No se ha podido enviar el correo");
  }
?>
