import { createContext, useContext, useState, useEffect } from "react";
import {
  getPartidosRequest,
  getPartidoRequestbyId,
  createPartidoRequest,
  updatePartidoRequest,
  deletePartidoRequest
} from "../api/partidos";

const PartidoContext = createContext();

export const usePartidos = () => {
  const context = useContext(PartidoContext);
  if (!context) {
    throw new Error("usePartidos must be used within a PartidoProvider");
  }
  return context;
};

export const PartidoProvider = ({ children }) => {
  const [partidos, setPartidos] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Obtener todos los partidos
  const getPartidos = async () => {
    try {
      setLoading(true);
      const res = await getPartidosRequest();
      setPartidos(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Obtener un partido por ID
  const getPartido = async (id) => {
    try {
      const res = await getPartidoRequestbyId(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Crear partido
  const createPartido = async (partido) => {
    try {
      const res = await createPartidoRequest(partido);
      setPartidos([...partidos, res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Actualizar partido
  const updatePartido = async (id, partido) => {
    try {
      const res = await updatePartidoRequest(id, partido);
      setPartidos(partidos.map((p) => (p._id === id ? res.data : p)));
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Eliminar partido
  const deletePartido = async (id) => {
    try {
      await deletePartidoRequest(id);
      setPartidos(partidos.filter((p) => p._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Cargar partidos automáticamente al montar
  useEffect(() => {
    getPartidos();
  }, []);

  return (
    <PartidoContext.Provider
      value={{
        partidos,
        loading,
        getPartidos,
        getPartido,
        createPartido,
        updatePartido,
        deletePartido,
      }}
    >
      {children}
    </PartidoContext.Provider>
  );
};
