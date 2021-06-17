
import Swal from 'sweetalert2';
import { errorMessages } from '../../utils/errorMessagesHandler';
import authService from '../../services/authServices';
import { types } from '../types/types';

export const startLogin = (email, password, history) => {
    return async( dispatch ) => {

        try{

            const res =  await authService.login({email, password})
            const body = res.data;

            if(body.ok) {

                localStorage.setItem('token', body.token)
                localStorage.setItem('token-init-date', new Date().getTime() );

                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }))
                
                dispatch( cleanSpecificErrorMessage() );
                dispatch( cleanErrorMessages() );

                history.push('/');
            } 

        }
        catch(e){
            
            let message;
            if(e.response === undefined){
                message = "Something went wrong"
            } else {
                message = e.response.data.message;
            }

            dispatch({
                type: types.errorMessage,
                payload: message
            });
        }
    }
}


export const startSignUp = (name, email, password, history) => {
    return async( dispatch ) => {


        try{
            const res =  await authService.signup({name, email, password})
            const body = res.data;

            if(body.ok) {

                localStorage.setItem('token', body.token)
                localStorage.setItem('token-init-date', new Date().getTime() );

                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }))
                
                dispatch( cleanSpecificErrorMessage() );
                dispatch( cleanErrorMessages() );
                Swal.fire(
                    'Good job!',
                    'Successful registration!',
                    'success'
                  )
                

                setTimeout(()=>{
                    history.push('/');
                }, 3000)

            } 

        }
        catch(e){

            let message;
            if(e.response === undefined){
                message = "Something went wrong"
            } else {

                let errors = e.response.data.errors;
                let messages = errorMessages(errors, e)
    
                dispatch({
                    type: types.errorsMessages,
                    payload: messages
                })
                
            }

            dispatch({
                type: types.errorMessage,
                payload: message
            });

        }
    }
}

export const startChecking = () => {
    return async( dispatch ) => {

        try{
            const res =  await authService.renewToken();

            const body = res.data;

            if(body.ok) {

                localStorage.setItem('token', body.token)
                localStorage.setItem('token-init-date', new Date().getTime() );

                dispatch( login({
                    uid: body.uid,
                    name: body.name
                }))

            } 

        }
        catch(e){
            
            dispatch( checkingFinish() );
            //console.log(e.response);
        }
    }
}

const checkingFinish = () => ({
    type: types.authCheckingFinish
});

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

const cleanSpecificErrorMessage= (  ) => ({
    type: types.errorMessage,
    payload: ''
});

const cleanErrorMessages = ( ) => ({
    type: types.errorsMessages,
    payload: {}
});


export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })