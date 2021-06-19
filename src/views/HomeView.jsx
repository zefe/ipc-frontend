import React from 'react';
import { useSelector } from 'react-redux';

import { ChartIpc } from '../Components/ChartIpc/ChartIpc';
import { Header } from '../Components/Layout/Header';



export const HomeView = () => {

    const { role } = useSelector(state => state.auth);

    return (
        <div className="home">
            <Header />
            <h1>{ (role === 'admin') ? 'Admin Dashboard' : 'Broker Dashboard' }</h1>
            <ChartIpc />            
        </div>
    )
}
