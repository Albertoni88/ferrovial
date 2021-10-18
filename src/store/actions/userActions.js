import { GUARDAR_TOKEN, SET_FAVORITO, INITIAL_FAVORITOS, GUARDAR_SECCIONES_PERFIL, GUARDAR_FILTROS, GUARDAR_FILTROS_ORIGINALS, TOMAR_TOKEN, GUARDAR_MARCADOS, GUARDAR_MARCADOS_ARRAY, GUARDAR_MARCADOS_ORIGINALS, GUARDAR_USUARIO, GUARDAR_ARCHIVO, GUARDAR_CREADA, GUARDAR_INCIDENCIA_REDUX } from "../types/userTypes";
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
            return response;
        })
        .catch(error => {
        });
}
export const guardarToken = (data) => ({
    type: GUARDAR_TOKEN,
    payload: data
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
        });
}
export const getCSRFToken = () => {
    return axios.get('https://ferrovial.creacionwebprofesional.com/session/token')
        .then(response => {
            return response.data
        })
        .catch(error => {

        });
}
export const tomarIntros = () => {
    return axios.get(URL_SERVER + 'rest/intros?_format=json',
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'cookie': '',
            }
        }
    )
        .then(response => {
            return response.data
        })
        .catch(error => {

        });
}
export const registerAccount = (data, CSRF) => {

    return axios.post(URL_SERVER + 'user/register?_format=hal_json', data,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-Token': CSRF,
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return error;
        });
}
export const editPerfil = (data, token, CSRF) => {

    return axios.put(URL_SERVER + 'rest/perfil_usuario?_format=json', data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'X-CSRF-Token': CSRF,
                'cookie': ''
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return error;
        });
}
export const saveFeedBack = (data, token, CSRF) => {

    return axios.post(URL_SERVER + 'webform_rest/submit?_format=json', data,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'X-CSRF-Token': CSRF
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return error;
        });
}
export const loginUser = (data) => {

    return axios.post(URL_SERVER + 'user/login?_format=json', data,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'cookie': ''
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return error;
        });
}
export const getFaqs = (token) => {

    return axios.get(URL_SERVER + 'rest/faqs?_format=json',
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
            return error;
        });
}
export const reset = (data) => {

    return axios.post(URL_SERVER + 'user/password?_format=json', data,
        {
            headers: {
                Accept: 'application/json',
            }
        }
    )
        .then(response => {
            return response
        })
        .catch(error => {
            return error;
        });
}
export const guardarUsuarioRedux = (usuario) => ({
    type: GUARDAR_USUARIO,
    payload: usuario
})

export const setFavoritoRdux = (data) => ({
    type: SET_FAVORITO,
    payload: data
})
export const initialFavoritos = (value) => ({
    type: INITIAL_FAVORITOS,
    payload: value
})
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