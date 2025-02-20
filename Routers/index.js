import express from "express"
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaDetallesViajes,
    paginaTestimoniales,
    guardarTestimonios,
    editarTestimonio,
    eliminarTestimonio,
} from "../controllers/paginaController.js"

const router = express.Router()

router.get("/", paginaInicio)
router.get("/nosotros", paginaNosotros)
router.get("/viajes", paginaViajes)
router.get("/viaje/:slug", paginaDetallesViajes)
router.get("/testimonios", paginaTestimoniales) // Cambiado de testimoniales a testimonios
router.post("/testimonios", guardarTestimonios) // Cambiado de testimoniales a testimonios
router.post("/testimonios/:id/editar", editarTestimonio)
router.post("/testimonios/:id/eliminar", eliminarTestimonio)

export default router
