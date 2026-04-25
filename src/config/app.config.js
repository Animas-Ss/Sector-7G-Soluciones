import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const PORT = Number(process.env.PORT) || 3000;
export const API_NAME = "Talento Evolutivo S.A. API";
export const ROOT_DIR = path.resolve(__dirname, "..");
export const DATA_DIR = path.join(ROOT_DIR, "db", "data");
export const NOVEDAD_ESTADOS = ["pendiente", "procesada", "rechazada"];
