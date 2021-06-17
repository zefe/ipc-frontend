import React from 'react';
import { Provider } from 'react-redux';
import { store } from './stateManagement/store/store';
import { AppRouter } from './routes/AppRouter';


export const IpcApp = () => {
    return (
        <Provider store={ store } >
            <AppRouter />
        </Provider>
    )
}