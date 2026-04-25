import { empleadoDb } from "../db/empleado.db.js";
import { empresaDb } from "../db/empresa.db.js";
import { novedadDb } from "../db/novedad.db.js";

const activas = (rows) => rows.filter((row) => row.activo !== false);

const calcularImpacto = (cantidad) => {
  if (cantidad >= 6) {
    return "alto";
  }

  if (cantidad >= 3) {
    return "medio";
  }

  return "bajo";
};

export const obtenerResumen = async () => {
  const [empresas, empleados, novedades] = await Promise.all([
    empresaDb.getAll(),
    empleadoDb.getAll(),
    novedadDb.getAll(),
  ]);

  const empresasActivas = activas(empresas);
  const empleadosActivos = activas(empleados);
  const novedadesActivas = activas(novedades);
  const novedadesPendientes = novedadesActivas.filter(
    (novedad) => novedad.estado === "pendiente",
  );

  return {
    indicadores: {
      empresasActivas: empresasActivas.length,
      empleadosActivos: empleadosActivos.length,
      novedadesPendientes: novedadesPendientes.length,
      cargaOperativaEstimada: {
        totalNovedadesActivas: novedadesActivas.length,
        nivel: calcularImpacto(novedadesActivas.length),
      },
    },
    simulacion: {
      criterio: "impacto calculado por cantidad de novedades activas",
      impactoGeneral: calcularImpacto(novedadesActivas.length),
      detallePorEmpresa: empresasActivas.map((empresa) => {
        const novedadesEmpresa = novedadesActivas.filter(
          (novedad) => novedad.empresaId === empresa.id,
        );

        return {
          empresaId: empresa.id,
          empresa: empresa.nombre,
          totalNovedades: novedadesEmpresa.length,
          pendientes: novedadesEmpresa.filter(
            (novedad) => novedad.estado === "pendiente",
          ).length,
          impactoEstimado: calcularImpacto(novedadesEmpresa.length),
        };
      }),
    },
  };
};
