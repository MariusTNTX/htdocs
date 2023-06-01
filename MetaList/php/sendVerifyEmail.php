<?php
  function sendVerifyEmail($from, $email, $code){
	ini_set('display_errors', 1);
    error_reporting(E_ALL);

    $texto = "<html> <head> <meta charset='UTF-8'> <style> .container { text-align: center; padding: 1rem 3rem; background-color: rgb(33, 37, 41); margin: 3rem auto; max-width: 500px; color: rgb(255, 255, 255); } hr{ height: 0.5rem; background-color: rgb(220, 33, 14); margin: 2rem 0; border: 0px solid; } .parr1 { font-size: 1.5rem; margin-bottom: 2rem; } .parr2 { font-size: 1.25rem; margin-bottom: 3rem; } .codigoContainer{margin-bottom: 3rem;} .codigo { letter-spacing: 10px; border-radius: 0.375rem; font-size: 2.5rem; padding: 0.5rem 0.5rem 0.5rem 1rem; background-color: rgb(255, 255, 255); color: rgb(33, 37, 41); } </style> </head> <body> <div class='container'> <hr> <p class='parr1'>! Gracias por confiar en MetaList !</p> <p class='parr2'>Regresa a la ventana de verificación y pega el siguiente código:</p> <div class='codigoContainer'><b class='codigo'>$code</b></div> <hr> </div> </body> </html>";

    $to = $email;
    $subject = "Verifica tu cuenta de MetaList";
    
    $salto = "\r\n";

    $headers = "From:".$from.$salto;
    $headers .= "MIME-Version: 1.0".$salto;
    $headers .= "Content-Type: multipart/alternative;"; //"Content-Type: text/html;"
    $headers .= " boundary=Separador_de_partes";

    //$message = $texto;

    $message = "--Separador_de_partes".$salto;
    $message .= "Content-Type: text/plain; ";
    $message .= "charset=iso-8859-1$salto ";
    $message .= "Content-Transfer-Encoding: 8bit".$salto;
    $message .= $salto;
    $message .= "$texto".$salto;
    $message .= $salto;

    $message .= "--Separador_de_partes".$salto;
    $message .= "Content-Type: text/html; ";
    $message .= "charset=iso-8859-1$salto ";
    $message .= "Content-Transfer-Encoding: 8bit".$salto;
    $message .= $salto;
    $message .= "$texto".$salto;
    
    /* DESCOMENTAR SI SE VA A ENVIAR SÓLO TEXTO PLANO */
    /* $mensaje .= "\r\n";
    $mensaje .= "--Separador_de_partes\r\n"; */

/*
    echo "From: $from <br>";
    echo "To: $to <br>";
    echo "Subject: $subject <br>";
    echo "Text: $texto <br>";
    echo "Message: $message <br>";
    echo "Headers: $headers <br><br>";
*/
    try {
      mail($to,$subject,$message,$headers);
      echo "El correo fue enviado correctamente";
    } catch (\Throwable $th) {
      echo "ERROR: No se ha podido enviar el correo";
    }
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

  function sendNewPass($from, $email, $pass, $user){
    ini_set('display_errors', 1);
    error_reporting(E_ALL);
  
    $texto = "<html> <head> <meta charset='UTF-8'> <style> .container { text-align: center; padding: 2rem; background-color: rgb(33, 37, 41); margin: 3rem auto; max-width: 500px; color: rgb(255, 255, 255); } .marco{ border: 3px solid rgb(220, 33, 14); padding: .5rem 1rem; } .user{color: rgb(238, 55, 29);} .parr1 {font-size: 1.5rem;} .parr2 { font-size: 1.25rem; margin-bottom: 3rem; } .passContainer{margin-bottom: 3rem;} .pass { letter-spacing: 10px; border-radius: 0.375rem; font-size: 2rem; padding: 0.5rem 0.5rem 0.5rem 1rem; background-color: rgb(255, 255, 255); color: rgb(33, 37, 41); } </style> </head> <body> <div class='container'> <div class='marco'> <p class='parr1'>Hola <span class='user'>$user</span>,</p> <p class='parr2'>Tu contraseña original ha sido sustituida por la siguiente:</p> <div class='passContainer'><b class='pass'>$pass</b></div> </div> </div> </body> </html>";

    $to = $email;
    $subject = "Nueva contraseña de acceso de MetaList";
    
    $salto = "\r\n";

    $headers = "From:".$from.$salto;
    $headers .= "MIME-Version: 1.0".$salto;
    $headers .= "Content-Type: multipart/alternative;";
    $headers .= " boundary=Separador_de_partes";

    //$message = $texto;

    $message = "--Separador_de_partes".$salto;
    $message .= "Content-Type: text/plain; ";
    $message .= "charset=iso-8859-1$salto ";
    $message .= "Content-Transfer-Encoding: 8bit".$salto;
    $message .= $salto;
    $message .= "$texto".$salto;
    $message .= $salto;

    $message .= "--Separador_de_partes".$salto;
    $message .= "Content-Type: text/html; ";
    $message .= "charset=iso-8859-1$salto ";
    $message .= "Content-Transfer-Encoding: 8bit".$salto;
    $message .= $salto;
    $message .= "$texto".$salto;
    
    /* DESCOMENTAR SI SE VA A ENVIAR SÓLO TEXTO PLANO */
    /* $mensaje .= "\r\n";
    $mensaje .= "--Separador_de_partes\r\n"; */

/*
    echo "From: $from <br>";
    echo "To: $to <br>";
    echo "Subject: $subject <br>";
    echo "Text: $texto <br>";
    echo "Message: $message <br>";
    echo "Headers: $headers <br><br>";
*/
    try {
      mail($to,$subject,$message,$headers);
    } catch (\Throwable $th) {
      echo "ERROR: No se ha podido enviar el correo";
    }
  }
?>
