<?
include("oculto.php");
//Evitar Warnings, deprecated y enotived
ini_set('error_reporting', E_ALL & ~E_NOTICE & ~E_WARNING & ~E_DEPRECATED);

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
            'albumes'=>'SELECT nomalb as nombre, descrip, imagen, tipoalb as tipo, numalb as numero, enlista, anio, mes, dia, numescuchasmax as escuchas, linkspotify, linkamazon FROM ALBUMES WHERE NomBan LIKE "'.$values[0].'" ORDER BY Anio',
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
            if (!$resp = mysqli_query($c1, 'SELECT nomcan as nombre, estrellas FROM CANCIONES WHERE NomBan LIKE "'.$values[0].'" AND NomAlb LIKE "'.$album['nombre'].'"')){
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