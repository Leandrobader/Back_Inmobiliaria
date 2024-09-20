const regexNomUsuario = /^[A-Za-z0-9._%+-]+/;
const regexPassword = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

function ValidateNomUser(nomUsuario){
    return regexNomUsuario.test(nomUsuario);
}
function ValidatePassword(password){
    return regexPassword.test(password);
}

module.exports = {ValidateNomUser, ValidatePassword}