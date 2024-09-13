//Crear controlador de usuario
const UserModel=require("../models/UserModel")

class UserController{
    async CreateNewUser(nomUsuario, password, role){
        try {
            const newUser= new UserModel({
                nomUsuario:nomUsuario,
                password:password,
                role:role
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