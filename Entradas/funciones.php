<?
  function createDB(){
    include("oculto.php");
    $c1 = mysqli_connect($dbhost,$dbuser,$dbpass) or die("Error al conectar con la base de datos");
    if(!mysqli_query($c1,'use entradas')){
      mysqli_query($c1,'create database entradas');
      mysqli_query($c1,'use entradas');
      mysqli_query($c1,'create table entradas(fechaCompra varchar(20) primary key, espacio varchar(20), sesion varchar(20), fila varchar(5), asiento varchar(5));');
    }
    mysqli_close($c1);
  }

  function getAforo(){
    include("oculto.php");
    $espacios = ['patio','platea'];
    $sesiones = ['20:00','22:30'];
    $c1 = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname) or die("Error al conectar con la base de datos");
    foreach($espacios as $i => $e){
      foreach($sesiones as $s){
        $rest=mysqli_query($c1,'select * from entradas where sesion like "'.$s.'" and espacio like "'.$e.'"') or die("Error en el select de entrevistas: ".mysqli_error($c1));
        $info = mysqli_fetch_all($rest,MYSQLI_ASSOC);
        foreach($info as $inf){
          $data[$i][$inf['fila']][$inf['asiento']] = $inf['fechaCompra'];
        }
      }
    }
    mysqli_close($c1);
    echo print_r($data);
    return $data;
  }

  function asignarLoc($array){
    if($array['nom']=='patio' && $array['ses']=='20') $idx=0;
    if($array['nom']=='patio' && $array['ses']=='22') $idx=1;
    if($array['nom']=='platea' && $array['ses']=='20') $idx=2;
    if($array['nom']=='platea' && $array['ses']=='22') $idx=3;
    if($idx<=1){
      $filas=10;
      $columnas=10;
    } else {
      $filas=5;
      $columnas=12;
    }
    //Se recorren las filas
    for($i=0; $i<$filas; $i++){
      //Si en la fila hay x asientos juntos libres se inserta, sino verifica que hay más filas y sube a la de arriba, y sino da error de aforo
      $asientosLib=0;
      for($j=0; $j<$columnas; $j++){
        
      }
    }
    
    
  }
?>