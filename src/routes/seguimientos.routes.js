import { Router } from "express";
import SeguimientoController from "../controllers/seguimiento.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(SeguimientoController.getAll));
router.get("/form", asyncHandler(SeguimientoController.getForm));
router.get("/form/:id", asyncHandler(SeguimientoController.getForm));
router.route("/:id")
  .get(asyncHandler(SeguimientoController.getById))
  .put(requireBody, asyncHandler(SeguimientoController.update))
  .delete(asyncHandler(SeguimientoController.delete));

router.post("/",
  requireFields(["novedadId", "fecha", "responsable", "comentario"]),
  asyncHandler(SeguimientoController.create)
);

export { router };
