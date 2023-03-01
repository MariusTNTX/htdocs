/* FUNCIÓN IMPRIMIR TARJETA ARTISTA */
var printTag = async function(linkTag,tag,reach='',taggings='',summary=''){
  /* Obtención de géneros y descripción (si no han sido facilitados) */
  if(reach==''){
    var responseTag = await fetch(`http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag=${tag}&api_key=5a29d744e8273ab4a877e9b59555b81e&format=json`);
    responseTag = await responseTag.json();
    responseTag = responseTag.tag;
    reach = responseTag.reach;
    taggings = responseTag.total;
    console.log(responseTag)
  }

  /* Generación del ID */
  let id = `t${reach}_${taggings}`;

  /* Inclusión de puntos a las cifras numéricas */
  let cifra = [reach,taggings];
  for(let i in cifra){
    let nuevo = '';
    while(cifra[i].length>0){
      if(cifra[i].length>3){
        nuevo = '.'+cifra[i].substr(-3)+nuevo;
        cifra[i] = cifra[i].substring(0,cifra[i].length-3);
      } else {
        nuevo = cifra[i]+nuevo;
        cifra[i] = '';
      }
    }
    cifra[i]=nuevo;
  }
  reach = cifra[0];
  taggings = cifra[1];

  /* Inserción del Elemento */
  let txt = `
  <div class="col my-4">
    <div class="card h-100 text-center shadow">
      <div class="card-header text-center bg-dark border-bottom border-primary border-5">
        <h4 class="card-title"><a href="${linkTag}" target="_blank" class="text-white">${tag}</a></h4>
      </div>
      <div class="card-body pb-3">
        <div><b>Alcance</b>: ${reach}</div>
        <div><b>Etiquetados</b>: ${taggings}</div>
        <div><b>Descripción</b>:</div>
        <div><p>${summary}</p></div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="${id}" aria-hidden="true" aria-labelledby="${id}Label" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="${id}Label">${tag}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row justify-content-center">
            <div class="col-12">
              <!-- Imagen -->
              <div class="m-4 text-center" id="imgWiki${id}">
                <div class="d-flex justify-content-center align-items-center">
                  <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  resultList.innerHTML += txt;
}