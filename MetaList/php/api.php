<?php

//Evitar problemas de CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization');
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
  header('Access-Control-Allow-Origin: *');
  header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
  header("HTTP/1.1 200 OK");
  die();
}

use PhpMyAdmin\Utils\HttpRequest;

include("calcFechas.php");
//Evitar Warnings, deprecated y enotived
ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);
//Establecer zona horaria española
date_default_timezone_set('Europe/Madrid');

function query($c1, $query){
  //echo "\n\n".$query.";";
  if (!$resp = mysqli_query($c1, $query)){
    echo mysqli_error($c1).'<br>';
    echo 'Consulta: '.$query;
    header("Content-type: application/json; charset=utf-8");
    echo json_encode([500, array(
      "error" => mysqli_error($c1),
      "consulta" => $query,
    )]);
    exit(-1);
  }
  return $resp;
}

if(isset($_GET['key'])){
  if(checkTime($_GET['key']) || $_GET['key']==$apikey){
    try {
      /* S E L E C T S ---------------------------------------------------------------------------------------------------- */
      if(isset($_GET['select'])){
        //ALMACENAMIENTO DE PARÁMETROS
        $select = $_GET['select'];
        $elements = (strlen($_GET['elements'])>0) ? explode("|", $_GET['elements']) : [];
        $values = (strlen($_GET['values'])>0) ? explode("|", $_GET['values']) : [];

        //INFO_BANDA
        if($select=='infoBanda'){
          //Se forma la raíz de la consulta
          $consultas = [
            'info'=>'SELECT NomBan as nombre, pais, origen, numescuchasmes as escuchas, imagen, estatus, descrip, linkweb, linkspotify FROM BANDAS WHERE NomBan LIKE "'.$values[0].'"',
            'albumes'=>'SELECT nomalb as nombre, descrip, imagen, tipoalb as tipo, enlista, anio, mes, dia, numescuchasmax as escuchas, linkspotify, linkamazon FROM ALBUMES WHERE NomBan LIKE "'.$values[0].'" ORDER BY Anio',
            'generos'=>'SELECT nomgen as nombre, estrellas FROM GENEROS_BANDAS WHERE NomBan LIKE "'.$values[0].'"'
          ];
          $data = ['info'=>'','albumes'=>'','generos'=>''];
          //Se establece conexión con la BD
          $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
          
          foreach($consultas as $elm => $cons){
            //Se realiza la consulta
            if (!$resp = mysqli_query($c1, $cons)){
              echo mysqli_error($c1).'<br>';
              echo 'Consulta: '.$consulta;
              exit(-1);
            }
            //Se almacenan los datos
            if($elm=='info') $data[$elm] = mysqli_fetch_all($resp, MYSQLI_ASSOC)[0];
            else $data[$elm] = mysqli_fetch_all($resp, MYSQLI_ASSOC);
          }

          //RECORRER ÁLBUMES ABAJO
          foreach($data['albumes'] as $i => $album){
            if (!$resp = mysqli_query($c1, 'SELECT nomcan as nombre, estrellas FROM CANCIONES_ALBUMES WHERE NomBan LIKE "'.$values[0].'" AND NomAlb LIKE "'.$album['nombre'].'"')){
              echo mysqli_error($c1).'<br>';
              echo 'Consulta: '.$consulta;
              exit(-1);
            } 
            $data['albumes'][$i]['canciones'] = mysqli_fetch_all($resp, MYSQLI_ASSOC);
            if (!$resp = mysqli_query($c1, 'SELECT nomgen as nombre, estrellas FROM GENEROS_ALBUMES WHERE NomBan LIKE "'.$values[0].'" AND NomAlb LIKE "'.$album['nombre'].'"')){
              echo mysqli_error($c1).'<br>';
              echo 'Consulta: '.$consulta;
              exit(-1);
            }
            $data['albumes'][$i]['generos'] = mysqli_fetch_all($resp, MYSQLI_ASSOC);
          }
        }

        //DEVOLUCIÓN DE JSON
        mysqli_close($c1);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
    
      } else if(isset($_REQUEST['list'])){
        // L I S T 
        try{
          include("funcionesSelect.php");
          parse_str($_SERVER['QUERY_STRING'], $params);
          $query = selectToArray($metadata,$conversion,$params);
          //Se establece conexión con la BD
          $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
          $resp = query($c1,$query['content']);
          $response = mysqli_fetch_all($resp,MYSQLI_ASSOC);
          header("Content-type: application/json; charset=utf-8");
          echo json_encode(array("request"=>$query['content'], "response"=>$response));
        } catch(Exception $e){
          header("Content-type: application/json; charset=utf-8");
          echo json_encode(array("error general"=>$e));
        }
      } else if(isset($_REQUEST['insert'])){
        //ALMACENAMIENTO DE PARÁMETROS
        $insert = $_REQUEST['insert'];
        $body = file_get_contents('php://input');
        $body = json_decode($body, true);
        
        // F U L L  B A N D
        if($insert=='fullBand'){
          $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
          //Se inicia en modo Transacción
          mysqli_autocommit($c1, false);
          //INFO BANDA
          $info = $body['info'];
          $info['nombre'] = str_replace("'","\'",$info['nombre']);
          foreach($info as $i => $vlr) if($vlr=="" && $i=='escuchas') $info[$i]="NULL";
          query($c1, "UPDATE BANDAS SET Pais='".$info['pais']."', Origen='".str_replace("'","\'",$info['origen'])."', NumEscuchasMes=".$info['escuchas'].", Imagen='".$info['imagen']."', Estatus='".$info['estatus']."', Descrip='".str_replace("'","\\'",$info['descrip'])."', LinkWeb='".$info['linkWeb']."', LinkSpotify='".$info['linkSpotify']."', FechaIncorp='".date("Y-m-d")."' WHERE NomBan='".$info['nombre']."'");
          //ETAPAS BANDA
          foreach($body['etapas'] as $i => $eta){
            foreach($eta as $j => $vlr) if($vlr=="" && ($j=='anioInic' || $j='anioFin')) $eta[$j]="NULL";
            query($c1, "INSERT IGNORE INTO ETAPAS_BANDAS VALUES('".$info['nombre']."',".$eta['anioInic'].",".$eta['anioFin'].",'".$eta['tipo']."')");
          }
          //TEMAS BANDA
          foreach($body['temas'] as $i => $tema){
            query($c1, "INSERT IGNORE INTO TEMAS_LETRA_BANDAS VALUES('".$info['nombre']."','".str_replace("'","\'",$tema['nombre'])."')");
          }
          //INFO MUSICOS
          foreach($body['musicos'] as $i => $mus){
            foreach($mus['fechaNac'] as $j => $vlr) if($vlr=="" && ($j=='dia' || $j=='mes' || $j=='anio')) $mus['fechaNac'][$j]="NULL";
            foreach($mus['fechaDef'] as $j => $vlr) if($vlr=="" && ($j=='dia' || $j=='mes' || $j=='anio')) $mus['fechaDef'][$j]="NULL";
            query($c1, "INSERT IGNORE INTO MUSICOS VALUES('".str_replace("'","\'",$mus['nombre'])."','".$mus['imagen']."','".$mus['sexo']."',".$mus['fechaNac']['dia'].",".$mus['fechaNac']['mes'].",".$mus['fechaNac']['anio'].",".$mus['fechaDef']['dia'].",".$mus['fechaDef']['mes'].",".$mus['fechaDef']['anio'].",'".$mus['pais']."','".str_replace("'","\'",$mus['origen'])."',0)");
            
            //ETAPAS MUSICOS BANDA
            foreach($mus['etapas'] as $j => $eta){
              foreach($eta as $k => $vlr) if($vlr=="" && ($k=='anioInic' || $k=='anioFin')) $eta[$k]="NULL";
              query($c1, "INSERT IGNORE INTO MUSICOS_BANDAS VALUES('".str_replace("'","\'",$mus['nombre'])."','".$info['nombre']."',".$eta['anioInic'].",".$eta['anioFin'].")");
            }
          }
          //INFO DISCOGRAFICAS
          foreach($body['discograficas'] as $i => $disc){
            query($c1, "INSERT IGNORE INTO DISCOGRAFICAS VALUES('".str_replace("'","\'",$disc['nombre'])."','".$disc['imagen']."','".$disc['pais']."','".str_replace("'","\'",$disc['origen'])."','".$disc['estatus']."','".$disc['linkWeb']."',0)");
          }
          //INFO ESTUDIOS
          foreach($body['estudios'] as $i => $est){
            query($c1, "INSERT IGNORE INTO ESTUDIOS_GRABACION VALUES('".str_replace("'","\'",$est['nombre'])."','".str_replace("'","\'",$est['pais'])."','".str_replace("'","\'",$est['origen'])."')");
          }
          $generos = [];
          //INFO ALBUMES BANDA
          foreach($body['albumes'] as $i => $alb){
            $alb['nombre'] = str_replace("'","\'",$alb['nombre']);
            foreach($alb as $j => $vlr) if($vlr=="" && ($j=='dia' || $j=='mes' || $j=='anio' || $j=='escuchas')) $alb[$j]="NULL";
            query($c1, "UPDATE ALBUMES SET Imagen='".$alb['imagen']."', TipoAlb='".$alb['tipo']."', EnLista='SI', Dia=".$alb['dia'].", Mes=".$alb['mes'].", Anio=".$alb['anio'].", NumEscuchasMax=".$alb['escuchas'].", Descrip='".str_replace("'","\'",$alb['descrip'])."', Duracion=".$alb['duracion'].", LinkSpotify='".$alb['iframe']."', LinkAmazon='".$alb['linkAmazon']."' WHERE NomBan='".$info['nombre']."' AND NomAlb='".$alb['nombre']."'");
            
            //GENEROS ALBUMES (recuento generos banda*)
            foreach($alb['generos'] as $j => $gen){
              if(!in_array($gen['nombre'], $generos)) array_push($generos, $gen['nombre']);
              //foreach($gen as $k => $vlr) if($vlr=="" && ($k=='estrellas')) $gen[$k]="NULL";
              //echo "\n\nINSERT INTO GENEROS_ALBUMES VALUES('".$info['nombre']."','".$alb['nombre']."','".$gen['nombre']."',".$gen['estrellas'].")";
              //query($c1, );
            }
            //ROLES MUSICOS ALBUMES
            foreach($alb['musicos'] as $j => $mus){
              foreach(explode("; ", $mus['roles']) as $k => $rol){
                query($c1, "INSERT IGNORE INTO ROLES_MUSICOS_ALBUMES VALUES('".str_replace("'","\'",$mus['nombre'])."','".$info['nombre']."','".$alb['nombre']."','".$rol."')");
              }
            }
            //DISCOGRAFICAS ALBUMES
            foreach($alb['discograficas'] as $j => $disc){
              query($c1, "INSERT IGNORE INTO DISCOGRAFICAS_ALBUMES VALUES('".$info['nombre']."','".$alb['nombre']."','".str_replace("'","\'",$disc['nombre'])."')");
            }
            //ESTUDIOS ALBUMES
            foreach($alb['estudios'] as $j => $est){
              query($c1, "INSERT IGNORE INTO ESTUDIOS_ALBUMES VALUES('".$info['nombre']."','".$alb['nombre']."','".str_replace("'","\'",$est['nombre'])."')");
            }
            //CANCIONES ALBUMES
            //foreach($alb['canciones'] as $j => $can){
              //echo "\n\nINSERT INTO CANCIONES_ALBUMES VALUES('".$info['nombre']."','".$alb['nombre']."','".$can['nombre']."',".$can['estrellas'].")";
              //query($c1, );
            //}
          }
          //GENEROS BANDA*
          foreach($generos as $i => $gen){
            query($c1, "INSERT IGNORE INTO GENEROS_BANDAS VALUES('".$info['nombre']."','".$gen."',0)");
          }
          //Si no ha habido errores se realiza un commit
          mysqli_commit($c1);

          mysqli_close($c1);
          header("Content-type: application/json; charset=utf-8");
          echo json_encode([200]);

        } else {
        // I N S E R T  G E N É R I C O
          $data = array("request"=>[], "response"=>500);
          try{
            include("funcionesSelect.php");
            $inserts = insertToArray($metadata,$conversion,$insert,$body);
            //Se establece conexión con la BD
            $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
            foreach($inserts as $insert){
              array_push($data['request'],$insert['content']);
              query($c1,$insert['content']);
            }
            $data['response'] = 200;
            mysqli_close($c1);
            header("Content-type: application/json; charset=utf-8");
            echo json_encode($data);
          } catch(Exception $e){
            $data['error'] = $e;
            mysqli_close($c1);
            header("Content-type: application/json; charset=utf-8");
            echo $data;
          }
        }

      } else if(isset($_REQUEST['update'])){
        // U P D A T E  G E N É R I C O
        $update = $_REQUEST['update'];
        $body = file_get_contents('php://input');
        $body = json_decode($body, true);
        $data = array("request"=>[], "response"=>500);
        try{
          include("funcionesSelect.php");
          $updates = updateToArray($metadata,$conversion,$update,$body);
          //Se establece conexión con la BD
          $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
          foreach($updates as $update){
            array_push($data['request'],$update['content']);
            query($c1,$update['content']);
          }
          $data['response'] = 200;
          mysqli_close($c1);
          header("Content-type: application/json; charset=utf-8");
          echo json_encode($data);
        } catch(Exception $e){
          $data['error'] = $e;
          mysqli_close($c1);
          header("Content-type: application/json; charset=utf-8");
          echo $data;
        }
      } else if(isset($_REQUEST['delete'])){
        // D E L E T E  G E N É R I C O
        $delete = $_REQUEST['delete'];
        $body = file_get_contents('php://input');
        $body = json_decode($body, true);
        $data = array("request"=>[], "response"=>500);
        try{
          include("funcionesSelect.php");
          $deletes = deleteToArray($metadata,$conversion,$delete,$body);
          //Se establece conexión con la BD
          $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
          foreach($deletes as $delete){
            array_push($data['request'],$delete['content']);
            query($c1,$delete['content']);
          }
          $data['response'] = 200;
          mysqli_close($c1);
          header("Content-type: application/json; charset=utf-8");
          echo json_encode($data);
        } catch(Exception $e){
          $data['error'] = $e;
          mysqli_close($c1);
          header("Content-type: application/json; charset=utf-8");
          echo $data;
        }
        
      } else if(isset($_REQUEST['setFormData'])){
        // S E T  F O R M  D A T A
        $elemento = $_REQUEST['setFormData'];
        $nombreFotoLocal = $metaliststoragelocal.$_REQUEST['name'];
        $nombreFotoRemota = $metaliststorageremote.$_REQUEST['name'];
        $email = $_REQUEST['id'];
        $data = [array("elemento"=>$elemento, "nombreFotoLocal"=>$nombreFotoLocal, "nombreFotoRemota"=>$nombreFotoRemota, "email"=>$email, "update"=>"UPDATE USUARIOS SET Foto = '".$nombreFotoRemota."' WHERE Email LIKE '".$email."'","archivos"=>$_FILES)];
        if($elemento=='usuarios' && count($_FILES)>0){
          move_uploaded_file($_FILES['foto']['tmp_name'],$nombreFotoLocal);
          $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
          mysqli_query($c1,"UPDATE USUARIOS SET Foto = '".$nombreFotoRemota."' WHERE Email LIKE '".$email."'");
          mysqli_close($c1);
        }
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);

      } else if(isset($_REQUEST['replaceFormData'])){
        // R E P L A C E  F O R M  D A T A
        $elemento = $_REQUEST['replaceFormData'];
        $nombreFotoLocal = $metaliststoragelocal.$_REQUEST['name'];
        $nombreFotoRemota = $metaliststorageremote.$_REQUEST['name'];
        $email = $_REQUEST['id'];
        $data = [array("elemento"=>$elemento, "nombreFotoLocal"=>$nombreFotoLocal, "nombreFotoRemota"=>$nombreFotoRemota, "email"=>$email, "archivos"=>$_FILES)];
        if($elemento=='usuarios' && count(str_split($email))>0 && count($_FILES)>0){
          //Se sube la nueva foto
          move_uploaded_file($_FILES['foto']['tmp_name'],$nombreFotoLocal); 
          //Se obtiene el nombre de la foto anterior
          $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
          $resp = mysqli_query($c1,"SELECT Foto as foto FROM usuarios WHERE Email LIKE '".$email."'");
          $nombreFotoRemota2 = mysqli_fetch_all($resp,MYSQLI_ASSOC)[0]['foto'];
          $data[0]['nombreFotoRemotaAnterior'] = $nombreFotoRemota2;
          $nombreFotoLocal2 = $metaliststoragelocal.substr($nombreFotoRemota2, strrpos($nombreFotoRemota2,"/")+1);
          $data[0]['nombreFotoLocalAnterior'] = $nombreFotoLocal2;
          //Se actualiza la foto en la base de datos
          mysqli_query($c1,"UPDATE USUARIOS SET Foto = '".$nombreFotoRemota."' WHERE Email LIKE '".$email."'");
          mysqli_close($c1);
          //Se elimina la foto anterior de MetaListStorage
          unlink($nombreFotoLocal2);
        }
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);

      } else if(isset($_REQUEST['deleteFormData'])){
        // D E L E T E  F O R M  D A T A
        $elemento = $_REQUEST['deleteFormData'];
        $email = $_REQUEST['id'];
        $data = [array("elemento"=>$elemento, "email"=>$email)];
        if($elemento=='usuarios' && count(str_split($email))>0){
          //Se obtiene el nombre de la foto anterior
          $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
          $resp = mysqli_query($c1,"SELECT Foto as foto FROM usuarios WHERE Email LIKE '".$email."'");
          $nombreFotoRemota = mysqli_fetch_all($resp,MYSQLI_ASSOC)[0]['foto'];
          $nombreFotoLocal = $metaliststoragelocal.substr($nombreFotoRemota, strrpos($nombreFotoRemota,"/")+1);
          $data['nombreFotoEliminada'] = $nombreFotoLocal;
          //Se elimina la foto de la base de datos
          mysqli_query($c1,"UPDATE USUARIOS SET Foto = NULL WHERE Email LIKE '".$email."'");
          mysqli_close($c1);
          //Se elimina la foto anterior de MetaListStorage
          unlink($nombreFotoLocal);
        }
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['sendVerifyEmail'])){
        // S E N D  V E R I F Y  E M A I L
        include("sendVerifyEmail.php");
        $email = $_REQUEST['sendVerifyEmail'];
        $code = $_REQUEST['code'];
        $data = [array("codigo"=>$code, "email"=>$email)];
        if(count(str_split($code))>0 && count(str_split($email))>0) sendVerifyEmail($hostEmail, $email,$code);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['checkPassword'])){
        // C H E C K   P A S S W O R D
        $email = $_REQUEST['email'];
        $pass = urldecode($_REQUEST['checkPassword']);
        $data = [array("pass"=>$pass, "email"=>$email, "verify"=>false, "coincidence"=>true)];
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
        $resp = mysqli_query($c1,"SELECT PassUsu as passusu FROM usuarios WHERE Email LIKE '".$email."'");
        $hash = mysqli_fetch_all($resp,MYSQLI_ASSOC);
        if(count($hash)==1){
          $hash = $hash[0]['passusu'];
          if(password_verify($pass,$hash)) $data[0]["verify"] = true;
        } else $data[0]["coincidence"] = false;
        mysqli_close($c1);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['changePassword'])){
        // U P D A T E   P A S S W O R D
        $oldPass = urldecode($_REQUEST['oldPass']);
        $newPass = urldecode($_REQUEST['newPass']);
        $email = $_REQUEST['changePassword'];
        $data = [array("email"=>$email, "verify"=>false, "coincidence"=>true)];
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
        $resp = mysqli_query($c1,"SELECT PassUsu as passusu FROM usuarios WHERE Email LIKE '".$email."'");
        $hash = mysqli_fetch_all($resp,MYSQLI_ASSOC);
        if(count($hash)==1){
          $hash = $hash[0]['passusu'];
          if(password_verify($oldPass,$hash)){
            $data[0]["verify"] = true;
            $newPass = password_hash($newPass,PASSWORD_DEFAULT);
            mysqli_query($c1,"UPDATE usuarios SET PassUsu = '".$newPass."' WHERE Email LIKE '".$email."'");
          } 
        } else $data[0]["coincidence"] = false;
        mysqli_close($c1);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['sendNewPass'])){
        // S E N D  N E W  P A S S
        include("sendVerifyEmail.php");
        $email = $_REQUEST['sendNewPass'];
        $data = [array("email"=>$email, "coincidence"=>true)];
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
        $resp = mysqli_query($c1,"SELECT NomUsu as nomusu FROM usuarios WHERE Email LIKE '".$email."'");
        $usuario = mysqli_fetch_all($resp,MYSQLI_ASSOC);
        if(count($usuario)==1){
          $usuario = $usuario[0]['nomusu'];
          $password = generateNewPass();
          $data[0]['user'] = $usuario;
          $data[0]['pass'] = $password;
          //Envío del Correo
          sendNewPass($hostEmail, $email, $password, $usuario);
          //Update de la Password
          $password = password_hash($password,PASSWORD_DEFAULT);
          mysqli_query($c1,"UPDATE usuarios SET PassUsu = '".$password."' WHERE Email LIKE '".$email."'");
        } else $data[0]["coincidence"] = false;
        mysqli_close($c1);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['sendAdminMessage'])){
        // S E N D  A D M I N  M E S S A G E
        $asunto = $_REQUEST['asunto'];
        $cabecera = "From: ".$_REQUEST['nombre']."<".$_REQUEST['email'].">\r\nContent-Type: text/html; charset=UTF-8";
        try {
          mail($hostEmail, $asunto, $_REQUEST['mensaje'], $cabecera);
          $data = [200];
        } catch (\Throwable $th) {
          $data = [array("error" => $th)];
        }
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['stats'])){
        // G E T  S T A T S
        $data = [array("bandas"=>0, "albumes"=>0, "usuarios"=>0, "articulos"=>0)];
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
        $resp = mysqli_query($c1,"SELECT COUNT(*) AS num FROM bandas WHERE Pais IS NOT NULL");
        $data[0]["bandas"] = mysqli_fetch_all($resp,MYSQLI_ASSOC)[0]["num"];
        $resp = mysqli_query($c1,"SELECT COUNT(*) AS num FROM albumes WHERE TipoAlb IS NOT NULL");
        $data[0]["albumes"] = mysqli_fetch_all($resp,MYSQLI_ASSOC)[0]["num"];
        $resp = mysqli_query($c1,"SELECT COUNT(*) AS num FROM usuarios WHERE NvlPermisos = 1");
        $data[0]["usuarios"] = mysqli_fetch_all($resp,MYSQLI_ASSOC)[0]["num"];
        $resp = mysqli_query($c1,"SELECT COUNT(*) AS num FROM articulos");
        $data[0]["articulos"] = mysqli_fetch_all($resp,MYSQLI_ASSOC)[0]["num"];
        mysqli_close($c1);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['validateDataBase'])){
        // V A L I D A T E  D A T A  B A S E
        $data = [];
        try {
          $c1=mysqli_connect($dbhost,$dbuser,$dbpass);
          if(!mysqli_query($c1,'use '.$dbname)) $data[] = "NOT-CREATED";
          else $data[] = 200;
          mysqli_close($c1);
        } catch (Exception $e) {
          $data[] = "NO-CONNECTION";
        }
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['restoreList'])){
        // R E S T O R E  L I S T
        $data = scandir($relBackup);
          array_splice($data,0,2);
          foreach($data as $i => $b){
            $fecha = substr($b,7,8);
            $hora = substr($b,15,6);
            $data[$i] = [
              'fecha'=>substr($fecha,6,2).'/'.substr($fecha,4,2).'/'.substr($fecha,0,4),
              'hora'=>substr($hora,0,2).':'.substr($hora,2,2).':'.substr($hora,4,2)
            ];
          }
          $data = array_reverse($data);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['restore'])){
        // R E S T O R E
        $fecha = $_REQUEST['fecha'];
        $fecha = substr($fecha,6,4).substr($fecha,3,2).substr($fecha,0,2);
        $hora = $_REQUEST['hora'];
        $hora = substr($hora,0,2).substr($hora,3,2).substr($hora,6,2);
        $fichero = 'Backup-'.$fecha.$hora.'.sql';
        $ruta = $rutaBackup.$fichero;
        $comando = $comandoRestore.$ruta;
        $data = [array('comando'=>$comando,'resultado'=>exec($comando))];
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['backup'])){
        // B A C K U P
        $fecha = new DateTime();
        $fichero = 'Backup-'.$fecha->format('YmdHis').'.sql';
        $ruta = $rutaBackup.$fichero;
        $comando = $comandoBackup.$ruta;
        $data = [array('comando'=>$comando,'resultado'=>exec($comando))];
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['csvExportTable'])){
        // C S V  E X P O R T  T A B L E
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
        $tabla = $_REQUEST['tabla'];
        $fic = fopen($rutaCSVs.$tabla.".csv", "w");
        mysqli_set_charset($c1, "utf8"); //Establecer la codificación de los datos obtenidos de la BD
        $result = mysqli_query($c1, "SELECT * FROM $tabla");
        $campos = mysqli_fetch_fields($result);
        $columnas = [];
        foreach ($campos as $campo) $columnas[] = $campo->name;
        fputcsv($fic, array_map('utf8_decode', $columnas), ';');
        while ($reg = mysqli_fetch_row($result)){
          fputcsv($fic, array_map('utf8_decode', $reg), ';'); //Decodificación (caracteres especiales)
        }
        fclose($fic);
        mysqli_close($c1);
        header('Content-Type: text/csv');
        $h = 'Content-Disposition: attachment; filename="'.$tabla.'.csv"';
        header($h);
        readfile($rutaCSVs.$tabla.".csv");
        exit;
      } else if(isset($_REQUEST['deleteTable'])){
        // D E L E T E  T A B L E
        $data = [array("status"=>200, "tabla"=>"")];
        $tabla = $_REQUEST['tabla'];
        $data[0]['tabla'] = $tabla;
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
        try {
          mysqli_query($c1,"DELETE FROM $tabla WHERE 1=1");
        } catch (\Throwable $th) {
          $data[0]['status'] = 500;
          $data[0]['error'] = $th;
        }
        mysqli_close($c1);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['createDataBase'])){
        // C R E A T E  D A T A  B A S E
        $data = [array("status"=>200)];
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
        try {
          mysqli_query($c1,"CREATE DATABASE IF NOT EXISTS $dbname");
        } catch (\Throwable $th) {
          $data[0]['status'] = 500;
          $data[0]['error'] = $th;
        }
        mysqli_close($c1);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['dropDataBase'])){
        // D R O P  D A T A  B A S E
        $data = [array("status"=>200)];
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
        try {
          mysqli_query($c1,"DROP DATABASE IF EXISTS $dbname");
        } catch (\Throwable $th) {
          $data[0]['status'] = 500;
          $data[0]['error'] = $th;
        }
        mysqli_close($c1);
        header("Content-type: application/json; charset=utf-8");
        echo json_encode($data);
      } else if(isset($_REQUEST['createViews'])){
        // C R E A T E  V I E W S
        $data = [array("status"=>200)];
        $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die ('Error de conexion a mysql: ' . mysqli_error($c1).'<br>');
        try {
          include 'createViews.php';
        } catch (\Throwable $th) {
          $data[0]['status'] = 500;
          $data[0]['error'] = $th;
        }
        mysqli_close($c1);
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
  } else {
    $data = ["Error: Key no válida"];
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($data);
  }
} else {
  $data = ["Error: Se esperaba el parámetro key"];
  header("Content-type: application/json; charset=utf-8");
  echo json_encode($data);
}
?>