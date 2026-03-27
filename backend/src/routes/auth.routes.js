import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    console.log('auth route funcionando 🚀');
    res.send('auth route funcionando 🚀')
})

export { router };