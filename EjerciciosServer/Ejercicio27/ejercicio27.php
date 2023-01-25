<html>
<head>
	<style>
		*{text-align:center}
		.error{color:red}
		.warn{color:orange}
		h1{margin:40px}
		fieldset{
			width: fit-content;
			margin: 0 auto;
			border-radius: 20px;
		}
		legend{
			font-weight: bold;
			font-size: 18px;
		}
		#file{margin: 0 auto}
		#subir,#ver{margin:0 15px}
		table{margin: 0 auto}
		td{
			border: 3px solid darkblue;
			background-color: antiquewhite;
			font-weight: bold;
			padding: 5px;
			margin: 3px;
			border-radius: 10px;
			width: 150px;
			height: 50px;
		}
		a{padding: 14px 35px}
		a:hover{color: royalblue}
		img{width: 150px}
	</style>
</head>
<body>
<?
	include_once('funciones.php');
	include_once('C:/Apache24/includes/credenciales.php');
	
	//Impresión del Formulario:
	imprimirFormulario();
	
	//Aciones de los Botones:
	if(isset($_POST['subir']) || isset($_POST['ver'])){
	
		//Almacena una codificación de compresión permitida por el usuario
		$codif = getCodif();
		
		//Botón SUBIR: Guarda la imagen solo si es JPEG, sino muestra un mensaje de error
		if(isset($_POST['subir'])){
			if(esJPEG()) guardarImagenFTP($usuario,$password,$codif);
			else echo "<h2 class='error'>Error: El archivo ".$_FILES['img']['name']." no es una imagen JPG o JPEG</h2>";
			
		//Botón VER: Recupera las imagenes y las visualiza en una tabla
		} else if(isset($_POST['ver'])){
			mostrarTablaFTP(recuperarImagenesFTP($usuario,$password),$codif);
		}
	}
?>
</body>
</html>