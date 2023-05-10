async function getBandCard(band){
  console.log(band)
  let generos = await list("generos_bandas",true,["nombreBanda",band.banda],["order","estrellasGeneroBanda_Desc"])
  let card = document.createElement("div");
  card.classList.add("col","portfolio-item","filter-bandas1","filter-bandas2");
  let txt = `
      <div class="card h-100 shadow-sm bg-light">
        <img src="${(band.imagen)?band.imagen:"./imagenes/basico/user_MetaList.png"}" class="card-img-top" alt="Imagen de la banda '${band.banda}'">
        <div class="card-body text-center">
          <h5 class="card-title"><a href="banda.html?banda=${band.banda}">${band.banda}</a></h5>
          <hr>
          <h6 class="card-title">${(band.origen)?band.origen+", ":""}${(band.pais)?band.pais:"Origen Desconocido"}</h6>
          <h6 class="card-title">${(band.estatus)?band.estatus:"Estatus Desconocido"}</h6>`;
  
  if(generos.response.length>0){
    txt += `<hr>
            <div class="text-start">`;
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
    txt += `</div>`;
  }
  txt += `</div></div>`;

  card.innerHTML = txt;
  
  card.querySelector(".card-img-top").addEventListener("load",(e)=>{
    if(e.target.clientHeight>335){
      e.target.style="margin:0 auto;height:335px;width:fit-content";
    } else if(e.target.clientHeight<335 && e.target.clientHeight!=0) {
      let pad = parseInt((335 - e.target.clientHeight) / 2);
      e.target.style=`padding: ${pad}px 0`;
    }
    console.log("Altura de "+band.banda+": ",e.target.clientHeight)
    console.log("img cargado: ",e.target)
  });
  
  return card;
}