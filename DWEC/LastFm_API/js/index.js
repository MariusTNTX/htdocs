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
    General: chartTopAlbums, // chartTopTracks -> Mostrar solo Álbums eliminando los duplicados
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
    Artsita: artistTopTracks,
    Género: tagTopTracks
  }
}

/* ESTADO DE LA BÚSQUEDA */
var estado = {
  elemento: "",
  filtro: {
    clave: "",
    valor: ""
  },
  orden: {
    clave: "",
    direc: "Descendente"
  }
};


/* CLICK SOBRE ELEMENTOS */
//Se almacena el elemento a buscar clicado
elementos.addEventListener("click",(e)=>{
  if(e.target.nodeName=='INPUT'){
    //Se almacena el nombre del elemento clicado
    estado.elemento=e.target.id;
    //Se habilitan solo las opciones correspondientes al elemento seleccionado
    for(let elm of relacElementos[estado.elemento].filtrosTrue) elm.classList.remove("d-none");
    for(let elm of relacElementos[estado.elemento].filtrosFalse) elm.classList.add("d-none");
    for(let elm of relacElementos[estado.elemento].ordenTrue) elm.classList.remove("d-none");
    for(let elm of relacElementos[estado.elemento].ordenFalse) elm.classList.add("d-none");
    console.log(estado);
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
      estado.filtro.clave = li.id;
      boton.textContent = li.textContent;
    } else if(li.textContent != 'Ninguno' && boton.id=='ordenarpor'){
      estado.orden.clave = li.id;
      boton.textContent = li.textContent;
    } else if(boton.id=='ascdesc'){
      estado.orden.direc = li.textContent;
      boton.textContent = li.textContent;
    } else if(boton.id=='filtrarpor'){
      estado.filtro.clave = "";
      boton.textContent = 'Filtrar por';
    } else if(boton.id=='ordenarpor'){
      estado.orden.clave = "";
      boton.textContent = 'Ordenar por';
    }
    console.log(estado);
  });
}

/* CAMBIOS EN LOS CAMPOS DE TEXTO FILTRAR */
//Con cada letra se actualiza el estado de la búsqueda
document.getElementById("inputFiltrarpor").addEventListener("change",(e)=>{
  estado.filtro.valor = e.target.value;
  console.log(estado);
});

/* CLICK SOBRE BOTÓN BUSCAR */
//Se realiza la búsqueda según los parámetros introducidos al darle a buscar
botonBuscar.addEventListener("click",()=>{
  //Resetear numResults, varResults y resultList
  numResults = 0, maxResults = 12;
  resultList = document.getElementById("resultList");
  //Si no hay filtro se cambia la clave por "General"
  if(estado.filtro.clave=='') estado.filtro.clave = 'General';
  //Se realiza la búsqueda imprimiendo los primeros resultados
  buscarPor[estado.elemento][estado.filtro.clave](estado.filtro.valor, estado.orden.clave, estado.orden.direc);
  /* Evento Scroll */ //Imprime más resultados al llegar al fondo de la página
  window.addEventListener("scroll",()=>{
    if(window.scrollY + window.innerHeight >= document.body.clientHeight){
      buscarPor[estado.elemento][estado.filtro.clave](estado.filtro.valor, estado.orden.clave, estado.orden.direc);
    }
  });
});