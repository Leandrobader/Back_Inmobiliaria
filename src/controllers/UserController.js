//Crear controlador de usuario
const UserModel=require("../models/UserModel")
const bcrypt = require('bcrypt');
const helpers = require("../utils/helpersFunctions");

class UserController{
    async CreateNewAdmin(nomUsuario, password){
        try {
            if (!helpers.ValidateNomUser(nomUsuario)) {
                throw new Error("Formato invalido de Nombre de Usuario")
            }

            if(!helpers.ValidatePassword(password)){
                throw new Error("Formato Password incorrecto")
            }
            const SALT = parseInt(process.env.BCRYPT_SALT);
            const hash = await bcrypt.hash(password,SALT); //para crear la encriptacion debemos usar el metodo hash y pasarle el string y la cantidad de saltos (password,SALT)
            const newUser= new UserModel({
                nomUsuario:nomUsuario,
                password:hash,
                role:"Admin"
            })
            const savedUser= await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async CreateNewUser(nomUsuario, password){
        try {
            if (!helpers.ValidateNomUser(nomUsuario)) {
                throw new Error("Formato invalido de Nombre de Usuario")
            }

            if(!helpers.ValidatePassword(password)){
                throw new Error("Formato Password incorrecto")
            }
            const SALT = parseInt(process.env.BCRYPT_SALT);
            const hash = await bcrypt.hash(password,SALT); //para crear la encriptacion debemos usar el metodo hash y pasarle el string y la cantidad de saltos (password,SALT)
            const newUser= new UserModel({
                nomUsuario:nomUsuario,
                password:hash,
                role:"User"
            })
            const savedUser= await newUser.save();
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async DeleteUserById(id){
        try {
            const deletedUser = await UserModel.findByIdAndDelete(id);
            return deletedUser;
        } catch (error) {
            //de esta manera mandamos el error a la capa superior, en este caso al UserRoutes
            throw error
        }
    }
}

module.exports=UserController;