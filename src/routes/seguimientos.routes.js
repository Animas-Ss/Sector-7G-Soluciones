import { Router } from "express";
import SeguimientoController from "../controllers/api/seguimiento.controller.js";
import SeguimientoViewController from "../controllers/view/seguimiento.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

// Vistas
const viewRouter = Router();
viewRouter.get("/",         asyncHandler(SeguimientoViewController.getAll));
viewRouter.get("/form",     asyncHandler(SeguimientoViewController.getForm));
viewRouter.get("/form/:id", asyncHandler(SeguimientoViewController.getForm));
viewRouter.get("/:id",      asyncHandler(SeguimientoViewController.getById));

// API JSON
const apiRouter = Router();
apiRouter.get("/",    asyncHandler(SeguimientoController.list));
apiRouter.get("/:id", asyncHandler(SeguimientoController.show));
apiRouter.post("/",
  requireFields(["novedadId", "fecha", "responsable", "comentario"]),
  asyncHandler(SeguimientoController.create)
);
apiRouter.put("/:id",    requireBody, asyncHandler(SeguimientoController.update));
apiRouter.delete("/:id", asyncHandler(SeguimientoController.delete));

export { viewRouter, apiRouter };
