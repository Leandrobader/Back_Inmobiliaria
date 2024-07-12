// INICIO CONFIGURACIONES INICIALES
const express = require("express");
const cors= require("cors");
const morgan= require("morgan");
const path= require("path");

//Instancia de express
const app=express();

//configuramos acceso a variables de entorno con dotenv
require('dotenv').config()
console.log(process.env.PORT)

//configuracion de puerto del servidor
app.set("port", process.env.PORT || 4000);

//iniciar un servidor con Express.js y registrar un mensaje que indica el puerto en el que el servidor está funcionando
app.listen(app.get("port"), ()=>{console.log(`Backend inmobiliaria en puerto ${app.get("port")}`)});

//Middlerwares nativos de express
app.use(express.json()); //permite recibir objetos en formato json
app.use(express.urlencoded({extended:true})); //permite recibir obketos de todo tipo en las peticiones

//Middlerwares de terceros
app.use(morgan("dev")); //proporciona detalles de las peticiones en la terminal
app.use(cors()); //para permitir peticiones remotas

//Cargo archivos estaticos (index.html)
console.log(__dirname, "DIRNAME"); //nos dice donde está alojado el proyecto
app.use(express.static(path.join(__dirname, "../public")));

//RUTA DE PRUEBA

app.get("/test", async(req, res, next)=>{
    try {
        console.log("request -->", req);
        return res.status(200).json({success:true, message:"API IS ALIVE"});
    } catch (error) {
        console.error(error);
        next(error)
    }
})

//FIN CONFIGURACIONES INICIALES