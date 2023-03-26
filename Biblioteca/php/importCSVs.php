<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Biblioteca</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/index.css">
</head>
<body class="bg-dark">
  <div class="container bg-white p-4" id="inicio"><?
		include("calcFechas.php");
		//Evitar Warnings, deprecated y enotived
		ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);

		echo '<h1 class="text-center my-4">Resumen del Proceso: <h1>';
		
		//CREACIÓN DE LA BASE DE DATOS

		//Se establece la conexión
		try {
			$c1 = mysqli_connect($dbhost,$dbuser,$dbpass);
			echo '<span class="text-success">Conexión establecida</span>'.'<br>';
		} catch (Exception $e) {
			echo '<span class="text-danger">Error de conexion a MySQL: ' . mysqli_error($c1).'</span><br><br>';
			exit(-1);
		}
		//Se crea la base de datos si no existe
		if (!mysqli_query($c1,'create database if not exists '.$dbname)){
			echo '<span class="text-danger">Error al crear la base de datos: ' . mysqli_error($c1).'</span><br><br>';
			exit(-1);
		} else echo '<span class="text-success">Base de datos creada</span>'.'<br>';

		//Se usa la base de datos
		if (!mysqli_query($c1,'use '.$dbname)){
			echo '<span class="text-danger">Error al poner en uso la base de datos: ' . mysqli_error($c1).'</span><br><br>';
			exit(-1);
		} else echo '<span class="text-success">Base de datos puesta en uso</span>'.'<br>';

		//Se vacían las tablas en caso de tenerlas
		try {
			foreach($tablas as $tabla) mysqli_query($c1,$tabla['drop']);
			echo '<span class="text-success">Vaciado de tablas garantizado</span>'.'<br><br>';
		} catch (Exception $e) {
			echo '<span class="text-danger">Error al vaciar las tablas: ' . mysqli_error($c1).'</span><br><br>';
			exit(-1);
		}
		
		//CREACIONES E IMPORTACIONES

		foreach($tablas as $tbl){
			//Creamos la tabla destino de los datos
			if (!mysqli_query($c1,$tbl['create'])){
				echo '<span class="text-danger">Error al crear la tabla '.$tbl['name'].': '.mysqli_error($c1).'</span><br><br>';
				exit(-1);
			} else echo '<span class="text-success">Tabla '.$tbl['name'].' creada</span><br>';

			//Importacion de datos desde un fichero a una tabla
			try {
				$fic = fopen($tbl['csv'],'r');
				fgetcsv($fic,0,';');
				if($tbl['name']=='Libros') fgetcsv($fic,0,';');
			} catch (Exception $e) {
				echo '<span class="text-danger">Error al abrir el fichero CSV de '.$tbl['name'].'</span><br><br>';
				exit(-1);
			}

			//Preparación y ejecución de sentencias SQL
			while($reg = fgetcsv($fic,0,';')){
				$stmt = mysqli_prepare($c1,$tbl['insert']);
				switch (strlen($tbl['bind'])) {
					case 3: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2]);
						break;
					case 4: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2], $reg[3]);
						break;
					case 5: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2], $reg[3], $reg[4]);
						break;
					case 6: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2], $reg[3], $reg[4], $reg[5]);
						break;
					case 10: $stmt->bind_param($tbl['bind'], $reg[0], $reg[1], $reg[2], $reg[3], $reg[4], $reg[5], $reg[6], $reg[7], $reg[8], $reg[9]);
						break;
					default: echo utf8_encode('<span class="text-danger">Error en Switch-Bind (Tabla de '.$tbl['name'].'): No existe la opción para importar '.strlen($tbl['bind']).' columnas</span><br><br>');
						exit(-1);
						break;
				}
				if (!$stmt->execute()){
					echo '<span class="text-danger">Error al insertar registros en '.$tbl['name'].': ' . mysqli_error($c1).'</span><br><br>';
					exit(-1);
				}
				$stmt->close();
			}
			echo '<span class="text-success">Registros de la tabla '.$tbl['name'].' importados con éxito</span><br><br>';
			fclose($fic);
		}
		//Liberamos gestor de conexion
		mysqli_close($c1);
		//Regreso a Administración
		echo '<span class="text-success">Biblioteca Inicializada con éxito. Pulse en el siguiente botón para volver a la interfaz de administrador:</span><br><br>';
		echo '<div class="text-center"><a href="../administracion.html"><button class="btn btn-primary btn-lg">Volver a Administración</button></a></div>';
  ?></div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
</html>