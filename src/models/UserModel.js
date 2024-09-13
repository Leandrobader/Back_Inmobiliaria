//Ejemplo de como crear un modelo de usuario...
const mongoose = require("mongoose")
const {Schema} = mongoose;

const UserSchema = new Schema({
    nomUsuario:{
        type: String,
        required: [true, "El nombre de usuario es requerido"],
        unique: [true, "Nombre de usuario no disponible"]
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"],
    },
    role:{
        type: String,
        required: [true, "El rol es requerido"]
    }
})
//Fin de ejemplo

//Aquí debemos pasar como se llamara la coleccion, en este caso user y el esquema que le pasamos
const UserModel=mongoose.model("user", UserSchema);
//Exportamos el modelo
module.exports=UserModel;