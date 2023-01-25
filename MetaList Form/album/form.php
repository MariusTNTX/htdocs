<?
  if(isset($_GET['submitMus'])){
    parse_str($_SERVER['QUERY_STRING'],$inputs);
    foreach($inputs as $i => $vlr){
      echo "&nbsp;&nbsp;- $i => $vlr<br>";
    }
  }
?>