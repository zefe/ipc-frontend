import { types } from '../types/types';

const initialState = {
    loading: false,
    data: {},
    errorMessage: ''
}

export const ipcListReducer = ( state=initialState, action) => {
    switch (action.type) {
        case types.ipcListLoading:
            return {
                ...state,
                loading: true,
                errorMessage: ''
            }
        case types.ipcListFail:
            return {
                ...state,
                loading: false,
                errorMessage: 'Something went wrong, contact support'
            }
        case types.ipcListSuccess:
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
