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
      newState.creadaIncidencia = action.payload;
      break;
    }    
    case actionTypes.GUARDAR_ARCHIVO: {
      newState.idArchivo = action.payload;
      break;
    }
    case actionTypes.GUARDAR_INCIDENCIAS: {
      newState.incidencias = action.payload;
      break;
    }
    case actionTypes.GUARDAR_INCIDENCIA_REDUX: {
      var auxiliar = [];
      var auxiliar1 = [];
      
      auxiliar.push(action.payload);
      auxiliar1.push(action.payload);

      newState.incidencias.forEach(element => {
        auxiliar.push(element);
        auxiliar1.push(element);
      });
      newState.incidencias = auxiliar;
      newState.incidenciasOriginals = auxiliar1;
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
