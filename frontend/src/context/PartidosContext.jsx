import { createContext, useContext, useState, useEffect } from "react";
import {
  getPartidosRequest,
  getPartidoRequestbyId,
  createPartidoRequest,
  updatePartidoRequest,
  deletePartidoRequest,
  unirse_salirPartidoRequest,
  getPartidosByUserRequest
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
  const [partidosByUser, setPartidosByUser] = useState([]); // partidos por usuario
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
      // console.log("Partidos cargados:", res.data);
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

    if (res.data.status === "ok") {
      setPartidos((prev) => [...prev, res.data.partido]);
      setSuccesses([res.data.message]);
      setErrors([]);
    } else {
      setErrors([res.data.message || "Error al crear el partido"]);
      setSuccesses([]);
    }
  } catch (error) {
    const message = error.response?.data?.message || "Error al crear el partido";
    setErrors([message]);
    setSuccesses([]);
    console.error("Error creando partido:", message);
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
    const res = await deletePartidoRequest(id);
    setPartidos((prev) => prev.filter((p) => p._id !== id));

    // Si el eliminado es el actual, limpiamos el estado individual
    if (partidoActual && partidoActual._id === id) {
      setPartidoActual(null);
    }

    setSuccesses([res.data?.message || "Partido eliminado correctamente aaa"]);
  } catch (error) {
    setErrors([error.response?.data?.message || "Error al eliminar el partido"]);
    console.error("Error eliminando partido:", error);
  }
};


  


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

      setSuccesses([res.data.message]);
      setErrors([]); // limpiar errores anteriores
      // console.log(res.data.message);
      return res.data.partido;
    }
  } catch (error) {
    const message =
      error.response?.data?.message || "Error al unirse o salir del partido";
    setErrors([message]);
    setSuccesses([]); // limpiar éxitos anteriores
    console.error("Error al unirse/salir del partido:", message);
  }
};


  // Obtener partidos por usuario
 const getPartidosByUser = async () => {
  try {
    const res = await getPartidosByUserRequest();
    // console.log("Partidos del usuario:", res.data);
    setPartidosByUser(res.data);
  } catch (error) {
    console.error("Error obteniendo partidos por usuario:", error);
  }
};


  // ============================================
  // 🔄 Cargar partidos al montar el provider
  // ============================================
  useEffect(() => {
    getPartidos();
    // getPartidosByUser();
  }, []);


 useEffect(() => {
  let timer;

  if (errors.length > 0 || successes.length > 0) {
    timer = setTimeout(() => {
      setErrors([]);
      setSuccesses([]);
    }, 1500);
  }

  return () => clearTimeout(timer);
}, [errors, successes]);





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
        getPartidosByUser,
        partidosByUser,
        errors,
        successes
      }}
    >
      {children}
    </PartidoContext.Provider>
  );
};
