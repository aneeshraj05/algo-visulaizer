import React from 'react';
import ControlPanel from './ControlPanel';
import Visualizer from './Visualizer';
import StatsPanel from './StatsPanel';

const Layout = () => {
    return (
        <div className="flex flex-col h-screen w-full bg-slate-900 text-slate-100 overflow-hidden">
            <header className="p-4 bg-slate-800 border-b border-slate-700 shadow-md z-10">
                <h1 className="text-2xl font-bold text-blue-400 mb-4 text-center hidden md:block">Algorithm Visualizer</h1>
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
