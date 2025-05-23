
import React from 'react';
import { RestaurantInfo } from '../types';

interface HeaderProps {
  info: RestaurantInfo;
}

const Header: React.FC<HeaderProps> = ({ info }) => {
  return (
    <header className="bg-primary text-brandText py-6 text-center shadow-md">
      <div className="container mx-auto px-4">
        {info.logoUrl !== "IMGUR_LOGO_URL_HERE" && info.logoUrl && (
            <img
                src={info.logoUrl}
                alt={`${info.name} Logo`}
                className="h-64 sm:h-80 w-auto mx-auto mb-3 object-contain" // Increased height
            />
        )}
        {info.logoUrl === "IMGUR_LOGO_URL_HERE" && (
            <div className="h-64 sm:h-80 w-full flex items-center justify-center bg-gray-200 text-gray-500 rounded-md mb-3">
                <span>Logo (Set IMGUR_LOGO_URL_HERE in constants.tsx)</span>
            </div>
        )}

        {/* 
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-brandText">
          {info.name} {info.tagline1}
        </h1> 
        */}

        {/* tagline2 and operatingHours removed from here for a cleaner header */}
        {/* {info.tagline2 && (
          <p className="text-lg sm:text-xl font-semibold text-brandText opacity-90 mt-1">{info.tagline2}</p>
        )}
         {info.operatingHours && (
          <p className="text-md text-brandText opacity-80 mt-2">{info.operatingHours}</p>
        )} */}
      </div>
    </header>
  );
};

export default Header;