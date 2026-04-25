import { Router } from "express";
import ReporteController from "../controllers/reporte.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";

const router = Router();

router.route("/")
  .get(asyncHandler(ReporteController.getResumen));

export { router };
