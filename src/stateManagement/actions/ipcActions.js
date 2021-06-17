import axios from 'axios';
import { types } from '../types/types';

const URL_API_IPC = 'https://run.mocky.io/v3/cc4c350b-1f11-42a0-a1aa-f8593eafeb1e';

//Function to get data ipc
export const getIpcList = () => {
    return async( dispatch ) => {
        try{

            dispatch({
                type: types.ipcListLoading
            });

            const res = await axios.get(URL_API_IPC);

            dispatch({
                type: types.ipcListSuccess,
                payload: res.data
            });


        }
        catch(e){
            dispatch({
                type: types.ipcListFail
            });
            console.log(e);
        }

    }
}