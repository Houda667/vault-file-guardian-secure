
import React from 'react';
import { Shield, Lock } from 'lucide-react';

const SecurityHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
        <Lock className="h-8 w-8 text-primary" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Vault File Guardian</h1>
      <p className="text-muted-foreground max-w-md mx-auto">
        Secure file encryption and decryption with professional-grade protection
      </p>
      <div className="flex justify-center mt-4">
        <div className="inline-flex items-center text-xs text-secure-success bg-secure-success/10 px-3 py-1 rounded-full">
          <Shield className="h-3 w-3 mr-1" />
          <span>Advanced encryption standards</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityHeader;
