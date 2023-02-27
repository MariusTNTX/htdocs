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
  //http://iespmercedescuenca.ddns.net:81/Informatica/MolinaM/Biblioteca/php/api.php?select=libros&filters=${filters}&values=${values}
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
  console.log(`http://192.168.2.30/Biblioteca/php/api.php?select=alumnos&filters=${filters}&values=${values}`)
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
  console.log(`http://192.168.2.30/Biblioteca/php/api.php?select=profesores&filters=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?select=profesores&filters=${filters}&values=${values}`,{
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
  console.log(`http://192.168.2.30/Biblioteca/php/api.php?select=reservas&filters=${filters}&values=${values}`)
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
  console.log(`http://192.168.2.30/Biblioteca/php/api.php?select=prestamos&filters=${filters}&values=${values}`)
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
async function getLibrosUsuario(dni){
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
  console.log(`http://192.168.2.30/Biblioteca/php/api.php?select=librosUsuario&filters=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?select=librosUsuario&filters=${filters}&values=${values}`,{
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
  console.log(`http://192.168.2.30/Biblioteca/php/api.php?insert=reserva&elements=${filters}&values=${values}`)
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
  console.log(`http://192.168.2.30/Biblioteca/php/api.php?delete=reserva&elements=${filters}&values=${values}`)
  let request = await fetch(`http://localhost/Biblioteca/php/api.php?delete=reserva&elements=${filters}&values=${values}`,{
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  });
  request = await request.json();
  console.log(request);
  return Promise.resolve(request);
}