import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from "./routes/auth.routes.js";
import partidosRoutes from "./routes/partidos.routes.js";
// // import taskRoutes from "./routes/tasks.routes.js";
// import systemInfoRoutes from "./routes/system_info.routes.js";
// import analyzeRoute from "./routes/analyze.routes.js";



const app = express();

// 👇 Añade aquí tu dominio de frontend en producción
const allowedOrigins = [
  "http://localhost:5173", // desarrollo
  "https://matchpoint-v0-frontend.onrender.com", // producción en render
  "https://match-point-v0-frontend.vercel.app", // producción en vercel
  "https://matchpoint.walid.es" // lo mismo pero con mi dominio,
  ,process.env.FRONTEND_URL,
  "192.168.1.168:5173" // acceso local desde la red

];

app.use(cors({
  origin: function(origin, callback) {
    console.log("Request from origin:", origin); // útil para debug
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true, // necesario si usas cookies o auth
}));


app.use(morgan('dev'));
app.use(express.json({ limit: "10mb" })); // o más, según lo grande que sean tus imágenes
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());




// Rutas
app.use("/api", authRoutes);
app.use("/api", partidosRoutes);
// app.use("/api", taskRoutes);
// app.use("/api", systemInfoRoutes);

export default app;
