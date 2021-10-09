import * as actionTypes from '../types/userTypes';

const initialState = {
  userInfo: null,
  access_token: '',
  filtros : null,
  filtrosOriginals : null,
  marcados : null,
  marcadosOriginals : null
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
    case actionTypes.GUARDAR_FILTROS: {
      //alert("filtros " + JSON.stringify(action.payload))
      newState.filtros = action.payload;
      //newState.filtrosOriginals = action.payload;
      break;
    }
    case actionTypes.GUARDAR_FILTROS_ORIGINALS: {
      //alert("filtros " + JSON.stringify(action.payload))
      newState.filtros = action.payload;
      //newState.filtrosOriginals = action.payload;
      break;
    }
    case actionTypes.GUARDAR_MARCADOS: {
      //alert("newState.filtros.length " + newState.filtros.length)
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
      //newState.marcados = Array(newState.filtros.length).fill(!action.payload);
      // newState.marcadosOriginals = Array(newState.filtros.length).fill(action.payload);
      var aux = Array(newState.filtros.length).fill(true);
      newState.marcadosOriginals = aux;
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
