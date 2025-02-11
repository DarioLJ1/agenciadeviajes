import express from 'express';
import {
    paginaInicio,
    paginaNosotros,
    paginaTestimonios,
    paginaViajes,
    paginaDetallesViajes, // Aquí la estás importando
    guardarTestimonios
} from "../controlers/paginaController.js";

const router = express.Router();

router.get('/', paginaInicio);
router.get('/nosotros', paginaNosotros);
router.get('/testimonios', paginaTestimonios);
router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetallesViajes); // Aquí usas la función en la ruta

router.post('/testimonios', guardarTestimonios);

export default router;

