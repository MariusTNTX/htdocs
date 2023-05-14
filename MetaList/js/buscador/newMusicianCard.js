async function getMusicianCard(musician){
  let mesEsp = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  console.log(musician)
  let bandas = await list("musicos_bandas",true,["nombreMusicoEtapa",musician.musico],["order","anioInicioEtapaMusico_Asc"]);
  let roles = await list("roles_musicos_albumes",true,["nombreMusico",musician.musico]);
  let card = document.createElement("div");
  card.classList.add("col","portfolio-item","filter-musicos1","filter-musicos2");
  let txt = `
      <div class="card h-100 shadow-sm bg-light">
        <div class="div-card-img-top musician">
          <img src="${(musician.imagen)?musician.imagen:"./imagenes/basico/user_MetaList.png"}" class="card-img-top" alt="Imagen del músico '${musician.musico}'">
        </div>
        <div class="card-body text-center">
          <h5 class="card-title"><a href="musico.html?musico=${musician.musico}">${musician.musico}</a></h5>
          <hr>
          <h6 class="card-title">${(musician.sexo)?musician.sexo:"Género No Especificado"}</h6>
          <h6 class="card-title">${(musician.origen)?musician.origen+", ":""}${(musician.pais)?musician.pais:"Origen Desconocido"}</h6>
          <hr>
          <h6 class="card-title">${(musician.diaNacimiento)?musician.diaNacimiento+" de ":""}${(musician.mesNacimiento)?mesEsp[parseInt(musician.mesNacimiento)-1]+" de ":""}${(musician.anioNacimiento)?musician.anioNacimiento:"Fecha Desconocida"}</h6>
          <h6 class="card-title">${(musician.diaDefuncion)?musician.diaDefuncion+" de ":""}${(musician.mesDefuncion)?mesEsp[parseInt(musician.mesDefuncion)-1]+" de ":""}${(musician.anioDefuncion)?musician.anioDefuncion:calcularEdad(`${musician.anioNacimiento}-${musician.mesNacimiento}-${musician.diaNacimiento}`)}</h6>`;
  
  if(bandas.response.length>0){
    txt+=`<hr>
          <div class="text-start">
            <ul>`;
    for(let etapa of bandas.response){
      txt += `<li>${(etapa.anioInicio)?etapa.anioInicio:"????"}-${(etapa.anioFin)?etapa.anioFin:"Actualidad"}: ${etapa.banda}</li>`;
    }
    txt += `</ul>
          </div>`;
  }
  if(roles.response.length>0){
    txt+=`<hr>
          <div class="text-start">
            <ul>`;
    roles = roles.response.filter((alb,index,roles)=>index === roles.findIndex(i => i.rol === alb.rol));
    console.log(roles)
    for(let alb of roles){
      txt += `<li>${alb.rol}</li>`;
    }
    txt += `</ul>
          </div>`;
  }
  txt += `</div></div>`;

  card.innerHTML = txt;
  
  /* card.querySelector(".card-img-top").addEventListener("load",(e)=>{
    if(e.target.clientHeight>329){
      e.target.style="margin:0 auto;height:329px;width:fit-content";
    } else if(e.target.clientHeight<329 && e.target.clientHeight!=0) {
      let pad = parseInt((329 - e.target.clientHeight) / 2);
      e.target.style=`padding: ${pad}px 0`;
    }
  }); */
  
  return card;
}

function calcularEdad(fecha) {
  console.log("Calcular Edad:",fecha);
  divis = fecha.split("-");
  if(divis[0]=="null") return "Edad Desconocida";
  else {
    if(divis[1]=="null") fecha = divis[0]+"-1-1";
    else if(divis[2]=="null") fecha = divis[0]+divis[1]+"-1";
    var hoy = new Date();
    var fechaNacimiento = new Date(fecha);
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad+" años";
  }
}