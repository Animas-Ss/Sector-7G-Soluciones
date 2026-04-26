import { Router } from "express";
//import {
//deleteLiquidacion,
//getLiquidacion,
//getLiquidaciones,
//postLiquidacion,
//putLiquidacion,
//} from "../controllers/liquidacion.controller.js";
import LiquidacionController from "../controllers/liquidacion.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(LiquidacionController.getAll));
router.get("/form", asyncHandler(LiquidacionController.getForm));
router.get("/form/:id", asyncHandler(LiquidacionController.getForm));
router.get("/:id", asyncHandler(LiquidacionController.getById));

router.post("/", requireFields(["empresaId", "empleadoId", "periodo", "concepto", "monto"]),
  asyncHandler(LiquidacionController.create));
router.put("/:id", requireBody, asyncHandler(LiquidacionController.update));
router.delete("/:id", asyncHandler(LiquidacionController.delete));

export { router };
