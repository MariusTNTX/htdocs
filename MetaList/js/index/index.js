//Elementos del DOM
let preLoadData = document.getElementById("preLoadData");
let noticeList = document.getElementById("noticeList");
let noticesToday = document.getElementById("noticesToday");
let noticesCurMonth = document.getElementById("noticesCurMonth");
let noticesLastMonths = document.getElementById("noticesLastMonths");
let noticesCurYear = document.getElementById("noticesCurYear");
let noticesFull = document.getElementById("noticesFull");
let todayList = document.getElementById("todayList");
let carouselContainer = document.getElementById("carouselContainer");
let carouselButtons = document.getElementById("carouselButtons");
let carouselContent = document.getElementById("carouselContent");
let bandStats = document.getElementById("bandStats");
let albumStats = document.getElementById("albumStats");
let userStats = document.getElementById("userStats");
let articleStats = document.getElementById("articleStats");
let sendAdminMessageForm = document.getElementById("sendAdminMessageForm");
let formName = document.getElementById("name");
let formEmail = document.getElementById("email");
let formSubject = document.getElementById("subject");
let formMessage = document.getElementById("message");

//Gestión de Correos
sendAdminMessageForm.addEventListener("submit",async (e)=>{
  e.preventDefault();
  let resultado;
  if(formName.value.length==0) resultado = await sendAdminMessage(true,formEmail.value,formSubject.value,formMessage.value.replace(/[\r\n]/g, "<br>"));
  else resultado = await sendAdminMessage(true,formEmail.value,formSubject.value,formMessage.value.replace(/[\r\n]/g, "<br>"),formName.value);
  if(resultado[0]==200){
    showAlert('SUCCESS','El correo ha sido enviado correctamente, recibirás una respuesta lo antes posible');
    formEmail.value="";
    formSubject.value="";
    formMessage.value="";
    formName.value="";
  } 
  else showAlert('ERROR','Ha habido un error en el envío. Por favor, informa al administrador a través de un mensaje de correo directo a la dirección de email facilitada a la izquierda del formulario de envío. Disculpa las molestias');
});

//Imprimir todos los datos
preLoadData.addEventListener("click",()=>{
  printData();
});

//Función Imprimir Noticias
function printData(){
  console.log("dataList-Post: ",dataList);
  //Imprimir Noticias
  /* noticeList.innerHTML=""; */
  dataList.notices.map((n,i)=>setNotice(noticeList,n,i));
  let id = setInterval(() => {
    document.getElementById("noticesFull").dispatchEvent(new Event("click"));
    clearInterval(id);
  }, 500);
  //Imprimir Aniversarios
  todayList.innerHTML="";
  if(dataList.anniversaries.length>0){
    dataList.anniversaries.map((a,i)=>setAnniversarie(carouselContent,a,i));
    if(dataList.anniversaries.length>0){
      document.getElementById("carouselButtons").firstElementChild.dispatchEvent(new Event("click"));
    }
  } else carouselContainer.innerHTML=`<h1 class="text-white text-center mt-5 pt-5">No hay entradas para la fecha de hoy</h1>`;
  
  //Imprimir Incorporaciones
  dataList.incorporations.map((b,i)=>setIncorporation(b,i));
  //Imprimir estadísticas
  bandStats.setAttribute("data-purecounter-end",dataList.stats.bandas);
  albumStats.setAttribute("data-purecounter-end",dataList.stats.albumes);
  userStats.setAttribute("data-purecounter-end",dataList.stats.usuarios);
  articleStats.setAttribute("data-purecounter-end",dataList.stats.articulos);
}

//Función Imprimir Noticia
function setNotice(container, notice, i){
  /* let elm = document.createElement("div");
  elm.classList.add('col-lg-4', 'col-md-6', 'portfolio-item');
  for(let cl of notice.timeCategory.split(" ")) elm.classList.add(cl);
  elm.innerHTML=`
    <div class="portfolio-wrap">
      <img src="${(notice.imagen)?notice.imagen:"imagenes/basico/user_MetaList.png"}" class="img-fluid" alt="${notice.articulo}">
      <div class="portfolio-info">
        <h4><a href="#" class="inv-a">${notice.articulo}</a></h4>
        <p>${(notice.dia)?notice.dia:"??"}/${(notice.mes)?notice.mes:"??"}/${(notice.anio)?notice.anio:"????"}</p>
        <div class="portfolio-links">
          <a href="${(notice.imagen)?notice.imagen:"imagenes/basico/user_MetaList.png"}" data-gallery="portfolioGallery" class="portfolio-lightbox" title='${notice.articulo}'><i class='bx bx-expand'></i></a>
        </div>
      </div>
    </div>`;
  container.appendChild(elm); */
  let elm = container.children[i];
  for(let cl of notice.timeCategory.split(" ")) elm.classList.add(cl);
  let img = elm.querySelector("img");
  img.src = (notice.imagen)?notice.imagen:"imagenes/basico/user_MetaList.png";
  img.alt = notice.articulo;
  let mainA = elm.querySelector(".inv-a");
  mainA.textContent = notice.articulo;
  mainA.href=`visor.html?element=article&article=${encodeURIComponent(notice.articulo)}`;
  /* let subA = elm.querySelector(".portfolio-lightbox");
  subA.href = (notice.imagen)?notice.imagen:"imagenes/basico/user_MetaList.png";
  subA.title = notice.articulo; */
  let p = elm.querySelector("p");
  p.textContent = `${(notice.dia)?notice.dia:"??"}/${(notice.mes)?notice.mes:"??"}/${(notice.anio)?notice.anio:"????"}`;
  elm.classList.remove("d-none");
}

//Función Imprimir Aniversario
async function setAnniversarie(contanier, anniversarie, i){
  //Se añade el botón correspondiente
  let but = document.createElement("button");
  but.setAttribute("type","button");
  but.setAttribute("data-bs-target","#carousel");
  but.setAttribute("data-bs-slide-to",i);
  but.setAttribute("aria-label","Slide "+(i+1));
  if(i==0){
    but.classList.add("active");
    but.setAttribute("aria-current","true");
  }
  carouselButtons.appendChild(but);
  //Se añade el contenido
  let title = "";
  let mainLink = "";
  let links = ``;
  if(anniversarie.annCategory=='album'){
    title = `${anniversarie.diffYears}º Aniversario del álbum "${anniversarie.album}"`;
    mainLink = `visor.html?element=album&band=${encodeURIComponent(anniversarie.banda)}&album=${encodeURIComponent(anniversarie.album)}`;
    links = `<a href="visor.html?element=band&band=${encodeURIComponent(anniversarie.banda)}" class="inv-a">${anniversarie.banda}</a>`;
  } else if(anniversarie.annCategory=='birthday'){
    title = `${anniversarie.musico} cumple ${anniversarie.diffYears} años`;
    mainLink = `visor.html?element=musician&musician=${encodeURIComponent(anniversarie.musico)}`;
    let bands = await list('bandas',true,['nombreMusicoRol',anniversarie.musico]);
    bands.response.forEach((b,i)=>{
      links+=`${(i>0)?" | ":""}<a href="visor.html?element=band&band=${encodeURIComponent(b.banda)}" class="inv-a">${b.banda}</a>`;
    });
  } else if(anniversarie.annCategory=='deathday'){
    title = `${anniversarie.diffYears}º aniversario del fallecimiento de ${anniversarie.musico} (${anniversarie.anioNacimiento}-${anniversarie.anioDefuncion})`;
    mainLink = `visor.html?element=musician&musician=${encodeURIComponent(anniversarie.musico)}`;
    let bands = await list('bandas',true,['nombreMusicoRol',anniversarie.musico]);
    bands.response.forEach((b,i)=>{
      links+=`${(i>0)?" | ":""}<a href="visor.html?element=band&band=${encodeURIComponent(b.banda)}" class="inv-a">${b.banda}</a>`;
    });
  }
  let elm = document.createElement("div");
  elm.classList.add("carousel-item");
  if(i==0) elm.classList.add("active");
  elm.innerHTML=`
    <div class="h-100">
      <img src="${(anniversarie.imagen)?anniversarie.imagen:"imagenes/basico/user_MetaList.png"}" class="d-block rounded shadow" alt="${title}">
      <div class="carousel-caption d-block">
        <h4><a href="${mainLink}" class="inv-a">${title}</a></h4>
        <h6>${links}</h6>
      </div>
    </div>`;
  contanier.appendChild(elm);
}

//Función Imprimir Incorporación
function setIncorporation(band, index){
  let etiq = document.getElementById("incorporation"+index);
  etiq.querySelector(".incorporationImage").src = band.imagen;
  etiq.querySelector(".incorporationImage").alt = "Imágen de la banda "+band.banda;
  etiq.querySelector(".incorporationSpotify").href = band.linkSpotify;
  etiq.querySelector(".incorporationBand").textContent = band.banda;
  etiq.querySelector(".incorporationBand").href = `visor.html?element=band&band=${encodeURIComponent(band.banda)}`;
  etiq.querySelector(".incorporationOrigin").textContent = `${(band.origen)?band.origen+", ":""}${(band.pais)?band.pais:"Origen Desconocido"}`;
  etiq.querySelector(".incorporationDescrip").textContent = (band.descripcion.length<=250)?band.descripcion:band.descripcion.substring(0,250)+"...";
}