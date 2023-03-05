<?
  if(isset($_GET['action'])){
    if($_GET['action']=='backup'){
      /* B A C K U P */
      $fecha = new DateTime();
      $fichero = 'Backup-'.$fecha->format('YmdHis').'.mysql';
      $ruta = '/volume1/web/Informatica/MolinaM/Biblioteca/'.$fichero;
      $comando = '/volume1/@appstore/MariaDB10/usr/local/mariadb10/bin/mysqldump --opt -h localhost -u root --password="1234" BibliotecaMolinaM > '.$ruta;
      switch(exec($comando,$output,$status)){
        case 0: echo "Exportación realizada con éxito (código 0) en la ruta: ".$ruta; break;
        case 1: echo "Error al exportar (código 1)"; break;
        case 2: echo "Error al exportar (código 2)"; break;
      }
      echo "<br>OUTPUT:<br>";
      ?><pre><?=print_r($output)?></pre><?
      echo "<br>STATUS: ".$status;
    } else if($_GET['action']=='restore'){
      if(isset($_GET['file'])){
        /* R E S T O R E */
        $fichero = $_GET['file'];
        $ruta = '/volume1/web/Informatica/MolinaM/Biblioteca/'.$fichero;
        $comando = '/volume1/@appstore/MariaDB10/usr/local/mariadb10/bin/mysql -u root --password="1234" BibliotecaMolinaM < '.$ruta;
        switch(exec($comando,$output,$status)){
          case 0: echo "Importación realizada con éxito (código 0) desde la ruta: ".$ruta; break;
          case 1: echo "Error al importar (código 1)"; break;
          case 2: echo "Error al importar (código 2)"; break;
        }
        echo "<br>OUTPUT:<br>";
        ?><pre><?=print_r($output)?></pre><?
        echo "<br>STATUS: ".$status;
      } else echo "ERROR: El valor <b>restore</b> requiere del parámetro adicional <b>file</b> (nombre del archivo a restaurar)";
    } else echo 'ERROR: El contenido del parámetro <b>action</b> de la URL no conicide con sus posibles valores (<b>backup</b> o <b>restore</b>)';
  } else echo 'ERROR: Se esperaba el parámetro <b>action</b> en la URL';
?>