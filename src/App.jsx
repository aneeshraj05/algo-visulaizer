import React from 'react';
import { AlgorithmProvider } from './context/AlgorithmContext';
import Layout from './components/Layout';
import './index.css';

function App() {
    return (
        <AlgorithmProvider>
            <Layout />
        </AlgorithmProvider>
    );
}

export default App;
