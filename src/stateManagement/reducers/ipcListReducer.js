import { types } from '../types/types';

const initialState = {
    loading: false,
    data: {},
    errorMessage: ''
}

export const ipcListReducer = ( state=initialState, action) => {
    switch (action.type) {
        case types.IPC_LIST_LOADING:
            return {
                ...state,
                loading: true,
                errorMessage: ''
            }
        case types.IPC_LIST_FAIL:
            return {
                ...state,
                loading: false,
                errorMessage: 'Something went wrong, contact support'
            }
        case types.IPC_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                errorMessage: '',
                data: action.payload
            }
    
        default:
            return state;
    }
}
