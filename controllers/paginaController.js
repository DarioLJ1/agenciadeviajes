import { Testimonial } from "../models/Testimoniales.js"
import { Viaje } from "../models/Viaje.js"

const paginaInicio = async (req, res) => {
    try {
        const viajes = await Viaje.findAll({ limit: 3 })
        const testimonios = await Testimonial.findAll()

        res.render("inicio", {
            pagina: "Inicio",
            clase: "home",
            viajes,
            testimonios,
        })
    } catch (error) {
        console.error("Error al obtener la página de inicio:", error)
        res.status(500).render("error", {
            pagina: "Error",
            mensaje: "Error al cargar la página de inicio",
        })
    }
}

const paginaNosotros = (req, res) => {
    res.render("nosotros", {
        pagina: "Nosotros",
    })
}

const paginaViajes = async (req, res) => {
    try {
        const viajes = await Viaje.findAll()

        res.render("viajes", {
            pagina: "Próximos Viajes",
            viajes,
        })
    } catch (error) {
        console.error("Error al obtener viajes:", error)
        res.status(500).render("error", {
            pagina: "Error",
            mensaje: "Error al cargar los viajes",
        })
    }
}

const paginaTestimoniales = async (req, res) => {
    try {
        const testimonios = await Testimonial.findAll()
        res.render("testimonios", {
            pagina: "Testimonios",
            testimonios,
        })
    } catch (error) {
        console.error("Error al obtener testimoniales:", error)
        res.status(500).render("error", {
            pagina: "Error",
            mensaje: "Error al obtener testimonios",
        })
    }
}

const guardarTestimonios = async (req, res) => {
    const { nombre, correoelectronico, mensaje } = req.body

    try {
        await Testimonial.create({
            nombre,
            correoelectronico,
            mensaje,
        })
        res.redirect("/testimonios")
    } catch (error) {
        console.error("Error al guardar testimonio:", error)
        res.status(500).render("error", {
            pagina: "Error",
            mensaje: "Error al guardar testimonio",
        })
    }
}

const paginaDetallesViajes = async (req, res) => {
    try {
        const viaje = await Viaje.findOne({
            where: {
                slug: req.params.slug,
            },
        })

        res.render("viaje", {
            pagina: "Información Viaje",
            viaje,
        })
    } catch (error) {
        console.error("Error al obtener detalles del viaje:", error)
        res.status(500).render("error", {
            pagina: "Error",
            mensaje: "Error al cargar los detalles del viaje",
        })
    }
}

// Nuevas funciones para editar y eliminar testimonios
const editarTestimonio = async (req, res) => {
    const { id } = req.params
    const { nombre, correoelectronico, mensaje } = req.body

    try {
        const testimonio = await Testimonial.findByPk(id)
        if (!testimonio) {
            return res.status(404).render("error", {
                pagina: "Error",
                mensaje: "Testimonio no encontrado",
            })
        }

        await testimonio.update({
            nombre,
            correoelectronico,
            mensaje,
        })

        res.redirect("/testimonios")
    } catch (error) {
        console.error("Error al editar testimonio:", error)
        res.status(500).render("error", {
            pagina: "Error",
            mensaje: "Error al editar testimonio",
        })
    }
}

const eliminarTestimonio = async (req, res) => {
    const { id } = req.params

    try {
        const testimonio = await Testimonial.findByPk(id)
        if (!testimonio) {
            return res.status(404).render("error", {
                pagina: "Error",
                mensaje: "Testimonio no encontrado",
            })
        }

        await testimonio.destroy()
        res.redirect("/testimonios")
    } catch (error) {
        console.error("Error al eliminar testimonio:", error)
        res.status(500).render("error", {
            pagina: "Error",
            mensaje: "Error al eliminar testimonio",
        })
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    guardarTestimonios,
    paginaDetallesViajes,
    editarTestimonio,
    eliminarTestimonio,
}







