//Crear controlador de usuario
const UserModel=require("../models/UserModel")
const bcrypt = require('bcrypt');
const helpers = require("../utils/helpersFunctions");
const jwt = require("jsonwebtoken");


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

    async Login(req, res){
        try {
            const body = req.body;

            if(body.nomUsuario === "" || body.nomUsuario === undefined){
                throw new Error("Debe enviar un nombre de usuario")
            }

            if(body.password === "" || body.password === undefined){
                throw new Error("debe enviar un password")
            }

            const user = await UserModel.findOne({nomUsuario:body.nomUsuario})

            if(user === null){
                return res.status(404).json({message: "Nombre de usuario y/o contraseña incorrecta"});
            }

            const compare = await bcrypt.compare(body.password, user.password);

            if(!compare){
                return res.status(404).json({message: "Nombre de usuario y/o contraseña incorrecta"});
            }

            const token = jwt.sign({//aqui recibe un objeto y le pasamos lo que queremos que encripte
                _id:user._id,
                role:user.role
            },process.env.SECRET_KEY,{expiresIn:"1D"});//aqui pasamos la palabra secreta y la fecha de expiracion que en este caso es de 1 dia

            return res.status(200).json({nomUsuario:user.nomUsuario, role:user.role, token:token});

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