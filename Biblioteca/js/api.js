const _0x54c05e=_0x4fdd;(function(_0x587ccb,_0x26f294){const _0x12cd39=_0x4fdd,_0x1cb180=_0x587ccb();while(!![]){try{const _0x5d824e=parseInt(_0x12cd39(0x106))/0x1+parseInt(_0x12cd39(0x110))/0x2+-parseInt(_0x12cd39(0x139))/0x3+-parseInt(_0x12cd39(0xd9))/0x4*(parseInt(_0x12cd39(0xec))/0x5)+-parseInt(_0x12cd39(0x102))/0x6*(parseInt(_0x12cd39(0x101))/0x7)+-parseInt(_0x12cd39(0xdf))/0x8+-parseInt(_0x12cd39(0x132))/0x9*(-parseInt(_0x12cd39(0xe9))/0xa);if(_0x5d824e===_0x26f294)break;else _0x1cb180['push'](_0x1cb180['shift']());}catch(_0x2cff1b){_0x1cb180['push'](_0x1cb180['shift']());}}}(_0x3d7e,0x3cfc4));function _0x4fdd(_0x1458b2,_0x55df19){const _0x3d7eef=_0x3d7e();return _0x4fdd=function(_0x4fdd15,_0x15864f){_0x4fdd15=_0x4fdd15-0xd4;let _0x2580e8=_0x3d7eef[_0x4fdd15];return _0x2580e8;},_0x4fdd(_0x1458b2,_0x55df19);}var root=_0x54c05e(0xe8);function eliminarSesionAdmin(){const _0x2037fc=_0x54c05e;if(sessionStorage[_0x2037fc(0x108)](_0x2037fc(0x138))){let _0x545e50=sessionStorage[_0x2037fc(0x108)](_0x2037fc(0x138));(_0x545e50==_0x2037fc(0xfd)||_0x545e50==_0x2037fc(0xea))&&(sessionStorage['removeItem'](_0x2037fc(0x138)),sessionStorage[_0x2037fc(0xd8)](_0x2037fc(0xe5)),sessionStorage[_0x2037fc(0xd8)]('apellidosUsuario'),sessionStorage['removeItem']('dniUsuario'),sessionStorage[_0x2037fc(0xd8)](_0x2037fc(0x103)),sessionStorage[_0x2037fc(0xd8)](_0x2037fc(0x123)),sessionStorage[_0x2037fc(0xd8)](_0x2037fc(0x113)),sessionStorage['removeItem'](_0x2037fc(0x109)));}}function checkDomain(_0x1f0d71){const _0x3c6785=_0x54c05e;location['hostname']!=_0x3c6785(0x12a)&&location[_0x3c6785(0xef)]!=_0x3c6785(0x10d)&&(location[_0x3c6785(0xee)]=_0x3c6785(0xf7)+root+_0x3c6785(0x118)+_0x1f0d71+_0x3c6785(0x112));}function key(){const _0x1f8da6=_0x54c05e;let _0x26ce85=[0x9,0x6,0x5,0x3,0x2,0x4,0x1,0x0,0x7,0x8],_0x5284d6=[_0x1f8da6(0xf3),_0x1f8da6(0xf0),'fbs','ump',_0x1f8da6(0x117),_0x1f8da6(0xfc),_0x1f8da6(0xed),_0x1f8da6(0x12c),_0x1f8da6(0x121),_0x1f8da6(0x120)],_0x260387=new Date()['getTime']()+'',_0xf93d7=[],_0x152c2c=[];_0x260387=_0x260387[_0x1f8da6(0xe7)](0x0,_0x260387[_0x1f8da6(0x130)]-0x3),_0x260387=_0x260387[_0x1f8da6(0x11e)]('');for(let _0x135fc8=0x0;_0x135fc8<_0x260387[_0x1f8da6(0x130)];_0x135fc8++){_0xf93d7[_0x135fc8]=_0x260387[_0x26ce85[_0x135fc8]];}for(let _0x4bf464=0x0;_0x4bf464<_0x260387[_0x1f8da6(0x130)];_0x4bf464++){_0x152c2c[_0x4bf464]=_0x5284d6[_0xf93d7[_0x4bf464]];}return _0x152c2c=_0x152c2c[_0x1f8da6(0x133)](''),_0x152c2c;}async function getLibros(_0x25a379,_0x19e991,_0x33819a,_0x16596f,_0x1058ef,_0x57cde4,_0x1be8de,_0x56d43d,_0x383362,_0x38112f){const _0x103a36=_0x54c05e;let _0x2afe47=[_0x103a36(0x136),'autor',_0x103a36(0x111),_0x103a36(0x116),_0x103a36(0x11b),'materia',_0x103a36(0x11d),_0x103a36(0xf8),_0x103a36(0x12f),_0x103a36(0x114)],_0x301ee6=[_0x25a379,_0x19e991,_0x33819a,_0x16596f,_0x1058ef,_0x57cde4,_0x1be8de,_0x56d43d,_0x383362,_0x38112f],_0x402cf=[],_0x3eff33=[];for(let _0x1f97b4 in _0x301ee6){_0x301ee6[_0x1f97b4][_0x103a36(0x130)]>0x0&&(_0x402cf[_0x103a36(0xf4)](_0x2afe47[_0x1f97b4]),_0x3eff33[_0x103a36(0xf4)](_0x301ee6[_0x1f97b4]));}_0x402cf=_0x402cf[_0x103a36(0x133)]('|'),_0x3eff33=_0x3eff33[_0x103a36(0x133)]('|');let _0x205727=await fetch(_0x103a36(0xf7)+root+_0x103a36(0xe4)+key()+_0x103a36(0xf1)+_0x402cf+'&values='+_0x3eff33,{'method':_0x103a36(0xeb),'headers':{'Content-Type':_0x103a36(0xfa)}});return _0x205727=await _0x205727['json'](),Promise[_0x103a36(0xe3)](_0x205727);}async function getAlumnos(_0x1d431a,_0x5620c8,_0xb80426,_0x188d5b,_0x452aa7){const _0x5cf031=_0x54c05e;let _0x22c357=[_0x5cf031(0x11c),'apellidos',_0x5cf031(0xf5),_0x5cf031(0x105),_0x5cf031(0x11f)],_0x226503=[_0x1d431a,_0x5620c8,_0xb80426,_0x188d5b,_0x452aa7],_0x14d6b3=[],_0x32d7a9=[];for(let _0x3bf15e in _0x226503){_0x226503[_0x3bf15e][_0x5cf031(0x130)]>0x0&&(_0x14d6b3[_0x5cf031(0xf4)](_0x22c357[_0x3bf15e]),_0x32d7a9[_0x5cf031(0xf4)](_0x226503[_0x3bf15e]));}_0x14d6b3=_0x14d6b3[_0x5cf031(0x133)]('|'),_0x32d7a9=_0x32d7a9[_0x5cf031(0x133)]('|');let _0xc63d0=await fetch(_0x5cf031(0xf7)+root+'/Biblioteca/php/api.php?key='+key()+_0x5cf031(0xd4)+_0x14d6b3+_0x5cf031(0xda)+_0x32d7a9,{'method':'GET','headers':{'Content-Type':'application/json'}});return _0xc63d0=await _0xc63d0[_0x5cf031(0x12e)](),Promise['resolve'](_0xc63d0);}async function getMatriculas(_0x39af8e,_0x42354e,_0x48b40f,_0x1596e3,_0xaf0ce4,_0x4c1834,_0x57388a){const _0x4d0275=_0x54c05e;let _0xc681cd=[_0x4d0275(0x105),_0x4d0275(0x11f),_0x4d0275(0x135),_0x4d0275(0xf5),_0x4d0275(0x10e),'estudios',_0x4d0275(0x125)],_0x3e9bbe=[_0x39af8e,_0x42354e,_0x48b40f,_0x1596e3,_0xaf0ce4,_0x4c1834,_0x57388a],_0xf8b9f2=[],_0x309e1a=[];for(let _0x46b1c0 in _0x3e9bbe){_0x3e9bbe[_0x46b1c0][_0x4d0275(0x130)]>0x0&&(_0xf8b9f2[_0x4d0275(0xf4)](_0xc681cd[_0x46b1c0]),_0x309e1a[_0x4d0275(0xf4)](_0x3e9bbe[_0x46b1c0]));}_0xf8b9f2=_0xf8b9f2[_0x4d0275(0x133)]('|'),_0x309e1a=_0x309e1a[_0x4d0275(0x133)]('|');let _0x331a9c=await fetch(_0x4d0275(0xf7)+root+_0x4d0275(0xe4)+key()+_0x4d0275(0xd7)+_0xf8b9f2+_0x4d0275(0xda)+_0x309e1a,{'method':_0x4d0275(0xeb),'headers':{'Content-Type':_0x4d0275(0xfa)}});return _0x331a9c=await _0x331a9c[_0x4d0275(0x12e)](),Promise[_0x4d0275(0xe3)](_0x331a9c);}async function getProfesores(_0x318365,_0x4adb7e,_0x424c23,_0x23a5f0){const _0x3b5354=_0x54c05e;let _0x34139c=[_0x3b5354(0x10e),_0x3b5354(0xf5),_0x3b5354(0x105),_0x3b5354(0x11d)],_0x3ddff5=[_0x318365,_0x4adb7e,_0x424c23,_0x23a5f0],_0x20ad55=[],_0x3c17ba=[];for(let _0x33172b in _0x3ddff5){_0x3ddff5[_0x33172b][_0x3b5354(0x130)]>0x0&&(_0x20ad55[_0x3b5354(0xf4)](_0x34139c[_0x33172b]),_0x3c17ba[_0x3b5354(0xf4)](_0x3ddff5[_0x33172b]));}_0x20ad55=_0x20ad55[_0x3b5354(0x133)]('|'),_0x3c17ba=_0x3c17ba['join']('|');let _0x406630=await fetch(_0x3b5354(0xf7)+root+_0x3b5354(0xe4)+key()+_0x3b5354(0x11a)+_0x20ad55+_0x3b5354(0xda)+_0x3c17ba,{'method':_0x3b5354(0xeb),'headers':{'Content-Type':_0x3b5354(0xfa)}});return _0x406630=await _0x406630[_0x3b5354(0x12e)](),Promise[_0x3b5354(0xe3)](_0x406630);}async function getDepartamentos(_0x622000,_0x90df47,_0x378fab,_0x26ac93){const _0x1c1fc=_0x54c05e;let _0x105a61=[_0x1c1fc(0x11d),_0x1c1fc(0xf5),_0x1c1fc(0xf8),_0x1c1fc(0xdb)],_0x539a85=[_0x622000,_0x90df47,_0x378fab,_0x26ac93],_0x18c733=[],_0x698d35=[];for(let _0x33e78e in _0x539a85){_0x539a85[_0x33e78e][_0x1c1fc(0x130)]>0x0&&(_0x18c733[_0x1c1fc(0xf4)](_0x105a61[_0x33e78e]),_0x698d35[_0x1c1fc(0xf4)](_0x539a85[_0x33e78e]));}_0x18c733=_0x18c733!=[]?_0x18c733[_0x1c1fc(0x133)]('|'):'',_0x698d35=_0x698d35!=[]?_0x698d35[_0x1c1fc(0x133)]('|'):'';let _0x5959da=await fetch(_0x1c1fc(0xf7)+root+_0x1c1fc(0xe4)+key()+_0x1c1fc(0xfb)+_0x18c733+_0x1c1fc(0xda)+_0x698d35,{'method':'GET','headers':{'Content-Type':_0x1c1fc(0xfa)}});return _0x5959da=await _0x5959da[_0x1c1fc(0x12e)](),Promise[_0x1c1fc(0xe3)](_0x5959da);}async function getMaterias(){const _0x211aa6=_0x54c05e;let _0x2792a8=await fetch(_0x211aa6(0xf7)+root+_0x211aa6(0xe4)+key()+'&select=materias',{'method':_0x211aa6(0xeb),'headers':{'Content-Type':_0x211aa6(0xfa)}});return _0x2792a8=await _0x2792a8['json'](),Promise[_0x211aa6(0xe3)](_0x2792a8);}async function getReservas(_0x325ae7,_0x4498b8,_0xb8f686,_0xe6ef99){const _0xf2ad45=_0x54c05e;let _0xa86a56=[_0xf2ad45(0x137),_0xf2ad45(0x10a),'D.cod_dpto','fecha_fin'],_0x26678d=[_0x325ae7,_0x4498b8,_0xb8f686,_0xe6ef99],_0xaa85ca=[],_0x114c4e=[];for(let _0x58613e in _0x26678d){_0x26678d[_0x58613e][_0xf2ad45(0x130)]>0x0&&(_0xaa85ca[_0xf2ad45(0xf4)](_0xa86a56[_0x58613e]),_0x114c4e[_0xf2ad45(0xf4)](_0x26678d[_0x58613e]));}_0xaa85ca=_0xaa85ca[_0xf2ad45(0x133)]('|'),_0x114c4e=_0x114c4e[_0xf2ad45(0x133)]('|');let _0x473a99=await fetch(_0xf2ad45(0xf7)+root+_0xf2ad45(0xe4)+key()+_0xf2ad45(0x107)+_0xaa85ca+_0xf2ad45(0xda)+_0x114c4e,{'method':'GET','headers':{'Content-Type':'application/json'}});return _0x473a99=await _0x473a99[_0xf2ad45(0x12e)](),Promise[_0xf2ad45(0xe3)](_0x473a99);}async function getPrestamos(_0x2b3f28,_0x4fd04b,_0xc2e4e9,_0x51c4c1,_0xa843cf,_0x180718){const _0x53c86a=_0x54c05e;let _0xbdf909=[_0x53c86a(0x119),_0x53c86a(0x100),_0x53c86a(0xde),'fecha_recog',_0x53c86a(0x115),_0x53c86a(0x126)],_0xed8635=[_0x2b3f28,_0x4fd04b,_0xc2e4e9,_0x51c4c1,_0xa843cf,_0x180718],_0x75a223=[],_0xea603d=[];for(let _0x457830 in _0xed8635){_0xed8635[_0x457830][_0x53c86a(0x130)]>0x0&&(_0x75a223['push'](_0xbdf909[_0x457830]),_0xea603d[_0x53c86a(0xf4)](_0xed8635[_0x457830]));}_0x75a223=_0x75a223[_0x53c86a(0x133)]('|'),_0xea603d=_0xea603d[_0x53c86a(0x133)]('|');let _0x3a044f=await fetch(_0x53c86a(0xf7)+root+_0x53c86a(0xe4)+key()+'&select=prestamos&filters='+_0x75a223+_0x53c86a(0xda)+_0xea603d,{'method':'GET','headers':{'Content-Type':_0x53c86a(0xfa)}});return _0x3a044f=await _0x3a044f[_0x53c86a(0x12e)](),Promise[_0x53c86a(0xe3)](_0x3a044f);}async function getFechaRecogida(){const _0x10a392=_0x54c05e;let _0x19cbc3=await fetch(_0x10a392(0xf7)+root+'/Biblioteca/php/api.php?key='+key()+_0x10a392(0x134),{'method':'GET','headers':{'Content-Type':_0x10a392(0xfa)}});return _0x19cbc3=await _0x19cbc3[_0x10a392(0x12e)](),Promise[_0x10a392(0xe3)](_0x19cbc3);}async function getLibrosActUsuario(_0x5f1e07){const _0x317604=_0x54c05e;let _0x47299e=['dni'],_0x5eae47=[_0x5f1e07],_0xc163e8=[],_0x46487a=[];for(let _0x11214b in _0x5eae47){_0x5eae47[_0x11214b][_0x317604(0x130)]>0x0&&(_0xc163e8['push'](_0x47299e[_0x11214b]),_0x46487a[_0x317604(0xf4)](_0x5eae47[_0x11214b]));}_0xc163e8=_0xc163e8[_0x317604(0x133)]('|'),_0x46487a=_0x46487a['join']('|');let _0x2782a1=await fetch(_0x317604(0xf7)+root+'/Biblioteca/php/api.php?key='+key()+_0x317604(0xf6)+_0xc163e8+_0x317604(0xda)+_0x46487a,{'method':_0x317604(0xeb),'headers':{'Content-Type':_0x317604(0xfa)}});return _0x2782a1=await _0x2782a1[_0x317604(0x12e)](),Promise[_0x317604(0xe3)](_0x2782a1);}async function getAdmins(_0x43f94f,_0x167cde){const _0x48fdc7=_0x54c05e;let _0x15d6b5=['dni_jfk','password'],_0x48c292=[_0x43f94f,_0x167cde],_0x260d8a=[],_0x215da0=[];for(let _0x28c574 in _0x48c292){_0x48c292[_0x28c574][_0x48fdc7(0x130)]>0x0&&(_0x260d8a[_0x48fdc7(0xf4)](_0x15d6b5[_0x28c574]),_0x215da0[_0x48fdc7(0xf4)](_0x48c292[_0x28c574]));}_0x260d8a=_0x260d8a[_0x48fdc7(0x133)]('|'),_0x215da0=_0x215da0[_0x48fdc7(0x133)]('|');let _0x5f569c=await fetch(_0x48fdc7(0xf7)+root+_0x48fdc7(0xe4)+key()+'&select=admins&filters='+_0x260d8a+'&values='+_0x215da0,{'method':_0x48fdc7(0xeb),'headers':{'Content-Type':'application/json'}});return _0x5f569c=await _0x5f569c[_0x48fdc7(0x12e)](),Promise[_0x48fdc7(0xe3)](_0x5f569c);}async function putReserva(_0x543b5f,_0x5e6622,_0x23f726){const _0x541c81=_0x54c05e;let _0x22b3ea=[_0x541c81(0x111),_0x541c81(0x105),_0x541c81(0xff)],_0x5d3af0=[_0x543b5f,_0x5e6622,_0x23f726],_0x42484a=[],_0x27c032=[];for(let _0x32c087 in _0x5d3af0){_0x5d3af0[_0x32c087][_0x541c81(0x130)]>0x0&&(_0x42484a['push'](_0x22b3ea[_0x32c087]),_0x27c032['push'](_0x5d3af0[_0x32c087]));}_0x42484a=_0x42484a[_0x541c81(0x133)]('|'),_0x27c032=_0x27c032[_0x541c81(0x133)]('|');let _0x550b30=await fetch('http://'+root+_0x541c81(0xe4)+key()+_0x541c81(0xfe)+_0x42484a+_0x541c81(0xda)+_0x27c032,{'method':_0x541c81(0xeb),'headers':{'Content-Type':_0x541c81(0xfa)}});return _0x550b30=await _0x550b30['json'](),Promise[_0x541c81(0xe3)](_0x550b30);}async function putPrestamo(_0x15859c,_0x46ace6){const _0x13f62b=_0x54c05e;let _0x3d1e0e=[_0x13f62b(0x111),'dni'],_0x3e0d4b=[_0x15859c,_0x46ace6],_0x6440bc=[],_0x5d64de=[];for(let _0x1a64c6 in _0x3e0d4b){_0x3e0d4b[_0x1a64c6][_0x13f62b(0x130)]>0x0&&(_0x6440bc['push'](_0x3d1e0e[_0x1a64c6]),_0x5d64de[_0x13f62b(0xf4)](_0x3e0d4b[_0x1a64c6]));}_0x6440bc=_0x6440bc['join']('|'),_0x5d64de=_0x5d64de[_0x13f62b(0x133)]('|');let _0x3761bd=await fetch('http://'+root+_0x13f62b(0xe4)+key()+_0x13f62b(0x12d)+_0x6440bc+_0x13f62b(0xda)+_0x5d64de,{'method':'GET','headers':{'Content-Type':_0x13f62b(0xfa)}});return _0x3761bd=await _0x3761bd[_0x13f62b(0x12e)](),Promise[_0x13f62b(0xe3)](_0x3761bd);}async function putAlumno(_0x182a86,_0x559a17,_0x5e805c,_0x275e8f,_0x351dc4){const _0x5c1218=_0x54c05e;let _0x560769=[_0x5c1218(0x105),_0x5c1218(0x11f),_0x5c1218(0x11c),_0x5c1218(0xf5),_0x5c1218(0x10e)],_0x2ca9b5=[_0x182a86,_0x559a17,_0x5e805c,_0x275e8f,_0x351dc4],_0x54f334=[],_0x36dc88=[];for(let _0x1a611f in _0x2ca9b5){_0x2ca9b5[_0x1a611f][_0x5c1218(0x130)]>0x0&&(_0x54f334[_0x5c1218(0xf4)](_0x560769[_0x1a611f]),_0x36dc88[_0x5c1218(0xf4)](_0x2ca9b5[_0x1a611f]));}_0x54f334=_0x54f334[_0x5c1218(0x133)]('|'),_0x36dc88=_0x36dc88['join']('|');let _0x26573d=await fetch(_0x5c1218(0xf7)+root+_0x5c1218(0xe4)+key()+'&insert=alumno&elements='+_0x54f334+_0x5c1218(0xda)+_0x36dc88,{'method':_0x5c1218(0xeb),'headers':{'Content-Type':_0x5c1218(0xfa)}});return _0x26573d=await _0x26573d['json'](),Promise['resolve'](_0x26573d);}async function putMatricula(_0x47a2e0,_0x7d60df,_0xa818bf){const _0x463430=_0x54c05e;let _0x3d057a=[_0x463430(0x11c),_0x463430(0x131),_0x463430(0x125)],_0x5b94a7=[_0x47a2e0,_0x7d60df,_0xa818bf],_0x345fe7=[],_0x48cf46=[];for(let _0x50e63a in _0x5b94a7){_0x5b94a7[_0x50e63a][_0x463430(0x130)]>0x0&&(_0x345fe7[_0x463430(0xf4)](_0x3d057a[_0x50e63a]),_0x48cf46['push'](_0x5b94a7[_0x50e63a]));}_0x345fe7=_0x345fe7[_0x463430(0x133)]('|'),_0x48cf46=_0x48cf46[_0x463430(0x133)]('|');let _0x136116=await fetch(_0x463430(0xf7)+root+_0x463430(0xe4)+key()+_0x463430(0xe2)+_0x345fe7+_0x463430(0xda)+_0x48cf46,{'method':_0x463430(0xeb),'headers':{'Content-Type':_0x463430(0xfa)}});return _0x136116=await _0x136116['json'](),Promise[_0x463430(0xe3)](_0x136116);}async function putProfesor(_0x1e1c18,_0x109f4b,_0x102825,_0x39f2fe){const _0x312a8e=_0x54c05e;let _0x5821b5=[_0x312a8e(0x105),'cod_dpto',_0x312a8e(0xf5),_0x312a8e(0x10e)],_0x395e66=[_0x1e1c18,_0x109f4b,_0x102825,_0x39f2fe],_0x4c7751=[],_0x391f04=[];for(let _0xe2d164 in _0x395e66){_0x395e66[_0xe2d164][_0x312a8e(0x130)]>0x0&&(_0x4c7751['push'](_0x5821b5[_0xe2d164]),_0x391f04[_0x312a8e(0xf4)](_0x395e66[_0xe2d164]));}_0x4c7751=_0x4c7751['join']('|'),_0x391f04=_0x391f04[_0x312a8e(0x133)]('|');let _0x5328f9=await fetch(_0x312a8e(0xf7)+root+'/Biblioteca/php/api.php?key='+key()+_0x312a8e(0x122)+_0x4c7751+_0x312a8e(0xda)+_0x391f04,{'method':'GET','headers':{'Content-Type':_0x312a8e(0xfa)}});return _0x5328f9=await _0x5328f9[_0x312a8e(0x12e)](),Promise[_0x312a8e(0xe3)](_0x5328f9);}async function putDepart(_0x145cf1,_0x1c243d,_0xa0257e,_0x2f1e4c){const _0x300d4c=_0x54c05e;let _0x62971=['nombre',_0x300d4c(0xf8),_0x300d4c(0xdb),'password'],_0x1e9169=[_0x145cf1,_0x1c243d,_0xa0257e,_0x2f1e4c],_0x24e92b=[],_0x2f9a20=[];for(let _0x16d12d in _0x1e9169){_0x1e9169[_0x16d12d][_0x300d4c(0x130)]>0x0&&(_0x24e92b[_0x300d4c(0xf4)](_0x62971[_0x16d12d]),_0x2f9a20[_0x300d4c(0xf4)](_0x1e9169[_0x16d12d]));}_0x24e92b=_0x24e92b[_0x300d4c(0x133)]('|'),_0x2f9a20=_0x2f9a20[_0x300d4c(0x133)]('|');let _0x5ab53b=await fetch('http://'+root+'/Biblioteca/php/api.php?key='+key()+_0x300d4c(0x124)+_0x24e92b+_0x300d4c(0xda)+_0x2f9a20,{'method':_0x300d4c(0xeb),'headers':{'Content-Type':_0x300d4c(0xfa)}});return _0x5ab53b=await _0x5ab53b['json'](),Promise[_0x300d4c(0xe3)](_0x5ab53b);}async function putLibro(_0x406105,_0x37a363,_0x5fa46f,_0x383bea,_0xf96732,_0x28e2e6,_0x5084bb,_0x43520b,_0x3ccc44,_0x548173){const _0x830e87=_0x54c05e;let _0x54ae9b=[_0x830e87(0x111),'titulo',_0x830e87(0xdd),_0x830e87(0xe1),_0x830e87(0x116),_0x830e87(0x11b),'soporte_m','usuario',_0x830e87(0x11d),_0x830e87(0x114)],_0x203b56=[_0x406105,_0x37a363,_0x5fa46f,_0x383bea,_0xf96732,_0x28e2e6,_0x5084bb,_0x43520b,_0x3ccc44,_0x548173],_0x1d405f=[],_0x44b336=[];for(let _0x17aaef in _0x203b56){_0x203b56[_0x17aaef]['length']>0x0&&(_0x1d405f[_0x830e87(0xf4)](_0x54ae9b[_0x17aaef]),_0x44b336[_0x830e87(0xf4)](_0x203b56[_0x17aaef]));}_0x1d405f=_0x1d405f[_0x830e87(0x133)]('|'),_0x44b336=_0x44b336[_0x830e87(0x133)]('|');let _0x36a73b=await fetch('http://'+root+_0x830e87(0xe4)+key()+_0x830e87(0xf9)+_0x1d405f+_0x830e87(0xda)+_0x44b336,{'method':_0x830e87(0xeb),'headers':{'Content-Type':_0x830e87(0xfa)}});return _0x36a73b=await _0x36a73b['json'](),Promise[_0x830e87(0xe3)](_0x36a73b);}async function deleteReserva(_0x3bba27,_0xf9a612){const _0x427934=_0x54c05e;let _0x372e98=[_0x427934(0x111),_0x427934(0x105)],_0x58def8=[_0x3bba27,_0xf9a612],_0x5e9d73=[],_0x1718d7=[];for(let _0x542d2a in _0x58def8){_0x58def8[_0x542d2a]['length']>0x0&&(_0x5e9d73[_0x427934(0xf4)](_0x372e98[_0x542d2a]),_0x1718d7[_0x427934(0xf4)](_0x58def8[_0x542d2a]));}_0x5e9d73=_0x5e9d73[_0x427934(0x133)]('|'),_0x1718d7=_0x1718d7['join']('|');let _0x5e1c30=await fetch('http://'+root+_0x427934(0xe4)+key()+'&delete=reserva&elements='+_0x5e9d73+_0x427934(0xda)+_0x1718d7,{'method':_0x427934(0xeb),'headers':{'Content-Type':_0x427934(0xfa)}});return _0x5e1c30=await _0x5e1c30[_0x427934(0x12e)](),Promise[_0x427934(0xe3)](_0x5e1c30);}async function deleteReservasCad(){const _0x2f08e3=_0x54c05e;let _0x54e9b6=await fetch(_0x2f08e3(0xf7)+root+_0x2f08e3(0xe4)+key()+_0x2f08e3(0xd5),{'method':_0x2f08e3(0xeb),'headers':{'Content-Type':_0x2f08e3(0xfa)}});return _0x54e9b6=await _0x54e9b6['json'](),Promise['resolve'](_0x54e9b6);}async function deleteAlumno(_0x330b45,_0x145ca3,_0x265af5,_0x5ce256,_0x347bd8){const _0x918cff=_0x54c05e;let _0x1771ef=[_0x918cff(0x105),'nie',_0x918cff(0x11c),'nombre',_0x918cff(0x10e)],_0x24c3e9=[_0x330b45,_0x145ca3,_0x265af5,_0x5ce256,_0x347bd8],_0x4214b0=[],_0x53a885=[];for(let _0x433cdf in _0x24c3e9){_0x24c3e9[_0x433cdf][_0x918cff(0x130)]>0x0&&(_0x4214b0[_0x918cff(0xf4)](_0x1771ef[_0x433cdf]),_0x53a885[_0x918cff(0xf4)](_0x24c3e9[_0x433cdf]));}_0x4214b0=_0x4214b0[_0x918cff(0x133)]('|'),_0x53a885=_0x53a885[_0x918cff(0x133)]('|');let _0x2a2e61=await fetch(_0x918cff(0xf7)+root+'/Biblioteca/php/api.php?key='+key()+_0x918cff(0x10c)+_0x4214b0+'&values='+_0x53a885,{'method':_0x918cff(0xeb),'headers':{'Content-Type':_0x918cff(0xfa)}});return _0x2a2e61=await _0x2a2e61[_0x918cff(0x12e)](),Promise[_0x918cff(0xe3)](_0x2a2e61);}async function deleteProfesor(_0x3e72a0,_0x3e0254,_0x8de27a,_0x105c7b){const _0x24589e=_0x54c05e;let _0x3682d1=[_0x24589e(0x105),_0x24589e(0xf5),_0x24589e(0x10e),_0x24589e(0x11d)],_0x21b0cb=[_0x3e72a0,_0x3e0254,_0x8de27a,_0x105c7b],_0x269a60=[],_0x968914=[];for(let _0x3e13d9 in _0x21b0cb){_0x21b0cb[_0x3e13d9][_0x24589e(0x130)]>0x0&&(_0x269a60['push'](_0x3682d1[_0x3e13d9]),_0x968914[_0x24589e(0xf4)](_0x21b0cb[_0x3e13d9]));}_0x269a60=_0x269a60[_0x24589e(0x133)]('|'),_0x968914=_0x968914[_0x24589e(0x133)]('|');let _0x31e1dd=await fetch(_0x24589e(0xf7)+root+'/Biblioteca/php/api.php?key='+key()+'&delete=profesor&elements='+_0x269a60+_0x24589e(0xda)+_0x968914,{'method':_0x24589e(0xeb),'headers':{'Content-Type':'application/json'}});return _0x31e1dd=await _0x31e1dd['json'](),Promise['resolve'](_0x31e1dd);}async function deleteMatricula(_0x325ea9,_0x3ed13f,_0xd57ee2){const _0x15b421=_0x54c05e;let _0x222c21=['alumno',_0x15b421(0x131),_0x15b421(0x125)],_0x1d8a76=[_0x325ea9,_0x3ed13f,_0xd57ee2],_0x5b4e7d=[],_0x1be5e6=[];for(let _0x54dcfd in _0x1d8a76){_0x1d8a76[_0x54dcfd][_0x15b421(0x130)]>0x0&&(_0x5b4e7d[_0x15b421(0xf4)](_0x222c21[_0x54dcfd]),_0x1be5e6['push'](_0x1d8a76[_0x54dcfd]));}_0x5b4e7d=_0x5b4e7d[_0x15b421(0x133)]('|'),_0x1be5e6=_0x1be5e6[_0x15b421(0x133)]('|');let _0x20decc=await fetch(_0x15b421(0xf7)+root+_0x15b421(0xe4)+key()+_0x15b421(0x10f)+_0x5b4e7d+_0x15b421(0xda)+_0x1be5e6,{'method':_0x15b421(0xeb),'headers':{'Content-Type':_0x15b421(0xfa)}});return _0x20decc=await _0x20decc[_0x15b421(0x12e)](),Promise[_0x15b421(0xe3)](_0x20decc);}function _0x3d7e(){const _0x1b8a9b=['&insert=reserva&elements=','fecha_fin','P.dni','63MnDWqH','133842Zjafyo','nieUsuario','password','dni','383381HWSRtm','&select=reservas&filters=','getItem','codDptoUsuario','R.dni','soporte_m','&delete=alumno&elements=','localhost','apellidos','&delete=matricula&elements=','537662hfTxEh','cod_libro','.html','departUsuario','estado','fecha_devol','editorial','lza','/Biblioteca/','P.cod_libro','&select=profesores&filters=','a_edicion','alumno','cod_dpto','split','nie','btz','qwc','&insert=profesor&elements=','centroUsuario','&insert=departamento&elements=','grupo','devuelto','&exists=bibliotecamolinam','&elements=','&update=libro&id=','iespmercedescuenca.ddns.net','&update=alumno&id=','iyj','&insert=prestamo&elements=','json','usuario','length','estudios','45nxkyMJ','join','&calc=fechaRecogida','m.alumno','titulo','R.cod_libro','tipoUsuario','150042dOzHdo','&select=alumnos&filters=','&delete=reservasCad','&delete=departamento&elements=','&select=matriculas&filters=','removeItem','4GAZvcm','&values=','dni_jfk','&hour=','autor','D.cod_dpto','1082056OzNgkq','&update=matricula&id=','materia','&insert=matricula&elements=','resolve','/Biblioteca/php/api.php?key=','nombreUsuario','&update=prestamo&id=','substring','iespmercedescuenca.ddns.net:81/Informatica/MolinaM','628620iIipjM','jfk','GET','1653460vmelRh','xdh','href','hostname','gan','&select=libros&filters=','&date=','oev','push','nombre','&select=librosActUsuario&filters=','http://','centro','&insert=libro&elements=','application/json','&select=departamentos&filters=','ktr','admin'];_0x3d7e=function(){return _0x1b8a9b;};return _0x3d7e();}async function deleteDepart(_0xa0cf63,_0x28c749,_0x575c69,_0x5060a8){const _0x5d2368=_0x54c05e;let _0x3ce19c=[_0x5d2368(0x11d),_0x5d2368(0xf5),_0x5d2368(0xf8),_0x5d2368(0xdb)],_0x59a56a=[_0xa0cf63,_0x28c749,_0x575c69,_0x5060a8],_0x574aec=[],_0x5cb234=[];for(let _0x5f37d2 in _0x59a56a){_0x59a56a[_0x5f37d2]['length']>0x0&&(_0x574aec[_0x5d2368(0xf4)](_0x3ce19c[_0x5f37d2]),_0x5cb234[_0x5d2368(0xf4)](_0x59a56a[_0x5f37d2]));}_0x574aec=_0x574aec[_0x5d2368(0x133)]('|'),_0x5cb234=_0x5cb234[_0x5d2368(0x133)]('|');let _0x1da2c3=await fetch(_0x5d2368(0xf7)+root+_0x5d2368(0xe4)+key()+_0x5d2368(0xd6)+_0x574aec+_0x5d2368(0xda)+_0x5cb234,{'method':_0x5d2368(0xeb),'headers':{'Content-Type':_0x5d2368(0xfa)}});return _0x1da2c3=await _0x1da2c3[_0x5d2368(0x12e)](),Promise['resolve'](_0x1da2c3);}async function deleteLibro(_0x581c38,_0x143886,_0x59136a,_0x323f7c,_0x4e610e,_0x1cf725,_0x1bf8df,_0x2d5ade,_0xa6bb8b,_0x203667){const _0x5dea2e=_0x54c05e;let _0x5ef52c=[_0x5dea2e(0x111),'titulo','autor','materia','editorial',_0x5dea2e(0x11b),_0x5dea2e(0x10b),'usuario',_0x5dea2e(0x11d),'estado'],_0x18ae4d=[_0x581c38,_0x143886,_0x59136a,_0x323f7c,_0x4e610e,_0x1cf725,_0x1bf8df,_0x2d5ade,_0xa6bb8b,_0x203667],_0x497838=[],_0x4ad466=[];for(let _0xa0c9ab in _0x18ae4d){_0x18ae4d[_0xa0c9ab][_0x5dea2e(0x130)]>0x0&&(_0x497838['push'](_0x5ef52c[_0xa0c9ab]),_0x4ad466['push'](_0x18ae4d[_0xa0c9ab]));}_0x497838=_0x497838[_0x5dea2e(0x133)]('|'),_0x4ad466=_0x4ad466[_0x5dea2e(0x133)]('|');let _0xa5ca27=await fetch(_0x5dea2e(0xf7)+root+_0x5dea2e(0xe4)+key()+'&delete=libro&elements='+_0x497838+'&values='+_0x4ad466,{'method':_0x5dea2e(0xeb),'headers':{'Content-Type':_0x5dea2e(0xfa)}});return _0xa5ca27=await _0xa5ca27[_0x5dea2e(0x12e)](),Promise[_0x5dea2e(0xe3)](_0xa5ca27);}async function updateAlumno(_0x5874cb,_0x3729de,_0x5f39a8,_0x5a4aca,_0x2a0612,_0x2a602d){const _0x42c2ad=_0x54c05e;let _0x1def39=['alumno',_0x42c2ad(0xf5),'apellidos',_0x42c2ad(0x105),_0x42c2ad(0x11f)],_0x18ef85=[_0x3729de,_0x5f39a8,_0x5a4aca,_0x2a0612,_0x2a602d],_0x378f2f=[],_0x3c1b6f=[];for(let _0x50756b in _0x18ef85){_0x18ef85[_0x50756b][_0x42c2ad(0x130)]>0x0&&(_0x378f2f[_0x42c2ad(0xf4)](_0x1def39[_0x50756b]),_0x3c1b6f['push'](_0x18ef85[_0x50756b]));}_0x378f2f=_0x378f2f[_0x42c2ad(0x133)]('|'),_0x3c1b6f=_0x3c1b6f['join']('|');let _0x5a25d9=await fetch(_0x42c2ad(0xf7)+root+'/Biblioteca/php/api.php?key='+key()+_0x42c2ad(0x12b)+_0x5874cb+_0x42c2ad(0x128)+_0x378f2f+_0x42c2ad(0xda)+_0x3c1b6f,{'method':_0x42c2ad(0xeb),'headers':{'Content-Type':_0x42c2ad(0xfa)}});return _0x5a25d9=await _0x5a25d9['json'](),Promise['resolve'](_0x5a25d9);}async function updateMatricula(_0x4a201e,_0x2b0cff,_0x286487,_0x2a2846,_0x16d5f4){const _0x25717c=_0x54c05e;let _0x4fb6b8=[_0x25717c(0x11c),_0x25717c(0x131),'grupo'],_0x19b997=[_0x286487,_0x2a2846,_0x16d5f4],_0x4785c0=[],_0x1c2585=[];for(let _0x32ae09 in _0x19b997){_0x19b997[_0x32ae09][_0x25717c(0x130)]>0x0&&(_0x4785c0['push'](_0x4fb6b8[_0x32ae09]),_0x1c2585[_0x25717c(0xf4)](_0x19b997[_0x32ae09]));}_0x4785c0=_0x4785c0[_0x25717c(0x133)]('|'),_0x1c2585=_0x1c2585['join']('|');let _0xdcc667=await fetch(_0x25717c(0xf7)+root+_0x25717c(0xe4)+key()+_0x25717c(0xe0)+_0x4a201e+'|'+_0x2b0cff+_0x25717c(0x128)+_0x4785c0+_0x25717c(0xda)+_0x1c2585,{'method':_0x25717c(0xeb),'headers':{'Content-Type':_0x25717c(0xfa)}});return _0xdcc667=await _0xdcc667[_0x25717c(0x12e)](),Promise[_0x25717c(0xe3)](_0xdcc667);}async function updateProfesor(_0xb8f121,_0x35f1c1,_0x3f90d6,_0x2a9cda,_0x11e270){const _0x43c33f=_0x54c05e;let _0xacfd94=[_0x43c33f(0xf5),_0x43c33f(0x10e),_0x43c33f(0x105),'cod_dpto'],_0xf3aae6=[_0x35f1c1,_0x3f90d6,_0x2a9cda,_0x11e270],_0xf5a191=[],_0xa538e0=[];for(let _0x2ead44 in _0xf3aae6){_0xf3aae6[_0x2ead44][_0x43c33f(0x130)]>0x0&&(_0xf5a191[_0x43c33f(0xf4)](_0xacfd94[_0x2ead44]),_0xa538e0[_0x43c33f(0xf4)](_0xf3aae6[_0x2ead44]));}_0xf5a191=_0xf5a191[_0x43c33f(0x133)]('|'),_0xa538e0=_0xa538e0[_0x43c33f(0x133)]('|');let _0x14fec6=await fetch(_0x43c33f(0xf7)+root+_0x43c33f(0xe4)+key()+'&update=profesor&id='+_0xb8f121+_0x43c33f(0x128)+_0xf5a191+'&values='+_0xa538e0,{'method':_0x43c33f(0xeb),'headers':{'Content-Type':'application/json'}});return _0x14fec6=await _0x14fec6['json'](),Promise[_0x43c33f(0xe3)](_0x14fec6);}async function updateDepart(_0x35d472,_0x37025a,_0x43875c,_0x124d85,_0x476a6e,_0x343b04){const _0x8c4d9b=_0x54c05e;let _0x2ca036=[_0x8c4d9b(0x11d),_0x8c4d9b(0xf5),'centro',_0x8c4d9b(0xdb),_0x8c4d9b(0x104)],_0x1f98a8=[_0x37025a,_0x43875c,_0x124d85,_0x476a6e,_0x343b04],_0x2e8c63=[],_0x5531ed=[];for(let _0x26a3a in _0x1f98a8){_0x1f98a8[_0x26a3a][_0x8c4d9b(0x130)]>0x0&&(_0x2e8c63[_0x8c4d9b(0xf4)](_0x2ca036[_0x26a3a]),_0x5531ed['push'](_0x1f98a8[_0x26a3a]));}_0x2e8c63=_0x2e8c63[_0x8c4d9b(0x133)]('|'),_0x5531ed=_0x5531ed['join']('|');let _0x45eee5=await fetch(_0x8c4d9b(0xf7)+root+_0x8c4d9b(0xe4)+key()+'&update=departamento&id='+_0x35d472+_0x8c4d9b(0x128)+_0x2e8c63+_0x8c4d9b(0xda)+_0x5531ed,{'method':_0x8c4d9b(0xeb),'headers':{'Content-Type':_0x8c4d9b(0xfa)}});return _0x45eee5=await _0x45eee5['json'](),Promise[_0x8c4d9b(0xe3)](_0x45eee5);}async function updateLibro(_0x158fc3,_0x19fcb2,_0x772b22,_0x46f29e,_0x396217,_0x505c1b,_0x3a992e,_0x37c913,_0x5cf6f1,_0x4c0cf4,_0x21f5f1){const _0x1510c3=_0x54c05e;let _0x569af8=[_0x1510c3(0x111),'titulo','autor',_0x1510c3(0xe1),_0x1510c3(0x116),_0x1510c3(0x11b),_0x1510c3(0x10b),_0x1510c3(0x12f),_0x1510c3(0x11d),_0x1510c3(0x114)],_0x3ded2a=[_0x19fcb2,_0x772b22,_0x46f29e,_0x396217,_0x505c1b,_0x3a992e,_0x37c913,_0x5cf6f1,_0x4c0cf4,_0x21f5f1],_0x1aaff9=[],_0x45747f=[];for(let _0x2ed870 in _0x3ded2a){_0x3ded2a[_0x2ed870][_0x1510c3(0x130)]>0x0&&(_0x1aaff9[_0x1510c3(0xf4)](_0x569af8[_0x2ed870]),_0x45747f[_0x1510c3(0xf4)](_0x3ded2a[_0x2ed870]));}_0x1aaff9=_0x1aaff9[_0x1510c3(0x133)]('|'),_0x45747f=_0x45747f[_0x1510c3(0x133)]('|');let _0x5c5081=await fetch('http://'+root+_0x1510c3(0xe4)+key()+_0x1510c3(0x129)+_0x158fc3+'&elements='+_0x1aaff9+_0x1510c3(0xda)+_0x45747f,{'method':_0x1510c3(0xeb),'headers':{'Content-Type':'application/json'}});return _0x5c5081=await _0x5c5081[_0x1510c3(0x12e)](),Promise[_0x1510c3(0xe3)](_0x5c5081);}async function updatePrestamo(_0x5185e1,_0x1ac77f,_0x5184d7,_0x27f83d){const _0x3a22fc=_0x54c05e;let _0x1496c9=[_0x3a22fc(0x111),_0x3a22fc(0x105),_0x3a22fc(0x126)],_0x2f6d87=[_0x1ac77f,_0x5184d7,_0x27f83d],_0x5e86f6=[],_0x1702e7=[];for(let _0x36ba7a in _0x2f6d87){_0x2f6d87[_0x36ba7a]['length']>0x0&&(_0x5e86f6[_0x3a22fc(0xf4)](_0x1496c9[_0x36ba7a]),_0x1702e7[_0x3a22fc(0xf4)](_0x2f6d87[_0x36ba7a]));}_0x5e86f6=_0x5e86f6[_0x3a22fc(0x133)]('|'),_0x1702e7=_0x1702e7['join']('|');let _0x3789ca=await fetch(_0x3a22fc(0xf7)+root+_0x3a22fc(0xe4)+key()+_0x3a22fc(0xe6)+_0x5185e1+_0x3a22fc(0x128)+_0x5e86f6+'&values='+_0x1702e7,{'method':_0x3a22fc(0xeb),'headers':{'Content-Type':_0x3a22fc(0xfa)}});return _0x3789ca=await _0x3789ca['json'](),Promise['resolve'](_0x3789ca);}async function existsDatabase(){const _0x1ed744=_0x54c05e;let _0x313b34=await fetch('http://'+root+_0x1ed744(0xe4)+key()+_0x1ed744(0x127),{'method':'GET','headers':{'Content-Type':'application/json'}});return _0x313b34=await _0x313b34[_0x1ed744(0x12e)](),Promise[_0x1ed744(0xe3)](_0x313b34);}async function dbaction(_0x50ea35,_0x1a1388='',_0x371efa=''){const _0x174868=_0x54c05e;let _0x48e38a='';if(_0x1a1388!='')_0x48e38a+=_0x174868(0xf2)+_0x1a1388;if(_0x371efa!='')_0x48e38a+=_0x174868(0xdc)+_0x371efa;let _0x1503db=await fetch(_0x174868(0xf7)+root+_0x174868(0xe4)+key()+'&dbaction='+_0x50ea35+_0x48e38a,{'method':_0x174868(0xeb),'headers':{'Content-Type':_0x174868(0xfa)}});return _0x1503db=await _0x1503db[_0x174868(0x12e)](),Promise['resolve'](_0x1503db);}