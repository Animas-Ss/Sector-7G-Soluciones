import { Router } from "express";
import { router as authRouter } from "./auth.routes.js";

const router = Router();

router.use('/api/auth', authRouter);

export { router };
