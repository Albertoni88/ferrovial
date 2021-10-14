import * as actionTypes from '../types/userTypes';

const initialState = {
  userInfo: null,
  access_token: '',
  filtros : null,
  filtrosOriginals : null,
  marcados : null,
  marcadosOriginals : null,
  secciones : null, 
  idArchivo : null, 
  creadaIncidencia : false
};

const userReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  const newState = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.GUARDAR_TOKEN: {
      // alert("action " + JSON.stringify(action))
      newState.access_token = action.payload;
      break;
    }
    case actionTypes.GUARDAR_CREADA: {
      //alert("action " + JSON.stringify(action))
      newState.creadaIncidencia = action.payload;
      break;
    }    
    case actionTypes.GUARDAR_ARCHIVO: {
      //alert("idarchivo " + JSON.stringify(action.payload))
      newState.idArchivo = action.payload;
      break;
    }
    case actionTypes.GUARDAR_USUARIO: {
      //alert("action " + JSON.stringify(action.payload))
      newState.userInfo = action.payload;
      break;
    }
    case actionTypes.GUARDAR_SECCIONES_PERFIL: {
      // alert("action " + JSON.stringify(action.payload))
      newState.secciones = action.payload;
      break;
    }
    case actionTypes.GUARDAR_FILTROS: {
      // alert("filtros " + JSON.stringify(action.payload))
      newState.filtros = action.payload;
      //alert("newState.filtros " + JSON.stringify(newState.filtros))
      //newState.filtrosOriginals = action.payload;
      break;
    }
    case actionTypes.GUARDAR_FILTROS_ORIGINALS: {
      //alert("filtros " + JSON.stringify(action.payload))
      newState.filtrosOriginals = action.payload;
      //newState.filtrosOriginals = action.payload;
      break;
    }
    case actionTypes.GUARDAR_MARCADOS: {
      //alert("newState.filtrosOriginals.length " + newState.filtrosOriginals.length)
      var aux = Array(newState.filtros.length).fill(action.payload);
      //alert("aux " + JSON.stringify(aux))
      newState.marcados = aux;
      //alert("newState.marcados " + JSON.stringify(newState.marcados));
      //newState.marcadosOriginals = Array(newState.filtros.length).fill(action.payload);
      break;
    }
    case actionTypes.GUARDAR_MARCADOS_ARRAY: {
      
      newState.marcados = action.payload;
      break;
    }
    case actionTypes.GUARDAR_MARCADOS_ORIGINALS: {      
      //alert("newState.marcadosOriginals " + JSON.stringify(action.payload));
      //newState.marcados = Array(newState.filtros.length).fill(!action.payload);
      // newState.marcadosOriginals = Array(newState.filtros.length).fill(action.payload);
      var aux1 = Array(newState.filtros.length).fill(true);
      newState.marcadosOriginals = aux1;
      //alert("newState.marcadosOriginals " + JSON.stringify(newState.marcadosOriginals));
      break;
    }

    // case actionTypes.TOMAR_TOKEN: {
    //   return newState.access_token
    //   break;
    // }    
    default: {
      return newState;
    }
  }
  return newState;
};

export default userReducer;
