import { Router } from "express";
import LiquidacionController from "../controllers/liquidacion.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(LiquidacionController.getAll.bind(LiquidacionController)));
router.get("/form", asyncHandler(LiquidacionController.getForm.bind(LiquidacionController)));
router.get("/form/:id", asyncHandler(LiquidacionController.getForm.bind(LiquidacionController)));
router.get("/:id", asyncHandler(LiquidacionController.getById.bind(LiquidacionController)));

router.post("/",
  requireFields(["empresaId", "empleadoId", "periodo", "concepto", "monto"]),
  asyncHandler(LiquidacionController.create.bind(LiquidacionController))
);
router.put("/:id", requireBody, asyncHandler(LiquidacionController.update.bind(LiquidacionController)));
router.delete("/:id", asyncHandler(LiquidacionController.delete.bind(LiquidacionController)));

export { router };
