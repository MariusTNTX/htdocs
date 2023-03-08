<?
  header("refresh: 1; url=fechas.php");
  date_default_timezone_set("Europe/Madrid");
  setlocale(LC_TIME,"esp");
  echo strftime("%A, día %d de %B del %Y, a las %H:%M:%S").'<br>';

  $fecha = new DateTime("+14 days 14:00");
  echo $fecha->format("l, d-m-Y, H:i:s").'<br>';
?>