let etiquetas = {
  head: {title, subtitle, link, heart},
  image: "",
  element: [{element, content, link}],
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

let metadata = {
  //ARRAY 1: PETICIONES NECESARIAS POR CADA ELEMENTO
  //ARRAY 2: ETIQUETAS A IMPRIMIR POR CADA ELEMENTO (FUNCIONES)
  album: {},
  band: {},
  label: {},
  musician: {}
};

//OBTENCIÓN DE TODOS LOS DATOS NECESARIOS DE LA API (array 1)

//RECORRIDO DE ETIQUETAS: IMPRESIÓN HTML (array 2)
  //Se necesita saber donde buscar en el array data

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