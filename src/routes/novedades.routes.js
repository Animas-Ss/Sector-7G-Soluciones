import { Router } from "express";
import NovedadController from "../controllers/api/novedad.controller.js";
import NovedadViewController from "../controllers/view/novedad.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

// Vistas
const viewRouter = Router();
viewRouter.get("/",         asyncHandler(NovedadViewController.getAll));
viewRouter.get("/form",     asyncHandler(NovedadViewController.getForm));
viewRouter.get("/form/:id", asyncHandler(NovedadViewController.getForm));
viewRouter.get("/:id",      asyncHandler(NovedadViewController.getById));

// API JSON
const apiRouter = Router();
apiRouter.get("/",    asyncHandler(NovedadController.list));
apiRouter.get("/:id", asyncHandler(NovedadController.show));
apiRouter.post("/",
  requireFields(["tipo", "descripcion", "fecha", "empresaId", "empleadoId"]),
  asyncHandler(NovedadController.create)
);
apiRouter.put("/:id",    requireBody, asyncHandler(NovedadController.update));
apiRouter.delete("/:id", asyncHandler(NovedadController.delete));

export { viewRouter, apiRouter };
