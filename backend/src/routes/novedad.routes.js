import { Router } from "express";
import {
  deleteNovedad,
  getNovedad,
  getNovedades,
  postNovedad,
  putNovedad,
} from "../controllers/novedad.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(getNovedades));
router.get("/:id", asyncHandler(getNovedad));
router.post(
  "/",
  requireFields(["tipo", "descripcion", "fecha", "empresaId", "empleadoId"]),
  asyncHandler(postNovedad),
);
router.put("/:id", requireBody, asyncHandler(putNovedad));
router.delete("/:id", asyncHandler(deleteNovedad));

export { router };
