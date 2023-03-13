var dbStatus;
/* Botones */
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
/* Modal alta alumnos */
let modalAltaIAlum = document.getElementById("modalAltaIAlum");
let buscarAltaIAlum = document.getElementById("buscarAltaIAlum");
let tbodyAltaIAlum = document.getElementById("tbodyAltaIAlum");
let tbodyAltaIMatr = document.getElementById("tbodyAltaIMatr");
let altaAlumMatr = document.getElementById("altaAlumMatr");
let altaMatrAlum = document.getElementById("altaMatrAlum");
/* Modal alta profesores */
let modalAltaIProf = document.getElementById("modalAltaIProf");
let tbodyAltaIProf = document.getElementById("tbodyAltaIProf");
let altaIProf = document.getElementById("altaIProf");
/* Modal alta profesores */
let modalAltaIDepart = document.getElementById("modalAltaIDepart");
let tbodyAltaIDepart = document.getElementById("tbodyAltaIDepart");
let altaIDepart = document.getElementById("altaIDepart");
/* Modal modificación alumnos */
let modalModifAlum = document.getElementById("modalModifAlum");
let buscarModifAlum = document.getElementById("buscarModifAlum");
let tbodyModifAlum = document.getElementById("tbodyModifAlum");
let tbodyModifMatr = document.getElementById("tbodyModifMatr");
/* Modal modificación profesores */
let modalModifProf = document.getElementById("modalModifProf");
let buscarModifProf = document.getElementById("buscarModifProf");
let tbodyModifProf= document.getElementById("tbodyModifProf");
/* Modal modificación departamentos */
let modalModifDepart = document.getElementById("modalModifDepart");
let buscarModifDepart = document.getElementById("buscarModifDepart");
let tbodyModifDepart = document.getElementById("tbodyModifDepart");
/* Modal Restore */
let tbodyRestore = document.getElementById("tbodyRestore");
/* Arrays generales */
let botones = [AltaIAlum,AltaMAlum,modifAlum,AltaIProf,AltaMProf,modifProf,AltaIDepart,AltaMDepart,ModifDepart,backup];
let modales = document.querySelectorAll(".modal-content");

//Si se intenta acceder a administración sin estar logeado se redirige al login
if(!sessionStorage.getItem("tipoUsuario") || sessionStorage.getItem("tipoUsuario")!='admin') location.href="loginAdmin.html";
else document.getElementById("admin").textContent = sessionStorage.getItem("nombreUsuario")+' '+sessionStorage.getItem("apellidosUsuario");

//COMPROBAR QUE EXISTE LA BASE DE DATOS CON LA API (SINO DESHABILITAR BOTONES)
existsDatabase().then(data=>{
  dbStatus = data.STATUS;
  if(dbStatus!='OK'){
    for(let btn of botones) btn.setAttribute("disabled","true");
  }
}).catch(error => alert("Error al procesar la petición de verificación de la existencia de la base de datos"));

//ELIMINAR LAS RESERVAS CADUCADAS DESPUÉS DE UNA SEMANA
deleteReservasCad().then(data=>{
  if(data.length!=1 || data[0]!='Delete Exitoso') alert("Error en el borrado de reservas caducadas");
}).catch(error=>alert("Error al procesar la petición de eliminado de reservas caducadas"));

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

//BOTÓN BUSCAR ALUMNO (ALTA INDIVIDUAL)
buscarAltaIAlum.addEventListener("click",()=>{
  let dni = buscarAltaIAlum.previousElementSibling.value.toUpperCase();
  //Si se introduce un DNI
  if(dni.length==9){
    getAlumnos('','','',dni,'').then(data=>{
      //Si se encuentra un resultado
      if(data.length==1){
        //Se incluye la información del alumno en sus campos correspondientes
        tbodyAltaIAlum.firstElementChild.children[0].firstElementChild.value=data[0].NOMBRE;
        tbodyAltaIAlum.firstElementChild.children[1].firstElementChild.value=data[0].APELLIDOS;
        tbodyAltaIAlum.firstElementChild.children[2].firstElementChild.value=data[0].DNI;
        tbodyAltaIAlum.firstElementChild.children[3].firstElementChild.value=data[0].NIE;
        tbodyAltaIMatr.firstElementChild.children[0].firstElementChild.value=data[0].CODIGO;
      } else alert("No se encontró un alumno con el DNI "+dni);
    }).catch(error=> alert("Error al procesar la petición de información sobre alumnos"));
  } else alert("Indica un DNI para buscar");
});

//BOTÓN INSERTAR ALUMNO Y MATRICULA
altaAlumMatr.addEventListener("click", (e)=>{
  vacio = false;
  e.preventDefault();
  //Se almacenan los valores del alumno y de la matrícula
  let valuesA = [];
  for(let i=0; i<tbodyAltaIAlum.firstElementChild.children.length; i++){
    valuesA[i] = tbodyAltaIAlum.firstElementChild.children[i].firstElementChild.value;
    if(valuesA[i]=='') vacio = true;
  }
  //Se almacenan los valores de las matriculas
  let valuesM = [];
  for(let i=0; i<tbodyAltaIMatr.firstElementChild.children.length; i++){
    valuesM[i] = tbodyAltaIMatr.firstElementChild.children[i].firstElementChild.value;
    if(valuesM[i]=='') vacio = true;
  }
  //Si no hay ningún valor sin indicar
  if(!vacio){
    //Si confirma la actualización
    if(confirm("¿Quieres insertar éste alumno junto con su matrícula?")){
      //Se inserta la matrícula
      putMatricula(valuesM[0],valuesM[1],valuesM[2]).then(data=>{
        if(data.length>0) alert("Matrícula insertada");
        else alert("Error al insertar");
      }).catch(error => alert("Los datos indicados de la matrícula no son compatibles con su formato"));
      //Se inserta el alumno
      putAlumno(valuesA[2],valuesA[3],valuesM[0],valuesA[0],valuesA[1]).then(data=>{
        if(data.length>0) alert("Alumno insertado");
        else alert("Error al insertar");
      }).catch(error => alert("Los datos indicados del alumno no son compatibles con su formato"));
    }
  } else alert("Todos los campos deben estar llenos");
});

//BOTÓN INSERTAR NUEVA MATRICULA EN ALUMNO
altaMatrAlum.addEventListener("click", (e)=>{
  vacio = false;
  e.preventDefault();
  //Se almacenan los valores de las matriculas
  let valuesM = [];
  for(let i=0; i<tbodyAltaIMatr.firstElementChild.children.length; i++){
    valuesM[i] = tbodyAltaIMatr.firstElementChild.children[i].firstElementChild.value;
    if(valuesM[i]=='') vacio = true;
  }
  //Si no hay ningún valor sin indicar
  if(!vacio){
    //Si confirma la actualización
    if(confirm("¿Quieres insertar ésta matrícula al alumno?")){
      //Se inserta la matrícula
      putMatricula(valuesM[0],valuesM[1],valuesM[2]).then(data=>{
        if(data.length>0) alert("Matrícula insertada");
        else alert("Error al insertar");
      }).catch(error => alert("Los datos indicados de la matrícula no son compatibles con su formato"));
    }
  } else alert("Los campos de la matrícula deben estar llenos");
});

//BOTÓN BUSCAR ALUMNO (MODIF/BAJA)
buscarModifAlum.addEventListener("click",()=>{
  let dni = buscarModifAlum.previousElementSibling.value.toUpperCase(), cod, grupos = [];
  //Si se introduce un DNI
  if(dni.length==9){
    getAlumnos('','','',dni,'').then(data=>{
      //Si se encuentra un resultado
      if(data.length==1){
        //Se almacenan el codigo de alumno original y los grupos originales para posibles actualizaciones posteriores
        cod = data[0].CODIGO;
        for(let i=0; i<data[0].MATRICULAS.length; i++) grupos[i] = data[0].MATRICULAS[i].GRUPO;
        //Se resetean y se imprimen los registros de las tablas
        tbodyModifAlum.innerHTML = "";
        tbodyModifMatr.innerHTML = "";
        tbodyModifAlum.innerHTML += `
        <tr class="align-middle">
          <td><input type="text" class="form-control w-100" style="min-width: 200px" name="apellidos" value="${data[0].APELLIDOS}" required></td>
          <td style="width: 13%;"><input type="text" class="form-control w-100" style="min-width: 110px" name="nombre" value="${data[0].NOMBRE}" required></td>
          <td style="width: 13%;"><input type="text" class="form-control w-100" style="min-width: 85px" name="codigo" value="${data[0].CODIGO}" required></td>
          <td><input type="text" class="form-control w-100" style="min-width: 105px" name="dni" value="${data[0].DNI}" required></td>
          <td style="width: 13%;"><input type="text" class="form-control w-100" style="min-width: 100px" name="nie" value="${data[0].NIE}" required></td>
          <td><input type="submit" class="btn btn-primary btnActuAlumMatr" name="actualizarAlum" value="Actualizar"></td>
          <td><input type="submit" class="btn btn-primary btnBorrAlum" name="borrarAlum" value="Borrar"></td>
        </tr>`;
        for(let mat of data[0].MATRICULAS){
          tbodyModifMatr.innerHTML += `
          <tr class="align-middle">
            <td style="width: 60%;"><input type="text" class="form-control w-100" style="min-width: 390px" name="estudios" value="${mat.ESTUDIOS}" required></td>
            <td><input type="text" class="form-control w-100" style="min-width: 100px" name="grupo" value="${mat.GRUPO}" required></td>
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
            //Se almacenan los valores de las matrículas
            let valuesM = [];
            for(let i=0; i<tbodyModifMatr.children.length; i++){
              valuesM.push([]);
              for(let j=0; j<tbodyModifMatr.children[i].children.length-2; j++){
                valuesM[i][j] = tbodyModifMatr.children[i].children[j].firstElementChild.value;
                if(valuesM[i][j]=='') vacio = true;
              }
            }
            //Si no hay ningún valor sin indicar
            if(!vacio){
              //Si confirma la actualización
              if(confirm("¿Quieres actualizar estos campos?")){
                //Se actualiza el alumno
                updateAlumno(dni,valuesA[2],valuesA[1],valuesA[0],valuesA[3],valuesA[4]).then(data=>{
                  if(data.length>0) alert("Alumno actualizado");
                  else alert("Error al Actualizar");
                }).catch(error => alert("Los cambios efectuados sobre el registro del alumno no son compatibles con su formato"));
                //Se actualizan sus matrículas
                for(let i=0; i<valuesM.length; i++){
                  updateMatricula(cod,grupos[i],valuesA[2],valuesM[i][0],valuesM[i][1]).then(data=>{
                    if(data.length>0){
                      alert("Matriculas actualizadas");
                      //Se almacenan los nuevos valores para futuras actulizaciones
                      cod = valuesA[2];
                      for(let i=0; i<valuesM.length; i++) grupos[i] = valuesM[i][1];
                    } else alert("Error al Actualizar");
                  }).catch(error => alert("Los cambios efectuados sobre el registro de la matrícula no son compatibles con su formato"));
                }
              }
            } else alert("Todos los campos deben estar llenos");
          });
        }
        //BOTONES BORRAR ALUMNO
        for(let btn of modalModifAlum.querySelectorAll(".btnBorrAlum")){
          btn.addEventListener("click", (e)=>{
            e.preventDefault();
            //Se almacena el dni y el código
            let dniB = btn.parentElement.parentElement.children[3].firstChild.value.toUpperCase();
            let codB = btn.parentElement.parentElement.children[2].firstChild.value;
            //Si confirma el borrado
            if(confirm("¿Quieres borrar éste alumno? Sus matrículas también se borrarán")){
              //Se borra el alumno
              deleteAlumno(dniB,'','','','').then(data=>{
                if(data.length>0) alert("Alumno borrado");
                else alert("No se pudo realizar el borrado");
              }).catch(error=>alert("Error al procesar la petición de borrado del alumno"));
              //Se borran sus matrículas
              deleteMatricula(codB,'','').then(data=>{
                if(data.length>0) alert("Matrículas borradas");
                else alert("No se pudo realizar el borrado");
                //Se actualiza el visor
                tbodyModifAlum.innerHTML="";
                tbodyModifMatr.innerHTML="";
              }).catch(error=>alert("Error al procesar la petición de borrado de la/s matrícula/s"));
            }
          });
        }
        //BOTONES BORRAR MATRÍCULA
        for(let btn of modalModifAlum.querySelectorAll(".btnBorrMatr")){
          btn.addEventListener("click", (e)=>{
            e.preventDefault();
            //Se almacena el dni y el código
            let codB = tbodyModifAlum.firstElementChild.children[2].firstElementChild.value;
            let gruB = btn.parentElement.parentElement.children[1].firstElementChild.value;
            //Si confirma el borrado
            if(confirm("¿Quieres borrar ésta matrícula? Éste cambio no afectará al alumno")){
              //Se borra la matrícula
              deleteMatricula(codB,'',gruB).then(data=>{
                if(data.length>0) alert("Matrícula borrada");
                else alert("No se pudo realizar el borrado");
                //Se actualiza el visor
                tbodyModifMatr.removeChild(btn.parentElement.parentElement);
              }).catch(error=>alert("Error al procesar la petición de borrado sobre la/s matrícula/s"));
            }
          });
        }
      } else alert("No se encontró un alumno con el DNI "+dni);
    }).catch(error => alert("Error al procesar la petición de información sobre alumnos"));
  } else alert("Indica un DNI para buscar");
});

//BOTONES PROFESORES --------------------------------------------------------------------------------------------------

AltaIProf.addEventListener("click",()=>{
  //Se incluyen los departamentos en el combo box
  let select = tbodyAltaIProf.firstElementChild.lastElementChild.firstElementChild;
  select.innerHTML = "";
  getDepartamentos('','','','').then(data=>{
    for(let dat of data){
      let selected = "";
      if(dat.CODIGO == 0) selected = " selected";
      select.innerHTML += `<option value="${dat.CODIGO}"${selected}>${dat.NOMBRE}</option>`;
    }
  }).catch(error=>alert("Error al procesar la petición de información sobre departamentos"));
});

//BOTÓN INSERTAR NUEVO PROFESOR
altaIProf.addEventListener("click", (e)=>{
  vacio = false;
  e.preventDefault();
  //Se almacenan los valores del profesor
  let valuesP = [];
  for(let i=0; i<tbodyAltaIProf.firstElementChild.children.length-1; i++){
    valuesP[i] = tbodyAltaIProf.firstElementChild.children[i].firstElementChild.value;
    if(valuesP[i]=='') vacio = true;
  }
  valuesP[3]=tbodyAltaIProf.querySelector("select").value;
  //Si no hay ningún valor sin indicar
  if(!vacio){
    //Si confirma la actualización
    if(confirm("¿Quieres insertar éste profesor?")){
      //Se inserta el profesor
      putProfesor(valuesP[2],valuesP[3],valuesP[0],valuesP[1]).then(data=>{
        if(data.length>0){
          for(let i=0; i<tbodyAltaIProf.firstElementChild.children.length-1; i++){
            tbodyAltaIProf.firstElementChild.children[i].firstElementChild.value='';
          }
          tbodyAltaIProf.firstElementChild.children[3].firstElementChild.selectedIndex=0;
          alert("Profesor insertado");
        } 
        else alert("Error al insertar");
      }).catch(error => alert("Los datos indicados de la matrícula no son compatibles con su formato"));
    }
  } else alert("Los campos del profesor deben estar llenos");
});

//BOTÓN BUSCAR PROFESOR (MODIF/BAJA)
buscarModifProf.addEventListener("click",()=>{
  let dni = buscarModifProf.previousElementSibling.value.toUpperCase(), cod, grupos = [];
  //Si se introduce un DNI
  if(dni.length==9){
    getProfesores('','',dni,'').then(data=>{
      //Si se encuentra un resultado
      if(data.length==1){
        let codD = data[0].CODIGO;
        //Se resetean y se imprimen los registros de las tablas
        tbodyModifProf.innerHTML = "";
        tbodyModifProf.innerHTML += `
        <tr class="align-middle">
          <td><input type="text" class="form-control w-100" style="min-width: 180px" name="apellidos" value="${data[0].APELLIDOS}" required></td>
          <td><input type="text" class="form-control w-100" style="min-width: 90px" name="nombre" value="${data[0].NOMBRE}" required></td>
          <td><input type="text" class="form-control w-100" style="min-width: 110px" name="dni" value="${data[0].DNI}" required></td>
          <td><select class="form-select" style="min-width: 250px" aria-label=".form-select-lg"></select></td>
          <td><input type="submit" class="btn btn-primary btnActuProf" name="actualizarProf" value="Actualizar"></td>
          <td><input type="submit" class="btn btn-primary btnBorrProf" name="borrarProf" value="Borrar"></td>
        </tr>`;
        //Se incluyen los departamentos en el combo box (con el departamento del profesor seleccionado por defecto)
        let select = tbodyModifProf.querySelector("select");
        select.innerHTML="";
        getDepartamentos('','','','').then(data=>{
          for(let dat of data){
            let selected = "";
            if(codD == dat.CODIGO) selected = " selected";
            select.innerHTML += `<option value="${dat.CODIGO}"${selected}>${dat.NOMBRE}</option>`;
          }
        }).catch(error=>alert("Error al procesar la petición de información sobre departamentos"));
        //BOTONES ACTUALIZAR PROFESOR
        for(let btn of modalModifProf.querySelectorAll(".btnActuProf")){
          btn.addEventListener("click", (e)=>{
            vacio = false;
            e.preventDefault();
            //Se almacenan los valores del profesor
            let valuesP = [];
            for(let i=0; i<tbodyModifProf.firstElementChild.children.length-2; i++){ //----
              valuesP[i] = tbodyModifProf.firstElementChild.children[i].firstElementChild.value;
              if(valuesP[i]=='') vacio = true;
            }
            //Si no hay ningún valor sin indicar
            if(!vacio){
              //Si confirma la actualización
              if(confirm("¿Quieres actualizar estos campos?")){
                //Se actualiza el profesor
                updateProfesor(dni,valuesP[1],valuesP[0],valuesP[2],valuesP[3]).then(data=>{
                  if(data.length>0) alert("Profesor actualizado");
                  else alert("Error al Actualizar");
                }).catch(error => alert("Los cambios efectuados sobre el registro no son compatibles con su formato"));
              }
            } else alert("Todos los campos deben estar llenos");
          });
        }
        //BOTONES BORRAR PROFESOR
        for(let btn of modalModifProf.querySelectorAll(".btnBorrProf")){
          btn.addEventListener("click", (e)=>{
            e.preventDefault();
            //Se almacena el dni
            let dniB = btn.parentElement.parentElement.children[2].firstChild.value.toUpperCase();
            //Si confirma el borrado
            if(confirm("¿Quieres borrar éste profesor?")){
              //Se borra el profesor
              deleteProfesor(dniB,'','','').then(data=>{
                if(data.length>0){
                  tbodyModifProf.innerHTML='';
                  alert("Profesor borrado");
                } else alert("No se pudo realizar el borrado");
              }).catch(error=>alert("Error al procesar la petición de borrado del profesor"));
            }
          });
        }
      } else alert("No se encontró un profesor con el DNI "+dni);
    }).catch(error=>alert("Error al procesar la petición de información sobre profesores"));
  } else alert("Indica un DNI para buscar");
});

//BOTONES DEPARTAMENTOS ---------------------------------------------------------------------------

//BOTÓN INSERTAR NUEVO DEPARTAMENTO
altaIDepart.addEventListener("click", (e)=>{
  let centros = ['CIFP1','Pedro Mercedes','Albaladejito'];
  vacio = false;
  e.preventDefault();
  //Se almacenan los valores del departamento
  let valuesD = [];
  for(let i=0; i<tbodyAltaIDepart.firstElementChild.children.length; i++){
    if(i==1) valuesD[i] = centros[tbodyAltaIDepart.firstElementChild.children[i].firstElementChild.selectedIndex];
    else valuesD[i] = tbodyAltaIDepart.firstElementChild.children[i].firstElementChild.value;
    if(valuesD[i]=='') vacio = true;
  }
  //Si no hay ningún valor sin indicar
  if(!vacio){
    //Si confirma la actualización
    if(confirm("¿Quieres insertar éste departamento?")){
      //Se inserta el departamento
      putDepart(valuesD[0],valuesD[1],valuesD[2],valuesD[3]).then(data=>{
        if(data.length>0){
          for(let i=0; i<tbodyAltaIDepart.firstElementChild.children.length; i++){
            if(i==1) tbodyAltaIDepart.firstElementChild.children[1].firstElementChild.selectedIndex=0;
            else tbodyAltaIDepart.firstElementChild.children[i].firstElementChild.value='';
          }
          alert("Departamento insertado");
        } 
        else alert("Error al insertar");
      }).catch(error => alert("Los datos indicados del departamento no son compatibles con su formato"));
    }
  } else alert("Los campos del departamento deben estar llenos");
});

//BOTÓN MODIF/BAJA DEPARTAMENTOS
ModifDepart.addEventListener("click",()=>{
  //Se incluyen los departamentos en el combo box (con el departamento del profesor seleccionado por defecto)
  let select = buscarModifDepart.previousElementSibling;
  select.innerHTML="";
  getDepartamentos('','','','').then(data=>{
    for(let dat of data){
      let selected = "";
      if(dat.CODIGO == 0) selected = " selected";
      select.innerHTML += `<option value="${dat.CODIGO}"${selected}>${dat.NOMBRE}</option>`;
    }
  }).catch(error=>alert("Error al procesar la petición de información sobre departamentos"));
});

//BOTÓN BUSCAR DEPARTAMENTO (MODIF/BAJA)
buscarModifDepart.addEventListener("click",()=>{
  let select = buscarModifDepart.previousElementSibling;
  let sIndex = select.value;
  getDepartamentos(sIndex+'','','','').then(data=>{
    //Si se encuentra un resultado
    if(data.length==1){
      let codD = data[0].CODIGO;
      //Se resetean y se imprimen los registros de las tablas
      tbodyModifDepart.innerHTML = "";
      tbodyModifDepart.innerHTML += `
      <tr class="align-middle">
        <td style="width:70px"><input type="text" class="form-control w-100" name="apellidos" value="${data[0].CODIGO}" required></td>
        <td><input type="text" class="form-control w-100" style="min-width: 300px" name="nombre" value="${data[0].NOMBRE}" required></td>
        <td style="max-width:155px"><input type="text" class="form-control w-100" style="min-width: 150px" name="dni" value="${data[0].CENTRO}" required></td>
        <td style="max-width:120px"><input type="text" class="form-control w-100" style="min-width: 110px" name="nombre" value="${data[0].DNI}" required></td>
        <td><input type="text" class="form-control w-100" style="min-width: 200px" name="dni" value="${data[0].PASSWORD}" required></td>
        <td><input type="submit" class="btn btn-primary btnActuDepart" name="actualizarDepart" value="Actualizar"></td>
        <td><input type="submit" class="btn btn-primary btnBorrDepart" name="borrarDepart" value="Borrar"></td>
      </tr>`;
      
      //BOTONES ACTUALIZAR DEPARTAMENTO
      for(let btn of modalModifDepart.querySelectorAll(".btnActuDepart")){
        btn.addEventListener("click", (e)=>{
          vacio = false;
          e.preventDefault();
          //Se almacenan los valores del departamento
          let valuesD = [];
          for(let i=0; i<tbodyModifDepart.firstElementChild.children.length-2; i++){
            valuesD[i] = tbodyModifDepart.firstElementChild.children[i].firstElementChild.value;
            if(valuesD[i]=='') vacio = true;
          }
          //Si no hay ningún valor sin indicar
          if(!vacio){
            //Si confirma la actualización
            if(confirm("¿Quieres actualizar estos campos?")){
              //Se actualiza el departamento
              updateDepart(codD,valuesD[0],valuesD[1],valuesD[2],valuesD[3],valuesD[4]).then(data=>{
                if(data.length>0){
                  alert("Departamento actualizado");
                  codD = valuesD[0];
                } else alert("Error al actualizar");
              }).catch(error => alert("Los cambios efectuados sobre el registro no son compatibles con su formato"));
            }
          } else alert("Todos los campos deben estar llenos");
        });
      }
      //BOTONES BORRAR DEPARTAMENTO
      for(let btn of modalModifDepart.querySelectorAll(".btnBorrDepart")){
        btn.addEventListener("click", (e)=>{
          e.preventDefault();
          //Se almacena el dni
          let codB = btn.parentElement.parentElement.children[0].firstChild.value;
          //Si confirma el borrado
          if(confirm("¿Quieres borrar éste departamento?")){
            //Se borra el departamento
            deleteDepart(codB,'','','').then(data=>{
              if(data.length>0){
                tbodyModifDepart.innerHTML='';
                select.selectedIndex=0;
                alert("Departamento borrado");
              } 
              else alert("No se pudo realizar el borrado");
            }).catch(error=>alert("Error al procesar la petición de borrado del departamento"));
          }
        });
      }
    } else alert("No se encontró un departamento con el código "+sIndex);
  }).catch(error=>alert("Error al procesar la petición de información sobre departamentos"));
});

//BOTONES COPIA DE SEGURIDAD ----------------------------------------------------------------------

//BOTÓN BACKUP
backup.addEventListener("click",()=>{
  if(confirm("¿Quieres almacenar una nueva copia de seguridad del estado actual?")){
    dbaction("backup").then(data=>{
      if(data[1]=='') alert("Backup ejecutado");
      else alert("Error al ejecutar el backup");
    }).catch(error=>alert("Error al procesar la petición de backup"));
  }
});

//BOTÓN RESTORE
restore.addEventListener("click",(e)=>{
  e.preventDefault();
  tbodyRestore.innerHTML="";
  //Se imprimen los backups anteriores de la carpeta backups
  dbaction("restorelist").then(data=>{
    for(let dat of data){
      tbodyRestore.innerHTML+=`
      <tr class="align-middle">
        <td>${dat.FECHA}</td>
        <td>${dat.HORA}</td>
        <td><input type="submit" class="btn btn-primary btnRestore" value="Restaurar"></td>
      </tr>`;
    }
    //Se crean los eventos de los botones Restaurar
    for(let btn of tbodyRestore.querySelectorAll(".btnRestore")){
      btn.addEventListener("click",(e)=>{
        e.preventDefault();
        if(confirm("¿Quieres restaurar esta copia de seguridad? Todos los datos actuales serán sustituidos por los de la copia de seguridad")){
          //Se almacenan fecha y hora y se realiza el backup correspondiente
          let fecha = btn.parentElement.parentElement.children[0].textContent;
          let hora = btn.parentElement.parentElement.children[1].textContent;
          dbaction("restore",fecha,hora).then(data=>{
            if(data[1]=='') alert("Restore ejecutado");
            else alert("Error al ejecutar el restore");
          }).catch(error=>alert("Error al procesar la petición de restore"));
        }
      });
    }
  }).catch(error=>alert("Error al procesar la petición de información sobre los backups"));
});