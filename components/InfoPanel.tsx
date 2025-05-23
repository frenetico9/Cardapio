import React from 'react';
import { RestaurantInfo, PaymentMethod } from '../types';
import { WhatsAppIcon } from '../constants';

interface InfoPanelProps {
  info: RestaurantInfo;
  paymentMethods: PaymentMethod[];
}

const InfoPanel: React.FC<InfoPanelProps> = ({ info, paymentMethods }) => {
  return (
    <section className="py-10 bg-lightBg">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-cardBg p-6 rounded-xl shadow-subtle border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Visite-nos ou Peça Já!</h3>
            <p className="text-itemDescriptionText mb-2">
              <strong>Endereço:</strong> {info.address}
            </p>
            {info.contact.whatsapp && (
              <a 
                href={`https://wa.me/${info.contact.whatsapp}?text=Olá!%20Gostaria%20de%20fazer%20um%20pedido%20ou%20tirar%20uma%20dúvida.`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center text-green-600 hover:text-green-700 font-semibold mb-2 transition-colors"
              >
                <WhatsAppIcon className="mr-2 text-2xl" /> WhatsApp: ({info.contact.whatsapp.substring(2, 4)}) {info.contact.whatsapp.substring(4, 9)}-{info.contact.whatsapp.substring(9)}
              </a>
            )}
          </div>

          <div className="bg-cardBg p-6 rounded-xl shadow-subtle border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Formas de Pagamento</h3>
            <ul className="space-y-2">
              {paymentMethods.map(method => (
                <li key={method.id} className="flex items-center text-itemDescriptionText">
                  {method.icon && React.cloneElement(method.icon as React.ReactElement<{ className?: string }>, { className: 'mr-3 text-xl text-slate-600 opacity-80' })}
                  <span>{method.name}</span>
                   {method.description && <span className="text-xs text-slate-500 ml-1">({method.description})</span>}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-cardBg p-6 rounded-xl shadow-subtle border border-slate-200 md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-semibold text-slate-700 mb-4">Entrega e Promoções</h3>
            <p className="text-itemDescriptionText mb-2">
              Levamos nossos deliciosos pastéis até você! Selecione seus itens e envie seu pedido pelo WhatsApp.
            </p>
            {info.deliveryLink && info.deliveryLink !== "#" && (
                 <a 
                    href={info.deliveryLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-vibrantOrange hover:bg-vibrantOrangeHover text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-md transition-all my-2 transform hover:-translate-y-0.5"
                >
                    Veja Opções de Delivery
                </a>
            )}
            <p className="text-itemDescriptionText mt-3">
              Fique de olho em nossas redes sociais para promoções especiais!
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoPanel;