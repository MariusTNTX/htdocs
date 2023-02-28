/* ELEMENTOS DEL DOM */
var elementos = document.getElementById("elementosBusqueda");
var filtrarpor = document.getElementById("filtrarpor");
var filtroAlbum = document.getElementById("filtroAlbum");
var filtroArtista = document.getElementById("filtroArtista");
var filtroGenero = document.getElementById("filtroGenero");
var filtroCancion = document.getElementById("filtroCancion");
var ordenarpor = document.getElementById("ordenarpor");
var fechaLanz = document.getElementById("fechaLanz");
var oyentes = document.getElementById("oyentes");
var reprod = document.getElementById("reprod");
var reach = document.getElementById("reach");
var taggings = document.getElementById("taggings");
var duracion = document.getElementById("duracion");
var ascdesc = document.getElementById("ascdesc");
var botonBuscar = document.getElementById("botonBuscar");

/* ELEMENTOS DE BÚSQUEDA COMPATIBLES */
var relacElementos = {
  albumes: {
    filtrosTrue: [filtroArtista,filtroGenero],
    filtrosFalse: [filtroAlbum,filtroCancion],
    ordenTrue: [fechaLanz,oyentes,reprod,duracion],
    ordenFalse: [reach,taggings]
  },
  artistas: {
    filtrosTrue: [filtroGenero],
    filtrosFalse: [filtroAlbum,filtroArtista,filtroCancion],
    ordenTrue: [oyentes,reprod],
    ordenFalse: [fechaLanz,reach,taggings,duracion]
  },
  generos: {
    filtrosTrue: [filtroAlbum,filtroArtista,filtroCancion],
    filtrosFalse: [filtroGenero],
    ordenTrue: [reach,taggings],
    ordenFalse: [fechaLanz,oyentes,reprod,duracion]
  },
  canciones: {
    filtrosTrue: [filtroAlbum,filtroArtista,filtroGenero],
    filtrosFalse: [filtroCancion],
    ordenTrue: [oyentes,reprod,duracion],
    ordenFalse: [fechaLanz,reach,taggings]
  }
}

/* FUNCIONES A EJECUTAR SEGÚN LOS PARÁMETROS DE BÚSQUEDA */
var buscarPor = {
  albumes: {
    General: chartTopAlbums, // chartTopArtist -> Mostrar solo Álbums
    Artista: artistTopAlbums,
    Género: tagTopAlbums
  },
  artistas: {
    General: chartTopArtists,
    Género: tagTopArtists
  },
  generos: {
    General: chartTopTags,
    Álbum: albumTags,
    Artista: artistTags,
    Canción: trackTags
  },
  canciones: {
    General: chartTopTracks,
    Álbum: albumTracks, // albumInfo -> Mostrar solo Tracks
    Artista: artistTopTracks,
    Género: tagTopTracks
  }
}

/* ESTADO DE LA BÚSQUEDA EN SESIÓN */
sessionStorage.setItem("elemento","");
sessionStorage.setItem("claveFiltro","");
sessionStorage.setItem("valorFiltro","");
sessionStorage.setItem("claveOrden","");
sessionStorage.setItem("direcOrden","Descendente");


/* CLICK SOBRE ELEMENTOS */
//Se almacena el elemento a buscar clicado
elementos.addEventListener("click",(e)=>{
  if(e.target.nodeName=='INPUT'){
    //Se almacena el nombre del elemento clicado
    sessionStorage.setItem("elemento",e.target.id);
    //Se habilitan solo las opciones correspondientes al elemento seleccionado
    for(let elm of relacElementos[sessionStorage.getItem("elemento")].filtrosTrue) elm.classList.remove("d-none");
    for(let elm of relacElementos[sessionStorage.getItem("elemento")].filtrosFalse) elm.classList.add("d-none");
    for(let elm of relacElementos[sessionStorage.getItem("elemento")].ordenTrue) elm.classList.remove("d-none");
    for(let elm of relacElementos[sessionStorage.getItem("elemento")].ordenFalse) elm.classList.add("d-none");
  }
});

/* CLICK SOBRE BOTONES FILTRAR, ORDENAR Y ORDEN */
//Se cambia el contenido del drop según la opción seleccionada y se almacena
for (let dropli of document.querySelectorAll(".dropli")){
  dropli.addEventListener("click",(e)=>{
    //Se almacena el botón y el elemento clicado
    let boton = e.currentTarget.parentElement.previousElementSibling;
    let li = e.target;
    console.log(li)
    //Según la opción y el drop correspondiente se actualiza el estado y el titulo del drop
    if(li.textContent != 'Ninguno' && boton.id=='filtrarpor'){
      sessionStorage.setItem("claveFiltro",li.textContent);
      boton.textContent = li.textContent;
    } else if(li.textContent != 'Ninguno' && boton.id=='ordenarpor'){
      sessionStorage.setItem("claveOrden",li.id);
      boton.textContent = li.textContent;
    } else if(boton.id=='ascdesc'){
      sessionStorage.setItem("direcOrden",li.textContent);
      boton.textContent = li.textContent;
    } else if(boton.id=='filtrarpor'){
      sessionStorage.setItem("claveFiltro","");
      sessionStorage.setItem("valorFiltro","");
      boton.textContent = 'Filtrar por';
    } else if(boton.id=='ordenarpor'){
      sessionStorage.setItem("claveOrden","");
      sessionStorage.setItem("valorOrden","");
      boton.textContent = 'Ordenar por';
    }
  });
}

/* CAMBIOS EN LOS CAMPOS DE TEXTO FILTRAR */
//Al indicar un valor de filtrado se actualiza el estado de la búsqueda
document.getElementById("inputFiltrarpor").addEventListener("change",(e)=>{
  sessionStorage.setItem("valorFiltro",e.target.value);
});

/* CLICK SOBRE BOTÓN BUSCAR */
//Se realiza la búsqueda según los parámetros introducidos al darle a buscar
botonBuscar.addEventListener("click",()=>{
  //Se almacenan temporalmente los valores de búsqueda de la sesión
  let elemento = sessionStorage.getItem("elemento"),
  claveFiltro = sessionStorage.getItem("claveFiltro"),
  claveOrden = sessionStorage.getItem("claveOrden"),
  valorFiltro = sessionStorage.getItem("valorFiltro"),
  direcOrden = sessionStorage.getItem("direcOrden");
  //Resetear numResults, varResults y resultList
  numResults = 0, maxResults = 12;
  resultList = document.getElementById("resultList");
  //Si no hay filtro se cambia la clave por "General"
  if(claveFiltro=='') claveFiltro = 'General';
  //Se realiza la búsqueda imprimiendo los primeros resultados
  buscarPor[elemento][claveFiltro](valorFiltro, claveOrden, direcOrden);
  /* Evento Scroll */ //Imprime más resultados al llegar al fondo de la página
  window.addEventListener("scroll",()=>{
    if(window.scrollY + window.innerHeight >= document.body.clientHeight){
      buscarPor[elemento][claveFiltro](valorFiltro, claveOrden, direcOrden);
    }
  });
});