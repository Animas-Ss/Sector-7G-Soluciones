import { Router } from "express";
import SocioController from "../controllers/socio.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";


const router = Router();

router.get("/", asyncHandler(SocioController.getAll));
router.get("/form", asyncHandler(SocioController.getForm));
router.get("/form/:id", asyncHandler(SocioController.getForm));
router.get("/:id", asyncHandler(SocioController.getById));

router.post("/",
  requireFields(["nombre", "apellido", "dni", "email", "participacion", "fechaIngreso"]),
  asyncHandler(SocioController.create)
);

router.put("/:id", requireBody, asyncHandler(SocioController.update));
router.delete("/:id", asyncHandler(SocioController.delete));

export { router };