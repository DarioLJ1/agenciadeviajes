import { Testimonial } from "../models/Testimoniales.js"
import { Viaje } from "../models/Viaje.js"

// Función para mostrar la página de inicio
const paginaInicio = async (req, res) => {
    const promiseDB = []
    promiseDB.push(Viaje.findAll({ limit: 3 }))
    promiseDB.push(Testimonial.findAll({ limit: 3, order: [["Id", "DESC"]] }))

    try {
        const resultado = await Promise.all(promiseDB)

        res.render("inicio", {
            pagina: "Inicio",
            clase: "home",
            viajes: resultado[0],
            testimonios: resultado[1],
        })
    } catch (err) {
        console.log(err)
    }
}

// Función para mostrar la página "Nosotros"
const paginaNosotros = (req, res) => {
    res.render("nosotros", {
        pagina: "Nosotros",
    })
}

// Función para mostrar la página de testimonios
const paginaTestimonios = async (req, res) => {
    try {
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["id", "DESC"]],
        })

        res.render("testimonios", {
            pagina: "Testimonios",
            testimonios,
            errores: [],
        })
    } catch (error) {
        console.error("Error al obtener testimonios:", error)
        res.status(500).render("500", { pagina: "Error del servidor" })
    }
}

// Función para guardar un nuevo testimonio
const guardarTestimonios = async (req, res) => {
    const { nombre, correoelectronico, mensaje } = req.body
    const errores = []

    if (!nombre.trim()) {
        errores.push({ mensaje: "El nombre está vacío" })
    }
    if (!correoelectronico.trim()) {
        errores.push({ mensaje: "El correo está vacío" })
    }
    if (!mensaje.trim()) {
        errores.push({ mensaje: "El mensaje está vacío" })
    }

    if (errores.length > 0) {
        try {
            const testimonios = await Testimonial.findAll({
                limit: 6,
                order: [["id", "DESC"]],
            })

            return res.render("testimonios", {
                pagina: "Testimonios",
                errores,
                nombre,
                correoelectronico,
                mensaje,
                testimonios,
            })
        } catch (error) {
            console.error("Error al recuperar testimonios para validación:", error)
            return res.status(500).render("500", { pagina: "Error del servidor" })
        }
    }

    try {
        await Testimonial.create({ nombre, correoelectronico, mensaje })
        res.redirect("/testimonios")
    } catch (error) {
        console.error("Error al guardar el testimonio:", error)
        res.status(500).render("500", { pagina: "Error del servidor" })
    }
}

// Función para mostrar la página de viajes
const paginaViajes = async (req, res) => {
    try {
        const viajes = await Viaje.findAll()

        // Asegurarse de que los precios sean números
        viajes.forEach((viaje) => {
            viaje.precio = Number.parseFloat(viaje.precio)
        })

        res.render("viajes", {
            pagina: "Próximos Viajes",
            viajes,
        })
    } catch (error) {
        console.error("Error al obtener viajes:", error)
        res.status(500).render("500", { pagina: "Error del servidor" })
    }
}

// Función para mostrar la página de detalles de viaje
const paginaDetallesViajes = async (req, res) => {
    const { slug } = req.params
    try {
        const viaje = await Viaje.findOne({ where: { slug } })

        if (!viaje) {
            return res.status(404).render("404", { pagina: "Viaje no encontrado" })
        }

        res.render("viaje", {
            pagina: viaje.titulo,
            viaje,
        })
    } catch (error) {
        console.error("Error al obtener detalles del viaje:", error)
        res.status(500).render("500", { pagina: "Error del servidor" })
    }
}

export { paginaInicio, paginaNosotros, paginaTestimonios, guardarTestimonios, paginaViajes, paginaDetallesViajes }



