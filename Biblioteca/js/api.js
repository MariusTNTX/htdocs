//http://iespmercedescuenca.ddns.net:81/Informatica/MolinaM/Biblioteca/php/api.php
//http://localhost/Biblioteca/php/api.php

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
  //http://localhost/Biblioteca/php/api.php?select=libros&filters=${filters}&values=${values}
  let response = await fetch(`http://localhost/Biblioteca/php/api.php?select=libros&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  response = await response.json();
  console.log(response);
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
  console.log(`http://localhost/Biblioteca/php/api.php?select=alumnos&filters=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?select=alumnos&filters=${filters}&values=${values}`,{
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
  console.log(`http://localhost/Biblioteca/php/api.php?select=profesores&filters=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?select=profesores&filters=${filters}&values=${values}`,{
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
  filters = filters.join('|');
  values = values.join('|');
  //Se obtiene el JSON de resultados:
  console.log(`http://localhost/Biblioteca/php/api.php?select=departamentos&filters=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?select=departamentos&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  return Promise.resolve(request);
}

// GET_RESERVAS: FUNCIÓN OBTENER RESERVAS DE LA API
async function getReservas(cod,dni,fecha){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['r.cod_libro','dni','fecha_fin'];
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
  console.log(`http://localhost/Biblioteca/php/api.php?select=reservas&filters=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?select=reservas&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
  return Promise.resolve(request);
}

// GET_PRESTAMOS: FUNCIÓN OBTENER PRESTAMOS DE LA API
async function getPrestamos(cod,dni,fRec,fDev,dev){
  //Se seleccionan los filtros y sus valores:
  let corresp = ['p.cod_libro','dni','fecha_recog','fecha_devol','devuelto'];
  let params = [cod,dni,fRec,fDev,dev];
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
  console.log(`http://localhost/Biblioteca/php/api.php?select=prestamos&filters=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?select=prestamos&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
  return Promise.resolve(request);
}

// GET_FECHA_RECOGIDA: FUNCIÓN OBTENER PRESTAMOS DE LA API
async function getFechaRecogida(){
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?calc=fechaRecogida`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
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
  console.log(`http://localhost/Biblioteca/php/api.php?select=librosActUsuario&filters=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?select=librosActUsuario&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
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
  console.log(`http://localhost/Biblioteca/php/api.php?select=admins&filters=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?select=admins&filters=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
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
  console.log(`http://localhost/Biblioteca/php/api.php?insert=reserva&elements=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?insert=reserva&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
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
  console.log(`http://localhost/Biblioteca/php/api.php?delete=reserva&elements=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?delete=reserva&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
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
  console.log(`http://localhost/Biblioteca/php/api.php?delete=alumno&elements=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?delete=alumno&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
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
  console.log(`http://localhost/Biblioteca/php/api.php?delete=matricula&elements=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?delete=matricula&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
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
  console.log(`http://localhost/Biblioteca/php/api.php?update=alumno&id=${id}&elements=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?update=alumno&id=${id}&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
  return Promise.resolve(request);
}

// UPDATE_MATRICULA: FUNCIÓN ACTUALIZAR MATRICULA DESDE LA API
async function updateMatricula(id1,id2,alu,est,gru){
  console.log("Grupo: "+gru)
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
  console.log(`http://localhost/Biblioteca/php/api.php?update=matricula&id=${id1}|${id2}&elements=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?update=matricula&id=${id1}|${id2}&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
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
  console.log(`http://localhost/Biblioteca/php/api.php?update=alumno&id=${id}&elements=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?update=alumno&id=${id}&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
  return Promise.resolve(request);
}

// EXISTS_DATABASE: FUNCIÓN VERIFICAR EXISTENCIA DE LA BASE DE DATOS DESDE LA API
async function existsDatabase(){
  //Se obtiene el JSON de resultados:
  console.log(`http://localhost/Biblioteca/php/api.php?exists=bibliotecamolinam`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?exists=bibliotecamolinam`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
  return Promise.resolve(request);
}

function eliminarSesionAdmin(){
  if(sessionStorage.getItem("tipoUsuario")){
    let tipo = sessionStorage.getItem("tipoUsuario");
    if(tipo=='admin' || tipo=='jfk'){
      sessionStorage.removeItem("tipoUsuario");
      sessionStorage.removeItem("nombreUsuario");
      sessionStorage.removeItem("apellidosUsuario");
      sessionStorage.removeItem("dniUsuario");
      sessionStorage.removeItem("centroUsuario");
      sessionStorage.removeItem("departUsuario");
    }
  }
}