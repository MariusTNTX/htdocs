<html>
<head>
	<style>
		*{text-align: center}
		form{
			display: inline-block;
			margin-top: 50px;
		}
		fieldset{
			border-radius: 20px;
			padding: 20px;
		}
		hr{margin: 20px 0}
		.green{color: green}
		.red{color: red}
		.boton{
			cursor: pointer;
			height: 40px;
			weight: 80px;
			color: white;
			border-radius: 10px;
		}
		.backUp{background-color: green}
		.restore{background-color: blue}
		.backUp:hover{
			background-color: lime;
			color: black;
		}
		.restore:hover{
			background-color: aqua;
			color: black;
		}
	</style>
</head>
<body>
	<form action="" method="post" enctype="multipart/form-data">
		<fieldset>
			<legend>&nbsp;<strong>BackUp o Restore</strong>&nbsp;</legend>
			<input type="submit" name="backup" value="BackUp" class="boton backUp">
			<hr>
			<input type="file" name="archivo"><br><br>
			<input type="submit" name="restore" value="Restore" class="boton restore">
		</fieldset><br><br>
	</form><br><br>
	<?
	include("Funciones.php");
	
	if(isset($_POST['backup'])) setBackup();
	
	else if(isset($_POST['restore'])){
		if($_FILES['archivo']['name']!='') setRestore();
		else echo "<h3 class='red'>No se ha seleccionado ningún backup</h3>";
	}
	?>
</body>
</html>
