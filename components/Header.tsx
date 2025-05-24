import React from 'react';
import { RestaurantInfo } from '../types';
import { useAuth } from '../contexts/AuthContext'; // Assuming AuthContext will be created here
import { UserIcon, LogoutIcon, SettingsIcon } from '../constants';

interface HeaderProps {
  info: RestaurantInfo;
  onAuthClick: () => void; // To open the AuthModal
  onAdminPanelClick: () => void; // To open the AdminPanelModal
}

const Header: React.FC<HeaderProps> = ({ info, onAuthClick, onAdminPanelClick }) => {
  const isVideoLogo = info.logoUrl && info.logoUrl.toLowerCase().endsWith('.mp4');
  const { currentUser, logout } = useAuth();

  const headerStyle: React.CSSProperties = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3C!-- Larger Granulados (Circles) --%3E%3Ccircle cx='5' cy='8' r='2' fill='%234A2C2A' fill-opacity='0.08'/%3E%3Ccircle cx='25' cy='22' r='1.5' fill='%234A2C2A' fill-opacity='0.07'/%3E%3Ccircle cx='40' cy='10' r='2.5' fill='%234A2C2A' fill-opacity='0.08'/%3E%3Ccircle cx='15' cy='40' r='1.8' fill='%234A2C2A' fill-opacity='0.07'/%3E%3Ccircle cx='45' cy='45' r='2.2' fill='%234A2C2A' fill-opacity='0.08'/%3E%3C!-- Granulados (Rectangles) --%3E%3Crect x='10' y='2' width='4' height='1.5' rx='0.75' fill='%234A2C2A' fill-opacity='0.07' transform='rotate(20 12 2.75)'/%3E%3Crect x='30' y='35' width='5' height='2' rx='1' fill='%234A2C2A' fill-opacity='0.08' transform='rotate(-15 32.5 36)'/%3E%3Crect x='3' y='30' width='3.5' height='1.2' rx='0.6' fill='%234A2C2A' fill-opacity='0.07' transform='rotate(45 4.75 30.6)'/%3E%3Crect x='42' y='18' width='4' height='1.5' rx='0.75' fill='%234A2C2A' fill-opacity='0.08' transform='rotate(-30 44 18.75)'/%3E%3C!-- Abstract Pastel Shapes (Larger Rounded Rectangles) --%3E%3Crect x='15' y='12' width='12' height='7' rx='3' fill='%234A2C2A' fill-opacity='0.07' transform='rotate(-10 21 15.5)'/%3E%3Crect x='35' y='28' width='10' height='6' rx='2.5' fill='%234A2C2A' fill-opacity='0.08' transform='rotate(15 40 31)'/%3E%3Crect x='5' y='42' width='14' height='5' rx='2' fill='%234A2C2A' fill-opacity='0.07' transform='rotate(25 12 44.5)'/%3E%3C/svg%3E")`,
  };

  return (
    <header 
      className="bg-primary text-brandText h-28 sm:h-40 flex items-center relative" // Responsive height, relative for auth button positioning
      style={headerStyle}
      aria-label="Cabeçalho principal com logo e padrão de fundo temático"
    >
      <div className="container mx-auto px-4 flex items-center justify-center">
        <div className="flex items-center"> 
          {isVideoLogo ? (
            <video
              src={info.logoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="h-28 sm:h-40 w-auto object-contain" // Responsive height
              aria-label={`${info.name} logo animado`}
            >
              Seu navegador não suporta a tag de vídeo.
            </video>
          ) : info.logoUrl && info.logoUrl !== "IMGUR_LOGO_URL_HERE" ? (
            <img
              src={info.logoUrl}
              alt={`Logo de ${info.name}`}
              className="h-28 sm:h-40 w-auto object-contain" // Responsive height
            />
          ) : (
            <div className="h-28 w-28 sm:h-40 sm:w-40 bg-gray-200 bg-opacity-50 text-gray-500 rounded-md flex items-center justify-center text-sm" aria-label="Espaço reservado para o logo"> {/* Responsive height and width */}
              <span>Logo</span>
            </div>
          )}
        </div>
      </div>
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col items-end space-y-2">
        {currentUser ? (
          <div className="flex items-center space-x-2 sm:space-x-3 bg-brandText bg-opacity-10 backdrop-blur-sm p-2 rounded-lg shadow">
            <UserIcon className="text-brandText text-base sm:text-lg" />
            <span className="text-xs sm:text-sm font-medium text-brandText hidden sm:inline">{currentUser.email}</span>
            {currentUser.role === 'admin' && (
              <span className="text-xs bg-vibrantOrange text-white px-1.5 py-0.5 rounded-full font-semibold">Admin</span>
            )}
            <button
              onClick={logout}
              title="Sair"
              aria-label="Sair da conta"
              className="text-brandText hover:text-vibrantOrange transition-colors p-1 sm:p-1.5 rounded-md hover:bg-brandText hover:bg-opacity-20"
            >
              <LogoutIcon className="text-base sm:text-lg" />
            </button>
          </div>
        ) : (
          <button
            onClick={onAuthClick}
            className="bg-vibrantOrange hover:bg-vibrantOrangeHover text-white font-semibold py-2 px-3 sm:py-2.5 sm:px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-vibrantOrange focus:ring-opacity-50 transform hover:-translate-y-0.5"
            aria-label="Entrar ou Registrar"
          >
            Entrar / Registrar
          </button>
        )}
        {currentUser && currentUser.role === 'admin' && (
           <button
            onClick={onAdminPanelClick}
            className="bg-slate-700 hover:bg-slate-800 text-white font-semibold py-1.5 px-2.5 sm:py-2 sm:px-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-opacity-50 transform hover:-translate-y-0.5 flex items-center"
            aria-label="Abrir Painel Administrativo"
          >
            <SettingsIcon className="mr-1.5 text-sm sm:text-base"/> Painel Admin
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;