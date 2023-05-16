// Gestión de Likes (trasladar a función head)
let heart1 = document.getElementById("heart1");
let heart2 = document.getElementById("heart2");
heart1.addEventListener("click",()=>{
    heart1.classList.add("hid");
    heart2.classList.remove("hid");
});
heart2.addEventListener("click",()=>{
    heart1.classList.remove("hid");
    heart2.classList.add("hid");
});

let etiquetas = {
  head: {title, subtitle, link, heart},
  image: "",
  mainInfo: [{element, content, link}],
  recording: {labels: [{content, link}], studios: [{content, link}], roles: [{content, link}]},
  bandStages: [{inicYear, finYear, band}],
  lyricThemes: [{theme}],
  descripcion: "",
  links: [{title, link}],
  top: {
    element: "",
    content: [{img, stars, title, subtitle, country, date, roles, stages}],
    limit: "",
    link: ""
  }
};

let params = getURLParameters();

switch(params.element){
  case 'album': console.log("Es un álbum :D")
    break;
  case 'band': console.log("Es una banda :D")
    break;
  case 'label': console.log("Es una discográfica :D")
    break;
  case 'musician': console.log("Es un músico :D")
    break;
}

let metadata = {
  //ARRAY 1: PETICIONES NECESARIAS POR CADA ELEMENTO
  //ARRAY 2: ETIQUETAS A IMPRIMIR POR CADA ELEMENTO (FUNCIONES)
  album: {
    requests: {
      elements: ['albumes_plus', 'discograficas_albumes', 'estudios_albumes', 'generos_albumes', 'roles_musicos_albumes', 'canciones_albumes'],
      params: [['nombreAlbum','params.album'],['nombreBanda','params.band']],
    },
    cards: {
      element: 'album',
      functions: [head, image, mainInfo, recording, topGenres, topMusicians, topSongs, description, links]
    }
  },
  band: {},
  label: {},
  musician: {}
};

//OBTENCIÓN DE TODOS LOS DATOS NECESARIOS DE LA API (array 1)

//RECORRIDO DE ETIQUETAS: IMPRESIÓN HTML (array 2)
  //Se necesita saber donde buscar en el array data



function head(elm, data){
  
}
function image(elm, data){

}
function element(elm, data){

}
function recording(elm, data){

}
function bandStages(elm, data){

}
function lyricThemes(elm, data){

}
function description(elm, data){

}
function links(elm, data){

}
function topAlbums(elm, data){

}
function topBands(elm, data){

}
function topLabels(elm, data){

}
function topMusicians(elm, data){

}
function topSongs(elm, data){

}
function topGenres(elm, data){

}