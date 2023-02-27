<?
//CREDENCIALES (UBICAR EN INCLUDES)
$dbhost="localhost";
$dbuser="root";
$dbpass="admin";
$dbname="BibliotecaMolinaM";

//CAMPOS QUE SE BUSCARÁN SIEMPRE CON "="
$igual = ['alumno','dni','nie','cod_dpto','dni_jfk','a_edicion','soporte_m','usuario','estado','num_prest','fecha_recog','fecha_devol','devuelto','fecha_fin'];

/* S E L E C T S ---------------------------------------------------------------------------------------------------- */
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
      /* $data[$i]['COD_LIBRO'] = substr($data[$i]['COD_LIBRO'], 0, strlen($data[$i]['COD_LIBRO'])-2); */
      array_pop($data[$i]);
    }
  }

  //ALUMNOS
  else if($select=='alumnos'){
    //Se forma la raíz de la consulta
    $consulta = 'SELECT ALUMNO, APELLIDOS, NOMBRE, DNI, NIE FROM ALUMNOS';
    //Se completa la consulta con los filtros corregidos
    foreach($filters as $i => $filt){
      if($i==0) $consulta .= ' WHERE ';
      else $consulta .= ' AND ';
      if(in_array($filt,$igual)) $consulta .= $filt.' = "'.$values[$i].'"';
      else $consulta .= $filt.' LIKE "%'.$values[$i].'%"';
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
  }

  //PROFESORES
  else if($select=='profesores'){
    //Se forma la raíz de la consulta
    $consulta = 'SELECT APELLIDOS, P.NOMBRE AS NOMBRE, DNI, D.NOMBRE AS DEPARTAMENTO FROM PROFESORES P, DEPARTAMENTOS D WHERE P.COD_DPTO=D.COD_DPTO';
    //Se completa la consulta con los filtros corregidos
    foreach($filters as $i => $filt){
      if(in_array($filt,$igual)) $consulta .= ' AND '.$filt.' = "'.$values[$i].'"';
      else $consulta .= ' AND '.$filt.' LIKE "%'.$values[$i].'%"';
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
  }

  //RESERVAS
  else if($select=='reservas'){
    //Se forma la raíz de la consulta
    $consulta = 'SELECT R.COD_LIBRO, FECHA_FIN, TITULO, AUTOR, MATERIA, EDITORIAL, A_EDICION, ESTADO, USUARIO, D.NOMBRE AS DEPARTAMENTO, D.CENTRO FROM RESERVAS R, LIBROS L, DEPARTAMENTOS D WHERE R.COD_LIBRO=L.COD_LIBRO AND L.COD_DPTO=D.COD_DPTO';
    //Se completa la consulta con los filtros corregidos
    foreach($filters as $i => $filt){
      $consulta .= ' AND ';
      if(in_array($filt,$igual)) $consulta .= $filt.' = "'.$values[$i].'"';
      else $consulta .= $filt.' LIKE "%'.$values[$i].'%"';
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
    //Se corrigen las fechas
    foreach($data as $i => $dat){
      $fecha = explode("-",$data[$i]['FECHA_FIN']);
      $fecha = array_reverse($fecha);
      $data[$i]['FECHA_FIN'] = implode("/",$fecha);
    }
  }

  //PRESTAMOS
  else if($select=='prestamos'){
    //Se forma la raíz de la consulta
    $consulta = 'SELECT P.COD_LIBRO, FECHA_DEVOL, DEVUELTO, TITULO, AUTOR, MATERIA, EDITORIAL, A_EDICION, ESTADO, USUARIO, D.NOMBRE AS DEPARTAMENTO, D.CENTRO FROM PRESTAMOS P, LIBROS L, DEPARTAMENTOS D WHERE P.COD_LIBRO=L.COD_LIBRO AND L.COD_DPTO=D.COD_DPTO';
    //Se completa la consulta con los filtros corregidos
    foreach($filters as $i => $filt){
      $consulta .= ' AND ';
      if(in_array($filt,$igual)) $consulta .= $filt.' = "'.$values[$i].'"';
      else $consulta .= $filt.' LIKE "%'.$values[$i].'%"';
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
    //Se corrigen las fechas
    foreach($data as $i => $dat){
      $fecha = explode("-",$data[$i]['FECHA_DEVOL']);
      $fecha = array_reverse($fecha);
      $data[$i]['FECHA_DEVOL'] = implode("/",$fecha);
    }
  }

  //LIBROS_USUARIO
  else if($select=='librosUsuario'){
    //Se forma la raíz de la consulta Reservas
    $consultaR = 'SELECT COD_LIBRO FROM RESERVAS';
    //Se completa la consulta con los filtros corregidos
    foreach($filters as $i => $filt){
      if($i==0) $consultaR .= ' WHERE ';
      else $consultaR .= ' AND ';
      if(in_array($filt,$igual)) $consultaR .= $filt.' = "'.$values[$i].'"';
      else $consultaR .= $filt.' LIKE "%'.$values[$i].'%"';
    }
    //Se forma la raíz de la consulta Prestamos
    $consultaP = 'SELECT COD_LIBRO, DEVUELTO FROM PRESTAMOS';
    //Se completa la consulta con los filtros corregidos
    foreach($filters as $i => $filt){
      if($i==0) $consultaP .= ' WHERE ';
      else $consultaP .= ' AND ';
      if(in_array($filt,$igual)) $consultaP .= $filt.' = "'.$values[$i].'"';
      else $consultaP .= $filt.' LIKE "%'.$values[$i].'%"';
    }
    //Se establece conexión con la BD
    $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
    //Se realiza la consulta de Reservas
    if (!$resp = mysqli_query($c1, $consultaR)){
      echo mysqli_error($c1).'<br>';
      echo 'Consulta: '.$consultaR;
      exit(-1);
    } else {
      $data['reservas'] = mysqli_fetch_all($resp, MYSQLI_ASSOC);
      if($data['reservas'][0]){
        $data['reservas'][0]['COD_LIBRO'] = substr($data['reservas'][0]['COD_LIBRO'],0,strlen($data['reservas'][0]['COD_LIBRO'])-2);
      }
    } 
    //Se realiza la consulta de Prestamos
    if (!$resp = mysqli_query($c1, $consultaP)){
      echo mysqli_error($c1).'<br>';
      echo 'Consulta: '.$consultaP;
      exit(-1);
    } else {
      $data['prestamos'] = mysqli_fetch_all($resp, MYSQLI_ASSOC);
      if($data['prestamos'][0]){
        $data['prestamos'][0]['COD_LIBRO'] = substr($data['prestamos'][0]['COD_LIBRO'],0,strlen($data['prestamos'][0]['COD_LIBRO'])-2);
      }
    }
  }

  //DEVOLUCIÓN DE JSON
  mysqli_close($c1);
  header("Content-type: application/json; charset=utf-8");
  echo json_encode($data);

  /* I N S E R T S ---------------------------------------------------------------------------------------------------- */
} else if(isset($_GET['insert'])){
  $insert = $_GET['insert'];
  $elements = explode("|", $_GET['elements']);
  $values = explode("|", $_GET['values']);

  //RESERVAS
  if($insert == 'reserva'){
    //Se forma la raíz de la consulta
    $insert = 'INSERT INTO RESERVAS (';
    $list = ' VALUES (';
    //Se transforma la fecha
    if(in_array("fecha_fin",$elements)){
      $i = array_search("fecha_fin",$elements);
      $datos = explode("/", $values[$i]);
      $datos = array_reverse($datos);
      $values[$i] = implode("-",$datos);
    }
    //Se completa la consulta con los filtros corregidos
    foreach($elements as $i => $elm){
      if($i!=0){
        $insert .= ',';
        $list .= ',';
      }
      $insert .= $elm;
      $list .= '"'.$values[$i].'"';
    }
    $consulta = $insert.')'.$list.')';
    //Se establece conexión con la BD
    $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
    //Se realiza la consulta
    if (!$resp = mysqli_query($c1, $consulta)){
      echo mysqli_error($c1).'<br>';
      echo 'Consulta: '.$consulta;
      exit(-1);
    }
    //Se almacenan los datos
    $data = ['Insert Exitoso'];
  }

  mysqli_close($c1);
  header("Content-type: application/json; charset=utf-8");
  echo json_encode($data);

  /* D E L E T E S ---------------------------------------------------------------------------------------------------- */
} else if(isset($_GET['delete'])){
  $delete = $_GET['delete'];
  $elements = explode("|", $_GET['elements']);
  $values = explode("|", $_GET['values']);

  //RESERVAS
  if($delete == 'reserva'){
    //Se forma la raíz de la consulta
    $query = 'DELETE FROM RESERVAS WHERE ';
    //Se completa la consulta con los filtros corregidos
    foreach($elements as $i => $elm){
      if($i!=0) $query .= ' AND ';
      if(in_array($elm,$igual)) $query .= $elm.' = "'.$values[$i].'"';
      else $query .= $elm.' LIKE "%'.$values[$i].'%"';
    }
    //Se establece conexión con la BD
    $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
    //Se realiza la consulta
    if (!$resp = mysqli_query($c1, $query)){
      echo mysqli_error($c1).'<br>';
      echo 'Consulta: '.$consulta;
      exit(-1);
    }
    //Se almacenan los datos
    $data = ['Delete Exitoso'];
  }

  mysqli_close($c1);
  header("Content-type: application/json; charset=utf-8");
  echo json_encode($data);

  /* C A L C U L O S ---------------------------------------------------------------------------------------------------- */
} else if(isset($_GET['calc'])){
  $calc = $_GET['calc'];

  //FECHA_RECOGIDA
  if($calc == 'fechaRecogida'){
    $fecha = new DateTime("+7 weekdays");
    $fecha = $fecha->format('d/m/Y');
    $data = [$fecha];
  }
  header("Content-type: application/json; charset=utf-8");
  echo json_encode($data);

} else echo "Error: Se esperaba el parámetro select";
?>