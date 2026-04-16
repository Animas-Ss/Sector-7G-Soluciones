import { Router } from "express";
import {
  deleteEmpleado,
  getEmpleado,
  getEmpleados,
  postEmpleado,
  putEmpleado,
} from "../controllers/empleado.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.get("/", asyncHandler(getEmpleados));
router.get("/:id", asyncHandler(getEmpleado));
router.post(
  "/",
  requireFields(["nombre", "apellido", "dni", "puesto", "email", "empresaId"]),
  asyncHandler(postEmpleado),
);
router.put("/:id", requireBody, asyncHandler(putEmpleado));
router.delete("/:id", asyncHandler(deleteEmpleado));

export { router };
