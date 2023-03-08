<?
/*
Un formulario que permita subir y ver imágenes del servidor (solo jpeg) 
btnsubir elegimos la imagen y la subimos, se deben guardar comprimidas 
en el servidor y la opción ver (btn2) mostrara en una tabla html de 3 columnas 
y filas las necesarias, mostrara todas las imágenes (foto) que se han subido hasta el momento.

•	Imágenes en una carpeta y comprimidas, para darle al ver hacer solo un scan (vía ftp o http)
*/
include "C:/Apache24/Externos/usuarios.php";

$arrayfotos=[];
$ruta="/jesus1/imagenes27";
if(isset($_POST['subir'])){
	if($ftp=ftp_connect("localhost")){
		echo "Conexion establecida<br>";
		if(ftp_login($ftp,$usuario,$clave)){
			echo "Datos correctos del usuario<br>";
			
			$tipo=$_FILES['archivo']['type'];
			
			if($tipo=="image/jpeg" || $tipo=="image/jpg"){
				// compresion de la foto

								
				echo "es de la extension correcta<br>";
				//pasos para la compresion				
				
				//leemos el fichero desde la temporal
				$hf=fopen($_FILES['archivo']['tmp_name'],"r");
				
				//comprimimos el contenido
				$datos=gzdeflate(fread($hf,$_FILES['archivo']['size']));
				fclose($hf);
				
				//abrimos el archivo temporal con gzopen para poder comprimirlo despues
				$hgz=gzopen($_FILES['archivo']['tmp_name'],"w");
				//sobreescribimos el archivo temporal
				gzwrite($hgz,$datos);
				gzclose($hgz);
				//lo subimos al servidor
				ftp_put($ftp,$ruta."/".$_FILES['archivo']['name'],$_FILES['archivo']['tmp_name']);
				
				//cerramos el gzopen
				
				echo "<br>archivo comprimido subido<br>";
			}else{
				echo "lo siento solo admitimos los formatos jpeg y jpg";
			}
		}
	}
	ftp_close($ftp);
}

if(isset($_POST['ver'])){
	//recorremos el array que contiene los nombres de los archivos
	?><table>
	<tr><?
	$contenido=scandir("C:/Program Files/FileZilla Server/jesus1/imagenes27/");
	array_splice($contenido,0,2);
	//print_r($contenido);
			foreach($contenido as $valor){
				if($vez==3){
					$vez=0;
				?>
				</tr>
				<tr>
				<?
				}//if
				$enlace="http://localhost/ejercicios/ej27/imagenes.php?imagen=".$valor;
				echo $enlace."<br>";
				?>
				<td>
				<a href="<?echo $enlace?>"> hola<a>
				</td>
				<?
				$vez++;
			}//for
			?>
			</tr>
			</table>
			<?
}
?>

<form action="" method="post" enctype="multipart/form-data">
	Foto: <input type="file" name="archivo"><br>
	<input type="submit" name="subir" value="subir">
	<input type="submit" name="ver" value="ver">
</form>