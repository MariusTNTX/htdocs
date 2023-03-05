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
<body>
  <div class="container-fluid">
<?
  //Verificar formulario doble
  if(isset($_REQUEST['tipo']) && $_REQUEST['tipo']=='Alumnos|Matrículas') $alumnos=true;
  else $alumnos=false;

  //VERIFICAR PARÁMETROS BÁSICOS
  if(isset($_POST['elemento']) && isset($_FILES['csv']) && $_POST['accion']){
    include("calcFechas.php");
    echo '<h2 class="text-center">Resumen del Proceso:</h2><br>';
    //VERIFICAR VALOR DE ELEMENTOS
    if($_POST['elemento']=='Alumnos|Matrículas' || $_POST['elemento']=='Profesores' || 
       $_POST['elemento']=='Departamentos' || $_POST['elemento']=='Libros'){
      $elementos = explode("|",$_POST['elemento']);
      //PREPARACIÓN DEL ARCHIVO CSV
      try { //Almacenar CSVs en temporal
        foreach($elementos as $i => $elm){
          if($i==0) {
            $rutas[$i] = $_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/temp/".$_FILES['csv']['name'];
            move_uploaded_file($_FILES['csv']['tmp_name'],$rutas[$i]);
          } else {
            $rutas[$i] = $_SERVER['DOCUMENT_ROOT'].$rutaBiblio."/Biblioteca/temp/".$_FILES['csvM']['name'];
            move_uploaded_file($_FILES['csvM']['tmp_name'],$rutas[$i]);
          }
          echo '<span class="text-success">Archivo CSV temporal de '.$elm.' creado con éxito</span><br>';
        }
        echo "<br>";
      } catch (Exception $e) {
        echo '<span class="text-danger">Error: No se pudo reubicar adecuadamente el archivo CSV</span>';
        exit(-1);
      }
      try { //Se establece la conexión
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname);
        echo '<span class="text-success">Conexión establecida</span><br><br>';
      } catch (\Throwable $th) {
        echo '<span class="text-danger">Error de conexion a MySQL: ' . mysqli_error($c1).'</span><br><br>';
        exit(-1);
      }
      //VERIFICAR VALOR DE ACCIÓN
      if($_POST['accion']=='sustituir'){
        //HACER DELETE TABLE
        foreach($elementos as $elm){
          if (!mysqli_query($c1,$tablas[$indexTbl[$elm]]['delete'])){
            echo '<span class="text-danger">Error al vaciar la tabla '.$tablas[$indexTbl[$elm]]['name'].': '.mysqli_error($c1).'</span><br><br>';
            exit(-1);
          } else echo '<span class="text-success">Tabla '.$tablas[$indexTbl[$elm]]['name'].' vaciada</span><br>';
        }
        echo "<br>";
      }
      //Se recorren los elementos a procesar
      foreach($elementos as $i => $elm){
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
          echo '<span class="text-success">Registros de la tabla '.$tablas[$indexTbl[$elm]]['name'].' importados con éxito</span><br>';
          fclose($fic);
          try {
            unlink($rutas[$i]);
            echo '<span class="text-success">CSV temporal de '.$elm.' borrado con éxito</span><br><br>';
          } catch (Exception $e) {
            echo '<span class="text-danger">Error al borrar el fichero CSV temporal de '.$elm.'</span><br><br>';
            exit(-1);
          }
        } catch (Exception $e) {
          echo '<span class="text-danger">Error al abrir los ficheros CSV</span><br><br>';
          fclose($fic);
          exit(-1);
        }
      }
      //Liberamos gestor de conexion
      mysqli_close($c1);
      //Regreso a Administración
      echo '<span class="text-success">Registros insertados con éxito.</span><br><br>';
    } else echo '<span class="text-danger">Error: El valor del parámetro elemento no es compatible</span>';
  } else {
?>
    <!-- <pre><?//=print_r($_FILES)?></pre> -->
    <form action="" method="post" enctype="multipart/form-data">
      <input type="hidden" name="elemento" id="elementoAlumMatr" value="<?=$_REQUEST['tipo']?>">
      <label class="form-label" for="csvlumnos"><h3>Fichero CSV de <?if($alumnos) echo 'Alumnos'; else echo $_REQUEST['tipo'];?>:</h3></label>
      <input class="form-control" type="file" name="csv" id="csvlumnos" required>
      <?if($alumnos){?>
      <label class="form-label mt-3" for="csvMatriculas"><h3>Fichero CSV de Matrículas:</h3></label>
      <input class="form-control" type="file" name="csvM" id="csvMatriculas" required>
      <?}?>
      <h3 class="mt-3">Acción:</h3>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="accion" id="anadir" value="anadir" required>
        <label class="form-check-label" for="anadir">Añadir registros sin eliminar los ya existentes</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="accion" id="sustituir" value="sustituir">
        <label class="form-check-label" for="sustituir">Sustituir los antiguos registros por los nuevos</label>
      </div>
      <div class="text-center mt-4"><button type="submit" class="btn btn-primary" id="btnInsertarAltaMAlum">Insertar Registros</button></div>
    </form>
<?}?>

  </div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>
</html>
