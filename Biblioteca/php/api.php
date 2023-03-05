<?
include("calcFechas.php");

try {
  //CAMPOS QUE SE BUSCARÁN SIEMPRE CON "="
  $igual = ['alumno','dni','nie','cod_dpto','dni_jfk','a_edicion','soporte_m','usuario','estado','num_prest','fecha_recog','fecha_devol','devuelto','fecha_fin'];

  /* S E L E C T S ---------------------------------------------------------------------------------------------------- */
  if(isset($_GET['select'])){
    //ALMACENAMIENTO DE PARÁMETROS
    $select = $_GET['select'];
    $filters = (strlen($_GET['filters'])>0) ? explode("|", $_GET['filters']) : [];
    $values = (strlen($_GET['values'])>0) ? explode("|", $_GET['values']) : [];
    
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
      $consulta = 'SELECT ALUMNO AS CODIGO, APELLIDOS, NOMBRE, DNI, NIE FROM ALUMNOS';
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
      //Se añade la información sobre matrículas
      $consulta = 'SELECT ESTUDIOS, GRUPO FROM MATRICULAS WHERE ';
      foreach($data as $i => $d){
        $data[$i]['MATRICULAS']=[];
        if (!$resp = mysqli_query($c1, $consulta.'ALUMNO LIKE "'.$d['CODIGO'].'"')){
          echo mysqli_error($c1).'<br>';
          echo 'Consulta: '.$consulta;
          exit(-1);
        } else $data[$i]['MATRICULAS'] = mysqli_fetch_all($resp, MYSQLI_ASSOC);
      }
    }

    //PROFESORES
    else if($select=='profesores'){
      //Se forma la raíz de la consulta
      $consulta = 'SELECT APELLIDOS, P.NOMBRE AS NOMBRE, DNI, D.NOMBRE AS DEPARTAMENTO, P.COD_DPTO AS CODIGO FROM PROFESORES P, DEPARTAMENTOS D WHERE P.COD_DPTO=D.COD_DPTO';
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

    //DEPARTAMENTOS
    else if($select=='departamentos'){
      //Se forma la raíz de la consulta
      $consulta = 'SELECT COD_DPTO AS CODIGO, NOMBRE, CENTRO, DNI_JFK AS DNI, PASSWORD FROM DEPARTAMENTOS';
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

    //LIBROS_ACT_USUARIO
    else if($select=='librosActUsuario'){
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
      $consultaP = 'SELECT COD_LIBRO FROM PRESTAMOS WHERE DEVUELTO="No"';
      //Se completa la consulta con los filtros corregidos
      foreach($filters as $i => $filt){
        $consultaP .= ' AND ';
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
        /* if($data['reservas'][0]){
          $data['reservas'][0]['COD_LIBRO'] = substr($data['reservas'][0]['COD_LIBRO'],0,strlen($data['reservas'][0]['COD_LIBRO'])-2);
        } */
      } 
      //Se realiza la consulta de Prestamos
      if (!$resp = mysqli_query($c1, $consultaP)){
        echo mysqli_error($c1).'<br>';
        echo 'Consulta: '.$consultaP;
        exit(-1);
      } else {
        $data['prestamos'] = mysqli_fetch_all($resp, MYSQLI_ASSOC);
        /* if($data['prestamos'][0]){
          $data['prestamos'][0]['COD_LIBRO'] = substr($data['prestamos'][0]['COD_LIBRO'],0,strlen($data['prestamos'][0]['COD_LIBRO'])-2);
        } */
      }
    }

    //ADMINS
    else if($select=='admins'){
      //Se forma la consulta
      $consulta = 'SELECT P.NOMBRE, P.APELLIDOS, D.DNI_JFK AS DNI, D.NOMBRE AS DEPARTAMENTO, D.CENTRO, PASSWORD FROM DEPARTAMENTOS D, PROFESORES P WHERE DNI_JFK=DNI AND DNI_JFK="'.$values[0].'"';
      //Se establece conexión con la BD
      $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
      //Se realiza la consulta
      if (!$resp = mysqli_query($c1, $consulta)){
        echo mysqli_error($c1).'<br>';
        echo 'Consulta: '.$consulta;
        exit(-1);
      }
      //Se verifica la contraseña indicando toda la información necesaria
      $data = mysqli_fetch_all($resp, MYSQLI_ASSOC);
      if(count($data)==1 && password_verify($values[1], $data[0]['PASSWORD'])){
        if($data[0]['DEPARTAMENTO']=='ADMINISTRACIÓN') $data[0]['TIPO']='admin';
        else $data[0]['TIPO']='jfk';
        unset($data[0]['PASSWORD']);
      } else $data=[];
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

    //ALUMNOS
    if($insert == 'alumno'){
      //Se forma la raíz de la consulta
      $insert = 'INSERT INTO ALUMNOS (';
      $list = ' VALUES (';
      //Se completa la consulta con los filtros
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

    //MATRICULAS
    if($insert == 'matricula'){
      //Se forma la raíz de la consulta
      $insert = 'INSERT INTO MATRICULAS (';
      $list = ' VALUES (';
      //Se completa la consulta con los filtros
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

    //PROFESORES
    if($insert == 'profesor'){
      //Se forma la raíz de la consulta
      $insert = 'INSERT INTO PROFESORES (';
      $list = ' VALUES (';
      //Se completa la consulta con los filtros
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

    //DEPARTAMENTOS
    if($insert == 'departamento'){
      //Se establece conexión con la BD
      $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
      //Se obtiene el nuevo código de departamento y se añade la información
      !$resp = mysqli_query($c1, 'SELECT * FROM DEPARTAMENTOS');
      $cods = mysqli_fetch_all($resp, MYSQLI_ASSOC);
      array_push($elements,'cod_dpto');
      array_push($values,count($cods));
      //Se forma la raíz de la consulta
      $insert = 'INSERT INTO DEPARTAMENTOS (';
      $list = ' VALUES (';
      //Se completa la consulta con los filtros
      foreach($elements as $i => $elm){
        if($i!=0){
          $insert .= ',';
          $list .= ',';
        }
        $insert .= $elm;
        $list .= '"'.$values[$i].'"';
      }
      $consulta = $insert.')'.$list.')';
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

    /* U P D A T E S ---------------------------------------------------------------------------------------------------- */
  } else if(isset($_GET['update'])){
    $update = $_GET['update'];
    $id = $_GET['id'];
    $elements = explode("|", $_GET['elements']);
    $values = explode("|", $_GET['values']);

    //ALUMNOS
    if($update == 'alumno'){
      //Se forma la raíz de la consulta
      $query = 'UPDATE ALUMNOS SET ';
      //Se completa la consulta con los filtros corregidos
      foreach($elements as $i => $elm){
        if($i!=0) $query .= ', ';
        $query .= $elm.' = "'.$values[$i].'"';
      }
      $query .= ' WHERE DNI LIKE "'.$id.'"';
      //Se establece conexión con la BD
      $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
      //Se realiza el update
      if (!$resp = mysqli_query($c1, $query)){
        echo mysqli_error($c1).'<br>';
        echo 'Consulta: '.$consulta;
        exit(-1);
      }
      if($resp) $data = ['Update sin Errores'];
    }

    //PROFESORES
    if($update == 'profesor'){
      //Se forma la raíz de la consulta
      $query = 'UPDATE PROFESORES SET ';
      //Se completa la consulta con los filtros corregidos
      foreach($elements as $i => $elm){
        if($i!=0) $query .= ', ';
        $query .= $elm.' = "'.$values[$i].'"';
      }
      $query .= ' WHERE DNI LIKE "'.$id.'"';
      //Se establece conexión con la BD
      $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
      //Se realiza el update
      if (!$resp = mysqli_query($c1, $query)){
        echo mysqli_error($c1).'<br>';
        echo 'Consulta: '.$consulta;
        exit(-1);
      }
      if($resp) $data = ['Update sin Errores'];
    }

    //MATRICULAS
    if($update == 'matricula'){
      //Se forma la raíz de la consulta
      $query = 'UPDATE MATRICULAS SET ';
      //Se completa la consulta con los filtros corregidos
      foreach($elements as $i => $elm){
        if($i!=0) $query .= ', ';
        $query .= $elm.' = "'.$values[$i].'"';
      }
      $id = explode("|", $id);
      $query .= ' WHERE ALUMNO LIKE "'.$id[0].'" AND GRUPO LIKE "'.$id[1].'"';
      //Se establece conexión con la BD
      $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
      //Se realiza el update
      if (!$resp = mysqli_query($c1, $query)){
        echo mysqli_error($c1).'<br>';
        echo 'Consulta: '.$consulta;
        exit(-1);
      }
      if($resp) $data = ['Update sin Errores'];
    }

    //DEPARTAMENTOS
    if($update == 'departamento'){
      //Se forma la raíz de la consulta
      $query = 'UPDATE DEPARTAMENTOS SET ';
      //Se completa la consulta con los filtros corregidos
      foreach($elements as $i => $elm){
        if($i!=0) $query .= ', ';
        $query .= $elm.' = "'.$values[$i].'"';
      }
      $query .= ' WHERE COD_DPTO LIKE "'.$id.'"';
      //Se establece conexión con la BD
      $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
      //Se realiza el update
      if (!$resp = mysqli_query($c1, $query)){
        echo mysqli_error($c1).'<br>';
        echo 'Consulta: '.$query;
        exit(-1);
      }
      if($resp) $data = ['Update sin Errores'];
    }

    mysqli_close($c1);
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($data);

    /* D E L E T E S -------------------------------------------------------------------------------------------------------------- */
  }else if(isset($_GET['delete'])){
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

    //ALUMNOS
    if($delete == 'alumno'){
      //Se forma la raíz de la consulta
      $query = 'DELETE FROM ALUMNOS WHERE ';
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

    //PROFESORES
    if($delete == 'profesor'){
      //Se forma la raíz de la consulta
      $query = 'DELETE FROM PROFESORES WHERE ';
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

    //MATRICULAS
    if($delete == 'matricula'){
      //Se forma la raíz de la consulta
      $query = 'DELETE FROM MATRICULAS WHERE ';
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

    //DEPARTAMENTOS
    if($delete == 'departamento'){
      //Se forma la raíz de la consulta
      $query = 'DELETE FROM DEPARTAMENTOS WHERE ';
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
        echo 'Consulta: '.$query;
        exit(-1);
      }
      //Se almacenan los datos
      $data = ['Delete Exitoso'];
    }

    mysqli_close($c1);
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($data);

    /* C A L C U L O S -------------------------------------------------------------------------------------------------------------- */
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

  /* V E R I F I C A C I O N E S ---------------------------------------------------------------------------------------------------- */
  } else if(isset($_GET['exists'])){
    $param = $_GET['exists'];

    //DATABASE
    if(strtolower($param) == strtolower($dbname)){
      //Se comprueba la conexión y la base de datos
      try {
        $c1=mysqli_connect($dbhost,$dbuser,$dbpass);
        if(!mysqli_query($c1,'use '.$dbname)) $data['STATUS'] = "NOT-CREATED";
        else $data['STATUS'] = "OK";
        mysqli_close($c1);
      } catch (Exception $e) {
        $data['STATUS'] = "NO-CONNECTION";
      }
    } else $data['STATUS'] = "NO-DATABASE";
    
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($data);

    /* C O P I A S   D E   S E G U R I D A D ---------------------------------------------------------------------------------------------------- */
  } else if(isset($_GET['dbaction'])){
    $param = $_GET['dbaction'];

    //BACKUP
    if($param == 'backup'){
      $fecha = new DateTime();
      $fichero = 'Backup-'.$fecha->format('YmdHis').'.mysql';
      $ruta = $rutaBackup.$fichero;
      $comando = $comandoBackup.$ruta;
      $data = [exec($comando,$output,$status)];
    }

    //RESTORE
    else if($param == 'restore'){
      $fecha = $_GET['date'];
      $fecha = substr($fecha,6,4).substr($fecha,3,2).substr($fecha,0,2);
      $hora = $_GET['hour'];
      $hora = substr($hora,0,2).substr($hora,3,2).substr($hora,6,2);
      $fichero = 'Backup-'.$fecha.$hora.'.mysql';
      $ruta = $rutaBackup.$fichero;
      $comando = $comandoRestore.$ruta;
      $data = [exec($comando,$output,$status)];
    }

    //RESTORELIST
    else if($param == 'restorelist'){
      $data = scandir($relBackup);
      array_splice($data,0,2);
      foreach($data as $i => $b){
        $fecha = substr($b,7,8);
        $hora = substr($b,15,6);
        $data[$i] = [
          'FECHA'=>substr($fecha,6,2).'/'.substr($fecha,4,2).'/'.substr($fecha,0,4),
          'HORA'=>substr($hora,0,2).':'.substr($hora,2,2).':'.substr($hora,4,2)
        ];
      }
      $data = array_reverse($data);
    }

    header("Content-type: application/json; charset=utf-8");
    echo json_encode($data);

  } else {
    $data = ["Error: Se esperaba el parámetro principal"];
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($data);
  }
} catch (Exception $e) {
  if(isset($c1)) mysqli_close($c1);
  header("Content-type: application/json; charset=utf-8");
  $data=[];
  echo json_encode($data);
}
?>