<?
  include('oculto.php');
  include('funciones.php');
  session_start();
  //Crear Base de Datos y tabla si no existe
  createDB();
?>

<pre><?=getAforo()?></pre>

<form action="cesta.php" method="get">
  <table>
    <thead>
      <tr>
        <th>Sesión</th>
        <th>Espacio</th>
        <th>Cantidad</th>
        <th>Precio por Entrada</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>20:00</td>
        <td>Patio de Butacas</td>
        <td><input type="number" name="cant[]" value="0" min="0" max="6"></td>
        <td>6€</td>
      </tr>
      <tr>
        <td>22:30</td>
        <td>Patio de Butacas</td>
        <td><input type="number" name="cant[]" value="0" min="0" max="6"></td>
        <td>6€</td>
      </tr>
      <tr>
        <td>20:00</td>
        <td>Platea</td>
        <td><input type="number" name="cant[]" value="0" min="0" max="6"></td>
        <td>8€</td>
      </tr>
      <tr>
        <td>22:30</td>
        <td>Platea</td>
        <td><input type="number" name="cant[]" value="0" min="0" max="6"></td>
        <td>8€</td>
      </tr>
    </tbody>
  </table>
  <input type="submit" name="anadir" value="Ir a la Cesta">
</form>
