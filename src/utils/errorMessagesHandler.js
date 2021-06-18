/*
    Funcion maneja los errores del formulario de registro, recibe 2 parametros el primero es @errors
    es el objeto que contiene las validaciones que no pasaron en el backend
    ejem:
    email: {
        location: "body",
        msg: "Email is required",
        param: "Email"
    }
    El segundo para metro @e es el objeto que retorna el Request, headers,status, data etc.
    Se utiliza para verificar el tipo de error y asi retornar solo los errores que nos envie la
    solicitud.

*/
export const errorMessages = (errors, e) => {
    
    let nameError;
    let passError; 
    let emailError;

    for(const property in errors ){
        if(property === 'name'){
            nameError = e.response.data.errors.name.msg;
        }
        
        if(property === 'password'){
            passError = e.response.data.errors.password.msg;
        }
        
        if(property === 'email'){
            emailError = e.response.data.errors.email.msg;
        }
    }

    return {
        nameError,
        passError, 
        emailError
    }
}