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
let loginAlumnos = document.getElementById("loginAlumnos");
let loginProfesores = document.getElementById("loginProfesores");

// GETLIBROS: FUNCIÓN OBTENER LIBROS DE LA API
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
  /* console.log(`http://192.168.2.30/Biblioteca/php/api.php?select=libros&filters=${filters}&values=${values}`) */
  let response = await fetch(`http://localhost/Biblioteca/php/api.php?select=libros&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  /* console.log(response); */

  //Se imprimen los resultados en la tabla
  tbody.innerHTML = "";
  for(let res of response){
    let disabled = (res.USUARIO=='CONSULTA') ? 'disabled' : '';
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
      <td><button type="button" class="btn btn-primary btn-Reservar" data-bs-toggle="modal" ${disabled} data-bs-target="#modalLogin">Reservar</button></td>
    </tr>`
  }

  //Se personaliza el login del modal según el usuario
  for(let btn of document.querySelectorAll(".btn-Reservar")){
    btn.addEventListener("click",(e)=>{
      let usuario = e.currentTarget.parentElement.previousElementSibling.textContent;
      switch(usuario){
        case 'ALUMNO': 
          loginAlumnos.classList.remove("d-none");
          loginProfesores.classList.add("d-none");
          break;
        case 'PROFESOR': 
          loginAlumnos.classList.add("d-none");
          loginProfesores.classList.remove("d-none");
          break;
      }
    });
  }
}

// GETALUMNOS: FUNCIÓN OBTENER ALUMNOS DE LA API
async function getAlumnos(cod,ape,nom,dni,nie){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['alumno','apellidos','nombre','dni','nie'];
  let params = [cod,ape,nom,dni,nie];
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
  let response = await fetch(`http://localhost/Biblioteca/php/api.php?select=alumnos&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);

  //Se imprimen los resultados en la tabla
  /* tbody.innerHTML = "";
  for(let res of response){
    let disabled = (res.USUARIO=='CONSULTA') ? 'disabled' : '';
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
      <td><button type="button" class="btn btn-primary btn-Reservar" data-bs-toggle="modal" ${disabled} data-bs-target="#modalLogin">Reservar</button></td>
    </tr>`;
  } */

  //Se personaliza el login del modal según el usuario
  /* for(let btn of document.querySelectorAll(".btn-Reservar")){
    btn.addEventListener("click",(e)=>{
      let usuario = e.currentTarget.parentElement.previousElementSibling.textContent;
      switch(usuario){
        case 'ALUMNO': 
          loginAlumnos.classList.remove("d-none");
          loginProfesores.classList.add("d-none");
          break;
        case 'PROFESOR': 
          loginAlumnos.classList.add("d-none");
          loginProfesores.classList.remove("d-none");
          break;
      }
    });
  } */
}

// BOTÓN BUSCAR
buscarLibros.addEventListener("click",()=>{
  getLibros(tituloLibro.value,autorLibro.value,isbnLibro.value,editorialLibro.value,anioLibro.value,materiaLibro.value,departLibro.value,centroLibro.value,disponibLibro.value,estadoLibro.value);
});

// BOTONES LOGIN
for(let btn of document.querySelectorAll(".btn-login")){
  btn.addEventListener("click",(e)=>{
    let campos = e.target.parentElement.parentElement.querySelectorAll(".campoLogin");
    if(campos.length==2){ //Alumnos
      //getAlumnos con dni y nie
      getAlumnos('','','',campos[0].value,campos[1].value);
    } else if(campos.length==1){ //Profesores
      //getProfesores con dni
    }
    //Si no se encuentran resultados se previene el evento y se indica error
  })
}