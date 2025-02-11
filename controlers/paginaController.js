import { Testimonial } from "../models/Testimoniales.js";
import { Viaje } from "../models/Viaje.js"; // Asegúrate de tener el modelo adecuado

// Función para mostrar la página de inicio
const paginaInicio = async (req, res) => {

    const promiseDB = [];
    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3,order:[["Id","DESC"]]}));

    try {

        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1],
        });
    }catch(err){

        console.log(err);

    }
};

// Función para mostrar la página "Nosotros"
const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros',
    });
};

// Función para mostrar la página de testimonios
const paginaTestimonios = async (req, res) => {
    try {
        // Buscar los testimonios con un límite de 6, ordenados por los más recientes
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["id", "DESC"]],
        });

        // Renderizar la vista de testimonios y pasar los datos necesarios
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios, // Pasamos los testimonios a la vista
            errores: [] // Pasamos un array vacío para manejar errores si los hubiera
        });
    } catch (error) {
        console.error('Error al obtener testimonios:', error);
        res.status(500).render('500', { pagina: 'Error del servidor' });
    }
};

// Función para guardar un nuevo testimonio
const guardarTestimonios = async (req, res) => {
    const { nombre, correoelectronico, mensaje } = req.body;
    const errores = [];

    // Validar los campos
    if (!nombre.trim()) {
        errores.push({ mensaje: 'El nombre está vacío' });
    }
    if (!correoelectronico.trim()) {
        errores.push({ mensaje: 'El correo está vacío' });
    }
    if (!mensaje.trim()) {
        errores.push({ mensaje: 'El mensaje está vacío' });
    }

    // Si hay errores, volvemos a la página de testimonios y mostramos los errores
    if (errores.length > 0) {
        try {
            const testimonios = await Testimonial.findAll({
                limit: 6,
                order: [["id", "DESC"]],
            });

            return res.render('testimonios', {
                pagina: 'Testimonios',
                errores,
                nombre,
                correoelectronico,
                mensaje,
                testimonios
            });
        } catch (error) {
            console.error('Error al recuperar testimonios para validación:', error);
            return res.status(500).render('500', { pagina: 'Error del servidor' });
        }
    }

    // Si no hay errores, creamos el testimonio en la base de datos
    try {
        await Testimonial.create({ nombre, correoelectronico, mensaje });
        res.redirect('/testimonios'); // Redirigir a la página de testimonios después de guardar
    } catch (error) {
        console.error('Error al guardar el testimonio:', error);
        res.status(500).render('500', { pagina: 'Error del servidor' });
    }
};

// Función para mostrar la página de viajes
const paginaViajes = async (req, res) => {
    try {
        // Buscar todos los viajes en la base de datos
        const viajes = await Viaje.findAll();

        // Renderizar la vista de viajes y pasar los datos necesarios
        res.render('viajes', {
            pagina: 'Viajes',
            viajes, // Pasamos los viajes a la vista
        });
    } catch (error) {
        console.error('Error al obtener viajes:', error);
        res.status(500).render('500', { pagina: 'Error del servidor' });
    }
};

// Función para mostrar la página de detalles de viaje
const paginaDetallesViajes = async (req, res) => {
    const { slug } = req.params; // Obtener el slug del viaje desde la URL
    try {
        // Buscar el viaje en la base de datos por el slug
        const viaje = await Viaje.findOne({ where: { slug } });

        if (!viaje) {
            return res.status(404).render('404', { pagina: 'Viaje no encontrado' });
        }

        // Renderizar la vista de detalles de viaje y pasar los datos
        res.render('detalle-viaje', {
            pagina: viaje.titulo,
            viaje, // Pasamos el viaje a la vista
            testimonios: await Testimonial.findAll({ where: { viajeId: viaje.id } }) // Si tienes testimonios relacionados con el viaje
        });
    } catch (error) {
        console.error('Error al obtener detalles del viaje:', error);
        res.status(500).render('500', { pagina: 'Error del servidor' });
    }
};

// Exportar las funciones para que se puedan utilizar en las rutas
export {
    paginaInicio,
    paginaNosotros,
    paginaTestimonios,
    guardarTestimonios,
    paginaViajes,
    paginaDetallesViajes
};
