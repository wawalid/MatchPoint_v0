import axios from "./axios";


export const getPartidosRequest = () => axios.get("/partidos");
export const getPartidoRequestbyId = (id) => axios.get(`/partidos/${id}`);
export const createPartidoRequest = (partido) => axios.post("/partidos", partido);
export const updatePartidoRequest = (id, partido) =>
  axios.put(`/partidos/${id}`, partido);
export const deletePartidoRequest = (id) => axios.delete(`/partidos/${id}`);
export const unirse_salirPartidoRequest = (id) => axios.post(`/partidos/${id}/unirse`);

