var root = 'localhost';
var tipos = ['infoBanda'];
var elementos = {
  infoBanda: ['nombre']
}

//CODIFICADOR DE API_KEY
function key(){ //Genera la key de uso único para peticiones realizadas por los scripts de la aplicación
  let local = [9,6,5,3,2,4,1,0,7,8];
  let corresp = ['oev','gan','fbs','ump','lza','ktr','xdh','iyj','qwc','btz'];
  let fecha = new Date().getTime()+'', interm=[], clave=[];
  fecha = fecha.substring(0,fecha.length-3);
  fecha = fecha.split("");
  for(let i=0; i<fecha.length; i++){
    interm[i] = fecha[local[i]];
  }
  for(let i=0; i<fecha.length; i++){
    clave[i] = corresp[interm[i]];
  }
  clave = clave.join("");
  return clave;
}

// GET: FUNCIÓN OBTENER INFORMACIÓN DE LA API
async function get(elm, ...params){
  console.log(params);
  //Se seleccionan los filtros y sus valores:
  let elements = [], values = [];
  for(let i in elementos[elm]){
    elements.push(elementos[elm][i]);
    values.push(params[i]);
  }
  elements = elements.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let response = await fetch(`http://${root}/MetaList/php/api.php?key=${key()}&select=infoBanda&elements=${elements}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  return Promise.resolve(response);
}