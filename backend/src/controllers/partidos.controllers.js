import Partido from "../models/partido.model.js"

export const createPartido = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, deporte, lugar, ciudad, max_jugadores } = req.body;
    const creadorID = req.user.id;

    if (!titulo || !fecha || !deporte || !lugar || !ciudad || !max_jugadores) {
      return res.status(400).json({ status: "error", message: "Faltan campos obligatorios" });
    }

    const nuevoPartido = new Partido({
      titulo,
      descripcion,
      fecha,
      deporte,
      lugar,
      ciudad,
      max_jugadores,
      creador: creadorID,
      jugadores: [creadorID],
    });

    const savedPartido = await nuevoPartido.save();

    res.json({
      status: "ok",
      message: "Partido creado correctamente",
      partido: savedPartido,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Error al crear el partido" });
  }
};




export const getPartidos = async (req, res) => {
  try {
    const partidos = await Partido.find().populate("creador", "username reputacion").populate("jugadores", "username reputacion");
    res.json(partidos);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving partidos" });
  }
};

export const getPartidosByUser = async (req, res) => {
  try {
    const partidos = await Partido.find({ creador: req.user.id });
    res.json(partidos);
  } catch (error) {
        console.error(error);

    return res.status(500).json({ message: "Error retrieving partidos" });
  }
};


// Obtener un partido por ID
export const getPartido = async (req, res) => {
  try {
    const partido = await Partido.findById(req.params.id)
      .populate("creador", "username reputacion")
      .populate("jugadores", "username reputacion");

    if (!partido) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }

    res.json(partido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error obteniendo el partido" });
  }
};

// Actualizar un partido
export const updatePartido = async (req, res) => {
  try {
    const partido = await Partido.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Devuelve el objeto actualizado
      runValidators: true, // Aplica validaciones del schema
    });

    if (!partido) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }

    res.json(partido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error actualizando el partido" });
  }
};

// Eliminar un partido
export const deletePartido = async (req, res) => {
  try {
    const partido = await Partido.findById(req.params.id);

    if (!partido) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }

    // Comprobar permisos
    if (
      partido.creador.toString() !== req.user.id &&
      req.user.is_admin !== true
    ) {
      return res.status(403).json({ message: "No tienes permiso para eliminar este partido" });
    }

    await partido.deleteOne();

    res.json({ message: "Partido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando el partido" });
  }
};



// Unirse o salir de un partido
export const toggleJoinPartido = async (req, res) => {
  try {
    const partido = await Partido.findById(req.params.id).populate("jugadores", "username reputacion");
    if (!partido) {
      return res.status(404).json({ status: "error", message: "Partido no encontrado" });
    }

    const userId = req.user.id;
    const alreadyJoined = partido.jugadores.some(
      (jugador) => jugador._id.toString() === userId.toString()
    );

    if (alreadyJoined) {
      // El usuario ya está → eliminarlo
      partido.jugadores = partido.jugadores.filter(
        (jugador) => jugador._id.toString() !== userId.toString()
      );
      await partido.save();
      const updated = await Partido.findById(req.params.id).populate("jugadores", "username reputacion");
      return res.json({ status: "ok", message: "Has salido del partido", partido: updated });
    } else {
      // Verificar límite de jugadores
      if (partido.max_jugadores && partido.jugadores.length >= partido.max_jugadores) {
        console.log("Partido lleno :c");
        return res.status(400).json({ status: "error", message: "El partido ya está completo" });
      }

      partido.jugadores.push(userId);
      await partido.save();
      const updated = await Partido.findById(req.params.id).populate("jugadores", "username reputacion");
      return res.json({ status: "ok", message: "Te has unido al partido", partido: updated });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: "error", message: "Error al unirse o salir del partido" });
  }
};
