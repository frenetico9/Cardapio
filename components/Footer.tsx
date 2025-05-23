import React from 'react';
import { RestaurantInfo } from '../types';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../constants';

interface FooterProps {
  info: RestaurantInfo;
}

const Footer: React.FC<FooterProps> = ({ info }) => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-6 sm:py-8 px-4">
      <div className="container mx-auto text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-100 mb-2 sm:mb-3">{info.name} {info.tagline1}</h3>
        <p className="mb-3 sm:mb-4 text-xs sm:text-sm opacity-70">{info.address}</p>
        
        <div className="flex justify-center space-x-5 sm:space-x-6 my-4 sm:my-5">
          <a href={info.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors text-xl sm:text-2xl">
            <InstagramIcon />
          </a>
          <a href={info.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors text-xl sm:text-2xl">
            <FacebookIcon />
          </a>
          <a href={`https://wa.me/${info.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-primary transition-colors text-xl sm:text-2xl">
             <WhatsAppIcon />
          </a>
        </div>
        
        <p className="text-xs opacity-50">
          &copy; {new Date().getFullYear()} {info.name}. Todos os direitos reservados.
        </p>
         <p className="text-xs opacity-50 mt-1">
          Cardápio Digital por AI Studio.
        </p>
      </div>
    </footer>
  );
};

export default Footer;