<?
if(isset($_GET['select'])){
  $select = $_GET['select'];
  if(isset($_GET['filters']) && isset($_GET['values'])){
    $filters = $_GET['filters'];
    $values = $_GET['values'];
    //Hacer Select y almacenar response
    //Recorrer response y almacenar resultados en un array
    //Transformar a JSON
  } else echo "Error: Se esperaban los parámetros filters y values después de select";
}
?>