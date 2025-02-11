import Sequalice from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();


const db = new Sequalice(process.env.CONEXION, {

    define : {
        timestamp : false
    },
    pool : {

        max: 5,
        min: 0,
        acquire : 30000,
        idle : 10000

    },

});
export default db;