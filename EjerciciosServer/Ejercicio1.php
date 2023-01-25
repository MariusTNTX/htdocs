<!-- 1. Crear un Script que al llamarlo muestre los siguientes mensajes: 
    - Estas utilizando la versión ___ de php
    - El sistema operativo del servidor es ___ 
-->

<?
    echo 'Estas utilizando la version <b>'.phpversion().' de php ('.$_SERVER['SERVER_SOFTWARE'].')</b><br>';
    echo 'El sistema operativo del servidor es <b>'.php_uname('s').' ('.$_ENV['OS'].')</b><br>';
?>