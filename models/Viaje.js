import Sequelize from "sequelize"
import db from "../config/db.js"

export const Viaje = db.define(
    "viaje",
    {
        titulo: {
            type: Sequelize.STRING,
        },
        precio: {
            type: Sequelize.FLOAT,
        },
        fecha_ida: {
            type: Sequelize.DATE,
        },
        fecha_vuelta: {
            type: Sequelize.DATE,
        },
        imagen: {
            type: Sequelize.STRING,
        },
        descripcion: {
            type: Sequelize.TEXT,
        },
        disponibles: {
            type: Sequelize.INTEGER,
        },
        slug: {
            type: Sequelize.STRING,
        },
    },
    {
        timestamps: false,
    },
)