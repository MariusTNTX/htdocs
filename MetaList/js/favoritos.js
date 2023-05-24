//Lista de elementos y Buscador
let filterButtons = document.querySelectorAll(".filterButton");
let searchButton = document.getElementById("searchButton");
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
  btn.addEventListener("click",(e)=>{
    allowScroll=false;
    //Resalta únicamente el botón clicado
    filterButtons.forEach(b=>b.classList.remove("filter-active"));
    btn.classList.add("filter-active");
    //Asignación del elemento
    if(elemento != btn.textContent) resultContainer.innerHTML="";
    elemento = btn.textContent;
    //Impresión de los filtros del elemento
    let f = printFilters(btn.textContent);
    elemento = f[0];
    getCard = f[1];
    console.log(elemento,getCard);

    //REALIZACIÓN AUTOMÁTICA DE LA BÚSQUEDA

    //Reestablecimiento de parámetros de búsqueda
    parameters = [], numPag = 1, showMore = true, allowScroll=true;
    resultContainer.innerHTML = "";

    //OBTENCIÓN DE LOS PARÁMETROS DE BÚSQUEDA
    if(elemento=='bandas_plus'){
      parameters.push(['emailUsuarioBandaFavorita',sessionStorage.getItem("email")]);
    } else if(elemento=='albumes_plus'){
      parameters.push(['emailUsuarioAlbumFavorito',sessionStorage.getItem("email")]);
    }

    //Obtención de Datos
    try {
      if(showMore) printResults(1);
    } catch (error) {
      showAlert('ERROR','Ha habido un error en la búsqueda. Por favor, <a href="index.html#contact" class="text-warning">contacta con un administrador</a>');
      allowScroll=false;
      showMore=false;
      spinner.classList.add("d-none");
      noDataFound.classList.remove("d-none");
    }

  });
});

function printFilters(content){
  switch(content){
    case 'Álbumes': case 'albums': case 'albumes_plus': 
      return ["albumes_plus",getAlbumCard];
    case 'Bandas': case 'bands': case 'bandas_plus': 
      return ["bandas_plus",getBandCard];
  }
}

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
    if(numPag==1) noDataFound.classList.remove("d-none");
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
}