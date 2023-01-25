<!--
    3. Crear dos documentos: Ejercicio3.html y Ejercicio3.php. El primero 
    debe contener un formulario que muestre un menú de opciones para 
    seleccionar 1 de 5 colores (radio, desplegable). Rojo verde azul 
    amarillo negro. De tal forma que al confirmar el color en el segundo 
    decumento aparezca el fondo de la pantalla del color seleccionado. 
-->

<?
if(isset($_GET['Color'])){
    echo '<body style="background-color:'.$_GET['Color'].'">';
}
?>