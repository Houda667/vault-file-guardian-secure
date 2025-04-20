
import React from 'react';
import Image from '@/components/ui/image';

const SecurityHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <Image 
          src="/lovable-uploads/ba04a26f-05f7-46c9-bc56-de66db058e07.png"
          alt="Secret File Keeper Logo"
          className="w-full h-full object-contain animate-pulse-slow"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4 text-[#6C63FF]">
        Secret File Keeper
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto text-center px-4">
        Un outil de chiffrement de fichiers sécurisé qui protège vos données confidentielles avec un chiffrement conforme aux normes de l'industrie. Toutes les opérations sont exécutées dans le cloud de manière sécurisée.
      </p>
    </div>
  );
};

export default SecurityHeader;
