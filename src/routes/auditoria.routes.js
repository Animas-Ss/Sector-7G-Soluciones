import { Router } from "express";
import AuditoriaController from "../controllers/auditoria.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";

const router = Router();

router.route("/")
  .get(asyncHandler(AuditoriaController.getAll));

export { router };
