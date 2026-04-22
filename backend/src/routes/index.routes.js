import { Router } from "express";
import { readdirSync, existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PATH_ROUTER = __dirname;
const router = Router();

const cleanFileName = (fileName) => {
    return fileName.split('.').shift();
}

const loadedEndpoints = [];

readdirSync(PATH_ROUTER).filter((fileName) => {
   const cleanName = cleanFileName(fileName);
   if(cleanName !== "index"){
       console.log(`Cargando ruta dinámica: /api/${cleanName}`);
       loadedEndpoints.push(`GET /api/${cleanName}`);
       import(`./${fileName}`).then((moduleRouter) => {
         router.use(`/api/${cleanName}`, moduleRouter.router);
       }).catch(error => {
         console.error(`Error al cargar la ruta /api/${cleanName}:`, error);
       });
   }
});

const VIEWS_PATH = join(__dirname, '../views');

router.get("/", (req, res) => {
  const currentEndpoints = [...loadedEndpoints];
  
  // Escanea la carpeta en tiempo real para que no requiera reinicios
  const views = readdirSync(VIEWS_PATH).filter(f => f.endsWith('.pug'));
  views.forEach(f => {
      currentEndpoints.push(`GET /${f.replace('.pug', '')} (Vista Pug)`);
  });

  res.status(200).json({
    sistema: "Talento Evolutivo S.A.",
    descripcion: "API REST para seguimiento administrativo de liquidacion de haberes.",
    endpoints: currentEndpoints.sort(),
  });
});

// Enrutador Wildcard para Vistas Pug (Debe ir al final)
// Ataja cualquier ruta /algo y renderiza el pug si existe
router.get("/:viewName", (req, res, next) => {
    const viewName = req.params.viewName;
    const filePath = join(VIEWS_PATH, `${viewName}.pug`);
    
    if (existsSync(filePath)) {
        res.render(viewName, {
            titulo: `Vista ${viewName}`,
            mensaje: `¡Bienvenido a la vista ${viewName}!`,
            tecnologias: ["Node.js", "Express", "Pug", "Enrutador Totalmente Dinámico"]
        });
    } else {
        next(); // Si no existe el archivo, pasa al middleware 404
    }
});

export { router };
