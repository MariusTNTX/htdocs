async function getLabelCard(label){
  console.log(label);
  let card = document.createElement("div");
  card.classList.add("col","portfolio-item","filter-discogs1","filter-discogs2");
  let txt = `
    <div class="card h-100 shadow-sm bg-light">
      <img src="${(label.imagen)?label.imagen:"./imagenes/basico/user_MetaList.png"}" class="card-img-top" alt="Logotipo de la discográfica '${label.discografica}'">
      <div class="card-body text-center">
        <h5 class="card-title"><a href="discografica.html?discografica=${label.discografica}">${label.discografica}</a></h5>
        <hr>
        <h6 class="card-title">${(label.direccion)?label.direccion+", ":""}${(label.pais)?label.pais:"Origen Desconocido"}</h6>
        <h6 class="card-title">${(label.estatus)?label.estatus:"Estatus Desconocido"}</h6>
      </div>
    </div>`;
  card.innerHTML = txt;
  card.querySelector(".card-img-top").addEventListener("load",(e)=>{
    if(e.target.clientHeight>329){
      e.target.style="margin:0 auto;height:329px;width:fit-content";
    }
  });
  return card;
}