<?
	include("../includes/LoginMySql.php");

  try {
    $c=new mysqli($host,$user,$pass,$dbname);
	  echo "Conexión establecida<br><br>";

    $r1 = $c->query("Alter table tabla1 add (foto blob)");
    //Tratamiento de las filas recuperadas
    /* for ($i=1; $r1->num_rows>=$i; $i++){
      $fila=$r1->fetch_row();
      echo $fila[0];
      echo $fila[1]."<br>";
    } */

  } catch (Exception $e) {
    echo "Error al establecer la conexión (Error: ".$c->$errno."): ".$c->$error;
  }

	mysqli_close($c);
?>