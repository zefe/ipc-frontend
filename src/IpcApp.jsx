import React from 'react';
import { Provider } from 'react-redux';
import { store } from './stateManagement/store/store';
import { HomeView } from './views/HomeView';


export const IpcApp = () => {
    return (
        <Provider store={ store } >
            <HomeView />
        </Provider>
    )
}