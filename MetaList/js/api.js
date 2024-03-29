var path = `https://metalist.es`;

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

function encodeParams(params){
  let results = [];
  for(let p of params) results.push([p[0],encodeURIComponent(p[1])]);
  return results;
}

// GET: FUNCIÓN OBTENER INFORMACIÓN DE LA API
async function get(elm, ...params){
  params = encodeParams(params);
  //Se seleccionan los filtros y sus valores:
  let elements = [], values = [];
  for(let e of params){
    elements.push(e[0]);
    values.push((typeof(e[1])=='string')?e[1].replaceAll("&","%26"):e[1]);
  }
  elements = elements.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  console.log(`${path}/php/api.php?key=${key()}&select=${elm}&elements=${elements}&values=${values}`)
  let response = await fetch(`${path}/php/api.php?key=${key()}&select=${elm}&elements=${elements}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  return Promise.resolve(response);
}

// LIST: FUNCIÓN OBTENER LISTAS DE LA API
async function list(elm, awt, ...params){
  params = encodeParams(params);
  let url = `${path}/php/api.php?key=${key()}&list=${elm}`;
  //Se seleccionan los filtros y sus valores:
  //if(params) for(let e of params) url += `&${e[0]}=${(typeof(e[1])=='string')?e[1].replaceAll("&","%26"):e[1]}`;
  if(params) for(let e of params) url += `&${e[0]}=${e[1]}`;
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
  let response = await fetch(`${path}/php/api.php?key=${key()}&insert=${elm}`,{
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  if(awt) return response;
  return Promise.resolve(response);
}

// PUT: FUNCIÓN ACTUALIZAR INFORMACIÓN A TRAVÉS DE LA API
async function put(elm, awt, body){
  console.log(body)
  //Se obtiene el JSON de resultados:
  let response = await fetch(`${path}/php/api.php?key=${key()}&update=${elm}`,{
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  if(awt) return response;
  return Promise.resolve(response);
}

// REMOVE: FUNCIÓN ELIMINAR INFORMACIÓN A TRAVÉS DE LA API
async function remove(elm, awt, body){
  console.log(body)
  //Se obtiene el JSON de resultados:
  let response = await fetch(`${path}/php/api.php?key=${key()}&delete=${elm}`,{
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
  let response = await fetch(`${path}/php/api.php?key=${key()}&setFormData=${elm}&name=${name}&id=${encodeURIComponent(id)}`,{
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
  let response = await fetch(`${path}/php/api.php?key=${key()}&replaceFormData=${elm}&name=${name}&id=${encodeURIComponent(id)}`,{
    method: 'POST',
    body: body
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// DELETE_FORM_DATA: FUNCIÓN ELIMINAR FOTOS A TRAVÉS DE LA API
async function deleteFormData(elm, awt, id=""){
  //Se obtiene el JSON de resultados:
  let response = await fetch(`${path}/php/api.php?key=${key()}&deleteFormData=${elm}&id=${encodeURIComponent(id)}`,{
    method: 'POST'
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// SEND_VERIFY_EMAIL: FUNCIÓN ENVIAR CORREO DE VERIFICACIÓN A TRAVÉS DE LA API
async function sendVerifyEmail(email, code, awt){
  console.log(`${path}/php/api.php?key=${key()}&sendVerifyEmail=${encodeURIComponent(email)}&code=${code}`);
  //Se obtiene el JSON de resultados:
  let response = await fetch(`${path}/php/api.php?key=${key()}&sendVerifyEmail=${encodeURIComponent(email)}&code=${code}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// CHECK_PASSWORD: FUNCIÓN VERIFICAR CONTRASEÑAS A TRAVÉS DE LA API
async function checkPassword(email, pass, awt){
  pass = encodeURI(pass);
  console.log(`${path}/php/api.php?key=${key()}&checkPassword=${encodeURIComponent(pass)}&email=${encodeURIComponent(email)}`);
  //Se obtiene el JSON de resultados:
  let response = await fetch(`${path}/php/api.php?key=${key()}&checkPassword=${encodeURIComponent(pass)}&email=${encodeURIComponent(email)}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// CHANGE_PASSWORD: FUNCIÓN VERIFICAR CONTRASEÑAS A TRAVÉS DE LA API
async function changePassword(email, oldPass, newPass, awt){
  oldPass = encodeURI(oldPass);
  newPass = encodeURI(newPass);
  console.log(`${path}/php/api.php?key=${key()}&changePassword=${encodeURIComponent(email)}&oldPass=${encodeURIComponent(oldPass)}&newPass=${encodeURIComponent(newPass)}`);
  //Se obtiene el JSON de resultados:
  let response = await fetch(`${path}/php/api.php?key=${key()}&changePassword=${encodeURIComponent(email)}&oldPass=${encodeURIComponent(oldPass)}&newPass=${encodeURIComponent(newPass)}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// SEND_NEW_PASS: FUNCIÓN ENVIAR NUEVA CONTRASEÑA A TRAVÉS DE LA API
async function sendNewPass(email, awt){
  console.log(`${path}/php/api.php?key=${key()}&sendNewPass=${encodeURIComponent(email)}`);
  //Se obtiene el JSON de resultados:
  let response = await fetch(`${path}/php/api.php?key=${key()}&sendNewPass=${encodeURIComponent(email)}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// STATS: FUNCIÓN RECUPERAR STADÍSTICAS DE LA PÁGINA WEB A TRAVÉS DE LA API
async function getStats(awt){
  console.log(`${path}/php/api.php?key=${key()}&stats=1`);
  //Se obtiene el JSON de resultados:
  let response = await fetch(`${path}/php/api.php?key=${key()}&stats=1`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// SEND_ADMIN_MESSAGE: FUNCIÓN ENVIAR CORREOS AL ADMINISTRADOR A TRAVÉS DE LA API
async function sendAdminMessage(awt,email,asunto,mensaje,nombre="Anónimo"){
  console.log(`${path}/php/api.php?key=${key()}&sendAdminMessage=1&email=${encodeURIComponent(email)}&asunto=${encodeURIComponent(asunto)}&mensaje=${encodeURIComponent(mensaje)}&nombre=${encodeURIComponent(nombre)}`);
  //Se obtiene el JSON de resultados:
  let response = await fetch(`${path}/php/api.php?key=${key()}&sendAdminMessage=1&email=${encodeURIComponent(email)}&asunto=${encodeURIComponent(asunto)}&mensaje=${encodeURIComponent(mensaje)}&nombre=${encodeURIComponent(nombre)}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}

// DBACTIONS: REALIZAR ACCIONES GENERALES SOBRE LA BASE DE DATOS A TRAVÉS DE LA API
async function dbAction(elm,awt,...params){
  params = encodeParams(params);

  let url = `${path}/php/api.php?key=${key()}&${elm}=1`;
  //Se seleccionan los filtros y sus valores:
  //if(params) for(let e of params) url += `&${e[0]}=${(typeof(e[1])=='string')?e[1].replaceAll("&","%26"):e[1]}`;
  if(params) for(let e of params) url += `&${e[0]}=${e[1]}`;
  //Se obtiene el JSON de resultados:
  console.log(url)
  let response = await fetch(url,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  if(elm=='csvExportTable') response = await response.blob();
  else response = await response.json();
  console.log(response);
  if(awt) return response;
  return Promise.resolve(response);
}