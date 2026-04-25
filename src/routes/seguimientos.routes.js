import { Router } from "express";
import SeguimientoController from "../controllers/seguimiento.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/")
  .get(asyncHandler(SeguimientoController.getAll))
  .post(
    requireFields(["novedadId", "fecha", "responsable", "comentario"]),
    asyncHandler(SeguimientoController.create)
  );

router.route("/:id")
  .get(asyncHandler(SeguimientoController.getById))
  .put(requireBody, asyncHandler(SeguimientoController.update))
  .delete(asyncHandler(SeguimientoController.delete));

export { router };
