//Lista de elementos y Buscador
let filterButtons = document.querySelectorAll(".filterButton");
let searchButton = document.getElementById("searchButton");
//Filtros y Ordenación
let mainTitle = document.getElementById("mainTitle");
let estrictSearch = document.getElementById("estrictSearch");
let intervals = document.querySelectorAll(".interval");
let categories = document.querySelectorAll(".category");
let reductions = document.querySelectorAll(".reduction");
let order = document.getElementById("order");
let orderDirec = document.getElementById("orderDirec");
// Contenedor de resultados
let resultContainer = document.getElementById("resultContainer");
//Parámetros de búsqueda
let elemento, parameters = [];
//Variables de paginación basada en Scroll
let numPag = 1, showMore = true;

//Gestionar Botones de la Lista Principal
filterButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    //Resalta únicamente el botón clicado
    filterButtons.forEach(b=>b.classList.remove("filter-active"));
    btn.classList.add("filter-active");
    if(elemento != btn.textContent) resultContainer.innerHTML="";
    elemento = btn.textContent;
    //Impresión de los filtros del elemento
    switch(btn.textContent){
      case 'Álbumes': 
        newFilter("albums");
        elemento = "albumes";
        break;
      case 'Bandas': 
        newFilter("bands");
        elemento = "bandas";
        break;
      case 'Discográficas': 
        newFilter("labels");
        elemento = "discograficas";
        break;
      case 'Músicos': 
        newFilter("musicians");
        elemento = "musicos";
        break;
      default: console.log("El elmento seleccionado de la lista no está contemplado");
    }
    //Actualización de valores de los filtros del elemento imprimido
    mainTitle = document.getElementById("mainTitle");
    intervals = document.querySelectorAll(".interval");
    categories = document.querySelectorAll(".category");
    reductions = document.querySelectorAll(".reduction");
  });
});

searchButton.addEventListener("click", ()=>{
  //Reestablecimiento de parámetros de búsqueda
  parameters = [], numPag = 1, showMore = true;

  //Título
  if(mainTitle.value.length>0 && !estrictSearch.checked){
    parameters.push([mainTitle.classList[1]+"_Like",mainTitle.value]);
  } else if(mainTitle.value.length>0 && estrictSearch.checked){
    parameters.push([mainTitle.classList[1],mainTitle.value]);
  }
  //Intervalos
  for(let intv of intervals){
    if(intv.value.length>0){
      parameters.push([intv.classList[1],intv.value]);
    }
  }
  //Categorias
  for(let cat of categories){
    if(cat.checked && parameters.some(p=>p[0]===cat.classList[1])){
      parameters.forEach(p=>{
        if(p[0]===cat.classList[1]) p[1]+="|"+cat.nextElementSibling.textContent;
      });
    } else if(cat.checked && !parameters.some(p=>p[0]===cat.classList[1])){
      parameters.push([cat.classList[1],cat.nextElementSibling.textContent]);
    }
  }
  //Reducciones
  for(let red of reductions){
    if(red.value.length>0){
      parameters.push([red.classList[1],red.value]);
    }
  }
  //Ordenación
  if(order.value.length>0){
    parameters.push(["order",order.value+orderDirec.value]);
  }
  console.log(parameters);

  //Obtención de Datos
  if(showMore) printResults(1);
});

async function printResults(pag = numPag){
  parameters.push(["limit","12"],["page",pag]);
  //Obtención de datos
  let results = await list(elemento,true,...parameters);
  console.log(results);
  results = results.response;
  //Actualización de datos de paginación
  numPag++;
  showMore = results.length==12;
  //Impresión
  resultContainer.innerHTML = "";
  let txt = "";
  for(let res of results){
    txt += await getAlbumCard(res);
    console.log("nuevoAlbum")
  }
  resultContainer.innerHTML = txt;
}