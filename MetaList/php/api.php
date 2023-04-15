<?

use PhpMyAdmin\Utils\HttpRequest;

include("oculto.php");
//Evitar Warnings, deprecated y enotived
ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);

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
      //CAMPOS QUE SE BUSCARÁN SIEMPRE CON "LIKE %%"
      $like = ['NomBan','NomAlb','Descrip','Origen','NomCan','NomGen'];
    
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
          //Sacar key, list y order (y almacenar los dos últimos)
          foreach($params as $i => $p){
            if($i=='list') $select = $p;
            else if($i=='order') $order = $p;
            if($i=='key' || $i=='list' || $i=='order') unset($params[$i]);
          }
          $alias = $metadata[$select]['alias'];
          $key = $metadata[$select]['key']['nombre'];
          //Se incluyen los campos de la select en la query
          foreach($metadata[$select]['campos'] as $i => $c){
            array_push($query['select'], array("alias"=>$alias,"nombre"=>$c['nombre'],"salida"=>$c['salida']));
          }
          //Se incluye la tabla en el from
          array_push($query['from'],array("alias"=>$alias,"tabla"=>$select));
          //Se recorren los parámetros
          foreach($params as $param => $content){
            $signo="";
            $content = explode("|",$content);
            //Si param contiene una terminación se extrae y se realizan las modificaciones necesarias
            if(strpos($param,"_")>0){
              $term = strstr($param,"_");
              $param = strstr($param,"_",true);
              if($term == "_Like") foreach($content as $j => $c) $content[$j] = "%".$c."%";
              else if($term == "_Min") $signo=">";
              else if($term == "_Max") $signo="<";
            }
            $campos = $metadata[$select]['campos'];
            //Verificar si param pertenece a la tabla de origen
            if(array_key_exists($param,$campos)){ //Si pertenece
              if(count($content)==1){ //Si solo hay un contenido se añade una condición simple
                array_push($query['where'], array("alias"=>$alias,"filtro"=>$campos[$param]['nombre'],"simbolo"=>$campos[$param]['simbolo'],"contenido"=>$content[0]));
              } else { //Si hay más de un contenido se añade una condición compleja
                array_push($query['where'],[]);
                for($i=0; $i<count($content); $i++){
                  array_push($query['where'][count($query['where'])-1], array("alias"=>$alias,"filtro"=>$campos[$param]['nombre'],"simbolo"=>$campos[$param]['simbolo'],"contenido"=>$content[$i]));
                }
              }
            } else { //Si no pertenece
              $nuevaTabla = $metadata[$select]['filtros'][$param];
              $nuevoAlias = $metadata[$nuevaTabla]['alias'];
              $nuevoCampo = $metadata[$nuevaTabla]['campos'][$param]['nombre'];
              $nuevaSalida = $metadata[$nuevaTabla]['campos'][$param]['salida'];
              //Se añade el nuevo campo a la select
              array_push($query['select'],array("alias"=>$nuevoAlias,"nombre"=>$nuevoCampo,"salida"=>$nuevaSalida));
              //Si no esta añadida la nueva tabla en el from
              if(!in_array(array("alias"=>$nuevoAlias,"tabla"=>$nuevaTabla), $query['from'])){
                //se añade al from
                array_push($query['from'],array("alias"=>$nuevoAlias,"tabla"=>$nuevaTabla));
                //Si el campo key de origen esta en la tabla de destino se añade la condición de agrupación con la clave de origen
                if(array_key_exists($metadata[$select]['key']['entrada'],$metadata[$nuevaTabla]['campos'])){
                  array_push($query['whereGroup'],[array("alias"=>$alias,"filtro"=>$key),array("alias"=>$nuevoAlias,"filtro"=>$key)]);
                } else { //Sino, se añade la condición de agrupación con la clave de destino
                  $nuevaKey = $metadata[$nuevaTabla]['key']['nombre'];
                  array_push($query['whereGroup'],[array("alias"=>$alias,"filtro"=>$nuevaKey),array("alias"=>$nuevoAlias,"filtro"=>$nuevaKey)]);
                }
              }
              //Se añade la condición where normal
              if(count($content)==1){ //Si solo hay un contenido se añade una condición simple
                array_push($query['where'], array("alias"=>$nuevoAlias,"filtro"=>$nuevoCampo,"simbolo"=>$metadata[$nuevaTabla]['campos'][$param]['simbolo'],"contenido"=>$content[0]));
              } else { //Si hay más de un contenido se añade una condición compleja
                array_push($query['where'],[]);
                for($i=0; $i<count($content); $i++){
                  array_push($query['where'][count($query['where'])-1], array("alias"=>$nuevoAlias,"filtro"=>$nuevoCampo,"simbolo"=>$metadata[$nuevaTabla]['campos'][$param]['simbolo'],"contenido"=>$content[$i]));
                }
              }
            }
          }
          //Si hay order se añade al array query
          if($order){
            foreach(explode("|",$order) as $param){
              $tipo="ASC";
              if(strpos($param,"_")>0){
                $term = strstr($param,"_");
                $param = strstr($param,"_",true);
                if($term == "_Desc") $tipo="DESC";
                else if($term == "_Asc") $tipo="ASC";
              }
              $campos = $metadata[$select]['campos'];
              //Verificar si param pertenece a la tabla de origen
              if(array_key_exists($param,$campos)){ //Si pertenece
                array_push($query['order'], array("alias"=>$alias,"filtro"=>$campos[$param]['nombre'],"tipo"=>$tipo));
              } else { //Si no pertenece
                $nuevaTabla = $metadata[$select]['filtros'][$param];
                $nuevoAlias = $metadata[$nuevaTabla]['alias'];
                $nuevoCampo = $metadata[$nuevaTabla]['campos'][$param]['nombre'];
                $nuevaSalida = $metadata[$nuevaTabla]['campos'][$param]['salida'];
                //Se añade el nuevo campo a la select si no está
                if(!in_array(array("alias"=>$nuevoAlias,"nombre"=>$nuevoCampo,"salida"=>$nuevaSalida),$query['select'])){
                  array_push($query['select'],array("alias"=>$nuevoAlias,"nombre"=>$nuevoCampo,"salida"=>$nuevaSalida));
                }
                //Se añade el nuevo campo al order
                array_push($query['order'],array("alias"=>$nuevoAlias,"nombre"=>$nuevoCampo,"tipo"=>$tipo));
                //Si no esta añadida la nueva tabla en el from se añade al from y se añade la condición de agrupación
                if(!in_array(array("alias"=>$nuevoAlias,"tabla"=>$nuevaTabla), $query['from'])){
                  array_push($query['from'],array("alias"=>$nuevoAlias,"tabla"=>$nuevaTabla));
                  //Si el campo key de origen esta en la tabla de destino se añade la condición de agrupación con la clave de origen
                  if(array_key_exists($metadata[$select]['key']['entrada'],$metadata[$nuevaTabla]['campos'])){
                    array_push($query['whereGroup'],[array("alias"=>$alias,"filtro"=>$key),array("alias"=>$nuevoAlias,"filtro"=>$key)]);
                  } else { //Sino, se añade la condición de agrupación con la clave de destino
                    $nuevaKey = $metadata[$nuevaTabla]['key']['nombre'];
                    array_push($query['whereGroup'],[array("alias"=>$alias,"filtro"=>$nuevaKey),array("alias"=>$nuevoAlias,"filtro"=>$nuevaKey)]);
                  }
                }
              }
            }
          }
          //Se forma la consulta SQL
          //SELECT
          $content = "SELECT DISTINCT ";
          $select = $query['select'];
          for($i=0; $i<count($select); $i++){
            $coma = ($i>0) ? ", " : "";
            $content .= $coma.$select[$i]['alias'].".".$select[$i]['nombre']." as ".$select[$i]['salida'];
          }
          //FROM
          $content .= " FROM ";
          $from = $query['from'];
          for($i=0; $i<count($from); $i++){
            $coma = ($i>0) ? ", " : "";
            $content .= $coma.$from[$i]['tabla']." ".$from[$i]['alias'];
          }
          $content .= " WHERE ";
          $whereG = $query['whereGroup'];
          $where = $query['where'];
          //WHERE_GROUP
          for($i=0; $i<count($whereG); $i++){
            $and = ($i>0) ? " AND " : "";
            $content .= $and.$whereG[$i][0]['alias'].".".$whereG[$i][0]['filtro']." = ".$whereG[$i][1]['alias'].".".$whereG[$i][1]['filtro'];
          }
          if(count($whereG)>0 && count($where)>0) $content .= " AND ";
          //WHERE
          for($i=0; $i<count($where); $i++){
            $and = ($i>0) ? " AND " : "";
            if($where[$i][0]['alias']){ //Si es complejo
              $content .= "(";
              for($j=0; $j<count($where[$i]); $j++){
                $or = ($j>0) ? " OR " : "";
                $comillas = ($where[$i][$j]['simbolo']=="LIKE") ? "'" : "";
                $content .= $or.$where[$i][$j]['alias'].".".$where[$i][$j]['filtro']." ".$where[$i][$j]['simbolo']." ".$comillas.$where[$i][$j]['contenido'].$comillas;
              }
              $content .= ")";
            } else { //Si es simple
              $comillas = ($where[$i]['simbolo']=="LIKE") ? "'" : "";
              $content .= $and.$where[$i]['alias'].".".$where[$i]['filtro']." ".$where[$i]['simbolo']." ".$comillas.$where[$i]['contenido'].$comillas;
            }
          }
          //OREDER BY
          if(count($query['order'])>0){
            $content .= " ORDER BY ";
            $order = $query['order'];
            for($i=0; $i<count($order); $i++){
              $coma = ($i>0) ? ", " : "";
              $content .= $coma.$order[$i]['alias'].".".$order[$i]['filtro']." ".$order[$i]['tipo'];
            }
          }
          

          $query['content'] = $content;
          echo json_encode($query);
        } catch(Exception $e){
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
          query($c1, "UPDATE BANDAS SET Pais='".$info['pais']."', Origen='".str_replace("'","\'",$info['origen'])."', NumEscuchasMes=".$info['escuchas'].", Imagen='".$info['imagen']."', Estatus='".$info['estatus']."', Descrip='".str_replace("'","\\'",$info['descrip'])."', LinkWeb='".$info['linkWeb']."', LinkSpotify='".$info['linkSpotify']."' WHERE NomBan='".$info['nombre']."'");

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
            query($c1, "INSERT IGNORE INTO MUSICOS VALUES('".str_replace("'","\'",$mus['nombre'])."','".$mus['imagen']."','".$mus['sexo']."',".$mus['fechaNac']['dia'].",".$mus['fechaNac']['mes'].",".$mus['fechaNac']['anio'].",".$mus['fechaDef']['dia'].",".$mus['fechaDef']['mes'].",".$mus['fechaDef']['anio'].",'".$mus['pais']."','".str_replace("'","\'",$mus['origen'])."')");
            
            //ETAPAS MUSICOS BANDA
            foreach($mus['etapas'] as $j => $eta){
              foreach($eta as $k => $vlr) if($vlr=="" && ($k=='anioInic' || $k=='anioFin')) $eta[$k]="NULL";
              query($c1, "INSERT IGNORE INTO MUSICOS_BANDAS VALUES('".str_replace("'","\'",$mus['nombre'])."','".$info['nombre']."',".$eta['anioInic'].",".$eta['anioFin'].")");
            }
          }
          
          //INFO DISCOGRAFICAS
          foreach($body['discograficas'] as $i => $disc){
            query($c1, "INSERT IGNORE INTO DISCOGRAFICAS VALUES('".str_replace("'","\'",$disc['nombre'])."','".$disc['imagen']."','".$disc['pais']."','".str_replace("'","\'",$disc['origen'])."','".$disc['estatus']."','".$disc['linkWeb']."')");
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
        }

        header("Content-type: application/json; charset=utf-8");
        echo json_encode([200]);
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