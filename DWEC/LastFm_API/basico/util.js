/* VARIABLES BÁSICAS */

//Elemento contenedor de los resultados
var resultList = document.getElementById("resultList");
//Número de resultados mostrados, número máximo a mostrar en cada tramo del scroll y número máximo total
var numResults = 0, maxResults = 12, totalResults=50;

/* FUNCIÓN RECUPERAR IMAGEN */
var getImageURL = async function(title, id, type, artist=''){
  let filtros, ruta, pageid, plus='';
  if(type=='Artist'){
    filtros = ['band','artist'];
    ruta = '//upload.wikimedia.org/wikipedia/commons/thumb/';
  } 
  if(type=='Album' || type=='Track'){
    filtros = ['album',artist];
    ruta = '//upload.wikimedia.org/wikipedia/en/thumb/';
    plus=" (album)";
  } 
  //Obtencion de PageId
  console.log(`https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${title}${plus}`)
  var responseURL = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srprop=snippet&format=json&origin=*&utf8=&srsearch=${title}${plus}`);
  responseURL = await responseURL.json();
  responseURL = responseURL.query.search;
  pageid = responseURL[0].pageid;
  //Obtención de SRC
  //https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&utf8&prop=revisions&rvprop=type&rvparse&pageids
  console.log(`https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&utf8&prop=revisions&rvprop=content&rvparse&pageids=${pageid}`)
  var responseURL = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&utf8&prop=revisions&rvprop=content&rvparse&pageids=${pageid}`);
  responseURL = await responseURL.json();
  responseURL = responseURL.query.pages[pageid].revisions[0]['*'];
  
  //Se obtiene la primera imagen compatible evitando otras erroneas
  let p1, p2, url, index=0;
  do{
    //Obtener primera posición de //upload
    p1 = responseURL.indexOf(ruta,index);
    if(p1==-1) break;
    index = p1+1;
    //Obtener primera posición de " desde la posición anterior
    p2 = responseURL.indexOf("\"",p1);
    //Recortar y obtener la porción de string con esas posiciones
    url = responseURL.substring(p1,p2);
    //Falsas coincidencias:
  } while (url.includes('Commons-logo') || url.includes('Question_book') || url.includes('Ambox_important') || url.includes('Disambig_gray') || url.includes('Symbol_category'));
  //Si no se encuentra la imagen se sustituye por un amistoso 404
  if(p1==-1 || url.includes('icon_edit')) url="404.jpg";
  else {
    //Eliminar último fragmento
    url = url.substring(0,url.lastIndexOf("/"));
    //Eliminar thumb/ y Añadir https:
    url = 'https:'+url.replace("thumb/","");
  }
  document.getElementById(id).innerHTML = `<img class="mw-100" src="${url}" alt="${title}">`;
}

/* CREAR EVENTOS DE LOS BOTONES "IMÁGEN WIKIPEDIA" */
var crearEventosModal = (type) =>{
  /* Creación de Eventos */
  for(let btn of document.querySelectorAll(".btnModal"+type)){
    btn.addEventListener("click",(e)=>{
      console.log("----Buscando Imagen Wiki----")
      console.log(e.target.nextElementSibling.textContent)
      console.log('imgWiki'+e.target.id.substring(4))
      let artist = (type=='Album' || type=='Track') ? e.target.nextElementSibling.nextElementSibling.textContent : '';
      getImageURL(e.target.nextElementSibling.textContent, 'imgWiki'+e.target.id.substring(4), type, artist);
    });
  }
}

