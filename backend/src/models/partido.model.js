import mongoose from "mongoose";

const partidoSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true },
    deporte: { type: String, required: true, trim: true }, // ejemplo: "pádel", "fútbol"
    lugar: { type: String, required: true, trim: true },   // nombre del sitio/pista
    ciudad: { type: String, required: true, trim: true },
    fecha: { type: Date, required: true },                 // fecha y hora del partido
    creador: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // quién lo creó
    jugadores: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // jugadores apuntados
    max_jugadores: { type: Number, required: true },       // límite de jugadores
    descripcion: { type: String, default: "" },
    estado: { 
      type: String, 
      enum: ["abierto", "completo", "cancelado", "finalizado"], 
      default: "abierto" 
    }
  },
  {
    timestamps: true, // createdAt, updatedAt automáticos
  }
);

export default mongoose.model("Partido", partidoSchema);
