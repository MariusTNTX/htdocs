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
  <pre><?=print_r($_POST['csv'])?></pre>
  <div class="container bg-white p-4" id="inicio">
    <h1 class="text-center my-4">Resumen del Proceso: <h1><?
    include("calcFechas.php");
    //VERIFICAR PARÁMETROS BÁSICOS
    if(isset(isset($_POST['elemento']) && isset($_POST['csv']) && $_POST['accion'])){
      //VERIFICAR VALOR DE ELEMENTOS
      if($_POST['elemento']=='Alumnos|Matrículas' || $_POST['elemento']=='Alumnos' || 
        $_POST['elemento']=='Departamentos' || $_POST['elemento']=='Libros' || 
        $_POST['elemento']=='Profesores'){
        $elementos = explode("|",$_POST['elemento']);
        //PREPARACIÓN DEL ARCHIVO CSV
        try { //Almacenar CSVs en temporal
          for($elementos as $i => $elm){
            $rutas[$i] = $_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/temp/".$_FILES['csv'.$elm]['name'];
            move_uploaded_file($_FILES['csv'.$elm]['tmp_name'],$rutas[$i]);
          }
        } catch (Exception $e) {
          echo '<span class="text-danger">Error: No se pudo reubicar adecuadamente el archivo CSV</span>';
          exit(-1);
        }
        //Se establece la conexión
        try {
          $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
          echo '<span class="text-success">Conexión establecida</span>'.'<br>';
        } catch (\Throwable $th) {
          echo '<span class="text-danger">Error de conexion a MySQL: ' . mysqli_error($c1).'</span><br><br>';
          exit(-1);
        }
        //VERIFICAR VALOR DE ACCIÓN
        if($_POST['accion']=='sustituir'){
          //HACER DELETE TABLE
          if (!mysqli_query($c1,$c1,$tablas[$indexTbl[$elm]]['delete'])){
            echo '<span class="text-danger">Error al vaciar la tabla '.$tablas[$indexTbl[$elm]]['name'].': '.mysqli_error($c1).'</span><br><br>';
            exit(-1);
          } else echo '<span class="text-success">Tabla '.$tablas[$indexTbl[$elm]]['name'].' vaciada</span><br>';
        }
        //Se recorren los elementos a procesar
        for($elementos as $i => $elm){
          try { //Abrir CSV
            $fic = fopen($rutas[$i],'r');
            fgetcsv($fic,0,';');
            echo '<span class="text-success">Archivo CSV de '.$elm.' abierto</span><br>';
            while($reg = fgetcsv($fic,0,';')){
              $stmt = mysqli_prepare($c1,$tablas[$indexTbl[$elm]]['insert']);
              switch (strlen($tablas[$indexTbl[$elm]]['bind'])) {
                case 3: $stmt->bind_param($tablas[$indexTbl[$elm]]['bind'], $reg[0], $reg[1], $reg[2]);
                  break;
                case 4: $stmt->bind_param($tablas[$indexTbl[$elm]]['bind'], $reg[0], $reg[1], $reg[2], $reg[3]);
                  break;
                case 5: $stmt->bind_param($tablas[$indexTbl[$elm]]['bind'], $reg[0], $reg[1], $reg[2], $reg[3], $reg[4]);
                  break;
                case 6: $stmt->bind_param($tablas[$indexTbl[$elm]]['bind'], $reg[0], $reg[1], $reg[2], $reg[3], $reg[4], $reg[5]);
                  break;
                case 10: $stmt->bind_param($tablas[$indexTbl[$elm]]['bind'], $reg[0], $reg[1], $reg[2], $reg[3], $reg[4], $reg[5], $reg[6], $reg[7], $reg[8], $reg[9]);
                  break;
                default: echo utf8_encode('<span class="text-danger">Error en Switch-Bind (Tabla de '.$tablas[$indexTbl[$elm]]['name'].'): No existe la opción para importar '.strlen($tablas[$indexTbl[$elm]]['bind']).' columnas</span><br><br>');
                  exit(-1);
                  break;
              }
              if (!$stmt->execute() && $_POST['accion']=='sustituir'){
                echo '<span class="text-danger">Error al insertar registros en '.$tablas[$indexTbl[$elm]]['name'].': ' . mysqli_error($c1).'</span><br><br>';
                exit(-1);
              }
              $stmt->close();
            }
            echo '<span class="text-success">Registros de la tabla '.$tablas[$indexTbl[$elm]]['name'].' importados con éxito</span><br><br>';
            fclose($fic);
          } catch (Exception $e) {
            echo '<span class="text-danger">Error al abrir los ficheros CSV</span><br><br>';
            fclose($fic);
            exit(-1);
          }
        }
        //Liberamos gestor de conexion
        mysqli_close($c1);
        //Regreso a Administración
        echo '<span class="text-success">Registros insertados con éxito. Pulse en el siguiente botón para volver a la interfaz de administrador:</span><br><br>';
        echo '<div class="text-center"><a href="../administracion.html"><button class="btn btn-primary btn-lg">Volver a Administración</button></a></div>';
      } else echo '<span class="text-danger">Error: El valor del parámetro elemento no es compatible</span>';
    } else echo '<span class="text-danger">Error: No se indicaron todos los parámetros básicos (accion, elemento y csv)</span>';
  ?></div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
</html>