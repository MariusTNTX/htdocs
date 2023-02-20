let dropModifAlum = document.getElementById("dropModifAlum");
let txtModifAlum = document.getElementById("txtModifAlum");
let buscarModifAlum = document.getElementById("buscarModifAlum");

dropModifAlum.nextElementSibling.addEventListener("click",(e)=>{
  dropModifAlum.textContent = e.target.textContent;
});

buscarModifAlum.addEventListener("click",()=>{
  getAlumno(dropModifAlum,txtModifAlum);
});

async function getAlumno(filtro, valor){
  let response = fetch(`/php/api.php?selects=alumnos&filters=${filtro}&values=${valor}`);
}