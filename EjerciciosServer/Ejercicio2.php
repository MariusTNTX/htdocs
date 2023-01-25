<!-- 
    2. Crear un script que al llamarlo muestre los siguientes mensajes: 
    - Tu dirección IP es ___
    - Tu ordenador tiene como nombre ___
    - Utilizas lenguaje web ___ (php)
    - Tu microprocesador es ___ 
-->

<?
	echo 'Tu dirección IP es <b>'.gethostbyname(gethostname()).' ('.$_SERVER['REMOTE_ADDR'].')</b><br>';
	echo 'Tu ordenador tiene como nombre <b>'.$_ENV['COMPUTERNAME'].'</b><br>';
	echo 'Utilizas el lenguaje web <b>'.pathinfo("Ejercicio2.php", PATHINFO_EXTENSION).' ('.$_SERVER['SERVER_SOFTWARE'].')</b><br>';
	echo 'Tu microprocesador es <b>'.$_ENV['PROCESSOR_IDENTIFIER'].'</b><br>';
?>
