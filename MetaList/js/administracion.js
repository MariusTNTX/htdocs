/* DOM: IDs Sección BBDD*/
let btnCreateDataBase = document.getElementById("btnCreateDataBase");
let btnRestore = document.getElementById("btnRestore");
let btnBackup = document.getElementById("btnBackup");
let btnExportCSV = document.getElementById("btnExportCSV");
let btnDeleteTable = document.getElementById("btnDeleteTable");
let btnDropDataBase = document.getElementById("btnDropDataBase");

/* DOM: Clases Modales */
let btnMdlConfirm = document.querySelectorAll(".btnMdlConfirm");
let btnMdlRestore = document.querySelector(".btnMdlRestore");
let btnMdlExportClean = document.querySelectorAll(".btnMdlExportClean");

let bdButtons = document.querySelectorAll(".btnBD");

let mdlConfirmSentence = document.querySelector(".mdlConfirm.sentence");
let mdlConfirmNext = document.querySelector(".mdlConfirm.next");
let mdlConfirmClose = document.querySelector(".mdlConfirm.close");

let mdlRestoreList = document.querySelector(".mdlRestore.list");
let mdlRestoreChecks = [];
let mdlRestoreNext = document.querySelector(".mdlRestore.next");
let mdlRestoreClose = document.querySelector(".mdlRestore.close");

let mdlExportCleanTitle = document.querySelector(".mdlExportClean.title");
let mdlExportCleanCheck = document.querySelectorAll(".mdlExportClean.check");
let mdlExportCleanList = document.querySelector(".mdlExportClean.list");
let mdlExportCleanNext = document.querySelector(".mdlExportClean.next");
let mdlExportCleanClose = document.querySelector(".mdlExportClean.close");

let currentModal=""; // Modal Actual

/* GESTIÓN DE USUARIO */
if(sessionStorage.getItem('email')){
  if(sessionStorage.getItem('permisos')==2){
    for(let star of document.querySelectorAll(".superAdmin")){
      star.classList.add("d-none");
    }
  }
} else location.href='index.html';

/* EVENTOS QUE ESTABLECEN EL MODAL ACTUAL */

btnCreateDataBase.addEventListener("click",()=>{currentModal='btnCreateDataBase'});
btnRestore.addEventListener("click",()=>{currentModal='btnRestore'});
btnBackup.addEventListener("click",()=>{currentModal='btnBackup'});
btnExportCSV.addEventListener("click",()=>{currentModal='btnExportCSV'});
btnDeleteTable.addEventListener("click",()=>{currentModal='btnDeleteTable'});
btnDropDataBase.addEventListener("click",()=>{currentModal='btnDropDataBase'});



/* EVENTOS QUE CONFIGURAN LA ESTRUCTURA DE LOS MODALES */

/* Botones de Modales Confirm */
for(let b of btnMdlConfirm) b.addEventListener("click",()=>{
  if(currentModal=='btnCreateDataBase'){
    mdlConfirmSentence.textContent = 'crear la base de datos desde cero';
  } else if(currentModal=='btnBackup'){
    mdlConfirmSentence.textContent = 'almacenar una copia de seguridad del estado actual de la base de datos';
  } else if(currentModal=='btnDropDataBase'){
    mdlConfirmSentence.textContent = 'eliminar la base de datos completamente';
  }
});

//Función almacenar lista de restores
let getRestores = async ()=>{ 
  let restoreList = await dbAction('restoreList', true);
  console.log("btnMdlRestore",restoreList);
  mdlRestoreList.innerHTML="";
  restoreList.map((restore,i)=>{
    mdlRestoreList.innerHTML+=`
    <tr>
      <td><div class="form-check"><input class="form-check-input mdlRestore check" type="radio" name="radioRestores" ${(i==0)?'checked':''}></div></td>
      <td class="fecha">${restore.fecha}</td>
      <td class="hora">${restore.hora}</td>
    </tr>`;
  });
  mdlRestoreChecks = document.querySelectorAll(".mdlRestore.check");
}

/* Obtención de lista de restores */
btnMdlRestore.addEventListener("click",getRestores);

/* Impresión de lista de tablas */
let tablas = ['albumes','albumes_favoritos','albumes_plus','articulos','bandas','bandas_favoritas',
              'bandas_plus','canciones_albumes','discograficas','discograficas_albumes',
              'discograficas_plus','estudios_albumes','estudios_grabacion','etapas_bandas','generos',
              'generos_albumes','generos_bandas','musicos','musicos_bandas','musicos_plus',
              'roles_musicos_albumes','temas_letra_bandas','usuarios'];
tablas.map(t => mdlExportCleanList.innerHTML += `<option value="${t}">${t}</option>`);

/* Asignación de título al modal Exportar/Vaciar */
for(let b of btnMdlExportClean) b.addEventListener("click",()=>{
  if(currentModal=='btnExportCSV'){
    mdlExportCleanTitle.textContent='Exportar CSVs';
    mdlExportCleanNext.textContent='Exportar CSV';
  } else if(currentModal=='btnDeleteTable'){
    mdlExportCleanTitle.textContent='Vaciar Tablas';
    mdlExportCleanNext.textContent='Vaciar Tabla';
  }
});



/* EVENTOS NEXT (ACEPTAR) */

/* Evento Confirm */
mdlConfirmNext.addEventListener("click", async ()=>{
  mdlConfirmClose.dispatchEvent(new Event("click"));
  if(currentModal=='btnCreateDataBase'){
    try {
      await dbAction('createDataBase',true);
      showAlert('SUCCESS','Se ha creado la base de datos con éxito');
    } catch (error) {
      showAlert('ERROR','Ha habido un error al crear la base de datos');
    }
  } else if(currentModal=='btnBackup'){
    try {
      await dbAction('backup',true);
      showAlert('SUCCESS','Se ha creado una copia de seguridad con éxito');
    } catch (error) {
      showAlert('ERROR','Ha habido un error al generar la copia de seguridad');
    }
  } else if(currentModal=='btnDropDataBase'){
    try {
      await dbAction('dropDataBase',true);
      showAlert('SUCCESS','Se ha eliminado la base de datos con éxito');
    } catch (error) {
      showAlert('ERROR','Ha habido un error al eliminar la base de datos');
    }
  }
});

/* Evento Restore */
mdlRestoreNext.addEventListener("click", async ()=>{
  let isChecked = false, chkElement="";
  for(let check of mdlRestoreChecks){
    if(check.checked){
      isChecked = true;
      chkElement = check.parentElement.parentElement.parentElement;
    } 
  }
  if(isChecked){
    try {
      let fecha = chkElement.children[1].textContent, hora = chkElement.children[2].textContent;
      mdlRestoreClose.dispatchEvent(new Event("click"));
      await dbAction('restore',true,['fecha',fecha],['hora',hora]);
      showAlert('SUCCESS','La restauración de la copia de seguridad se ha efectuado con éxito');
    } catch (error) {
      showAlert('ERROR','Ha habido un error al restaurar la copia de seguridad');
    }
  } else showAlert('ERROR','Debes seleccionar una copia de seguridad de la lista');
});

/* Evento Export/Clean */
mdlExportCleanNext.addEventListener("click", async ()=>{
  if(currentModal=='btnExportCSV'){
    let tabla = mdlExportCleanList.value;
    mdlExportCleanClose.dispatchEvent(new Event("click"));
    let blob = await dbAction('csvExportTable',true,['tabla',tabla]);
    console.log("Blob tras await:",blob)
    let url = URL.createObjectURL(blob); //Se genera el recurso temporal
    console.log("url:",url)
    let link = document.createElement('a');
    link.href = url;
    link.id = 'temp_download_link';
    link.download = tabla+'.csv';
    link.click();
    URL.revokeObjectURL(url); //Se libera el recurso
  } else if(currentModal=='btnDeleteTable'){
    let tabla = mdlExportCleanList.value;
    mdlExportCleanClose.dispatchEvent(new Event("click"));
    try {
      let res = await dbAction('deleteTable',true,['tabla',tabla]);
      showAlert('SUCCESS','La tabla "'+tabla+'" ha sido vaciada con éxito');
    } catch (error) {
      showAlert('ERROR','Ha habido un error al tratar de vaciar la tabla');
    }
  }
});