import * as actionTypes from '../types/userTypes';

const initialState = {
  userInfo: null,
  access_token: '',
  csrf: '',
  filtros: null,
  filtrosOriginals: null,
  marcados: null,
  marcadosOriginals: null,
  secciones: null,
  idArchivo: null,
  creadaIncidencia: false,
  favoritosRedux: []
};

const userReducer = (state, action) => {
  if (typeof state === 'undefined') {
    return initialState;
  }
  const newState = Object.assign({}, state);

  switch (action.type) {
    case actionTypes.GUARDAR_TOKEN: {
      newState.access_token = action.payload.token;
      newState.csrf = action.payload.csrf;
      break;
    }
    case actionTypes.LOGOUT: {
      newState.access_token = null;
      newState.csrf = null;
      newState.userInfo = null;
      break;
    }
    case actionTypes.GUARDAR_CREADA: {
      newState.creadaIncidencia = action.payload;
      break;
    }
    case actionTypes.GUARDAR_ARCHIVO: {
      newState.idArchivo = action.payload;
      break;
    }
    case actionTypes.GUARDAR_USUARIO: {
      newState.userInfo = action.payload;
      break;
    }
    case actionTypes.GUARDAR_SECCIONES_PERFIL: {
      newState.secciones = action.payload;
      break;
    }
    case actionTypes.GUARDAR_FILTROS: {
      newState.filtros = action.payload;
      break;
    }
    case actionTypes.GUARDAR_FILTROS_ORIGINALS: {
      newState.filtrosOriginals = action.payload;
      break;
    }
    case actionTypes.INITIAL_FAVORITOS: {
      newState.favoritosRedux = action.payload;
      console.log("auxFavoritos ", JSON.stringify(newState.favoritosRedux))
      break;
    }
    case actionTypes.SET_FAVORITO: {

      var temp = [];
      newState.favoritosRedux.forEach((element, i) => {
        if (i === action.payload.indice) {
          temp.push(action.payload.value)
        } else {
          temp.push(element)
        }
      });
      console.log("action.payload.value ", action.payload.value)
      newState.favoritosRedux = temp;
      console.log("auxFavoritos nuevos ", newState.favoritosRedux)
      break;
    }
    case actionTypes.GUARDAR_MARCADOS: {
      var aux = Array(newState.filtros.length).fill(action.payload);
      newState.marcados = aux;
      break;
    }
    case actionTypes.GUARDAR_MARCADOS_ARRAY: {

      newState.marcados = action.payload;
      break;
    }
    case actionTypes.GUARDAR_MARCADOS_ORIGINALS: {
      var aux1 = Array(newState.filtros.length).fill(true);
      newState.marcadosOriginals = aux1;
      break;
    }
    default: {
      return newState;
    }
  }
  return newState;
};

export default userReducer;
