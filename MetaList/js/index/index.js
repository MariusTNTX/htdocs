//Elementos del DOM
let noticeList = document.getElementById("noticeList");
let noticesToday = document.getElementById("noticesToday");
let noticesCurMonth = document.getElementById("noticesCurMonth");
let noticesLastMonths = document.getElementById("noticesLastMonths");
let noticesCurYear = document.getElementById("noticesCurYear");
let noticesFull = document.getElementById("noticesFull");

//Nuevos Usuarios
let url = location.href;
if(url.includes("?")){
  url = url.substring(url.indexOf("?")+1);
  if(url == "newLogin") showAlert("SUCCESS",'Felicidades, ya tienes tu propia cuenta de MetaList. Puedes iniciar sesión en el apartado "Login" con tu email y tu contraseña');
}

printNotices();

//Click en noticias de hoy
let id = setInterval(() => {
  try {
    noticesToday.dispatchEvent(new Event("click")); //Lo ponga donde lo ponga a veces lo imprime con altura normal y otras no. Solo ha funcionado al finañ de printNotices()
    console.log("---click---")
  } catch (error) {}
  clearInterval(id);
}, 2000);

//Función Imprimir Noticias
async function printNotices(){
  //Obtener listas de noticias
  let data = await getNotices();
  console.log("Post-Data:", data)
  //Imprimir Noticias
  noticeList.innerHTML="";
  data.map(n=>setNotice(noticeList,n));
}

//Función Obtener Noticias
async function getNotices(){
  let result = [], res = {}, day = 1000*60*60*24, today = new Date(), lastMonths = new Date(new Date().getTime()-day*90);
  res.today = await list("articulos",true,["anioArticulo",today.getFullYear()],["mesArticulo",today.getMonth()+1],["diaArticulo",today.getDate()],["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.today.response.map(r=>{r.timeCategory="today"; return r}));
  res.curMonth = await list("articulos",true,["anioArticulo",today.getFullYear()],["mesArticulo",today.getMonth()+1],["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.curMonth.response.map(r=>{r.timeCategory="curMonth"; return r}));
  res.lastMonths = await list("articulos",true, ["anioArticulo_Min",lastMonths.getFullYear()],["mesArticulo_Min",lastMonths.getMonth()+1],["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.lastMonths.response.map(r=>{r.timeCategory="lastMonths"; return r}));
  res.curYear = await list("articulos",true,["anioArticulo_Min",today.getFullYear()],["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.curYear.response.map(r=>{r.timeCategory="curYear"; return r}));
  res.full = await list("articulos",true,["order","visitasArticulo_Desc"],["limit",10]);
  result.push(...res.full.response.map(r=>{r.timeCategory="full"; return r}));
  console.log("Pre-Data: ",result)
  return result;
}

//Función Imprimir Noticia
function setNotice(list, notice){
  console.log("Imprimir Noticia: ", list, notice)
  list.innerHTML+=`
    <div class="col-lg-4 col-md-6 portfolio-item filter-${notice.timeCategory}">
      <div class="portfolio-wrap">
        <img src="${(notice.imagen)?notice.imagen:"imagenes/basico/user_MetaList.png"}" class="img-fluid" alt="${notice.nombre}">
        <div class="portfolio-info">
          <h4><a href="#" class="inv-a">${notice.nombre}</a></h4>
          <p>${(notice.dia)?notice.dia:"??"}/${(notice.mes)?notice.mes:"??"}/${(notice.anio)?notice.anio:"????"}</p>
          <div class="portfolio-links">
            <a href="${(notice.imagen)?notice.imagen:"imagenes/basico/user_MetaList.png"}" data-gallery="portfolioGallery" class="portfolio-lightbox" title='${notice.nombre}'><i class='bx bx-expand'></i></a>
          </div>
        </div>
      </div>
    </div>`;
}