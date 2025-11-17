
import React from 'react';

const BrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cyan-400"
  >
    <path d="M12 2a4.5 4.5 0 0 0-4.5 4.5c0 1.44.82 2.73 2 3.52V15a3.5 3.5 0 0 0-3.5 3.5c0 .35.07.68.18.99A4.5 4.5 0 0 0 12 22a4.5 4.5 0 0 0 5.32-3.51c.11-.31.18-.64.18-.99a3.5 3.5 0 0 0-3.5-3.5V10.02c1.18-.79 2-2.08 2-3.52A4.5 4.5 0 0 0 12 2Z" />
    <path d="M12 15a2.5 2.5 0 0 0-2.5 2.5c0 1.05.6 1.94 1.45 2.33" />
    <path d="M12 15a2.5 2.5 0 0 1 2.5 2.5c0 1.05-.6 1.94-1.45 2.33" />
    <path d="M5.5 11.5A2.5 2.5 0 0 0 8 9" />
    <path d="M18.5 11.5a2.5 2.5 0 0 1-2.5-2.5" />
    <path d="M12 2v2.5" />
    <path d="M12 22v-2.5" />
    <path d="m4.43 5.57 1.76 1.77" />
    <path d="m17.81 16.66 1.76 1.77" />
    <path d="m19.57 5.57-1.76 1.77" />
    <path d="m6.19 16.66-1.76 1.77" />
  </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-slate-700">
      <div className="container mx-auto flex items-center gap-3">
        <BrainIcon />
        <h1 className="text-xl font-bold text-slate-100 tracking-tight">
          NeuroSpring
        </h1>
      </div>
    </header>
  );
};

export default Header;
