import { Router } from "express";
import NovedadController from "../controllers/novedad.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(NovedadController.getAll));
router.get("/form", asyncHandler(NovedadController.getForm));
router.get("/form/:id", asyncHandler(NovedadController.getForm));
router.route("/:id")
  .get(asyncHandler(NovedadController.getById))
  .put(requireBody, asyncHandler(NovedadController.update))
  .delete(asyncHandler(NovedadController.delete));

router.post(
  "/",
  requireFields(["tipo", "descripcion", "fecha", "empresaId", "empleadoId"]),
  asyncHandler(NovedadController.create)
);

export { router };
