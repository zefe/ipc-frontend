import React from 'react';
import { ChartIpc } from '../Components/ChartIpc/ChartIpc';
import { Header } from '../Components/Layout/Header';



export const HomeView = () => {
    return (
        <div className="home">
            <Header />
            <h1>Dashboard</h1>
            <ChartIpc />            
        </div>
    )
}
