import { createContext, useContext, useState, useEffect } from "react";
import {
  getPartidosRequest,
  getPartidoRequestbyId,
  createPartidoRequest,
  updatePartidoRequest,
  deletePartidoRequest,
  unirse_salirPartidoRequest
} from "../api/partidos";

const PartidoContext = createContext();

export const usePartidos = () => {
  const context = useContext(PartidoContext);
  if (!context) throw new Error("usePartidos must be used within a PartidoProvider");
  return context;
};

export const PartidoProvider = ({ children }) => {
  // 🔹 Estados globales
  const [partidos, setPartidos] = useState([]);          // lista completa
  const [partidoActual, setPartidoActual] = useState(null); // partido individual
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [successes, setSuccesses] = useState([]);

  // ============================================
  // 🧠 Funciones para manejo global de partidos
  // ============================================

  // Obtener todos los partidos
  const getPartidos = async () => {
    try {
      setLoading(true);
      const res = await getPartidosRequest();
      setPartidos(res.data);
      console.log("Partidos cargados:", res.data);
    } catch (error) {
      console.error("Error obteniendo partidos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Crear partido
  const createPartido = async (partido) => {
    try {
      const res = await createPartidoRequest(partido);
      setPartidos([...partidos, res.data]);
    } catch (error) {
      console.error("Error creando partido:", error);
    }
  };

  // Actualizar partido
  const updatePartido = async (id, partido) => {
    try {
      const res = await updatePartidoRequest(id, partido);
      setPartidos((prev) => prev.map((p) => (p._id === id ? res.data : p)));

      // Si el partido editado es el actual, también lo actualizamos
      if (partidoActual && partidoActual._id === id) {
        setPartidoActual(res.data);
      }
    } catch (error) {
      console.error("Error actualizando partido:", error);
    }
  };

  // Eliminar partido
  const deletePartido = async (id) => {
    try {
      await deletePartidoRequest(id);
      setPartidos((prev) => prev.filter((p) => p._id !== id));

      // Si el eliminado es el actual, limpiamos el estado individual
      if (partidoActual && partidoActual._id === id) {
        setPartidoActual(null);
      }
    } catch (error) {
      console.error("Error eliminando partido:", error);
    }
  };

  // ============================================
  // ⚙️ Funciones para manejo de partido individual
  // ============================================

  // Obtener un partido por ID
  const getPartido = async (id) => {
    try {
      const res = await getPartidoRequestbyId(id);
      setPartidoActual(res.data);
      return res.data;
    } catch (error) {
      console.error("Error obteniendo partido:", error);
    }
  };

  // Unirse o salir del partido actual
  const unirse_salirPartido = async (id) => {
    try {
      const res = await unirse_salirPartidoRequest(id);
      if (res.data.status === "ok") {
        // Actualizar partido individual
        setPartidoActual(res.data.partido);

        // Actualizar la lista global también
        setPartidos((prev) =>
          prev.map((p) => (p._id === id ? res.data.partido : p))
        );

        return res.data.partido;
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error al unirse/salir del partido:", error);
    }
  };

  // ============================================
  // 🔄 Cargar partidos al montar el provider
  // ============================================
  useEffect(() => {
    getPartidos();
  }, []);

  return (
    <PartidoContext.Provider
      value={{
        partidos,
        partidoActual,
        setPartidoActual, // lo exponemos para resetear manualmente si hace falta
        loading,
        getPartidos,
        getPartido,
        createPartido,
        updatePartido,
        deletePartido,
        unirse_salirPartido,
      }}
    >
      {children}
    </PartidoContext.Provider>
  );
};
