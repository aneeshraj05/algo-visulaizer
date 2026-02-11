import React from 'react';
import ControlPanel from './ControlPanel';
import Visualizer from './Visualizer';
import StatsPanel from './StatsPanel';
import CodePanel from './CodePanel';
import Breadcrumb from './Breadcrumb';

const Layout = () => {
    return (
        <div className="flex flex-col h-screen w-full bg-slate-900 text-slate-100 overflow-hidden">
            <Breadcrumb />
            <CodePanel />

            <header className="p-4 bg-slate-800 border-b border-slate-700 shadow-md z-10">
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 text-center tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Algorithm Visualizer
                </h1>
                <ControlPanel />
            </header>

            <main className="flex-1 flex items-end justify-center p-4 md:p-8 relative bg-slate-900 overflow-hidden">
                <Visualizer />
            </main>

            <footer className="p-4 bg-slate-800 border-t border-slate-700">
                <StatsPanel />
            </footer>
        </div>
    );
};

export default Layout;
