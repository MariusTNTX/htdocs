<?
  $total=0;
?>

<form action="resumen.php" method="get">
  <table>
    <thead>
      <th>Cantidad</th>
      <th>Sesión</th>
      <th>Espacio</th>
      <th>Precio Total</th>
    </thead>
    <tbody>
      <?
        if(isset($_GET['cant'])){
          foreach($_GET['cant'] as $i => $cant){?>
            <tr>
              <td><?=$cant?></td>
              <td><?switch($i){
                case 0: echo "20:00"; break;
                case 1: echo "22:30"; break;
                case 2: echo "20:00"; break;
                case 3: echo "22:30"; break;
              }?></td>
              <td><?switch($i){
                case 0: echo "Patio de Butacas"; break;
                case 1: echo "Patio de Butacas"; break;
                case 2: echo "Platea"; break;
                case 3: echo "Platea"; break;
              }?></td>
              <td><?switch($i){
                case 0: $total+=$cant*6; echo $cant*6,' €'; break;
                case 1: $total+=$cant*6; echo $cant*6,' €'; break;
                case 2: $total+=$cant*8; echo $cant*8,' €'; break;
                case 3: $total+=$cant*8; echo $cant*8,' €'; break;
              }?></td>
            </tr>
          <?}
        }
      ?>
    </tbody>
  </table>
  <h2>Total: <?=$total?> €</h2>
  <input type="submit" name="Comprar" value="comprar">
  <input type="hidden" name="data" value="<?=urlencode(serialize($_GET['cant']))?>">
</form>
