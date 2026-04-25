import { promises as fs } from "fs";
import path from "path";
import { DATA_DIR } from "../config/app.config.js";
import { nowIso } from "../libs/time.js";

const ensureFile = async (fileName, defaultData = []) => {
  await fs.mkdir(DATA_DIR, { recursive: true });

  const filePath = path.join(DATA_DIR, fileName);

  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(defaultData, null, 2));
  }

  return filePath;
};

const readCollection = async (fileName, defaultData = []) => {
  const filePath = await ensureFile(fileName, defaultData);
  const rawContent = await fs.readFile(filePath, "utf-8");

  if (!rawContent.trim()) {
    return [];
  }

  const parsed = JSON.parse(rawContent);
  return Array.isArray(parsed) ? parsed : [];
};

const writeCollection = async (fileName, rows) => {
  const filePath = await ensureFile(fileName, rows);
  await fs.writeFile(filePath, JSON.stringify(rows, null, 2));
};

const getNextId = (rows) =>
  rows.reduce((maxId, row) => Math.max(maxId, Number(row.id) || 0), 0) + 1;

export const createJsonRepository = (fileName, defaultData = []) => ({
  async getAll() {
    return readCollection(fileName, defaultData);
  },

  async getById(id) {
    const rows = await readCollection(fileName, defaultData);
    return rows.find((row) => row.id === Number(id)) || null;
  },

  async create(entity) {
    const rows = await readCollection(fileName, defaultData);
    const newEntity = { ...entity, id: getNextId(rows) };

    rows.push(newEntity);
    await writeCollection(fileName, rows);

    return newEntity;
  },

  async update(id, changes) {
    const rows = await readCollection(fileName, defaultData);
    const index = rows.findIndex((row) => row.id === Number(id));

    if (index === -1) {
      return null;
    }

    rows[index] = {
      ...rows[index],
      ...changes,
      updatedAt: nowIso(),
    };

    await writeCollection(fileName, rows);
    return rows[index];
  },

  async remove(id) {
    const rows = await readCollection(fileName, defaultData);
    const index = rows.findIndex((row) => row.id === Number(id));

    if (index === -1) {
      return null;
    }

    rows[index] = {
      ...rows[index],
      activo: false,
      updatedAt: nowIso(),
    };

    await writeCollection(fileName, rows);
    return rows[index];
  },
});
