<?
  //Se inicia la sesión al principio de cada acceso (solo trans_sid por si no están habilitadas las cookies)
  ini_set('session.use_cookies',0);
  ini_set('session.use_only_cookies',0);
  ini_set('session.use_trans_sid',1);
  session_start();

  //Se almacena la lista de productos leidos de su fichero CSV correspondiente
  $fic = fopen("productos.csv","r");
  while(!feof($fic)) $prods[] = fgetcsv($fic,1000,";");
	fclose($fic);

  //Si no existe la variable de sesión "cesta" se crea
  if(!isset($_SESSION['cesta'])) $_SESSION['cesta'] = [0,0,0,0,0,0,0,0];

  //Petición Actualizar: Se actualiza el numero de productos en cesta
  if(isset($_GET['actualizar'])){
    for($i=0; $i<count($prods); $i++){
      if(isset($_GET["p$i"])) $_SESSION['cesta'][$i] = $_GET["p$i"];
    }
  }

  //Se calcula el precio total de los productos de la cesta
  foreach($prods as $id => $prod){
    $total += floatval($prod[3]*$_SESSION['cesta'][$id]);
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cesta</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
  <link rel="stylesheet" href="index.css">
</head>
<body>
  <div class="container pt-3 mb-5">
    <div class="title row my-5">
      <div class="col-12 text-center">
        <span class="text-white py-4 px-5 rounded-3 bg-dark bg-gradient fs-1">Tienda Online</span>
      </div>
    </div>
    <div class="content row text-white p-3 rounded-3 bg-dark bg-gradient bg-opacity-75 shadow-lg">
      <form action="" method="get" class="products col-9 p-3">
        <div class="product-title mb-4">
          <h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-cart me-3" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            Cesta
          </h2>
        </div>
        <table class="table text-center">
          <thead class="table-primary text-uppercase bg-gradient">
            <tr class="align-middle">
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio por Unidad</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody class="bg-white">
            <!-- Se recorre el array de productos en la cesta y se imprimen los que hayan sido añadidos al menos una vez a la cesta -->
            <?foreach($_SESSION['cesta'] as $id => $num){ 
                if($num>0){?>
                  <tr class="align-middle">
                    <td><img src="imagenes/<?=$prods[$id][4]?>"></td>
                    <td><?=$prods[$id][1]?></td>
                    <td><input type="number" name="p<?=$prods[$id][0]?>" min="0" value="<?=$num?>" class="form-control w-25"></td>
                    <td><?=$prods[$id][3]?> €</td>
                    <td><?=($prods[$id][3]*$num)?> €</td>
                  </tr>
            <?}}?>
            <tr class="total">
              <td></td><td></td><td></td><td></td>
              <td class="fw-bold fs-5"><?=$total?> €</td>
            </tr>
          </tbody>
        </table>
        <div class="update-link my-4">
          <button type="submit" name="actualizar" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            Actualizar
          </button>
        </div>
        <div class="alert alert-primary d-flex align-items-center" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
          <div class="ms-2 fst-italic">Para <strong>eliminar un producto de la lista</strong> establezca su cantidad a cero</div>
        </div>
      </form>
      <div class="cart col-3 p-3">
        <div class="right-title text-center mb-4">
          <h2>Productos en la Cesta</h2>
        </div>
        <div class="cart-list">
          <ul class="list-group">
            <!-- Se recorre el array de productos en la cesta y se imprimen los que hayan sido añadidos al menos una vez a la cesta -->
            <?if(array_sum($_SESSION['cesta'])>0) foreach($_SESSION['cesta'] as $id => $num){ 
                if($num>0){?>
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <?=$prods[$id][1]?>
                    <span class="badge bg-primary rounded-pill"><?=$_SESSION['cesta'][$id]?></span>
                  </li>
            <?}} else {?>
                  <tr><td><p class="text-center fs-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
                    </svg>
                    No hay ningún producto :(
                  </p></td></tr>
            <?}?>
          </ul>
        </div>
        <div class="cart-link text-center mt-4">
          <a href="tienda.php"><button type="button" class="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bag me-1" viewBox="0 0 16 16">
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/>
            </svg>
            Volver a la Tienda
          </button></a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>