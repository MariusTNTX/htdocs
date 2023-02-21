let tituloLibro = document.getElementById("tituloLibro");
let autorLibro = document.getElementById("autorLibro");
let isbnLibro = document.getElementById("isbnLibro");
let editorialLibro = document.getElementById("editorialLibro");
let anioLibro = document.getElementById("anioLibro");
let materiaLibro = document.getElementById("materiaLibro");
let departLibro = document.getElementById("departLibro");
let centroLibro = document.getElementById("centroLibro");
let disponibLibro = document.getElementById("disponibLibro");
let estadoLibro = document.getElementById("estadoLibro");
let buscarLibros = document.getElementById("buscarLibros");
let tbody = document.getElementById("tbody");

//BOTÓN BUSCAR
buscarLibros.addEventListener("click",()=>{
  getLibros(tituloLibro.value,autorLibro.value,isbnLibro.value,editorialLibro.value,anioLibro.value,materiaLibro.value,departLibro.value,centroLibro.value,disponibLibro.value,estadoLibro.value);
});

//FUNCIÓN OBTENER LIBROS DE LA API
async function getLibros(tit,aut,isbn,edi,anio,mat,dep,cen,dis,est){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['titulo','autor','cod_libro','editorial','a_edicion','materia','cod_dpto','centro','usuario','estado'];
  let params = [tit,aut,isbn,edi,anio,mat,dep,cen,dis,est];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');

  //Se obtiene el JSON de resultados:
  console.log(`http://192.168.2.30/Biblioteca/php/api.php?select=libros&filters=${filters}&values=${values}`)
  let response = await fetch(`http://localhost/Biblioteca/php/api.php?select=libros&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);

  //Se imprimen los resultados en la tabla
  tbody.innerHTML = "";
  for(let res of response){
    tbody.innerHTML += `
    <tr class="align-middle">
      <td>${res.TITULO}</td>
      <td>${res.COD_LIBRO}</td>
      <td>${res.AUTOR}</td>
      <td>${res.MATERIA}</td>
      <td>${res.NOMBRE}</td>
      <td>${res.CENTRO}</td>
      <td>${res.EDITORIAL}</td>
      <td>${res.A_EDICION}</td>
      <td>${res.ESTADO}</td>
      <td>${res.USUARIO}</td>
      <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalLogin">Reservar</button></td>
    </tr>`
  }
}