import { Router } from "express";
import {
  deleteLiquidacion,
  getLiquidacion,
  getLiquidaciones,
  postLiquidacion,
  putLiquidacion,
} from "../controllers/liquidacion.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(getLiquidaciones));
router.get("/:id", asyncHandler(getLiquidacion));
router.post(
  "/",
  requireFields(["empresaId", "empleadoId", "periodo", "concepto", "monto"]),
  asyncHandler(postLiquidacion)
);
router.put("/:id", requireBody, asyncHandler(putLiquidacion));
router.delete("/:id", asyncHandler(deleteLiquidacion));

export { router };
