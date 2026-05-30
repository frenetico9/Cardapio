import React from 'react';
import { RestaurantInfo } from '../types';

interface HeaderProps {
  info: RestaurantInfo;
}

const Header: React.FC<HeaderProps> = ({ info }) => {
  return (
    <header
      className="bg-gradient-to-r from-yellow-400 via-amber-400 to-red-500 text-brandText h-44 sm:h-52 flex items-center relative overflow-hidden"
      aria-label="Cabeçalho principal com logo e identidade visual"
    >
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,_#ffffff,_transparent_35%),radial-gradient(circle_at_bottom_right,_#7f1d1d,_transparent_30%)]"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex items-center justify-center gap-4 sm:gap-8">
          <div className="bg-white/75 backdrop-blur-sm rounded-2xl p-2 sm:p-3 shadow-lg border border-white/60">
            <img src={info.logoUrl} alt={`Logo de ${info.name}`} className="h-24 sm:h-32 w-auto object-contain" />
          </div>
          <div className="hidden sm:block text-left max-w-xl">
            <p className="uppercase tracking-[0.35em] text-sm font-extrabold text-red-900/80 mb-1">Frango assado especial</p>
            <h1 className="text-3xl md:text-4xl font-black leading-tight text-red-950 drop-shadow-sm">{info.name}</h1>
            <p className="text-lg font-bold text-red-900 mt-2">{info.tagline1}</p>
            <p className="text-sm md:text-base font-medium text-red-950/85">{info.tagline2}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
