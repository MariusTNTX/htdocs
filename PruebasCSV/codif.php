<?
	$frase = "áñéh";
	for($i=0;$i<strlen($frase);$i++) $codigos[]=ord(substr($frase,$i,1));
	?><pre><?=print_r($codigos)?></pre><?
	
	echo "<h1>Caracteres ASCII Normales</h1>";
	for($i=32; $i<=126; $i++) echo $i." => ".chr($i).'<br>';
	
	echo "<h1>Caracteres ASCII Extendidos</h1>";
	for($i=128; $i<=400; $i++) echo $i." => ".utf8_encode(chr($i)).'<br>';
?>