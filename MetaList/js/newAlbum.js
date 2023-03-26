function addNewAlbum(album){
  //Provisional -----------
  album.duracion = "";
  album.musicos = [];
  album.discograficas = [];
  album.estudios = [];
  album.imagen = "";
  album.escuchas = "";
  album.linkSpotify = "";
  album.linkAmazon = "";
  album.descrip = "";
  console.log(album);
  //-----------------------
  let tbodyAlbumes = document.getElementById("tbodyAlbumes");
  let txt = `
    <div class="card mb-3">
    <div class="card-body">
      <h5 class="card-title text-center">
        Nuevo Álbum
        <button type="button" class="btn btn-danger ms-2 eliminarAlb">x</button>
      </h5>
      <div class="card-text">
        <div class="row">
          <!-- Columna 1 -->
          <div class="col-12 col-xl-4">
            <div class="row">
              <div class="col-12 my-1">
                <div class="form-floating">
                  <input type="text" value="${album.nombre}" class="form-control nombreAlb" name="nombreAlb[]" placeholder=".">
                  <label for="nombreAlb">Nombre</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 my-1">
                <div class="form-floating">
                  <input type="text" value="${album.imagen}" class="form-control imgAlb" name="imgAlb[]" placeholder=".">
                  <label for="imgAlb">Imagen</label>
                </div>
              </div>
              <div class="col-6 my-1">
                <label for="fechaAlb">Fecha Public.</label>
                <input type="date"  value="${album.dia}/${album.mes}/${album.anio}" class="form-control fechaAlb" name="fechaAlb[]">
              </div>
            </div>
            <div class="row">
              <div class="col-6 my-1">
                <select class="form-select py-3" name="tipoAlb[]" aria-label="Default select example">
                  <option value="ESTUDIO" ${(album.tipo=='ESTUDIO') ? "selected" : ""}>Estudio</option>
                  <option value="EP" ${(album.tipo=='EP') ? "selected" : ""}>EP</option>
                  <option value="LIVE" ${(album.tipo=='LIVE') ? "selected" : ""}>En Directo</option>
                  <option value="RECOPILATORIO" ${(album.tipo=='RECOPILATORIO') ? "selected" : ""}>Recopilatorio</option>
                  <option value="BOXSET" ${(album.tipo=='BOXSET') ? "selected" : ""}>Box Set</option>
                </select>
              </div>
              <div class="col-6 my-1">
                <div class="form-floating">
                  <input type="number" value="${album.numero}" class="form-control numAlb" name="numAlb[]" placeholder=".">
                  <label for="numAlb">Número de Álbum</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 my-1">
                <div class="form-floating">
                  <input type="text" value="${album.escuchas}" class="form-control escuchAlb" name="escuchAlb[]" placeholder=".">
                  <label for="escuchAlb">Escuchas Spotify</label>
                </div>
              </div>
              <div class="col-6 my-1">
                <div class="form-floating">
                  <input type="number" value="${album.duracion}" class="form-control duracAlb" name="duracAlb[]" placeholder=".">
                  <label for="duracAlb">Duración</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6 my-1">
                <div class="form-floating">
                  <input type="text" value="${album.linkSpotify}" class="form-control linkSpotAlb" name="linkSpotAlb[]" placeholder=".">
                  <label for="linkSpotAlb">Iframe Spotify</label>
                </div>
              </div>
              <div class="col-6 my-1">
                <div class="form-floating">
                  <input type="text" value="${album.linkAmazon}" class="form-control amazonAlb" name="amazonAlb[]" placeholder=".">
                  <label for="amazonAlb">Link Amazon</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 my-1">
                <div class="form-floating mb-3">
                  <textarea class="form-control descripAlb" placeholder="." name="descripAlb[]" style="height: 206px">${album.descrip}</textarea>
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
                <tbody class="table-group-divider tbodyGenerosAlb">`;
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
                    <th scope="col"><button type="button" class="btn btn-success addMusAlb anadir">+</button></th>
                    <th scope="col">Músico/Productor</th>
                    <th scope="col">Rol</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider tbodyRolesAlb">`;
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
          <!-- Columna 3 -->
          <div class="col-12 col-xl-4">
            <div class="row px-3">
              <table class="table table-sm">
                <thead>
                  <tr>
                    <th scope="col"><button type="button" class="btn btn-success addDiscAlb anadir">+</button></th>
                    <th scope="col">Discográfica</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider tbodyDiscograficasAlb">`;
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
                    <th scope="col">Estudio</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider tbodyEstudiosAlb">`;
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
                    <th scope="col"><button type="button" class="btn btn-success addCanAlb anadir">+</button></th>
                    <th scope="col">Canción</th>
                    <th scope="col">Estrellas</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider tbodyCancionesAlb">`;
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
        </div>
      </div>
    </div>
  </div>`;

  tbodyAlbumes.innerHTML+=txt;
}