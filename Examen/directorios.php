<?
$fic1 = fopen('./fechas.php','r');
$stat = fstat($fic1);
foreach($stat as $i => $st){
  if(strlen(strval($st))==10){
    $stat[$i] = date('d/m/Y H:i:s',$st);
  }
}
?>
<pre><?=print_r($stat)?></pre>
<?
  fclose($fic1);

  if(!file_exists('contador.txt')) file_put_contents('contador.txt','0');

  $cont = fopen('contador.txt','r');
  $num = fread($cont,filesize('contador.txt'));
  echo 'Número de accesos: '.$num;
  $num = intval($num)+1;
  fclose($cont);

  $cont = fopen('contador.txt','w');
  fwrite($cont,$num);
  fclose($cont);
?>