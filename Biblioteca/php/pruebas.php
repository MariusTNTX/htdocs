<?
  $tipo='prestamo';
  if($tipo=='reserva') $dias = 7;
  else if($tipo=='prestamo') $dias = 30;

  $fecha = new DateTime("+".$dias." days");
  echo $fecha->format('l: d-m-Y').'<br>';
  if($fecha->format('l')=='Saturday') $fecha->modify("+2 days");
  else if($fecha->format('l')=='Sunday') $fecha->modify("+1 days");
  echo $fecha->format('l: d-m-Y').'<br>';
?>