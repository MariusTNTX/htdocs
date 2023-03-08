<?
  /* if(!isset($_COOKIE['contador'])){
    setcookie("contador",json_encode(0),time()+3600*24);
    header("location: cookies.php");
  } else {
    echo $_COOKIE['contador'];
    $c = json_decode($_COOKIE['contador']) + 1;
    setcookie("contador",json_encode($c),time()+3600*24);
  } */
  if(isset($_COOKIE['contador'])){
    echo "Cookie ya almacenada: ".print_r(json_decode($_COOKIE['contador']));
  } else {
    echo "almacenando cookie";
    setcookie("contador",json_encode(['hola','adios']),time()+3600*24);
  }
  

?>