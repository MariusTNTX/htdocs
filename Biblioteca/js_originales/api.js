var root = 'iespmercedescuenca.ddns.net:81/Informatica/MolinaM'; // localhost | iespmercedescuenca.ddns.net:81/Informatica/MolinaM

//Elimina la sesión del admin en caso de quedarse abierta
function eliminarSesionAdmin(){
  if(sessionStorage.getItem("tipoUsuario")){
    let tipo = sessionStorage.getItem("tipoUsuario");
    if(tipo=='admin' || tipo=='jfk'){
      sessionStorage.removeItem("tipoUsuario");
      sessionStorage.removeItem("nombreUsuario");
      sessionStorage.removeItem("apellidosUsuario");
      sessionStorage.removeItem("dniUsuario");
      sessionStorage.removeItem("nieUsuario");
      sessionStorage.removeItem("centroUsuario");
      sessionStorage.removeItem("departUsuario");
      sessionStorage.removeItem("codDptoUsuario");
    }
  }
}

//Redirige al dominio de origen en caso de no acceder desde él
function checkDomain(name){
  if(location.hostname!='iespmercedescuenca.ddns.net' && location.hostname!='localhost'){
    location.href=`http://${root}/Biblioteca/${name}.html`;
  }
}

//CODIFICADOR DE API_KEY
//Genera la key de uso único para peticiones realizadas por los scripts de la aplicación
function key(){
  let local = [9,6,5,3,2,4,1,0,7,8];
  let corresp = ['oev','gan','fbs','ump','lza','ktr','xdh','iyj','qwc','btz'];
  let fecha = new Date().getTime()+'', interm=[], clave=[];
  fecha = fecha.substring(0,fecha.length-3);
  fecha = fecha.split("");
  for(let i=0; i<fecha.length; i++){
    interm[i] = fecha[local[i]];
  }
  for(let i=0; i<fecha.length; i++){
    clave[i] = corresp[interm[i]];
  }
  clave = clave.join("");
  return clave;
}

// GET_LIBROS: FUNCIÓN OBTENER LIBROS DE LA API
async function getLibros(tit,aut,isbn,edi,anio,mat,dep,cen,dis,est){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['titulo','autor','cod_libro','editorial','a_edicion','materia','cod_dpto','centro','usuario','estado'];
  let params = [tit,aut,isbn,edi,anio,mat,dep,cen,dis,est];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let response = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=libros&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  return Promise.resolve(response);
}

// GET_ALUMNOS: FUNCIÓN OBTENER ALUMNOS DE LA API
async function getAlumnos(cod,ape,nom,dni,nie){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['alumno','apellidos','nombre','dni','nie'];
  let params = [cod,ape,nom,dni,nie];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=alumnos&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// GET_MATRICULAS: FUNCIÓN OBTENER MATRÍCULAS DE LA API
async function getMatriculas(dni,nie,alu,nom,ape,est,gru){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['dni','nie','m.alumno','nombre','apellidos','estudios','grupo'];
  let params = [dni,nie,alu,nom,ape,est,gru];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=matriculas&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}


// GET_PROFESORES: FUNCIÓN OBTENER PROFESORES DE LA API
async function getProfesores(ape,nom,dni,cod_dpto){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['apellidos','nombre','dni','cod_dpto'];
  let params = [ape,nom,dni,cod_dpto];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=profesores&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// GET_DEPARTAMENTOS: FUNCIÓN OBTENER DEPARTAMENTOS DE LA API
async function getDepartamentos(cod,nom,cen,dni){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_dpto','nombre','centro','dni_jfk'];
  let params = [cod,nom,cen,dni];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = (filters != []) ? filters.join('|') : "";
  values = (values != []) ? values.join('|') : "";
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=departamentos&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// GET_MATERIAS: FUNCIÓN OBTENER MATERIAS DE LIBROS DE LA API
async function getMaterias(){
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=materias`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// GET_RESERVAS: FUNCIÓN OBTENER RESERVAS DE LA API
async function getReservas(cod,dni,dpto,fecha){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['R.cod_libro','R.dni','D.cod_dpto','fecha_fin'];
  let params = [cod,dni,dpto,fecha];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=reservas&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// GET_PRESTAMOS: FUNCIÓN OBTENER PRESTAMOS DE LA API
async function getPrestamos(cod,dni,dpto,fRec,fDev,dev){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['P.cod_libro','P.dni','D.cod_dpto','fecha_recog','fecha_devol','devuelto'];
  let params = [cod,dni,dpto,fRec,fDev,dev];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=prestamos&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// GET_FECHA_RECOGIDA: FUNCIÓN OBTENER PRESTAMOS DE LA API
async function getFechaRecogida(){
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&calc=fechaRecogida`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// GET_LIBROS_USUARIO: FUNCIÓN OBTENER LIBROS RESERVADOS Y PRESTADOS DE UN ALUMNO DE LA API
async function getLibrosActUsuario(dni){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['dni'];
  let params = [dni];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=librosActUsuario&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// GET_ADMINS: FUNCIÓN OBTENER ADMINISTRADORES DE LA API
async function getAdmins(dni, pass){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['dni_jfk','password'];
  let params = [dni, pass];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&select=admins&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// PUT_RESERVA: FUNCIÓN INSERTAR RESERVA DESDE LA API
async function putReserva(cod,dni,fecha){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_libro','dni','fecha_fin'];
  let params = [cod,dni,fecha];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&insert=reserva&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// PUT_PRÉSTAMO: FUNCIÓN INSERTAR PRÉSTAMO DESDE LA API
async function putPrestamo(cod,dni){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_libro','dni'];
  let params = [cod,dni];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&insert=prestamo&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// PUT_ALUMNO: FUNCIÓN INSERTAR ALUMNO DESDE LA API
async function putAlumno(dni,nie,cod,nom,ape){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['dni','nie','alumno','nombre','apellidos'];
  let params = [dni,nie,cod,nom,ape];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&insert=alumno&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// PUT_MATRICULA: FUNCIÓN INSERTAR MATRICULA DESDE LA API
async function putMatricula(cod,est,gru){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['alumno','estudios','grupo'];
  let params = [cod,est,gru];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&insert=matricula&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// PUT_PROFESOR: FUNCIÓN INSERTAR PROFESOR DESDE LA API
async function putProfesor(dni,cod,nom,ape){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['dni','cod_dpto','nombre','apellidos'];
  let params = [dni,cod,nom,ape];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&insert=profesor&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// PUT_DEPART: FUNCIÓN INSERTAR DEPARTAMENTO DESDE LA API
async function putDepart(nom,cen,dni,pass){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['nombre','centro','dni_jfk','password'];
  let params = [nom,cen,dni,pass];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&insert=departamento&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// PUT_LIBRO: FUNCIÓN INSERTAR LIBRO DESDE LA API
async function putLibro(isbn,tit,aut,mat,edi,ani,sop,usu,cod,est){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_libro','titulo','autor','materia','editorial','a_edicion','soporte_m','usuario','cod_dpto','estado'];
  let params = [isbn,tit,aut,mat,edi,ani,sop,usu,cod,est];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&insert=libro&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// DELETE_RESERVA: FUNCIÓN ELIMINAR RESERVA DESDE LA API
async function deleteReserva(cod,dni){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_libro','dni'];
  let params = [cod,dni];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&delete=reserva&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// DELETE_RESERVAS_CADUCADAS: FUNCIÓN ELIMINAR RESERVAS CADUCADAS DESDE LA API
async function deleteReservasCad(){
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&delete=reservasCad`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// DELETE_ALUMNO: FUNCIÓN ELIMINAR ALUMNO DESDE LA API
async function deleteAlumno(dni,nie,cod,nom,ape){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['dni','nie','alumno','nombre','apellidos'];
  let params = [dni,nie,cod,nom,ape];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&delete=alumno&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// DELETE_PROFESOR: FUNCIÓN ELIMINAR PROFESOR DESDE LA API
async function deleteProfesor(dni,nom,ape,cod){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['dni','nombre','apellidos','cod_dpto'];
  let params = [dni,nom,ape,cod];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&delete=profesor&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// DELETE_MATRICULA: FUNCIÓN ELIMINAR MATRICULA DESDE LA API
async function deleteMatricula(cod,est,gru){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['alumno','estudios','grupo'];
  let params = [cod,est,gru];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&delete=matricula&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// DELETE_DEPART: FUNCIÓN ELIMINAR DEPARTAMENTO DESDE LA API
async function deleteDepart(cod,nom,cen,dni){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_dpto','nombre','centro','dni_jfk'];
  let params = [cod,nom,cen,dni];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&delete=departamento&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// DELETE_LIBRO: FUNCIÓN ACTUALIZAR LIBRO DESDE LA API
async function deleteLibro(isbn,tit,aut,mat,edi,ani,sop,usu,cod,est){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_libro','titulo','autor','materia','editorial','a_edicion','soporte_m','usuario','cod_dpto','estado'];
  let params = [isbn,tit,aut,mat,edi,ani,sop,usu,cod,est];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&delete=libro&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// UPDATE_ALUMNO: FUNCIÓN ACTUALIZAR ALUMNO DESDE LA API
async function updateAlumno(id,cod,nom,ape,dni,nie){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['alumno','nombre','apellidos','dni','nie'];
  let params = [cod,nom,ape,dni,nie];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&update=alumno&id=${id}&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// UPDATE_MATRICULA: FUNCIÓN ACTUALIZAR MATRICULA DESDE LA API
async function updateMatricula(id1,id2,alu,est,gru){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['alumno','estudios','grupo'];
  let params = [alu,est,gru];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&update=matricula&id=${id1}|${id2}&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// UPDATE_PROFESOR: FUNCIÓN ACTUALIZAR PROFESOR DESDE LA API
async function updateProfesor(id,nom,ape,dni,dep){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['nombre','apellidos','dni','cod_dpto'];
  let params = [nom,ape,dni,dep];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&update=profesor&id=${id}&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// UPDATE_DEPART: FUNCIÓN ACTUALIZAR DEPARTAMENTO DESDE LA API
async function updateDepart(id,cod,nom,cen,dni,pass){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_dpto','nombre','centro','dni_jfk','password'];
  let params = [cod,nom,cen,dni,pass];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&update=departamento&id=${id}&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// UPDATE_LIBRO: FUNCIÓN ACTUALIZAR LIBRO DESDE LA API
async function updateLibro(id,isbn,tit,aut,mat,edi,ani,sop,usu,cod,est){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_libro','titulo','autor','materia','editorial','a_edicion','soporte_m','usuario','cod_dpto','estado'];
  let params = [isbn,tit,aut,mat,edi,ani,sop,usu,cod,est];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&update=libro&id=${id}&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// UPDATE_PRESTAMOS: FUNCIÓN ACTUALIZAR PRESTAMO DESDE LA API
async function updatePrestamo(id,cod,dni,dev){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['cod_libro','dni','devuelto'];
  let params = [cod,dni,dev];
  let filters = [], values = [];
  for(let i in params){
    if(params[i].length>0){
      filters.push(corresp[i]);
      values.push(params[i]);
    }
  }
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&update=prestamo&id=${id}&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// EXISTS_DATABASE: FUNCIÓN VERIFICAR EXISTENCIA DE LA BASE DE DATOS DESDE LA API
async function existsDatabase(){
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&exists=bibliotecamolinam`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// DBACTION: FUNCIÓN INFO BACKUP RESTORE DESDE LA API
async function dbaction(action,fecha='',hora=''){
  let params='';
  if(fecha!='') params+='&date='+fecha;
  if(hora!='') params+='&hour='+hora;
  //Se obtiene el JSON de resultados:
  let request = await fetch(`http://${root}/Biblioteca/php/api.php?key=${key()}&dbaction=${action}${params}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}