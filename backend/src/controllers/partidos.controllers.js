import Partido from "../models/partido.model.js"

export const createPartido = async (req, res) => {
  try {
    const { titulo, descripcion, fecha, deporte, lugar, ciudad, max_jugadores } = req.body;
    const nuevoPartido = new Partido({
      titulo,
      descripcion,
      fecha,
      deporte,
      lugar,
      ciudad,
      max_jugadores,
      creador: req.user.id,
    });
    const savedPartido = await nuevoPartido.save();
    res.json(savedPartido);
  } catch (error) {
    return res.status(500).json({ message: "Error creating partido" });
  }
};



export const getPartidos = async (req, res) => {
  try {
    const partidos = await Partido.find();
    res.json(partidos);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving partidos" });
  }
};


// Obtener un partido por ID
export const getPartido = async (req, res) => {
  try {
    const partido = await Partido.findById(req.params.id)
      .populate("creador", "username email")
      .populate("jugadores", "username email");

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
    const partido = await Partido.findByIdAndDelete(req.params.id);

    if (!partido) {
      return res.status(404).json({ message: "Partido no encontrado" });
    }

    res.json({ message: "Partido eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error eliminando el partido" });
  }
};