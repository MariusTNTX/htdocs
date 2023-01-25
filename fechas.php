<?
	setlocale(LC_TIME, "esp"); //Castellaniza el idioma de salida del strftime
	echo '<b>Fecha</b>: '.date("d/m/Y").'<br>';
	echo '<b>Fecha Completa</b>: Hoy es '.date("l").', '.date("j").' de '.date("F").' de '.date("Y").' y son las '.strftime("%H:%M:%S").'.<br>';
	echo '<b>Día de reyes</b>: '.date("l",mktime(0,0,0,1,6,2023)).'<br>';
	
	echo strftime("Hoy es %A, %e de %B de %Y");
?>