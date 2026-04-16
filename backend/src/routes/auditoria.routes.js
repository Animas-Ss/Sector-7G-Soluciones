import { Router } from "express";
import { getAuditoria } from "../controllers/auditoria.controller.js";
import { asyncHandler } from "../libs/asyncHandler.js";

const router = Router();

router.get("/auditoria", asyncHandler(getAuditoria));
router.get("/api/auditoria", asyncHandler(getAuditoria));

export { router };
