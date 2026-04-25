import { Router } from "express";
import NovedadController from "../controllers/novedad.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/")
  .get(asyncHandler(NovedadController.getAll))
  .post(
    requireFields(["tipo", "descripcion", "fecha", "empresaId", "empleadoId"]),
    asyncHandler(NovedadController.create)
  );

router.route("/:id")
  .get(asyncHandler(NovedadController.getById))
  .put(requireBody, asyncHandler(NovedadController.update))
  .delete(asyncHandler(NovedadController.delete));

export { router };
