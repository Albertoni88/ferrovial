import { GUARDAR_TOKEN, GUARDAR_SECCIONES_PERFIL, GUARDAR_FILTROS, GUARDAR_FILTROS_ORIGINALS, TOMAR_TOKEN, GUARDAR_MARCADOS, GUARDAR_MARCADOS_ARRAY, GUARDAR_MARCADOS_ORIGINALS, GUARDAR_USUARIO, GUARDAR_ARCHIVO, GUARDAR_CREADA, GUARDAR_INCIDENCIA_REDUX } from "../types/userTypes";
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
export const guardarUsuario = (access_token) => async dispatch => {
    return axios.get(URL_SERVER + 'rest/perfil_usuario?_format=json',
        {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }
    )
        .then(async response => {
            if (response.status === 200) {
                dispatch(guardarUsuarioRedux(response.data));
            }
        })
        .catch(error => {
            //alert("error1 " + error)
        });
}
async function getCSRFToken() {
    return axios.get('https://ferrovial.creacionwebprofesional.com/session/token')
        .then(response => {
            //alert("asd " + JSON.stringify(response.data))
            return response.data
        })
        .catch(error => {

        });
}
// export const guardarImagen = (access_token, imagenes) => async dispatch => {

//     var csrf = await getCSRFToken();
//     var data = { "imagenes": imagenes };

//     return axios.post(URL_SERVER + 'rest/fileupload?_format=json', data,
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + access_token,
//                 'X-CSRF-Token': csrf,
//                 // Accept: 'application/json',
//             }
//         }
//     )
//         .then(response => {
//             dispatch(guardarIdArchivo(response.data[0]));
//             // } 
//         })
//         .catch(error => {
//             //alert("error1 " + error)
//         });
// }
// export const guardarIdArchivo = (idarchivo) => ({
//     type: GUARDAR_ARCHIVO,
//     payload: idarchivo
// })
// export const guardarIncidencia = (access_token, data) => async dispatch => {

//     var csrf = getCSRFToken();
//     axios.post(URL_SERVER + 'rest/incidencia?_format=json', data,
//         {
//             headers: {
//                 'Authorization': 'Bearer ' + access_token,
//                 'X-CSRF-Token': csrf,
//                 'cookie': ''
//                 // Accept: 'application/json',
//                 // 'Content-Type': 'application/json',
//             }
//         }
//     )
//         .then(async response => {
//             if (response.status === 200) {
//                 dispatch(guardarCreada(true));                
//                 //return response.status
//             }
//         })
//         .catch(error => {
//             dispatch(guardarCreada(false));      
//             alert("error1 " + error)
//         });
// }
export const guardarUsuarioRedux = (usuario) => ({
    type: GUARDAR_USUARIO,
    payload: usuario
})
// export const guardarIncidenciaRedux = (inc) => ({
//     type: GUARDAR_INCIDENCIA_REDUX,
//     payload: inc
// })
// export const guardarCreada = (value) => ({
//     type: GUARDAR_CREADA,
//     payload: value
// })
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