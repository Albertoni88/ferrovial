import { GUARDAR_TOKEN, GUARDAR_FILTROS, GUARDAR_FILTROS_ORIGINALS, TOMAR_TOKEN, GUARDAR_MARCADOS, GUARDAR_MARCADOS_ARRAY, GUARDAR_MARCADOS_ORIGINALS } from "../types/userTypes";

export const guardarToken = (token) => ({
    type: GUARDAR_TOKEN,
    payload: token
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