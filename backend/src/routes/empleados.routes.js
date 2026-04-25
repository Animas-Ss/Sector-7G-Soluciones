import { Router } from "express";
import EmpleadoController from "../controllers/empleado.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/")
  .get(asyncHandler(EmpleadoController.getAll))
  .post(
    requireFields(["nombre", "apellido", "dni", "puesto", "email", "empresaId"]),
    asyncHandler(EmpleadoController.create)
  );

router.get("/form", asyncHandler(EmpleadoController.getForm));
router.get("/form/:id", asyncHandler(EmpleadoController.getForm));

router.route("/:id")
  .get(asyncHandler(EmpleadoController.getById))
  .put(requireBody, asyncHandler(EmpleadoController.update))
  .delete(asyncHandler(EmpleadoController.delete));

export { router };
