import * as actionTypes from '../types/incidenciaTypes';

const initialState = {
  incidencias: [],
  incidenciasOriginals: null,
  idArchivo : null, 
  creadaIncidencia : -1
};

const incidenciaReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  const newState = Object.assign({}, state);

  switch (action.type) {
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
    case actionTypes.GUARDAR_INCIDENCIAS: {
      newState.incidencias = action.payload;
      //alert("newState.incidencias " + JSON.stringify(newState.incidencias))
      break;
    }
    case actionTypes.GUARDAR_INCIDENCIA_REDUX: {
      newState.incidencias.push(action.payload);
      //alert("newState.incidencias " + JSON.stringify(newState.incidencias[newState.incidencias.length - 1]))
      break;
    }
    case actionTypes.GUARDAR_INCIDENCIAS_ORIGINALS: {
      newState.incidenciasOriginals = action.payload;
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

export default incidenciaReducer;
