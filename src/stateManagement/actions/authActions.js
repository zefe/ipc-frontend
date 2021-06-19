
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
                localStorage.setItem('oauth', false );

                dispatch( login({
                    uid: body.uid,
                    name: body.name,
                    role: 'admin'
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

export const startLoginWithGoogle = (response, history) => {
    return async( dispatch ) => {

        try{
            const user = response.profileObj;
            const token = response.accessToken;

            localStorage.setItem('token', token);
            localStorage.setItem('uid', user.googleId );
            localStorage.setItem('oauth', true );
            localStorage.setItem('name', user.name );
            localStorage.setItem('imageUrl', user.imageUrl);


            dispatch( login({
                uid: user.googleId,
                name: user.name,
            }))
            
            dispatch( cleanSpecificErrorMessage() );
            dispatch( cleanErrorMessages() );

        }
        catch(e){
            console.log(e)
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
                console.log(e.response)
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
                    name: body.name,
                    role: 'admin'
                }))

            } 

        }
        catch(e){            
            dispatch( checkingFinish() );
        }
    }
}

export const startCheckingGoogle = () => {
    return async( dispatch ) => {

        try{

            let token = localStorage.getItem('token') || '';
            let uid = localStorage.getItem('uid') || '';
            let oauth = localStorage.getItem('oauth') || '';

            localStorage.setItem('token', token)
            localStorage.setItem('uid', uid)
            localStorage.setItem('oauth', oauth)

            dispatch( login({
                uid: uid,
                oauth: oauth
            }))

        }
        catch(e){            
            dispatch( checkingFinish() );
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