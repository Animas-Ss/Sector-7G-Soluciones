import { Router } from "express";
import {
  deleteSocio,
  getSocio,
  getSocios,
  getFormSocio,
  postSocio,
  putSocio,
} from "../controllers/socio.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(getSocios));

router.get("/form", asyncHandler(getFormSocio));
router.get("/form/:id", asyncHandler(getFormSocio));

router.get("/:id", asyncHandler(getSocio));
router.post(
  "/",
  requireFields(["nombre", "apellido", "dni", "email", "participacion", "fechaIngreso"]),
  asyncHandler(postSocio)
);
router.put("/:id", requireBody, asyncHandler(putSocio));
router.delete("/:id", asyncHandler(deleteSocio));

export { router };
