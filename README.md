# SECTOR 7G

- trabajo practico proyectado como practica profecional para la carrera de Tecnico superior en desarrollo de software
___

## Tecnologias utilizadas
- Node js

## Librerías

- **express**  
  Framework minimalista para Node.js que permite crear servidores web y APIs de forma rápida. Maneja rutas, middlewares y respuestas HTTP.

- **dotenv**  
  Permite cargar variables de entorno desde un archivo `.env` al proyecto (`process.env`), ideal para manejar configuraciones sensibles.

- **morgan**  
  Middleware que registra las peticiones HTTP que llegan al servidor, útil para debug y monitoreo.

- **nodemon**  
  Herramienta de desarrollo que reinicia automáticamente el servidor cuando detecta cambios en el código.

---  
  
## Concepto General (Flujo de una Request)

 Request → Route → Middleware → Controller → Service → Model → DB
 
---
routes/

Define los endpoints de la API.
- Solo maneja rutas y delega lógica.

```javascript
// routes/auth.routes.js
import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { validateToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/profile", validateToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
```

middlewares/

Funciones que se ejecutan antes del controller.
-Validaciones, auth, logs, etc.

```javascript
// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";

export const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
```

controllers/

- Maneja la request y response
- NO lógica compleja

Recibe datos (req)
Llama al service
Devuelve respuesta (res)

```Javascript
// controllers/auth.controller.js
import * as authService from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = await authService.loginUser(req.body);
    res.json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
```

services/

- Acá va la lógica de negocio

Validaciones complejas
Reglas
Encriptación
Tokens

```javascript
// services/auth.service.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async ({ email, password }) => {
  const exist = await User.findOne({ email });
  if (exist) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ email, password: hashedPassword });
  await user.save();

  return user;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token };
};
```

models/

- Define el modelo de datos (MongoDB / Mongoose)

```javascript
// models/user.model.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
```

db/

- Conexión a la base de datos

```javascript
// db/connection.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected");
  } catch (error) {
    console.error(error);
  }
};
```
config/

- Configuraciones globales

```javascript
// config/env.js
import dotenv from "dotenv";
dotenv.config();
```

libs/

- Funciones reutilizables

Ejemplo: generar token, helpers, etc.

```javascript
// libs/jwt.js
import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
```

## Resumen de estructura de carpetas
| Carpeta     | Responsabilidad       |
| ----------- | --------------------- |
| routes      | Define endpoints      |
| middlewares | Validaciones previas  |
| controllers | Manejo de req/res     |
| services    | Lógica de negocio     |
| models      | Esquema de datos      |
| db          | Conexión a DB         |
| config      | Configuración         |
| libs        | Helpers reutilizables |
