import {
    GUARDAR_INCIDENCIAS,
    GUARDAR_INCIDENCIAS_ORIGINALS,
    TOMAR_INCIDENCIAS,
    GUARDAR_INCIDENCIA_REDUX,
    GUARDAR_CREADA,
    GUARDAR_ARCHIVO
} from "../types/incidenciaTypes";
import axios from 'axios';
import { URL_SERVER } from '../../constants/urls';

async function getCSRFToken() {
    return axios.get(URL_SERVER + 'session/token')
        .then(response => {
            return response.data
        })
        .catch(error => {

        });
}
export const guardarIncidencia = (access_token, data) => {
    var csrf = getCSRFToken();
    return axios.post(URL_SERVER + 'rest/incidencia?_format=json', data,
        {
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': csrf,
                'cookie': ''
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
            }
        }
    )
        .then(async response => {
            if (response.status === 200) {
                // dispatch(guardarCreada(1));
                //dispatch(guardarIncidenciaRedux(data))
                return response
            }
        })
        .catch(error => {
        });
}
export const cargarIncidenciaDetalles = (access_token, idIncidencia) => {
    
    return axios.get(URL_SERVER + 'rest/incidencia/' + idIncidencia + '?_format=json',
        {
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        }
    )
        .then(async response => {
            if (response.status === 200) {
                return response
            }
        })
        .catch(error => {
            return 400;
        });
}
export const borrarComentario = (access_token, idComentario) => {
    var csrf = getCSRFToken();
    return axios.delete(URL_SERVER + 'rest/comentario_incidencia/' + idComentario + '?_format=json',
        {
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrf,
                // 'cookie': ''
                // Accept: 'application/json',
            }
        }
    )
        .then(async response => {
            return response;
        })
        .catch(error => {
            return 400;
        });
}

export const guardarComentario = (access_token, data, id) => {
    var csrf = getCSRFToken();
    return axios.post(URL_SERVER + 'rest/comentario_incidencia/' + id + '?_format=json', data,
        {
            headers: {
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': csrf,
                'cookie': ''
                // Accept: 'application/json',
                // 'Content-Type': 'application/json',
            }
        }
    )
        .then(async response => {
            if (response.status === 200) {
                return response
            }
        })
        .catch(error => {
            return 400;
        });
}
export const editarComentario = async (access_token, data, id) => {

    var csrf = await getCSRFToken();
    return axios.put(URL_SERVER + 'rest/comentario_incidencia/' + id + '?_format=json', data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': csrf,
            }
        }
    )
        .then(async response => {
            if (response.status === 200) {
                return response
            }
        })
        .catch(error => {
            return 400;
        });
}
export const favoritoComentario = async (access_token, csrf, id) => {

    return axios.get(URL_SERVER + 'rest/toggle_favorito/' + id + '?_format=json',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': csrf,
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return 400;
        });

}
export const filtroTipo = async (token) => {

    return axios.get(URL_SERVER + 'rest/tipo-incidencia?_format=json',
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return 400;
        });

}
export const filtroEstado = async (token) => {

    return axios.get(URL_SERVER + 'rest/estado-incidencia?_format=json',
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return 400;
        });

}
export const filtroInteraccion = async (token) => {

    return axios.get(URL_SERVER + 'rest/tipo-interaccion?_format=json',
        {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return 400;
        });

}
export const loadIncidencias = async (access_token) => {

    return axios.get(URL_SERVER + 'rest/incidencias?_format=json',
        {
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return 400;
        });

}
export const loadSecciones = async (access_token) => {

    // axios.get(URL_SERVER + 'rest/secciones_textuales?_format=json',
    //         {
    //             headers: {
    //                 'Authorization': 'Bearer ' + token,
    //             }
    //         }
    //     )
    //         .then(async response => {
    //             if (response.status === 200) {
    //                 dispatch(guardarSeccionesPerfil(response.data));
    //             }
    //         })
    //         .catch(error => {
    //         });

    return axios.get(URL_SERVER + 'rest/secciones_textuales?_format=json',
        {
            headers: {
                'Authorization': 'Bearer ' + access_token,
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return 400;
        });

}
export const guardarIncidenciaRedux = (incidencia) => ({
    type: GUARDAR_INCIDENCIA_REDUX,
    payload: incidencia
})
export const guardarImagen = (access_token, imagenes) => {

    var csrf = getCSRFToken();
    var body = { "imagenes": imagenes };

    return axios.post(URL_SERVER + 'rest/fileupload?_format=json', body,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + access_token,
                'X-CSRF-Token': csrf,
                'cookie': ''
            }
        }
    )
        .then(response => {
            return response;
            // } 
        })
        .catch(error => {
            return 400;
        });
}
export const guardarIncidencias = (incidencias) => ({
    type: GUARDAR_INCIDENCIAS,
    payload: incidencias
})
export const guardarIdArchivo = (idarchivo) => ({
    type: GUARDAR_ARCHIVO,
    payload: idarchivo
})
export const guardarIncidenciasOriginals = (incidencias) => ({
    type: GUARDAR_INCIDENCIAS_ORIGINALS,
    payload: incidencias
})
export const guardarCreada = (value) => ({
    type: GUARDAR_CREADA,
    payload: value
})