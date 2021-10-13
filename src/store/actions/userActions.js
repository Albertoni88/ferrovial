import { GUARDAR_TOKEN, GUARDAR_SECCIONES_PERFIL, GUARDAR_FILTROS, GUARDAR_FILTROS_ORIGINALS, TOMAR_TOKEN, GUARDAR_MARCADOS, GUARDAR_MARCADOS_ARRAY, GUARDAR_MARCADOS_ORIGINALS } from "../types/userTypes";
import axios from 'axios';
import { URL_SERVER } from '../../constants/urls';


export const recuperarPass = (email) => {
    axios
        .post(URL_SERVER + 'user/password?_format=json', { "mail": email },
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        )
        .then(async response => {
            // alert("response " + JSON.stringify(response));
            return response;
        })
        .catch(error => {
            //alert("error1 " + error)
        });
}
export const guardarToken = (token) => ({
    type: GUARDAR_TOKEN,
    payload: token
})
// export const guardarSeccionesPerfil = (access_token) => async dispatch =>{
// export const guardarSeccionesPerfil = (access_token) => async dispatch => {
    
//     return axios.get(URL_SERVER + 'rest/secciones_textuales?_format=json', 
//             {
//                 headers: {
//                     'Authorization' : 'Bearer ' + access_token
//                     // Accept: 'application/json',
//                     // 'Content-Type': 'application/json',
//                     // 'cookie': ''
//                 }
//             }
//         )
//         .then(async response => {
//             if (response.status === 200) {
//                 alert("response " + JSON.stringify(response));
//                 dispatch(guardarSeccionesPerfil(response.data));                
//             } 
//         })
//         .catch(error => {
//             //alert("error1 " + error)
//         });
// }
export const guardarSeccionesPerfil = (secciones) => ({
    type: GUARDAR_SECCIONES_PERFIL,
    payload: secciones
})
export const guardarFiltros = (filtros) => ({
    type: GUARDAR_FILTROS,
    payload: filtros
})
export const guardarFiltrosOriginals = (filtros) => ({
    type: GUARDAR_FILTROS_ORIGINALS,
    payload: filtros
})
export const guardarMarcados = (value) => ({
    type: GUARDAR_MARCADOS,
    payload: value
})
export const guardarMarcadosArray = (array) => ({
    type: GUARDAR_MARCADOS_ARRAY,
    payload: array
})
export const guardarMarcadosOriginals = (value) => ({
    type: GUARDAR_MARCADOS_ORIGINALS,
    payload: value
})

// export const tomarToken = () => ({
//     type: TOMAR_TOKEN,
// })
// export const deleteTask = (id) => ({
// type: DELETE_TASK,
// payload: id
// })
// export const didTask = (id) => ({
// type: DID_TASK,
// payload: id
// })