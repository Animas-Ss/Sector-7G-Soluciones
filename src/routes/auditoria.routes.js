import { Router } from "express";
import AuditoriaController from "../controllers/api/auditoria.controller.js";
import AuditoriaViewController from "../controllers/view/auditoria.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";

// Vista
const viewRouter = Router();
viewRouter.get("/", asyncHandler(AuditoriaViewController.getAll));

// API JSON
const apiRouter = Router();
apiRouter.get("/", asyncHandler(AuditoriaController.list));

export { viewRouter, apiRouter };
