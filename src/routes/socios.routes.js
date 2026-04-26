import { Router } from "express";
import SocioController from "../controllers/socio.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(SocioController.getAll.bind(SocioController)));
router.get("/form", asyncHandler(SocioController.getForm.bind(SocioController)));
router.get("/form/:id", asyncHandler(SocioController.getForm.bind(SocioController)));
router.get("/:id", asyncHandler(SocioController.getById.bind(SocioController)));

router.post("/",
  requireFields(["nombre", "apellido", "dni", "email", "participacion", "fechaIngreso"]),
  asyncHandler(SocioController.create.bind(SocioController))
);

router.put("/:id", requireBody, asyncHandler(SocioController.update.bind(SocioController)));
router.delete("/:id", asyncHandler(SocioController.delete.bind(SocioController)));

export { router };
