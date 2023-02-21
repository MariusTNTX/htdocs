<?
//CREDENCIALES (UBICAR EN INCLUDES)
$dbhost="localhost";
$dbuser="root";
$dbpass="admin";
$dbname="BibliotecaMolinaM";

if(isset($_GET['select'])){
  //ALMACENAMIENTO DE PARÁMETROS
  $select = $_GET['select'];
  $filters = explode("|", $_GET['filters']);
  $values = explode("|", $_GET['values']);
  
  //LIBROS
  if($select=='libros'){
    //Se forma la raíz de la consulta
    $consulta = 'SELECT COD_LIBRO, TITULO, AUTOR, MATERIA, EDITORIAL, A_EDICION, SOPORTE_M, USUARIO, ESTADO, NOMBRE, CENTRO, D.COD_DPTO FROM LIBROS L,DEPARTAMENTOS D WHERE L.COD_DPTO=D.COD_DPTO';
    //Se realizan correcciones sobre los filtros
    $filters = str_replace('cod_dpto', 'D.COD_DPTO', $filters);
    //Se completa la consulta con los filtros corregidos
    foreach($filters as $i => $filt){
      if(strlen($filt)>0) $consulta .= ' AND '.$filt.' LIKE "%'.$values[$i].'%"';
    }
    //Se establece conexión con la BD
    $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
    //Se realiza la consulta
    if (!$resp = mysqli_query($c1, $consulta)){
      echo mysqli_error($c1).'<br>';
      echo 'Consulta: '.$consulta;
      exit(-1);
    }
    //Se almacenan los datos
    $data = mysqli_fetch_all($resp, MYSQLI_ASSOC);
    //Correcciones sobre el array final: Corregir ISBN y Quitar Cod_DPTO
    foreach($data as $i => $d){
      $data[$i]['COD_LIBRO'] = substr($data[$i]['COD_LIBRO'], 0, strlen($data[$i]['COD_LIBRO'])-2);
      array_pop($data[$i]);
    }
  }
  
  //DEVOLUCIÓN DE JSON
  mysqli_close($c1);
  header("Content-type: application/json; charset=utf-8");
  echo json_encode($data);

} else echo "Error: Se esperaba el parámetro select";
?>