
import React from 'react';
import { RestaurantInfo } from '../types';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../constants'; // PhoneIcon removed for simplicity here

interface FooterProps {
  info: RestaurantInfo;
}

const Footer: React.FC<FooterProps> = ({ info }) => {
  return (
    <footer className="bg-brandText text-primary py-8 px-4">
      <div className="container mx-auto text-center">
        <h3 className="text-2xl font-serif text-primary mb-3">{info.name} {info.tagline1}</h3>
        <p className="mb-4 text-sm opacity-80">{info.address}</p>
        
        <div className="flex justify-center space-x-6 my-5">
          <a href={info.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-opacity-70 transition-colors text-2xl">
            <InstagramIcon />
          </a>
          <a href={info.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-opacity-70 transition-colors text-2xl">
            <FacebookIcon />
          </a>
          <a href={`https://wa.me/${info.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-opacity-70 transition-colors text-2xl">
             <WhatsAppIcon />
          </a>
        </div>
        
        <p className="text-xs opacity-60">
          &copy; {new Date().getFullYear()} {info.name}. Todos os direitos reservados.
        </p>
         <p className="text-xs opacity-60 mt-1">
          Cardápio Digital por AI Studio.
        </p>
      </div>
    </footer>
  );
};

export default Footer;