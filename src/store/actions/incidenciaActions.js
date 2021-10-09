import { GUARDAR_INCIDENCIAS, GUARDAR_INCIDENCIAS_ORIGINALS, TOMAR_INCIDENCIAS } from "../types/incidenciaTypes";

export const guardarIncidencias = (incidencias) => ({
    type: GUARDAR_INCIDENCIAS,
    payload: incidencias
})
export const guardarIncidenciasOriginals = (incidencias) => ({
    type: GUARDAR_INCIDENCIAS_ORIGINALS,
    payload: incidencias
})