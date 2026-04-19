import { Router } from "express";
import { router as empresaRouter } from "./empresa.routes.js";
import { router as empleadoRouter } from "./empleado.routes.js";
import { router as novedadRouter } from "./novedad.routes.js";
import { router as seguimientoRouter } from "./seguimiento.routes.js";
import { router as auditoriaRouter } from "./auditoria.routes.js";
import { router as reporteRouter } from "./reporte.routes.js";
import { router as liquidacionRouter } from "./liquidacion.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    sistema: "Talento Evolutivo S.A.",
    descripcion: "API REST para seguimiento administrativo de liquidacion de haberes.",
    endpoints: [
      "GET /api/empresas",
      "GET /api/empleados",
      "GET /api/novedades",
      "GET /api/seguimientos",
      "GET /api/liquidaciones",
      "GET /resumen",
      "GET /auditoria",
    ],
  });
});

router.use("/api/empresas", empresaRouter);
router.use("/api/empleados", empleadoRouter);
router.use("/api/novedades", novedadRouter);
router.use("/api/seguimientos", seguimientoRouter);
router.use("/api/liquidaciones", liquidacionRouter);
router.use("/", auditoriaRouter);
router.use("/", reporteRouter);

export { router };
