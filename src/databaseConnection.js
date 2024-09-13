const mongoose = require('mongoose');

const databaseConnection=()=>{
    //guardamos la cadena de conexion
    const connectionString = process.env.DDBB;
    
    //pasamos la cadena
    mongoose.connect(connectionString);
    //la guardamos en una constante mediante metodo connection de mongoose
    const connection = mongoose.connection;
    //conectamos la base de datos
    connection.once("open", ()=>{
        console.log("DDBB CONECTADO EXITOSAMENTE");
    });
};
//exportamos la funcion databaseConnection
module.exports = databaseConnection;