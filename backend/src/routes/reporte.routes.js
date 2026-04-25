import { Router } from "express";
import { getResumen } from "../controllers/reporte.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";

const router = Router();

router.get("/resumen", asyncHandler(getResumen));
router.get("/api/resumen", asyncHandler(getResumen));

export { router };
