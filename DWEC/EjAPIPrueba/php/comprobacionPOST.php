<?php
//función para calcular la letra correspondiente al dni
function LetraNIF ($dni) {
  $posicion= intval($dni%23);
  $letras= "TRWAGMYFPDXBNJZSQVHLCKEO";
//nos quedamos con el valor que encuentra en la posición indicada dentro de la cadena letras
  $letraNif= substr ($letras, $posicion, 1);
  return $letraNif;
}
//*********************************************************
 if (isset($_POST['Enviar'])){
 //comprobamos que el campo nif enviado por el formulario no esté vacío.
   if(empty($_POST['nif'])){
    echo "El campo DNI no puede estar vac&iacute;o.
    <br> <a href='../index.html' title='Volver'>Volver</a>";
   }else{
    $nif=$_POST['nif'];
//Comprobamos longitud para que no sea diferente a 9
    if (strlen($nif) != 9){
      echo "ERROR -1.<br>N&uacute;mero erroneo de caracteres. Tiene que tener 8 n&uacute;meros y una letra.
      <br> <a href='../index.html' title='Volver'>Volver</a>";
     }else{
//tomamos la letra (pasandola a mayúsculas y después los ocho números del dni
       $letra=  strtoupper(substr($nif,-1));
       $dni=substr($nif,0,8);
            
//comprobamos que sean números los primeros 8 caracteres
        if(is_numeric($dni)){
//calculamos la letra del dni introducido mediante la función LetraNIF
          $letraCompr=  LetraNIF($dni);
//comprobamos si la letra introducida por el usuario y la que calcula la función LetraNIF son iguales
           if ($letra==$letraCompr){
              echo "El DNI: ".$dni." es correcto y su letra es ".$letraCompr."
              <br> <a href='../index.html' title='Volver'>Volver</a>";
            }else{
              echo "ERROR -3.<br>La letra ".$letra." introducida no coincide con la que le corresponde al NIF: ".$dni.".
              <br> <a href='../index.html' title='Volver'>Volver</a>";
            }
         }else{
            echo "ERROR -2.<br>Los ocho primeros caracteres tienen que ser n&uacute;meros.
            <br> <a href='../index.html' title='Volver'>Volver</a>";
          }
        }
    
     }
 }
 ?>