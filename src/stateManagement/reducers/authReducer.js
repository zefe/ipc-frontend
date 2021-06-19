import { types } from '../types/types';

let initialState = {
    checking: true,
    errors: { },
    error:''
}

export const authReducer = ( state=initialState, action) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }
        
        case types.errorMessage:
            return {
                ...state, error: action.payload
            }

        case types.errorsMessages:
            return {
                ...state, errors: action.payload
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }
        case types.authLogout:
            return {
                errors:{},
                error:'',
                checking: false
            }

    
        default:
            return state;
    }
}