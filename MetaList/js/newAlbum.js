function generarEnlaceAlb(album, banda){
  if(album.length>0){
    let urlAlbum = album.trim().toLowerCase().replaceAll(" ","_").replaceAll(":","_-");
    let urlBand = banda.trim().toLowerCase().replaceAll(" ","_");
    document.getElementById("enlacePropAlb").innerHTML = `<a href="https://www.metal-archives.com/albums/${urlBand}/${urlAlbum}" target="_blank">Metallum - ${album}</a>`;
  }
}

function addNewAlbum(band, album, id){
  //Provisional -----------
  album.duracion = "";
  album.musicos = [];
  album.discograficas = [];
  album.estudios = [];
  album.imagen = "";
  album.escuchas = "";
  album.linkspotify = "";
  album.linkamazon = "";
  album.descrip = "";
  album.dia = "";
  album.mes = "";
  album.tipo = "";
  albumes[id] = album;
  console.log(band)
  //-----------------------
  let tbodyAlbumes = document.getElementById("tbodyAlbumes");
  let elm = document.createElement("div");
  elm.classList.add("a"+id,"etiqueta","album","col-12","col-lg-6","col-xl-12","my-2");
  let txt = `
    <div class="card mb-3">
    <div class="card-body">
    <div class="row">
      <div class="col-12 col-md-4 col-lg-0 col-xl-3"></div>
        <div class="col-12 col-md-4 col-lg-12 col-xl-6 mb-2">
          <h5 class="card-title text-center">
            <span class="text-dark">Nuevo Álbum</span>
            <button type="button" class="a${id} btn btn-danger ms-2 eliminar eliminar-etiqueta eliminarAlb">x</button>
          </h5>
        </div>
        <div class="col-12 col-md-4 col-lg-12 col-xl-3 mb-2">
          <div class="more p-0 text-center text-xl-end">
            <button class="btn btn-primary btnGenPropAlb a${id}" id="a${id}" data-bs-toggle="modal" data-bs-target="#albPropModal">Generar Propuesta</button>
          </div>
        </div>
      </div>
      <div class="card-text">
        <div class="row">
          <!-- Columna 1 -->
          <div class="col-12 col-xl-4">
            <div class="row">
              <div class="col-12 my-1">
                <div class="form-floating">
                  <input type="text" value="${(album.nombre)?album.nombre:""}" class="form-control nombreAlb a${id}" name="nombreAlb[]" placeholder=".">
                  <label for="nombreAlb">Nombre</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 my-1">
                <div class="row">
                  <div class="col-4 form-floating pe-1">
                    <input type="number" value="${(album.dia)?album.dia:""}" class="form-control diaAlb a${id}" name="diaAlb[]" min="0" max="31" placeholder=".">
                    <label for="diaAlb" class="ps-4">Día</label>
                  </div>
                  <div class="col-4 form-floating px-1">
                    <input type="number" value="${(album.mes)?album.mes:""}" class="form-control mesAlb a${id}" name="mesAlb[]" min="1" max="12" placeholder=".">
                    <label for="mesAlb" class="ps-3">Mes</label>
                  </div>
                  <div class="col-4 form-floating ps-1">
                    <input type="number" value="${(album.anio)?album.anio:""}" class="form-control anioAlb a${id}" name="anioAlb[]" minlength="4" maxlength="4" placeholder=".">
                    <label for="anioAlb" class="ps-3">Año</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-6 my-1">
                <select class="form-select tipoAlb py-3 a${id}" name="tipoAlb[]" aria-label="Default select example">
                  <option value="Estudio" ${(album.tipo=='Estudio') ? "selected" : ""}>Estudio</option>
                  <option value="EP" ${(album.tipo=='EP') ? "selected" : ""}>EP</option>
                  <option value="En Vivo" ${(album.tipo=='En Vivo') ? "selected" : ""}>En Directo</option>
                  <option value="Recopilatorio" ${(album.tipo=='Recopilatorio') ? "selected" : ""}>Recopilatorio</option>
                  <option value="BoxSet" ${(album.tipo=='BoxSet') ? "selected" : ""}>Box Set</option>
                </select>
              </div>
              <div class="col-12 col-sm-6 my-1">
                <div class="form-floating">
                  <input type="text" value="${(album.imagen)?album.imagen:""}" class="form-control imgAlb a${id}" name="imgAlb[]" placeholder=".">
                  <label for="imgAlb">Imagen</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-6 my-1">
                <div class="form-floating">
                  <input type="text" value="${(album.escuchas)?album.escuchas:""}" class="form-control escuchAlb a${id}" name="escuchAlb[]" placeholder=".">
                  <label for="escuchAlb">Escuchas Spotify</label>
                </div>
              </div>
              <div class="col-12 col-sm-6 my-1">
                <div class="form-floating">
                  <input type="text" value="${(album.duracion)?album.duracion:""}" class="form-control duracAlb a${id}" name="duracAlb[]" placeholder=".">
                  <label for="duracAlb">Duración</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-sm-6 my-1">
                <div class="form-floating">
                  <input type="text" value="${(album.linkspotify)?album.linkspotify:""}" class="form-control linkSpotAlb a${id}" name="linkSpotAlb[]" placeholder=".">
                  <label for="linkSpotAlb">Iframe Spotify</label>
                </div>
              </div>
              <div class="col-12 col-sm-6 my-1">
                <div class="form-floating position-relative">
                  <input type="text" value="${(album.linkamazon)?album.linkamazon:""}" class="form-control amazonAlb a${id}" name="amazonAlb[]" placeholder=".">
                  <label for="amazonAlb">Link Amazon</label>
                  <a class="position-absolute top-50 end-0 translate-middle-y me-3" href="https://www.amazon.es/s?k=${band.replaceAll(" ","+").toLowerCase()}+${album.nombre.replaceAll(" ","+").toLowerCase()}&__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=O6YJGRJX0RNI&sprefix=${band.replaceAll(" ","+").toLowerCase()}+${album.nombre.replaceAll(" ","+").toLowerCase()}%2Caps%2C73&ref=nb_sb_noss" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 my-1">
                <div class="form-floating mb-3">
                  <textarea class="form-control descripAlb a${id}" placeholder="." name="descripAlb[]" style="height: 206px">${(album.descrip)?album.descrip:""}</textarea>
                  <label for="descripAlb">Descripción</label>
                </div>
              </div>
            </div>
          </div>
          <!-- Columna 2 -->
          <div class="col-12 col-xl-4">
            <div class="row px-3">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col"><button type="button" class="btn btn-success addGenAlb anadir-fila">+</button></th>
                    <th scope="col">Género</th>
                    <th scope="col">Estrellas</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider tbodyGenerosAlb a${id}" id="tbodyGenerosAlb-${id}">`;
          for(let genero of album.generos){
            txt+=`<tr>
                    <th><button type="button" class="btn btn-danger eliminar-fila">x</button></th>
                    <td class="w-75"><input type="text" value="${(genero.nombre)?genero.nombre:""}" class="form-control genAlb" name="genAlb[]"></td>
                    <td><input type="number" value="${(genero.estrellas)?genero.estrellas:""}" class="form-control estrGenAlb" name="estrGenAlb[]" min="0" max="5"></td>
                  </tr>`;
          }
          txt+=`</tbody>
              </table>
            </div>
            <div class="row px-3">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col"><button type="button" class="btn btn-success addCanAlb anadir-fila">+</button></th>
                    <th scope="col">Canción</th>
                    <th scope="col">Estrellas</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider tbodyCancionesAlb a${id}" id="tbodyCancionesAlb-${id}">`;
          for(let cancion of album.canciones){
            txt+=`<tr>
                    <th><button type="button" class="btn btn-danger eliminar-fila">x</button></th>
                    <td class="w-75"><input type="text" value="${(cancion.nombre)?cancion.nombre:""}" class="form-control nomCanAlb" name="nomCanAlb[]"></td>
                    <td><input type="number" value="${(cancion.estrellas)?cancion.estrellas:""}" class="form-control estrCanAlb" name="estrCanAlb[]"></td>
                  </tr>`;
          }
          txt+=`</tbody>
              </table>
            </div>
          </div>
          <!-- Columna 3 -->
          <div class="col-12 col-xl-4">
            <div class="row px-3">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col"><button type="button" class="btn btn-success addDiscAlb anadir-fila">+</button></th>
                    <th scope="col" class="w-100">Discográfica</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider tbodyDiscograficasAlb a${id}" id="tbodyDiscograficasAlb-${id}">`;
          for(let discografica of album.discograficas){
            txt+=`<tr>
                    <th><button type="button" class="btn btn-danger eliminar-fila">x</button></th>
                    <td><input type="text" value="${(discografica.nombre)?discografica.nombre:""}" class="form-control discAlb" name="discAlb[]"></td>
                  </tr>`;
          }
          txt+=`</tbody>
              </table>
            </div>
            <div class="row px-3">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col"><button type="button" class="btn btn-success addEstAlb anadir-fila">+</button></th>
                    <th scope="col" class="w-100">
                      Estudio
                      <a href="#" class="ms-1 btnEstExtr" id="e${id}" data-bs-toggle="modal" data-bs-target="#estExtrModal">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                      </a>
                      <p class="d-none txtEstAlb a${id}"></p>
                    </th>
                  </tr>
                </thead>
                <tbody class="table-group-divider tbodyEstudiosAlb a${id}" id="tbodyEstudiosAlb-${id}">`;
          for(let estudio of album.estudios){
            txt+=`<tr>
                    <th><button type="button" class="btn btn-danger eliminar-fila">x</button></th>
                    <td><input type="text" value="${(estudio.nombre)?estudio.nombre:""}" class="form-control nomEstAlb" name="nomEstAlb[]"></td>
                  </tr>`;
          }
          txt+=`</tbody>
              </table>
            </div>
            <div class="row px-3">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col"><button type="button" class="btn btn-success addMusAlb anadir-fila">+</button></th>
                    <th scope="col">Músico</th>
                    <th scope="col">Roles</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider tbodyRolesAlb a${id}" id="tbodyRolesAlb-${id}">`;
          for(let musico of album.musicos){
            txt+=`<tr>
                    <th><button type="button" class="btn btn-danger eliminar-fila">x</button></th>
                    <td><input type="text" value="${(musico.nombre)?musico.nombre:""}" class="form-control nomMusAlb" name="nomMusAlb[]"></td>
                    <td><input type="text" value="${(musico.rol)?musico.rol:""}" class="form-control rolMusAlb" name="rolMusAlb[]"></td>
                  </tr>`;
          }
          txt+=`</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;

  elm.innerHTML = txt;

  //Generar Propuesta
  let btnGenPropAlb = elm.querySelector(".btnGenPropAlb");
  let idPropAlb = document.getElementById("idPropAlb");
  //Campos
  let nombreAlb = elm.querySelector(".nombreAlb");

  //BOTÓN PRE-MODAL GENERAR PROPUESTA ALBUM
  btnGenPropAlb.addEventListener("click",(e)=>{
    e.preventDefault();
    let id = e.target.id.substring(1);
    idPropAlb.innerHTML = id;
    generarEnlaceAlb(nombreAlb.value, band);
  });

  //BOTÓN PRE-MODAL EXTRAER ESTUDIOS
  elm.querySelector(".btnEstExtr").addEventListener("click",(e)=>{
    e.preventDefault();
    let id = e.currentTarget.id.substring(1);
    document.getElementById("idExtrEst").innerHTML = id;
    document.getElementById("estExtrText").innerHTML = document.querySelector(".txtEstAlb.a"+id).innerHTML;
  });

  //EVENTOS DE BOTONES
  for(let btn of elm.querySelectorAll(".eliminar-fila")) btn.addEventListener("click",(e)=>delFila(e.target));
  for(let btn of elm.querySelectorAll(".anadir-fila")) btn.addEventListener("click",(e)=>addFila(e.target));
  elm.querySelector(".eliminar-etiqueta").addEventListener("click",(e)=>delEtiqueta(e.target));

  //Inserción del Álbum
  tbodyAlbumes.appendChild(elm);
}