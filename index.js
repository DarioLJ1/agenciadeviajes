import express from "express"
import router from "./Routers/index.js"
import db from "./config/db.js"

const app = express()

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }))

// Conectar a la base de datos
db.authenticate()
    .then(() => console.log("Conectado a la base de datos"))
    .catch((err) => console.error("Error conectando a la base de datos:", err))

const port = process.env.PORT || 4000

// Configurar Pug como motor de vistas
app.set("view engine", "pug")

// Middleware global para definir el año
app.use((req, res, next) => {
        res.locals.year = new Date().getFullYear()
        res.locals.nombreP = "Agencia de Viajes"
        next()
})

// Definir la carpeta pública
app.use(express.static("public"))

// Usar el router
app.use("/", router)

// Manejo de errores 404
app.use((req, res, next) => {
        res.status(404).render("404", { pagina: "Página no encontrada" })
})

// Manejo de errores generales
app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).render("500", { pagina: "Error del servidor" })
})

// Iniciar el servidor
app.listen(port, () => {
        console.log(`Servidor corriendo en el puerto ${port}`)
})