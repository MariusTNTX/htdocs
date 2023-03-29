function generarEnlaceAlb(album, banda){
  if(album.length>0){
    let urlAlbum = album.trim().toLowerCase().replace(" ","_");
    let urlBand = banda.trim().toLowerCase().replace(" ","_");
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
  albumes[id] = album;
  console.log(band)
  //-----------------------
  let tbodyAlbumes = document.getElementById("tbodyAlbumes");
  let txt = `
    <div class="col-12 col-lg-6 col-xl-12 my-2">
      <div class="card mb-3">
      <div class="card-body">
      <div class="row">
        <div class="col-12 col-md-4 col-lg-0 col-xl-3"></div>
          <div class="col-12 col-md-4 col-lg-12 col-xl-6 mb-2">
            <h5 class="card-title text-center">
              Nuevo Álbum
              <button type="button" class="btn btn-danger ms-2 eliminarAlb">x</button>
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
                    <input type="text" value="${album.nombre}" class="form-control nombreAlb a${id}" name="nombreAlb[]" placeholder=".">
                    <label for="nombreAlb">Nombre</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 my-1">
                  <div class="row">
                    <div class="col-4 form-floating pe-1">
                      <input type="number" value="${album.dia}" class="form-control diaAlb a${id}" name="diaAlb[]" min="0" max="31" placeholder=".">
                      <label for="diaAlb" class="ps-4">Día</label>
                    </div>
                    <div class="col-4 form-floating px-1">
                      <input type="number" value="${album.mes}" class="form-control mesAlb a${id}" name="mesAlb[]" min="1" max="12" placeholder=".">
                      <label for="mesAlb" class="ps-3">Mes</label>
                    </div>
                    <div class="col-4 form-floating ps-1">
                      <input type="number" value="${album.anio}" class="form-control anioAlb a${id}" name="anioAlb[]" minlength="4" maxlength="4" placeholder=".">
                      <label for="anioAlb" class="ps-3">Año</label>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-6 my-1">
                  <select class="form-select tipoAlb py-3 a${id}" name="tipoAlb[]" aria-label="Default select example">
                    <option value="ESTUDIO" ${(album.tipo=='ESTUDIO') ? "selected" : ""}>Estudio</option>
                    <option value="EP" ${(album.tipo=='EP') ? "selected" : ""}>EP</option>
                    <option value="LIVE" ${(album.tipo=='LIVE') ? "selected" : ""}>En Directo</option>
                    <option value="RECOPILATORIO" ${(album.tipo=='RECOPILATORIO') ? "selected" : ""}>Recopilatorio</option>
                    <option value="BOXSET" ${(album.tipo=='BOXSET') ? "selected" : ""}>Box Set</option>
                  </select>
                </div>
                <div class="col-12 col-sm-6 my-1">
                  <div class="form-floating">
                    <input type="text" value="${album.imagen}" class="form-control imgAlb a${id}" name="imgAlb[]" placeholder=".">
                    <label for="imgAlb">Imagen</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-6 my-1">
                  <div class="form-floating">
                    <input type="text" value="${album.escuchas}" class="form-control escuchAlb a${id}" name="escuchAlb[]" placeholder=".">
                    <label for="escuchAlb">Escuchas Spotify</label>
                  </div>
                </div>
                <div class="col-12 col-sm-6 my-1">
                  <div class="form-floating">
                    <input type="text" value="${album.duracion}" class="form-control duracAlb a${id}" name="duracAlb[]" placeholder=".">
                    <label for="duracAlb">Duración</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-sm-6 my-1">
                  <div class="form-floating">
                    <input type="text" value="${album.linkspotify}" class="form-control linkSpotAlb a${id}" name="linkSpotAlb[]" placeholder=".">
                    <label for="linkSpotAlb">Iframe Spotify</label>
                  </div>
                </div>
                <div class="col-12 col-sm-6 my-1">
                  <div class="form-floating position-relative">
                    <input type="text" value="${album.linkamazon}" class="form-control amazonAlb a${id}" name="amazonAlb[]" placeholder=".">
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
                    <textarea class="form-control descripAlb a${id}" placeholder="." name="descripAlb[]" style="height: 206px">${album.descrip}</textarea>
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
                      <th scope="col"><button type="button" class="btn btn-success addGenAlb anadir">+</button></th>
                      <th scope="col">Género</th>
                      <th scope="col">Estrellas</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider tbodyGenerosAlb a${id}">`;
            for(let genero of album.generos){
              txt+=`<tr>
                      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
                      <td class="w-75"><input type="text" value="${genero.nombre}" class="form-control genAlb" name="genAlb[]"></td>
                      <td><input type="number" value="${genero.estrellas}" class="form-control estrGenAlb" name="estrGenAlb[]" min="0" max="5"></td>
                    </tr>`;
            }
            txt+=`</tbody>
                </table>
              </div>
              <div class="row px-3">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col"><button type="button" class="btn btn-success addCanAlb anadir">+</button></th>
                      <th scope="col">Canción</th>
                      <th scope="col">Estrellas</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider tbodyCancionesAlb a${id}">`;
            for(let cancion of album.canciones){
              txt+=`<tr>
                      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
                      <td class="w-75"><input type="text" value="${cancion.nombre}" class="form-control nomCanAlb" name="nomCanAlb[]"></td>
                      <td><input type="number" value="${cancion.estrellas}" class="form-control estrCanAlb" name="estrCanAlb[]"></td>
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
                      <th scope="col"><button type="button" class="btn btn-success addDiscAlb anadir">+</button></th>
                      <th scope="col" class="w-100">Discográfica</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider tbodyDiscograficasAlb a${id}">`;
            for(let discografica of album.discograficas){
              txt+=`<tr>
                      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
                      <td><input type="text" value="${discografica.nombre}" class="form-control discAlb" name="discAlb[]"></td>
                    </tr>`;
            }
            txt+=`</tbody>
                </table>
              </div>
              <div class="row px-3">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col"><button type="button" class="btn btn-success addEstAlb anadir">+</button></th>
                      <th scope="col" class="w-100">Estudio</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider tbodyEstudiosAlb a${id}">`;
            for(let estudio of album.estudios){
              txt+=`<tr>
                      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
                      <td><input type="text" value="${estudio.nombre}" class="form-control nomEstAlb" name="nomEstAlb[]"></td>
                    </tr>`;
            }
            txt+=`</tbody>
                </table>
              </div>
              <div class="row px-3">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col"><button type="button" class="btn btn-success addMusAlb anadir">+</button></th>
                      <th scope="col">Músico</th>
                      <th scope="col">Roles</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider tbodyRolesAlb a${id}">`;
            for(let musico of album.musicos){
              txt+=`<tr>
                      <th><button type="button" class="btn btn-danger eliminar">x</button></th>
                      <td><input type="text" value="${musico.nombre}" class="form-control nomMusAlb" name="nomMusAlb[]"></td>
                      <td><input type="text" value="${musico.rol}" class="form-control rolMusAlb" name="rolMusAlb[]"></td>
                    </tr>`;
            }
            txt+=`</tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  tbodyAlbumes.innerHTML+=txt;

  /* Generar Propuesta */
  let btnGenPropAlb = document.querySelectorAll(".card .btnGenPropAlb");
  let btnAlbProp = document.getElementById("btnAlbProp");
  let albPropText = document.getElementById("albPropText");
  let idPropAlb = document.getElementById("idPropAlb");
  /* Campos */
  let nombreAlb = document.querySelectorAll(".card .nombreAlb");
  let imgAlb = document.querySelectorAll(".card .imgAlb");
  let diaAlb = document.querySelectorAll(".card .diaAlb");
  let mesAlb = document.querySelectorAll(".card .mesAlb");
  let anioAlb = document.querySelectorAll(".card .anioAlb");
  let tipoAlb = document.querySelectorAll(".card .tipoAlb");
  let numAlb = document.querySelectorAll(".card .numAlb");
  let escuchAlb = document.querySelectorAll(".card .escuchAlb");
  let duracAlb = document.querySelectorAll(".card .duracAlb");
  let linkSpotAlb = document.querySelectorAll(".card .linkSpotAlb");
  let amazonAlb = document.querySelectorAll(".card .amazonAlb");
  let descripAlb = document.querySelectorAll(".card .descripAlb");
  /* Tablas */
  let tbodyGenerosAlb = document.querySelectorAll(".card .tbodyGenerosAlb");
  let tbodyCancionesAlb = document.querySelectorAll(".card .tbodyCancionesAlb");
  let tbodyDiscograficasAlb = document.querySelectorAll(".card tbodyDiscograficasAlb");
  let tbodyEstudiosAlb = document.querySelectorAll(".card .tbodyEstudiosAlb");
  let tbodyRolesAlb = document.querySelectorAll(".card .tbodyRolesAlb");

  //BOTÓN PRE-MODAL GENERAR PROPUESTA ALBUM
  for(let btn of btnGenPropAlb){
    btn.addEventListener("click",(e)=>{
      e.preventDefault();
      let id = e.target.id[1];
      idPropAlb.innerHTML = id;
      generarEnlaceAlb(nombreAlb[id].value, band);
    });
  }
}