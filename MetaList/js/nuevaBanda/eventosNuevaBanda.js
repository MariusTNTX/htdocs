let filas = {
  tbodyEtapas: `<th><button type="button" class="btn btn-danger eliminar eliminar-fila">x</button></th><td><input type="number" class="form-control anioInicBan" name="anioInicEtaBan[]" min="1965" max="2023"></td><td><input type="number" class="form-control anioFinBan" name="anioFin[]" min="1965" max="2023"></td><td><select class="form-select tipoEtaBan" name="tipoEtaBan[]" aria-label="Default select example"><option value="En Activo">Activo</option><option value="En Hiato">Hiato</option></select></td>`,
  tbodyTemas: `<th><button type="button" class="btn btn-danger eliminar eliminar-fila">x</button></th><td><input type="text" class="form-control temaLetra" name="temaLetra[]"></td>`,
  tbodyEstudios: `<th><button type="button" class="btn btn-danger eliminar eliminar-fila">x</button></th><td><input type="text" value="" class="form-control nomEstBan" name="nomEstBan[]"></td><td><input type="text" value="" class="form-control paisEstBan" name="paisEstBan[]"></td><td><input type="text" value="" class="form-control origenEstBan" name="origenEstBan[]"></td>`,
  tbodyAlbumes: `<div class="card mb-3"><div class="card-body"><div class="row"><div class="col-12 col-md-4 col-lg-0 col-xl-3"></div><div class="col-12 col-md-4 col-lg-12 col-xl-6 mb-2"><h5 class="card-title text-center"><span class="text-dark">Nuevo Álbum</span><button type="button" class="a$id btn btn-danger ms-2 eliminar eliminar-etiqueta eliminarAlb">x</button></h5></div><div class="col-12 col-md-4 col-lg-12 col-xl-3 mb-2"><div class="more p-0 text-center text-xl-end"><button class="btn btn-primary btnGenPropAlb a$id" id="a$id" disabled data-bs-toggle="modal" data-bs-target="#albPropModal">Generar Propuesta</button></div></div></div><div class="card-text"><div class="row"><!-- Columna 1 --><div class="col-12 col-xl-4"><div class="row"><div class="col-12 my-1"><div class="form-floating"><input type="text" value="" class="form-control nombreAlb a$id" name="nombreAlb[]" placeholder="."><label for="nombreAlb">Nombre</label></div></div></div><div class="row">
                 <div class="col-12 my-1"><div class="row"><div class="col-4 form-floating pe-1"><input type="number" value="" class="form-control diaAlb a$id" name="diaAlb[]" min="0" max="31" placeholder="."><label for="diaAlb" class="ps-4">Día</label></div><div class="col-4 form-floating px-1"><input type="number" value="" class="form-control mesAlb a$id" name="mesAlb[]" min="1" max="12" placeholder="."><label for="mesAlb" class="ps-3">Mes</label></div><div class="col-4 form-floating ps-1"><input type="number" value="" class="form-control anioAlb a$id" name="anioAlb[]" minlength="4" maxlength="4" placeholder="."><label for="anioAlb" class="ps-3">Año</label></div></div></div></div><div class="row"><div class="col-12 col-sm-6 my-1"><select class="form-select tipoAlb py-3 a$id" name="tipoAlb[]" aria-label="Default select example"><option value="Estudio">Estudio</option><option value="EP">EP</option><option value="En Vivo">En Directo</option>
                 <option value="Recopilatorio">Recopilatorio</option><option value="BoxSet">Box Set</option></select></div><div class="col-12 col-sm-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control imgAlb a$id" name="imgAlb[]" placeholder="."><label for="imgAlb">Imagen</label></div></div></div><div class="row"><div class="col-12 col-sm-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control escuchAlb a$id" name="escuchAlb[]" placeholder="."><label for="escuchAlb">Escuchas Spotify</label></div></div><div class="col-12 col-sm-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control duracAlb a$id" name="duracAlb[]" placeholder="."><label for="duracAlb">Duración</label></div></div></div><div class="row"><div class="col-12 col-sm-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control linkSpotAlb a$id" name="linkSpotAlb[]" placeholder=".">
                 <label for="linkSpotAlb">Iframe Spotify</label></div></div><div class="col-12 col-sm-6 my-1"><div class="form-floating position-relative"><input type="text" value="" class="form-control amazonAlb a$id" name="amazonAlb[]" placeholder="."><label for="amazonAlb">Link Amazon</label><a class="position-absolute top-50 end-0 translate-middle-y me-3" href="https://www.amazon.es/" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></a></div></div></div><div class="row"><div class="col-12 my-1"><div class="form-floating mb-3"><textarea class="form-control descripAlb a$id" placeholder="." name="descripAlb[]" style="height: 206px"></textarea><label for="descripAlb">
                 Descripción</label></div></div></div></div><!-- Columna 2 --><div class="col-12 col-xl-4"><div class="row px-3"><table class="table table-sm"><thead><tr><th scope="col"><button type="button" class="btn btn-success addGenAlb anadir-fila">+</button></th><th scope="col">Género</th><th scope="col">Estrellas</th></tr></thead><tbody class="table-group-divider tbodyGenerosAlb a$id" id="tbodyGenerosAlb-$id"></tbody></table></div><div class="row px-3"><table class="table table-sm"><thead><tr><th scope="col"><button type="button" class="btn btn-success addCanAlb anadir-fila">+</button></th><th scope="col">Canción</th><th scope="col">Estrellas</th></tr></thead><tbody class="table-group-divider tbodyCancionesAlb a$id" id="tbodyCancionesAlb-$id"></tbody></table></div></div><!-- Columna 3 --><div class="col-12 col-xl-4"><div class="row px-3"><table class="table table-sm"><thead><tr><th scope="col"><button type="button" class="btn btn-success addDiscAlb anadir-fila">
                 +</button></th><th scope="col" class="w-100">Discográfica</th></tr></thead><tbody class="table-group-divider tbodyDiscograficasAlb a$id" id="tbodyDiscograficasAlb-$id"></tbody></table></div><div class="row px-3"><table class="table table-sm"><thead><tr><th scope="col"><button type="button" class="btn btn-success addEstAlb anadir-fila">+</button></th><th scope="col" class="w-100">Estudio<a href="#" class="ms-1 btnEstExtr" id="e$id" data-bs-toggle="modal" data-bs-target="#estExtrModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16"><path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/></svg></a><p class="d-none txtEstAlb a$id"></p></th></tr></thead><tbody class="table-group-divider tbodyEstudiosAlb a$id" id="tbodyEstudiosAlb-$id">
                 </tbody></table></div><div class="row px-3"><table class="table table-sm"><thead><tr><th scope="col"><button type="button" class="btn btn-success addMusAlb anadir-fila">+</button></th><th scope="col">Músico</th><th scope="col">Roles</th></tr></thead><tbody class="table-group-divider tbodyRolesAlb a$id" id="tbodyRolesAlb-$id"></tbody></table></div></div></div></div></div></div>`,
  tbodyGenerosAlb: `<th><button type="button" class="btn btn-danger eliminar-fila">x</button></th><td class="w-75"><input type="text" value="" class="form-control genAlb" name="genAlb[]"></td><td><input type="number" value="" class="form-control estrGenAlb" name="estrGenAlb[]" min="0" max="5"></td>`,
  tbodyCancionesAlb: `<th><button type="button" class="btn btn-danger eliminar-fila">x</button></th><td class="w-75"><input type="text" value="" class="form-control nomCanAlb" name="nomCanAlb[]"></td><td><input type="number" value="" class="form-control estrCanAlb" name="estrCanAlb[]"></td>`,
  tbodyDiscograficasAlb: `<th><button type="button" class="btn btn-danger eliminar eliminar-fila">x</button></th><td><input type="text" value="" class="form-control discAlb" name="discAlb[]"></td>`,
  tbodyEstudiosAlb: `<th><button type="button" class="btn btn-danger eliminar eliminar-fila">x</button></th><td><input type="text" value="" class="form-control estAlb" name="estAlb[]"></td>`,
  tbodyRolesAlb: `<th><button type="button" class="btn btn-danger eliminar eliminar-fila">x</button></th><td><input type="text" value="" class="form-control musAlb" name="musAlb[]"></td><td><input type="text" value="" class="form-control rolesMusAlb" name="rolesMusAlb[]"></td>`,
  tbodyMusicos: `<div class="card mb-3"><div class="card-body"><h5 class="card-title text-center"><span class="text-dark">Nuevo Músico</span><button type="button" class="a$id btn btn-danger ms-2 eliminar eliminar-etiqueta eliminarMus">x</button></h5><div class="more p-0 text-center mb-2"><button class="btn btn-primary btnGenPropMus a$id" id="a$id" disabled data-bs-toggle="modal" data-bs-target="#musPropModal">Generar Propuesta</button></div><div class="card-text"><div class="row"><div class="col-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control nombreMus a$id" name="nombreMus[]" placeholder="."><label for="nombreMus">Nombre</label></div></div><div class="col-6 my-1"><select class="form-select py-3 sexoMus a$id" name="sexoMus[]" aria-label="Default select example"><option value="Hombre">Hombre</option><option value="Mujer">Mujer</option></select></div></div><div class="row"><div class="col-12 my-1"><div class="form-floating">
                 <input type="text" value="" class="form-control imgMus a$id" name="imgMus[]" placeholder="."><label for="imgMus">Imagen</label></div></div></div><div class="row"><div class="col-12 my-1"><p class="text-center fw-bold bg-transparent mb-0">Fecha de Nacimiento</p><div class="row"><div class="col-4 form-floating pe-1"><input type="number" value="" class="form-control diaNacMus a$id" name="diaNacMus[]" min="0" max="31" placeholder="."><label for="diaNacMus" class="ps-4">Día</label></div><div class="col-4 form-floating px-1"><input type="number" value="" class="form-control mesNacMus a$id" name="mesNacMus[]" min="1" max="12" placeholder="."><label for="mesNacMus" class="ps-3">Mes</label></div><div class="col-4 form-floating ps-1"><input type="number" value="" class="form-control anioNacMus a$id" name="anioNacMus[]" minlength="4" maxlength="4" placeholder="."><label for="anioNacMus" class="ps-3">Año</label></div></div></div></div><div class="row">
                 <div class="col-12 my-1"><p class="text-center fw-bold bg-transparent mb-0">Fecha de Defunción</p><div class="row"><div class="col-4 form-floating pe-1"><input type="number" value="" class="form-control diaDefMus a$id" name="diaDefMus[]" min="0" max="31" placeholder="."><label for="diaDefMus" class="ps-4">Día</label></div><div class="col-4 form-floating px-1"><input type="number" value="" class="form-control mesDefMus a$id" name="mesDefMus[]" min="1" max="12" placeholder="."><label for="mesDefMus" class="ps-3">Mes</label></div><div class="col-4 form-floating ps-1"><input type="number" value="" class="form-control anioDefMus a$id" name="anioDefMus[]" minlength="4" maxlength="4" placeholder="."><label for="anioDefMus" class="ps-3">Año</label></div></div></div></div><div class="row"><div class="col-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control paisMus a$id" name="paisMus[]" placeholder="."><label for="paisMus">
                 País</label></div></div><div class="col-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control origenMus a$id" name="origenMus[]" placeholder="."><label for="origenMus">Origen</label></div></div></div><div class="row px-3"><table class="table table-sm"><thead><tr><th scope="col"><button type="button" class="btn btn-success addEtapaMusBan anadir-fila">+</button></th><th scope="col">Año Inicio</th><th scope="col">Año Fin</th></tr></thead><tbody class="table-group-divider tbodyEtapasMus a$id" id="tbodyEtapasMus-$id"></tbody></table></div></div></div></div>`,
  tbodyEtapasMus: `<th><button type="button" class="btn btn-danger eliminar-fila">x</button></th><td><input type="number" value="" class="form-control anioInicMus" name="anioInicMus[]" min="1965" max="2023"></td><td><input type="number" value="" class="form-control anioFinMus" name="anioFinMus[]" min="1965" max="2023"></td>`,
  tbodyDiscograficas: `<div class="card mb-3"><div class="card-body"><h5 class="card-title text-center"><span class="text-dark">Nueva Discográfica</span><button type="button" class="a$id btn btn-danger ms-2 eliminar eliminar-etiqueta eliminarDisc">x</button></h5><div class="more p-0 text-center mb-2"><button class="btn btn-primary btnGenPropDisc a$id" id="a$id" disabled data-bs-toggle="modal" data-bs-target="#discPropModal">Generar Propuesta</button></div><div class="card-text"><div class="row"><div class="col-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control nombreDisc a$id" name="nombreDisc[]" placeholder="."><label for="nombreDisc">Nombre</label></div></div><div class="col-6 my-1"><select class="form-select py-3 estatusDisc a$id" name="estatusDisc[]" aria-label="Default select example"><option value="En Activo">En Activo</option><option value="Inactivo">Inactivo</option></select></div></div><div class="row"><div class="col-12 my-1"><div class="form-floating">
                       <input type="text" value="" class="form-control imgDisc a$id" name="imgDisc[]" placeholder="."><label for="imgDisc">Imagen</label></div></div></div><div class="row"><div class="col-12 my-1"><div class="form-floating"><input type="text" value="" class="form-control webDisc a$id" name="webDisc[]" placeholder="."><label for="webDisc">Página Web</label></div></div></div><div class="row"><div class="col-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control paisDisc a$id" name="paisDisc[]" placeholder="."><label for="paisDisc">País</label></div></div><div class="col-6 my-1"><div class="form-floating"><input type="text" value="" class="form-control direcDisc a$id" name="direcDisc[]" placeholder="."><label for="direcDisc">Dirección</label></div></div></div></div></div></div>`
};

function delFila(elm){
  elm.parentElement.parentElement.parentElement.removeChild(elm.parentElement.parentElement);
}

function addFila(elm){
  let tbody = elm.parentElement.parentElement.parentElement.nextElementSibling;
  let name = tbody.id.replaceAll(/-[\d]{1,2}/g,"");
  console.log(tbody)
  console.log(name)
  let fila = document.createElement("tr");
  fila.innerHTML = filas[name];
  //Añadir Eventos de Deletes
  fila.querySelector(".eliminar-fila").addEventListener("click",(e)=>delFila(e.target));
  tbody.appendChild(fila);
}

function delEtiqueta(elm){
  let tipo = elm.previousElementSibling.innerHTML;
  console.log(tipo)
  let tbody, id = elm.classList[0].substring(1);
  console.log(id)
  if(tipo.includes("Álbum")) tbody = document.getElementById("tbodyAlbumes");
  else if(tipo.includes("Músico")) tbody = document.getElementById("tbodyMusicos");
  else if(tipo.includes("Discográfica")) tbody = document.getElementById("tbodyDiscograficas");
  else alert("Error al identificar la etiqueta a eliminar");
  tbody.removeChild(tbody.querySelector(".etiqueta.a"+id));
}

function addEtiqueta(elm){
  let tbody = elm.parentElement.previousElementSibling.firstElementChild;
  let name = tbody.id.replaceAll(/-[\d]{1,2}/g,"");
  console.log(tbody)
  console.log(name)
  let fila = document.createElement("div");
  let id=0;
  if(tbody.lastElementChild) id = parseInt(tbody.lastElementChild.classList[0].substring(1)) + 1;
  //Añadir IDs
  if(name == "tbodyAlbumes") fila.classList.add("a"+id,"etiqueta","album","col-12","col-lg-6","col-xl-12","my-2");
  else if(name == "tbodyMusicos") fila.classList.add("a"+id,"etiqueta","musico","col-12","col-md-6","col-xl-4","my-2");
  else if(name == "tbodyDiscograficas") fila.classList.add("a"+id,"etiqueta","discografica","col-12","col-md-6","col-xl-4","my-2");
  fila.innerHTML = filas[name].replaceAll("$id",id);
  //Añadir Eventos
  for(let btn of fila.querySelectorAll(".eliminar-fila")) btn.addEventListener("click",(e)=>delFila(e.target));
  for(let btn of fila.querySelectorAll(".anadir-fila")) btn.addEventListener("click",(e)=>addFila(e.target));
  fila.querySelector(".eliminar-etiqueta").addEventListener("click",(e)=>delEtiqueta(e.target));
  if(name == "tbodyAlbumes") fila.querySelector(".nombreAlb").addEventListener("keyup",(e)=>{enableProp(e, fila.querySelector(".btnGenPropAlb"))});
  else if(name == "tbodyMusicos") fila.querySelector(".nombreMus").addEventListener("keyup",(e)=>{enableProp(e, fila.querySelector(".btnGenPropMus"))});
  else if(name == "tbodyDiscograficas") fila.querySelector(".nombreDisc").addEventListener("keyup",(e)=>{enableProp(e, fila.querySelector(".btnGenPropDisc"))});
  tbody.appendChild(fila);
}

function generarPropuesta(e){
  e.preventDefault();
  let id = e.target.id.substring(1);
  let clase = e.target.classList[2];
  let tipo = "";
  if(clase.includes("Alb")) tipo = "Alb";
  else if(clase.includes("Mus")) tipo = "Mus";
  else if(clase.includes("Disc")) tipo = "Disc";
  document.getElementById("idProp"+tipo).innerHTML = id;
  generarEnlaceAlb(document.querySelector(".nombre"+tipo+".a"+id).value, banda);
}

function cargarPropuesta(e){
  e.preventDefault();
  let tipo = "";
  if(clase.includes("Alb")) tipo = "Alb";
  else if(clase.includes("Mus")) tipo = "Mus";
  else if(clase.includes("Disc")) tipo = "Disc";
  if(propText.value.length>0){
    let txt = document.getElementById(tipo.toLowerCase()+"PropText").value;
    let id = document.getElementById("idProp"+tipo).textContent;
    if(tipo=="Alb") cargarPropuestaAlbum(txt, id);
    else if(tipo=="Mus") cargarPropuestaMusico(txt, id);
    else if(tipo=="Disc") cargarPropuestaDiscografica(txt, id);
    console.log(banda);
    console.log(albumes);
  } else alert("Debes incluir contenido HTML");
  propText.value = "";
}

function cargarPropuestaAlbum(txt, id){
  albumes[id].imagen = getImagenAlbMA(txt, id);
  let fecha = getFechaAlbMA(txt, id);
  albumes[id].anio = fecha.anio;
  albumes[id].mes = fecha.mes;
  albumes[id].dia = fecha.dia;
  albumes[id].tipo = getTipoAlbMA(txt, id);
  albumes[id].duracion = getDuracionAlbMA(txt, id);
  albumes[id].discograficas = getDiscograficaAlbMA(txt, id);
  albumes[id].musicos = getMusicosAlbMA(txt, id);
  addTxtEstudiosAlbMA(txt, id);
  traducirRolesAlbum(albumes[id].musicos.map(mus=>mus = mus.roles), id);
  fetch(`http://ws.audioscrobbler.com/2.0/?method=album.getinfo&artist=${banda.info.nombre}&album=${albumes[id].nombre}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`)
    .then(data=>data.json())
    .then(data=>traducirDescrip(data.album.wiki.content, document.querySelector(".descripAlb.a"+id)))
    .catch(error=>alert("Error en la traducción de la descripción de la banda"));
}

function cargarPropuestaMusico(txt, id){
  let nomMus = document.querySelector(".nombreMus.a"+id).value;
  banda.musicos.map(mus=>{if(mus.nombre==nomMus) mus.sexo = getSexoMusMA(txt, id);})
  banda.musicos.map(mus=>{if(mus.nombre==nomMus) mus.imagen = getImagenMusMA(txt, id);})
  banda.musicos.map(mus=>{if(mus.nombre==nomMus) mus.fechaNac = getFechaNacMusMA(txt, id);})
  banda.musicos.map(mus=>{if(mus.nombre==nomMus) mus.fechaDef = getFechaDefMusMA(txt, id);})
  traducirPaisOrigen("mus", nomMus, getPaisMusMA(txt, id), getOrigenMusMA(txt, id), document.querySelector(".paisMus.a"+id), document.querySelector(".origenMus.a"+id));
}

function cargarPropuestaDiscografica(txt, id){
  banda.discograficas[id].estatus = getEstatusDiscMA(txt, id);
  banda.discograficas[id].imagen = getImagenDiscMA(txt, id);
  banda.discograficas[id].linkWeb = getWebDiscMA(txt, id);
  traducirPaisOrigen("disc", id, getPaisDiscMA(txt, id), getOrigenDiscMA(txt, id), document.querySelector(".paisDisc.a"+id), document.querySelector(".direcDisc.a"+id));
}

function enableProp(e, target){
  if(e.target.value.length>0 && target.hasAttribute("disabled")) target.removeAttribute("disabled");
  else if(e.target.value.length==0 && !target.hasAttribute("disabled")) target.setAttribute("disabled","true");
}

function getDuracion(tiempo){
  tiempo = tiempo.trim().split(":");
  if(tiempo.length==2) return parseInt(tiempo[0])*60+parseInt(tiempo[1]);
  else if(tiempo.length==3) return parseInt(tiempo[0])*60*60+parseInt(tiempo[1])*60+parseInt(tiempo[2]);
  return 0;
}

function getInfoBan(){
  let result = {};
  result.nombre = document.getElementById("nombreBan").value.replaceAll("'","\'");
  result.pais = document.getElementById("paisBan").value.replaceAll("'","\'");
  result.origen = document.getElementById("origenBan").value.replaceAll("'","\'");
  result.descrip = document.getElementById("descripcBan").value.replaceAll("'","\'").replaceAll('"','\"');
  result.estatus = document.getElementById("estatusBan").value.replaceAll("'","\'");
  result.imagen = document.getElementById("imagenBan").value.replaceAll("'","\'");
  result.escuchas = document.getElementById("escuchasBan").value;
  result.linkSpotify = document.getElementById("spotifyBan").value;
  result.linkWeb = document.getElementById("webBan").value;
  return result;
}

function getEtapasBan(){
  let result = [];
  for(let row of document.getElementById("tbodyEtapas").children){
    result.push({
      anioInic: row.querySelector(".anioInicBan").value,
      anioFin: row.querySelector(".anioFinBan").value,
      tipo: row.querySelector(".tipoEtaBan").value
    });
  }
  return result;
}

function getTemasBan(){
  let result = [];
  for(let row of document.getElementById("tbodyTemas").children){
    result.push({nombre: row.querySelector(".temaLetra").value.replaceAll("'","\'")});
  }
  return result;
}

function getEstudiosBan(){
  let result = [];
  for(let row of document.getElementById("tbodyEstudios").children){
    result.push({
      nombre: row.querySelector(".nomEstBan").value.replaceAll("'","\'"),
      pais: row.querySelector(".paisEstBan").value.replaceAll("'","\'"),
      origen: row.querySelector(".origenEstBan").value.replaceAll("'","\'")
    });
  }
  return result;
}

function getAlbumBan(elm){
  let result = {};
  result.nombre = elm.querySelector(".nombreAlb").value.replaceAll("'","\'");
  result.dia = elm.querySelector(".diaAlb").value;
  result.mes = elm.querySelector(".mesAlb").value;
  result.anio = elm.querySelector(".anioAlb").value;
  result.tipo = elm.querySelector(".tipoAlb").value;
  result.imagen = elm.querySelector(".imgAlb").value;
  result.escuchas = elm.querySelector(".escuchAlb").value;
  result.duracion = getDuracion(elm.querySelector(".duracAlb").value);
  result.iframe = elm.querySelector(".linkSpotAlb").value;
  result.linkAmazon = elm.querySelector(".amazonAlb").value;
  result.descrip = elm.querySelector(".descripAlb").value.replaceAll("'","\'").replaceAll('"','\"');
  result.generos = [];
  for(let row of elm.querySelector(".tbodyGenerosAlb").children){
    result.generos.push({
      nombre: row.querySelector(".genAlb").value.replaceAll("'","\'"),
      estrellas: row.querySelector(".estrGenAlb").value
    });
  }
  result.canciones = [];
  for(let row of elm.querySelector(".tbodyCancionesAlb").children){
    result.canciones.push({
      nombre: row.querySelector(".nomCanAlb").value.replaceAll("'","\'"),
      estrellas: row.querySelector(".estrCanAlb").value
    });
  }
  result.discograficas = [];
  for(let row of elm.querySelector(".tbodyDiscograficasAlb").children){
    result.discograficas.push({nombre: row.querySelector(".discAlb").value.replaceAll("'","\'")});
  }
  result.estudios = [];
  for(let row of elm.querySelector(".tbodyEstudiosAlb").children){
    result.estudios.push({nombre: row.querySelector(".estAlb").value.replaceAll("'","\'")});
  }
  result.musicos = [];
  for(let row of elm.querySelector(".tbodyRolesAlb").children){
    result.musicos.push({
      nombre: row.querySelector(".musAlb").value.replaceAll("'","\'"),
      roles: row.querySelector(".rolesMusAlb").value.replaceAll("'","\'")
    });
  }
  return result;
}

function getAlbumesBan(){
  let result = [];
  for(let alb of document.getElementById("tbodyAlbumes").children){
    result.push(getAlbumBan(alb));
  }
  return result;
}

function getMusicosBan(){
  let result = [];
  for(let mus of document.getElementById("tbodyMusicos").children){
    let res = {
      nombre: mus.querySelector(".nombreMus").value.replaceAll("'","\'"),
      sexo: mus.querySelector(".sexoMus").value,
      imagen: mus.querySelector(".imgMus").value,
      fechaNac: {
        dia: mus.querySelector(".diaNacMus").value,
        mes: mus.querySelector(".mesNacMus").value,
        anio: mus.querySelector(".anioNacMus").value
      },
      fechaDef: {
        dia: mus.querySelector(".diaDefMus").value,
        mes: mus.querySelector(".mesDefMus").value,
        anio: mus.querySelector(".anioDefMus").value
      },
      pais: mus.querySelector(".paisMus").value.replaceAll("'","\'"),
      origen: mus.querySelector(".origenMus").value.replaceAll("'","\'"),
      etapas: []
    };
    for(let row of mus.querySelector(".tbodyEtapasMus").children){
      res.etapas.push({
        anioInic: row.querySelector(".anioInicMus").value,
        anioFin: row.querySelector(".anioFinMus").value
      });
    }
    result.push(res);
  }
  return result;
}

function getDiscograficasBan(){
  let result = [];
  for(let disc of document.getElementById("tbodyDiscograficas").children){
    result.push({
      nombre: disc.querySelector(".nombreDisc").value.replaceAll("'","\'"),
      estatus: disc.querySelector(".estatusDisc").value.replaceAll("'","\'"),
      imagen: disc.querySelector(".imgDisc").value,
      linkWeb: disc.querySelector(".webDisc").value,
      pais: disc.querySelector(".paisDisc").value.replaceAll("'","\'"),
      origen: disc.querySelector(".direcDisc").value.replaceAll("'","\'")
    });
  }
  return result;
}

//Eventos Habilitar/Deshabilitar Botones Buscar y Generar Propuesta
nombreBan.addEventListener("keyup",(e)=>{
  enableProp(e, buscarBan);
  enableProp(e, btnGenProp);
});

//Eventos Iniciales de Botones Eliminar Fila
for(let btn of document.querySelectorAll(".eliminar-fila")) btn.addEventListener("click",(e)=>delFila(e.target));
//Eventos Iniciales de Botones Añadir Fila
for(let btn of document.querySelectorAll(".anadir-fila")) btn.addEventListener("click",(e)=>addFila(e.target));
//Eventos Iniciales de Botones Eliminar Etiqueta
for(let btn of document.querySelectorAll(".eliminar-etiqueta")) btn.addEventListener("click",(e)=>delEtiqueta(e.target));
//Eventos Iniciales de Botones Añadir Etiqueta
for(let btn of document.querySelectorAll(".anadir-etiqueta")) btn.addEventListener("click",(e)=>addEtiqueta(e.target));

//BOTÓN GUARDAR
document.getElementById("btnGuardar").addEventListener("click",()=>{
  let body = {
    info: getInfoBan(),
    etapas: getEtapasBan(),
    temas: getTemasBan(),
    estudios: getEstudiosBan(),
    albumes: getAlbumesBan(),
    musicos: getMusicosBan(),
    discograficas: getDiscograficasBan()
  };
  console.log("BODY:")
  console.log(body)
  post("fullBand",body).then(data=>console.log(data)).catch(error=>alert("Error al procesar la transacción"));
});