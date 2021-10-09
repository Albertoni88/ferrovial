import {combineReducers} from 'redux';
import incidenciaReducer from './incidenciaReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
  user: userReducer,
  incidencia: incidenciaReducer
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
//   if (action.type === actionTypes.LOGOUT_USER) {
//     state = undefined;
//   }

  return appReducer(state, action);
};
export default rootReducer;