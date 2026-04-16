import { Router } from "express";
import {
  deleteSeguimiento,
  getSeguimiento,
  getSeguimientos,
  postSeguimiento,
  putSeguimiento,
} from "../controllers/seguimiento.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(getSeguimientos));
router.get("/:id", asyncHandler(getSeguimiento));
router.post(
  "/",
  requireFields(["novedadId", "fecha", "responsable", "comentario"]),
  asyncHandler(postSeguimiento),
);
router.put("/:id", requireBody, asyncHandler(putSeguimiento));
router.delete("/:id", asyncHandler(deleteSeguimiento));

export { router };
