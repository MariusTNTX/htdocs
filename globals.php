<pre>
<?
	echo '<font size="6"><b>$_ENV</b></font><br>';
	print_r($_ENV);

	setcookie("PHPSESSID","");

	echo '<br><br><font size="6"><b>$_SERVER</b></font><br>';
	print_r($_SERVER);

	echo '<br><br><font size="6"><b>$_COOKIE</b></font><br>';
	print_r($_COOKIE);

	session_start();
	echo '<br><br><font size="6"><b>$_SESSION</b></font><br>';
	print_r($_SESSION);
	session_destroy();
?>
</pre>