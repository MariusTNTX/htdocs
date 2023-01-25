<!--
    4. Crear dos documentos: formulario.html que recoga nombre, 
    apellido y una pregunta con 4 opciones (desplegable u otro) permitiendo 
    seleccionar varias respuestas (ej.: ciuades visitadas). la 
    información se enviará a un segundo documento Ejercicio4.php que 
    mostrará nombre, apellido y las respuestas elegidas.
-->

<?
if(isset($_GET['pais'])){
    echo '<b>Nombre</b>: '.$_GET['nombre'].'<br><br>';
    echo '<b>Apellido</b></b>: '.$_GET['apellido'].'<br><br>';
    echo '<b>Países</b>:<br>';
    for($i = 0; $i < count($_GET['pais']); $i++){
        echo '&nbsp;&nbsp;'.($i+1).') '.$_GET['pais'][$i].'<br>';
    }
}
?>