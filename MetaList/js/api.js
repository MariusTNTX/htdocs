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
  //Se seleccionan los filtros y sus valores:
  let elements = [], values = [];
  for(let e of params){
    elements.push(e[0]);
    values.push(e[1]);
  }
  elements = elements.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  console.log(`http://${root}/MetaList/php/api.php?key=${key()}&select=${elm}&elements=${elements}&values=${values}`)
  let response = await fetch(`http://${root}/MetaList/php/api.php?key=${key()}&select=${elm}&elements=${elements}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  return Promise.resolve(response);
}

// LIST: FUNCIÓN OBTENER LISTAS DE LA API
async function list(elm, awt, ...params){
  let url = `http://${root}/MetaList/php/api.php?key=${key()}&list=${elm}`;
  //Se seleccionan los filtros y sus valores:
  for(let e of params) url += `&${e[0]}=${e[1]}`;
  //Se obtiene el JSON de resultados:
  console.log(url)
  let response = await fetch(url,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// POST: FUNCIÓN INSERTAR INFORMACIÓN A TRAVÉS DE LA API
async function post(elm, awt, body){
  console.log(body)
  //Se obtiene el JSON de resultados:
  let response = await fetch(`http://${root}/MetaList/php/api.php?key=${key()}&insert=${elm}`,{
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  if(awt) return response;
  return Promise.resolve(response);
}

// SET_FORM_DATA: FUNCIÓN INSERTAR FOTOS A TRAVÉS DE LA API
async function setFormData(elm, awt, body, name, id=""){
  //Se obtiene el JSON de resultados:
  let response = await fetch(`http://${root}/MetaList/php/api.php?key=${key()}&setFormData=${elm}&name=${name}&id=${id}`,{
    method: 'POST',
    body: body
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// REPLACE_FORM_DATA: FUNCIÓN INTERCAMBIAR FOTOS A TRAVÉS DE LA API
async function replaceFormData(elm, awt, body, name, id=""){
  //Se obtiene el JSON de resultados:
  let response = await fetch(`http://${root}/MetaList/php/api.php?key=${key()}&replaceFormData=${elm}&name=${name}&id=${id}`,{
    method: 'POST',
    body: body
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// DELETE_FORM_DATA: FUNCIÓN ELIMINAR FOTOS A TRAVÉS DE LA API
async function deleteFormData(elm, awt, body, id=""){
  //Se obtiene el JSON de resultados:
  let response = await fetch(`http://${root}/MetaList/php/api.php?key=${key()}&deleteFormData=${elm}&id=${id}`,{
    method: 'POST',
    body: body
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// PUT: FUNCIÓN ACTUALIZAR INFORMACIÓN A TRAVÉS DE LA API
async function put(elm, awt, body){
  console.log(body)
  //Se obtiene el JSON de resultados:
  let response = await fetch(`http://${root}/MetaList/php/api.php?key=${key()}&update=${elm}`,{
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  if(awt) return response;
  return Promise.resolve(response);
}

// SEND_VERIFY_EMAIL: FUNCIÓN ENVIAR CORREO DE VERIFICACIÓN A TRAVÉS DE LA API
async function sendVerifyEmail(email, code, awt){
  console.log(`http://${root}/MetaList/php/api.php?key=${key()}&sendVerifyEmail=${email}&code=${code}`);
  //Se obtiene el JSON de resultados:
  let response = await fetch(`http://${root}/MetaList/php/api.php?key=${key()}&sendVerifyEmail=${email}&code=${code}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}