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
let noDataFound = document.getElementById("noDataFound");
let spinner = document.getElementById("spinner");
//Parámetros de búsqueda
let elemento, parameters = [], getCard;
//Variables de paginación basada en Scroll
let numPag = 1, showMore = true, allowScroll=false, footer = document.getElementById("footer");

//Gestionar Botones de la Lista Principal
filterButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{
    allowScroll=false;
    //Resalta únicamente el botón clicado
    filterButtons.forEach(b=>b.classList.remove("filter-active"));
    btn.classList.add("filter-active");
    if(elemento != btn.textContent) resultContainer.innerHTML="";
    elemento = btn.textContent;
    //Impresión de los filtros del elemento
    switch(btn.textContent){
      case 'Álbumes': 
        newFilter("albums");
        elemento = "albumes_plus";
        getCard = getAlbumCard;
        break;
      case 'Bandas': 
        newFilter("bands");
        elemento = "bandas_plus";
        getCard = getBandCard;
        break;
      case 'Discográficas': 
        newFilter("labels");
        elemento = "discograficas_plus";
        getCard = getLabelCard;
        break;
      case 'Músicos': 
        newFilter("musicians");
        elemento = "musicos_plus";
        getCard = getMusicianCard;
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
  parameters = [], numPag = 1, showMore = true, allowScroll=true;
  resultContainer.innerHTML = "";

  //OBTENCIÓN DE LOS PARÁMETROS DE BÚSQUEDA
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

  //Obtención de Datos
  if(showMore) printResults(1);
});

window.addEventListener("scroll",()=>{
  if(allowScroll && window.scrollY + window.innerHeight >= document.body.clientHeight - footer.clientHeight){
    if(showMore){
      printResults();
    }
    allowScroll=false;
  }
});

async function printResults(pag = numPag){
  spinner.classList.remove("d-none");
  parameters.push(["limit","12"],["page",pag]);
  //Obtención de datos
  let results = await list(elemento,true,...parameters);
  results = results.response;
  
  //Impresión
  if(results.length>0){
    noDataFound.classList.add("d-none")
    numPag++;
    showMore = results.length==12;
    let txt = [];
    for(let res of results){
      txt.push(await getCard(res));
    }
    spinner.classList.add("d-none");
    for(card of txt) resultContainer.appendChild(card);
    allowScroll = results.length==12;
  } else {
    spinner.classList.add("d-none");
    if(numPag==1) noDataFound.classList.remove("d-none")
    else numPag=1;
    showMore = false;
    allowScroll = false;
  }
}

switch(getURLParameters().list){
  case 'bands': for(let e of document.querySelectorAll(".filterBandas")) e.dispatchEvent(new Event('click'));
  break;
  case 'albums': for(let e of document.querySelectorAll(".filterAlbumes")) e.dispatchEvent(new Event('click'));
  break;
  case 'labels': for(let e of document.querySelectorAll(".filterDiscogs")) e.dispatchEvent(new Event('click'));
  break;
  case 'musicians': for(let e of document.querySelectorAll(".filterMusicos")) e.dispatchEvent(new Event('click'));
  break;
}