<center>
<form enctype="multipart/form-data" action="" method="post">
    <h2>Imagen (formato jpeg): </h2>
    <input type="file" name="archivo"><br><br>
    <input type="submit" name="btnSubir" value="Subir imagen"><br><br><br>
    <input type="submit" name="btnMostrar" value="Mostrar imagenes">
</form>
</center>
<?php
/*
Ejercicio 27:

Tendremos un formulario, que nos permita subir (Se guardaran en un servidor HTTP, no FTP) y ver imagenes del servidor, unicamente del formato jpeg
La imagen que se intente subir, y no sea de ese formato, la rechazará
Las imagenes deben guardarse comprimidas, en el servidor
La opción VER, mostrará, en una tabla HTML, de tres columnas, y las filas que sean necesarias, 
todas las imagenes que haya subido hasta el momento

Las imagenes se deben guardar dentro de una carpeta, para que a la hora de pulsar ver, se "escanee" esa carpeta
http://iespmercedescuenca.ddns.net:81/Informatica/AlvarezAI
*/

include_once "C:/Apache24/includes/CredencialesFTP.php";//Archivo donde esta el usuario y la contraseña del servidor FTP

if (isset($_POST['btnMostrar'])){//Si se ha pulsado el boton Mostrar
    //Compruebo que el navegador admita comprimidos en formato deflate
    $admitidos=explode(", ", $_SERVER['HTTP_ACCEPT_ENCODING']);
    if (in_array("deflate", $admitidos)){//Si admite el metodo deflate
        if ($hftp=ftp_connect("localhost")){//Abro la conexión al servidor FTP
            if (ftp_login($hftp,$usuario,$clave)){//Inicio de sesión, usando el usuario y contraseña de CredencialesFTP.php
                $ruta="/ana/imagenes";//Ruta donde están los archivos
                $contenido=ftp_nlist($hftp,$ruta);//Leo el contenido del directorio, que se guarda en un array (los nombres)
                //Recorro el array, obteniendo el nombre del fichero y mostrando su contenido
                foreach($contenido as $clave=>$valor){
					$contenido[$clave] = substr($valor,strrpos($valor,'/')+1);
                    ?>
                    <img src="imagenes.php?imagen=<?=$contenido[$clave]?>" alt="<?=$contenido[$clave]?>" width="100px" height="100px"/>
                    <?
                }
            }else{
                echo "No se ha podido identificar al usuario<br>";
            }
        }else{
            echo "No se ha podido establecer la conexión con el servidor";
        }
    }else{
        echo "Este navegador no admite este tipo de archivo<br>";
    }
}
if (isset($_POST['btnSubir'])){//Si se ha pulsado el botón subir
    if ($hftp=ftp_connect("localhost")){//Conexión al servidor FTP
        if (ftp_login($hftp,$usuario,$clave)){//Inicio de sesión, usando el usuario y contraseña de CredencialesFTP.php
            //Compruebo el formato del archivo dado, y si no es jpeg, muestro mensaje de error
            if ($_FILES['archivo']['type']=='image/jpeg'){
				if ($archivoAbierto=fopen($_FILES['archivo']['tmp_name'],"r")){//Abre el archivo seleccionado
					/*
					Con gzdeflate comprimo la cadena que devuelve la función fread, al nivel de compresión indicado

					La función fread devuelve el contenido del archivo abierto con fopen
					En este caso todo el contenido (indicado con el segundo parámetro)
					*/
					$datos=gzdeflate(fread($archivoAbierto, $_FILES['archivo']['size']), 9);
					fclose($archivoAbierto);
				}else{
					echo "No se ha podido abrir el archivo especificado.<br>";//Mensaje de control
				}
                if ($hgz=gzopen($_FILES['archivo']['tmp_name'], "w")){//Devuelve un puntero en el archivo gz seleccionado, con el modo indicado
                    //En el puntero gz abierto arriba, escribo el contenido comprimido
					gzwrite($hgz,$datos);
					gzclose($hgz);
					//Muevo el archivo comprimido al servidor
					if (ftp_put($hftp,'/ana/imagenes/'.$_FILES['archivo']['name'],$_FILES['archivo']['tmp_name'])){
						echo "Archivo subido con exito<br>";
					}
                }else{
                    echo "No se ha podido abrir el archivo gz<br>";//Mensaje de control
                }
            }else{
                echo "<span style='color:red'>El formato de archivo no es válido</span><br>";
            }
        }else{
            echo "No se ha podido identificar al usuario";//Mensaje de control
        }
        ftp_close($hftp);//Cierro la conexión
    }else{
        echo "No se ha podido establecer la conexión";//Mensaje de control
    }
}

?>

<!--
ERRORES: 

 - En el formulario el tipo file estaba sin comillas.
 
 - La ruta del servidor FTP era absoluta, debe empezar por "/Ana" para 
   que funcione en todos los equipos.
   
 - Has usado scandir para obtener una lista de archivos del servidor ftp 
   como si fuese http. En este caso es más aconsejable usar ftp_nlist(), 
   que devuelve lo mismo sin . ni .., pero cada valor será una ruta 
   relativa en vez de solo su nombre, por lo que debe eliminarse el trozo 
   de ruta dejando solo el nombre de cada fichero. Eso se puede hacer en 
   el propio forecah que usas para imprimir.
   
 - En botonMostrar has abierto en primer lugar el archivo temporal en 
   modo 'w', por lo que has eliminado todo su contenido antes de poder 
   leerlo. Se debe abrir en modo 'r' normal para leer y almacenar su 
   contenido, y después abrirlo en modo 'w' para escribirle el contenido 
   almacenado previamente de forma comprimida.
   
 - Es aconsejable que el String obtenido de la lectura de un archivo no 
   se llame "archivo" porque puede confundirse más tarde con una ruta o 
   con un nombre de archivo, cuando en realidad es un conjunto de 
   caracteres ASCII.
   
 - Es importante cerrar tanto el fopen() como el gzopen() justo después 
   de haber realizado las acciones imprescindibles con dicho archivo.
-->