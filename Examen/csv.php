<form action="" method="get">
  <input type="text" name="nombre" value="" placeholder="nombre"><br>
  <input type="text" name="apellidos" value="" placeholder="apellidos"><br>
  <input type="text" name="dni" value="" placeholder="dni"><br>
  <input type="email" name="email" value="" placeholder="email"><br>
  <input type="submit" name="enviar" value="enviar">
</form>

<pre><?=print_r($_GET)?></pre>

<?
if(isset($_GET['enviar'])){
  $csv = fopen('csv.csv','a');
  fputcsv($csv,array_splice($_GET,0,count($_GET)-1),';');
  fclose($csv);
?>
<table>
<tbody>
  <tr>
    <th>Nombre</th>
    <th>Apellidos</th>
    <th>DNI</th>
    <th>Email</th>
  </tr>
  <?
    $csv = fopen('csv.csv','r');
    while(!feof($csv)){
      echo '<tr>';
      $registro = fgetcsv($csv,1000,';');
      if(!is_array($registro)) continue;
      foreach($registro as $reg){
        echo "<td>$reg</td>";
      }
      echo '</tr>';
    }
    fclose($csv);?>
</tbody>
</table>
<?}?>