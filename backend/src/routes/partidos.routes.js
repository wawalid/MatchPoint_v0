import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
// import { validateSchema } from "../middlewares/validator.middleware.js";
// import { createTaskSchema } from "../schemas/task.schema.js";
import { createPartido, getPartido, getPartidos, updatePartido, deletePartido } from "../controllers/partidos.controllers.js";

const router = Router()

// Rutas para partidos
router.post("/partidos", authRequired, createPartido);
router.get("/partidos", authRequired, getPartidos);
router.get("/partidos/:id", authRequired, getPartido);
router.put("/partidos/:id", authRequired, updatePartido);
router.delete("/partidos/:id", authRequired, deletePartido);







// dejo esto por aqui porque quiero en un futuro implementar una sanitizacion de datos ;)
// router.post("/tasks", authRequired, validateSchema(createTaskSchema), createTask)


export default router 