var dbStatus;

let btnInicBiblio = document.getElementById("btnInicBiblio");
let btnLogout = document.getElementById("btnLogout");
let AltaIAlum = document.getElementById("AltaIAlum");
let AltaMAlum = document.getElementById("AltaMAlum");
let modifAlum = document.getElementById("modifAlum");
let AltaIProf = document.getElementById("AltaIProf");
let AltaMProf = document.getElementById("AltaMProf");
let modifProf = document.getElementById("modifProf");
let AltaIDepart = document.getElementById("AltaIDepart");
let AltaMDepart = document.getElementById("AltaMDepart");
let ModifDepart = document.getElementById("ModifDepart");
let backup = document.getElementById("backup");
let restore = document.getElementById("Restore");

let modalModifAlum = document.getElementById("modalModifAlum");
let buscarModifAlum = document.getElementById("buscarModifAlum");
let tbodyModifAlum = document.getElementById("tbodyModifAlum");
let tbodyModifMatr = document.getElementById("tbodyModifMatr");

let modalModifProf = document.getElementById("modalModifProf");
let buscarModifProf = document.getElementById("buscarModifProf");
let tbodyModifProf= document.getElementById("tbodyModifProf");

let botones = [AltaIAlum,AltaMAlum,modifAlum,AltaIProf,AltaMProf,modifProf,AltaIDepart,AltaMDepart,ModifDepart,backup];
let modales = document.querySelectorAll(".modal-content");

//Si se intenta acceder a administración sin estar logeado se redirige al login
if(!sessionStorage.getItem("tipoUsuario")) location.href="loginAdmin.html";

//COMPROBAR QUE EXISTE LA BASE DE DATOS CON LA API (SINO DESHABILITAR BOTONES)
existsDatabase().then(data=>{
  console.log(data)
  dbStatus = data.STATUS;
  if(dbStatus!='OK'){
    for(let btn of botones) btn.setAttribute("disabled","true");
  }
});

//BOTONES SUPERIORES ------------------------------------------------------------------------------

//BOTÓN INICIAR BIBLIOTECA
btnInicBiblio.addEventListener("click",()=>{
  if(dbStatus=='OK'){ //Si ya existe:
    if(confirm("La biblioteca ya está iniciada. ¿Deseas reiniciarla a su último estado guardado?")){
      //Si se desea reiniciar a su último estado guardado:
      location.href='php/importCSVs.php';
    }
  } else { //Si no existe:
    if(confirm("¿Deseas iniciar la biblioteca?")){
      //Si se desea iniciar la biblioteca:
      location.href='php/importCSVs.php';
    }
  }
});

//CERRAR SESIÓN
btnLogout.addEventListener("click",()=>{
  //Preugntar por confirmación
  if(confirm("¿Seguro que deseas cerrar la sesión?")){
    //Eliminar datos de la sesión
    sessionStorage.removeItem("tipoUsuario");
    sessionStorage.removeItem("nombreUsuario");
    sessionStorage.removeItem("apellidosUsuario");
    sessionStorage.removeItem("dniUsuario");
    sessionStorage.removeItem("nieUsuario");
    sessionStorage.removeItem("departUsuario");
    sessionStorage.removeItem("centroUsuario");
    //Redireccionar al login
    location.href = "index.html";
  }
});

//BOTONES ALUMNOS -----------------------------------------------------------------------------------------------------

//BOTÓN ALTA INDIVIDUAL ALUMNOS
AltaIAlum.addEventListener("click",()=>{

});

//BOTÓN ALTA MASIVA ALUMNOS
AltaMAlum.addEventListener("click",()=>{
  //Si hay csv en matriculas se añade "|Matrículas" a elemento
});

//BOTÓN MODIF/BAJA ALUMNOS
modifAlum.addEventListener("click",()=>{

});

//BOTÓN BUSCAR ALUMNO (MODIF/BAJA)
buscarModifAlum.addEventListener("click",()=>{
  let dni = buscarModifAlum.previousElementSibling.value, cod, grupos = [];
  //Si se introduce un DNI
  if(dni.length==9){
    getAlumnos('','','',dni,'').then(data=>{
      console.log(data);
      //Si se encuentra un resultado
      if(data.length==1){
        //Se almacenan el codigo de alumno original y los grupos originales para posibles actualizaciones posteriores
        cod = data[0].CODIGO;
        for(let i=0; i<data[0].MATRICULAS.length; i++) grupos[i] = data[0].MATRICULAS[i].GRUPO;
        console.log(cod)
        console.log(grupos)
        //Se resetean y se imprimen los registros de las tablas
        tbodyModifAlum.innerHTML = "";
        tbodyModifMatr.innerHTML = "";
        tbodyModifAlum.innerHTML += `
        <tr class="align-middle">
          <td><input type="text" class="form-control w-100" name="apellidos" value="${data[0].APELLIDOS}" required></td>
          <td><input type="text" class="form-control w-100" name="nombre" value="${data[0].NOMBRE}" required></td>
          <td><input type="text" class="form-control w-100" name="codigo" value="${data[0].CODIGO}" required></td>
          <td><input type="text" class="form-control w-100" name="dni" value="${data[0].DNI}" required></td>
          <td><input type="text" class="form-control w-100" name="nie" value="${data[0].NIE}" required></td>
          <td><input type="submit" class="btn btn-primary btnActuAlumMatr" name="actualizarAlum" value="Actualizar"></td>
          <td><input type="submit" class="btn btn-primary btnBorrAlum" name="borrarAlum" value="Borrar"></td>
        </tr>`;
        for(let mat of data[0].MATRICULAS){
          tbodyModifMatr.innerHTML += `
          <tr class="align-middle">
            <td class="w-50"><input type="text" class="form-control w-100" name="estudios" value="${mat.ESTUDIOS}" required></td>
            <td><input type="text" class="form-control w-100" name="grupo" value="${mat.GRUPO}" required></td>
            <td><input type="submit" class="btn btn-primary btnActuAlumMatr" name="actualizarMatr" value="Actualizar"></td>
            <td><input type="submit" class="btn btn-primary btnBorrMatr" name="borrarMatr" value="Borrar"></td>
          </tr>`;
        }
        //BOTONES ACTUALIZAR ALUMNO Y MATRICULA
        for(let btn of modalModifAlum.querySelectorAll(".btnActuAlumMatr")){
          btn.addEventListener("click", (e)=>{
            vacio = false;
            e.preventDefault();
            //Se almacenan los valores del alumno
            let valuesA = [];
            for(let i=0; i<tbodyModifAlum.firstElementChild.children.length-2; i++){
              valuesA[i] = tbodyModifAlum.firstElementChild.children[i].firstElementChild.value;
              if(valuesA[i]=='') vacio = true;
            }
            //Se almacenan los valores de las matriculas
            let valuesM = [];
            for(let i=0; i<tbodyModifMatr.children.length; i++){
              valuesM.push([]);
              for(let j=0; j<tbodyModifMatr.children[i].children.length-2; j++){
                valuesM[i][j] = tbodyModifMatr.children[i].children[j].firstElementChild.value;
                if(valuesM[i][j]=='') vacio = true;
              }
            }
            console.log(valuesM)
            //Si no hay ningún valor sin indicar
            if(!vacio){
              //Si confirma la actualización
              if(confirm("¿Quieres actualizar estos campos?")){
                //Se actualiza el alumno
                updateAlumno(dni,valuesA[2],valuesA[1],valuesA[0],valuesA[3],valuesA[4]).then(data=>{
                  if(data.length>0) alert("Alumno actualizado");
                  else alert("Error al Actualizar");
                });
                //Se actualizan sus matrículas
                for(let i=0; i<valuesM.length; i++){
                  updateMatricula(cod,grupos[i],valuesA[2],valuesM[i][0],valuesM[i][1]).then(data=>{
                    if(data.length>0){
                      alert("Matriculas actualizadas");
                      //Se almacenan los nuevos valores para futuras actulizaciones
                      cod = valuesA[2];
                      for(let i=0; i<valuesM.length; i++) grupos[i] = valuesM[i][1];
                      console.log(cod)
                      console.log(grupos)
                    } 
                    else alert("Error al Actualizar");
                  });
                }
              }
            } else alert("Todos los campos deben estar llenos");
          });
        }
        //BOTONES BORRAR ALUMNO
        for(let btn of modalModifAlum.querySelectorAll(".btnBorrAlum")){
          btn.addEventListener("click", (e)=>{
            e.preventDefault();
            let dniB = btn.parentElement.parentElement.children[3].firstChild.value;
            let codB = btn.parentElement.parentElement.children[2].firstChild.value;
            console.log(dniB)
            console.log(codB)
            //Si confirma el borrado
            if(confirm("¿Quieres borrar éste alumno? Sus matrículas también se borrarán")){
              //Se borra el alumno
              deleteAlumno(dniB,'','','','').then(data=>{
                if(data.length>0) alert("Alumno borrado");
                else alert("Error al Borrar el Alumno");
              });
              //Se borran sus matrículas
              deleteMatricula(codB,'','').then(data=>{
                if(data.length>0) alert("Matrículas borradas");
                else alert("Error al Borrar las Matrículas");
                //Se actualiza el visor
                tbodyModifAlum.innerHTML="";
                tbodyModifMatr.innerHTML="";
              });
            }
          });
        }
        //BOTONES BORRAR MATRÍCULA
        for(let btn of modalModifAlum.querySelectorAll(".btnBorrMatr")){
          btn.addEventListener("click", (e)=>{
            e.preventDefault();
            let codB = tbodyModifAlum.firstElementChild.children[2].firstElementChild.value;
            let gruB = btn.parentElement.parentElement.children[1].firstElementChild.value;
            console.log(codB)
            console.log(gruB)
            //Si confirma el borrado
            if(confirm("¿Quieres borrar ésta matrícula? Éste cambio no afectará al alumno")){
              //Se borra la matrícula
              deleteMatricula(codB,'',gruB).then(data=>{
                if(data.length>0) alert("Matrícula borrada");
                else alert("Error al Borrar las Matrículas");
                //Se actualiza el visor
                tbodyModifMatr.removeChild(btn.parentElement.parentElement);
              });
            }
          });
        }
      } else alert("No se encontró un alumno con el DNI "+dni);
    });
  } else alert("Indica un DNI para buscar");
});

//BOTONES PROFESORES --------------------------------------------------------------------------------------------------

//BOTÓN ALTA INDIVIDUAL PROFESORES
AltaIProf.addEventListener("click",()=>{

});

//BOTÓN ALTA MASIVA PROFESORES
AltaMProf.addEventListener("click",()=>{

});

//BOTÓN MODIF/BAJA PROFESORES
modifProf.addEventListener("click",()=>{

});

//BOTÓN BUSCAR ALUMNO (MODIF/BAJA)
buscarModifProf.addEventListener("click",()=>{
  let dni = buscarModifProf.previousElementSibling.value, cod, grupos = [];
  //Si se introduce un DNI
  if(dni.length==9){
    getProfesores('','',dni,'').then(data=>{
      console.log(data);
      //Si se encuentra un resultado
      if(data.length==1){
        //Se resetean y se imprimen los registros de las tablas
        tbodyModifProf.innerHTML = "";
        tbodyModifProf.innerHTML += `
        <tr class="align-middle">
          <td><input type="text" class="form-control w-100" name="apellidos" value="${data[0].APELLIDOS}" required></td>
          <td><input type="text" class="form-control w-100" name="nombre" value="${data[0].NOMBRE}" required></td>
          <td><input type="text" class="form-control w-100" name="dni" value="${data[0].DNI}" required></td>
          <td><select class="form-select" aria-label=".form-select-lg"></select></td>
          <td><input type="submit" class="btn btn-primary btnActuProf" name="actualizarProf" value="Actualizar"></td>
          <td><input type="submit" class="btn btn-primary btnBorrProf" name="borrarProf" value="Borrar"></td>
        </tr>`;
        getDepartamentos('','','','').then(data=>{

        });
        <option value="0">Open this select menu</option>
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        //BOTONES ACTUALIZAR PROFESOR
        for(let btn of modalModifProf.querySelectorAll(".btnActuProf")){
          btn.addEventListener("click", (e)=>{
            vacio = false;
            e.preventDefault();
            //Se almacenan los valores del profesor
            let valuesP = [];
            for(let i=0; i<tbodyModifProf.firstElementChild.children.length-2; i++){
              valuesP[i] = tbodyModifProf.firstElementChild.children[i].firstElementChild.value;
              if(valuesP[i]=='') vacio = true;
            }
            console.log(valuesP)
            //Si no hay ningún valor sin indicar
            if(!vacio){
              //Si confirma la actualización
              if(confirm("¿Quieres actualizar estos campos?")){
                //Se actualiza el profesor
                updateProfesor(dni,valuesA[2],valuesA[1],valuesA[0],valuesA[3],valuesA[4]).then(data=>{ //---------------------------------------------
                  if(data.length>0) alert("Alumno actualizado");
                  else alert("Error al Actualizar");
                });
                //Se actualizan sus matrículas
                for(let i=0; i<valuesM.length; i++){
                  updateMatricula(cod,grupos[i],valuesA[2],valuesM[i][0],valuesM[i][1]).then(data=>{
                    if(data.length>0){
                      alert("Matriculas actualizadas");
                      //Se almacenan los nuevos valores para futuras actulizaciones
                      cod = valuesA[2];
                      for(let i=0; i<valuesM.length; i++) grupos[i] = valuesM[i][1];
                      console.log(cod)
                      console.log(grupos)
                    } 
                    else alert("Error al Actualizar");
                  });
                }
              }
            } else alert("Todos los campos deben estar llenos");
          });
        }
        //BOTONES BORRAR ALUMNO
        for(let btn of modalModifAlum.querySelectorAll(".btnBorrAlum")){
          btn.addEventListener("click", (e)=>{
            e.preventDefault();
            let dniB = btn.parentElement.parentElement.children[3].firstChild.value;
            let codB = btn.parentElement.parentElement.children[2].firstChild.value;
            console.log(dniB)
            console.log(codB)
            //Si confirma el borrado
            if(confirm("¿Quieres borrar éste alumno? Sus matrículas también se borrarán")){
              //Se borra el alumno
              deleteAlumno(dniB,'','','','').then(data=>{
                if(data.length>0) alert("Alumno borrado");
                else alert("Error al Borrar el Alumno");
              });
              //Se borran sus matrículas
              deleteMatricula(codB,'','').then(data=>{
                if(data.length>0) alert("Matrículas borradas");
                else alert("Error al Borrar las Matrículas");
                //Se actualiza el visor
                tbodyModifAlum.innerHTML="";
                tbodyModifMatr.innerHTML="";
              });
            }
          });
        }
        //BOTONES BORRAR MATRÍCULA
        for(let btn of modalModifAlum.querySelectorAll(".btnBorrMatr")){
          btn.addEventListener("click", (e)=>{
            e.preventDefault();
            let codB = tbodyModifAlum.firstElementChild.children[2].firstElementChild.value;
            let gruB = btn.parentElement.parentElement.children[1].firstElementChild.value;
            console.log(codB)
            console.log(gruB)
            //Si confirma el borrado
            if(confirm("¿Quieres borrar ésta matrícula? Éste cambio no afectará al alumno")){
              //Se borra la matrícula
              deleteMatricula(codB,'',gruB).then(data=>{
                if(data.length>0) alert("Matrícula borrada");
                else alert("Error al Borrar las Matrículas");
                //Se actualiza el visor
                tbodyModifMatr.removeChild(btn.parentElement.parentElement);
              });
            }
          });
        }
      } else alert("No se encontró un alumno con el DNI "+dni);
    });
  } else alert("Indica un DNI para buscar");
});

//BOTONES DEPARTAMENTOS ---------------------------------------------------------------------------

//BOTÓN ALTA INDIVIDUAL DEPARTAMENTOS
AltaIDepart.addEventListener("click",()=>{

});

//BOTÓN ALTA MASIVA DEPARTAMENTOS
AltaMDepart.addEventListener("click",()=>{

});

//BOTÓN MODIF/BAJA DEPARTAMENTOS
ModifDepart.addEventListener("click",()=>{

});

//BOTONES COPIA DE SEGURIDAD ----------------------------------------------------------------------

//BOTÓN BACKUP
backup.addEventListener("click",()=>{

});

//BOTÓN RESTORE
restore.addEventListener("click",()=>{

});