import { Router } from "express";
import {
  deleteEmpresa,
  getEmpresa,
  getEmpresas,
  postEmpresa,
  putEmpresa,
} from "../controllers/empresa.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(getEmpresas));
router.get("/:id", asyncHandler(getEmpresa));
router.post(
  "/",
  requireFields(["nombre", "cuit", "rubro", "contacto"]),
  asyncHandler(postEmpresa),
);
router.put("/:id", requireBody, asyncHandler(putEmpresa));
router.delete("/:id", asyncHandler(deleteEmpresa));

export { router };
