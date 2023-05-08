async function getBandCard(band){
  console.log(band)
  let generos = await list("generos_bandas",true,["nombreBanda",band.banda],["order","estrellasGeneroBanda_Desc"]);
  let txt = `
    <div class="col portfolio-item filter-bandas1 filter-bandas2">
      <div class="card h-100 shadow-sm">
        <img src="${(band.imagen)?band.imagen:"./imagenes/basico/user_MetaList.png"}" class="card-img-top" alt="Imagen de la banda '${band.banda}'">
        <div class="card-body text-center bg-light">
          <h5 class="card-title"><a href="banda.html?banda=${band.banda}">${band.banda}</a></h5>
          <hr>
          <h6 class="card-title">${(band.origen)?band.origen+", ":""}${(band.pais)?band.pais:"Origen Desconocido"}</h6>
          <h6 class="card-title">${(band.estatus)?band.estatus:"Estatus Desconocido"}</h6>
          <hr>
          <div class="text-start">`;
  
  if(generos.response.length>0){
    for(let genero of generos.response){
      txt += `
        <p>
          <i class="bi bi-star${(genero.estrellas>=1)?"-fill":""}">
          </i><i class="bi bi-star${(genero.estrellas>=2)?"-fill":""}">
          </i><i class="bi bi-star${(genero.estrellas>=3)?"-fill":""}">
          </i><i class="bi bi-star${(genero.estrellas>=4)?"-fill":""}">
          </i><i class="bi bi-star${(genero.estrellas==5)?"-fill":""}"></i>
          ${genero.genero}
        </p>
      `;
    }
  }
  
  txt += `</div></div></div></div>`;
  return txt;
}