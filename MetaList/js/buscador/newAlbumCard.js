async function getAlbumCard(album){
  let mesEsp = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  let tipoEsp = {Estudio: "Álbum de Estudio",EP:"EP",Recopilatorio:"Álbum Recopilatorio",BoxSet:"Box Set",En_Vivo:"DVD en Directo",Demo:"Demo",Single:"Single",Video:"Video",Split:"Split",Colaboración:"Álbum Colaborativo"};
  console.log(album)
  let generos = await list("generos_albumes",true,["nombreAlbum",album.album],["nombreBanda",album.banda],["order","estrellasGeneroAlbum_Desc"]);
  let txt = `
    <div class="col portfolio-item filter-albumes1 filter-albumes2">
      <div class="card h-100 shadow-sm bg-light">
        <img src="${(album.imagen)?album.imagen:"./imagenes/basico/user_MetaList.png"}" class="card-img-top" alt="Portada del álbum '${album.album}'">
        <div class="card-body text-center">
          <h5 class="card-title"><a href="album.html?banda=${album.banda}&album=${album.album}">${album.album}</a></h5>
          <h6 class="card-title"><a href="banda.html?banda=${album.banda}">${album.banda}</a></h6>
          <hr>
          <h6 class="card-title">${(album.tipo)?tipoEsp[album.tipo.replaceAll(" ","_")]:"Tipo Desconocido"}</h6>
          <h6 class="card-title">${(album.dia)?album.dia+" de ":""}${(album.mes)?mesEsp[parseInt(album.mes)]+" de ":""}${(album.anio)?album.anio:"Fecha Desconocida"}</h6>
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