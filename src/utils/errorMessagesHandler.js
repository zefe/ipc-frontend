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