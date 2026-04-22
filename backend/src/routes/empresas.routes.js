import { Router } from "express";
import EmpresaController from "../controllers/empresa.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";
import { requireBody, requireFields } from "../middlewares/validation.middleware.js";

const router = Router();

router.route("/")
  .get(asyncHandler(EmpresaController.getAll))
  .post(
    requireFields(["nombre", "cuit", "rubro", "contacto"]),
    asyncHandler(EmpresaController.create)
  );

router.route("/:id")
  .get(asyncHandler(EmpresaController.getById))
  .put(requireBody, asyncHandler(EmpresaController.update))
  .delete(asyncHandler(EmpresaController.delete));

export { router };
