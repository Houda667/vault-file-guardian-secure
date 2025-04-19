
import React from 'react';
import Image from '@/components/ui/image';

const SecurityHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="relative w-16 h-16 mx-auto mb-6">
        <Image 
          src="/lovable-uploads/df1cb348-4911-4e1b-b134-b2dddd750284.png"
          alt="Secret File Keeper Logo"
          className="w-full h-full object-contain animate-pulse"
        />
      </div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-400 bg-clip-text text-transparent">
        Secret File Keeper
      </h1>
      <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-center px-4">
        Un outil de chiffrement de fichiers sécurisé qui protège vos données confidentielles avec un chiffrement conforme aux normes de l'industrie. Toutes les opérations sont exécutées dans le cloud de manière sécurisée.
      </p>
    </div>
  );
};

export default SecurityHeader;
