
import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PasswordFormProps {
  onPasswordSubmit: (password: string) => void;
  isEncrypting: boolean;
  isDecrypting: boolean;
  mode: 'encrypt' | 'decrypt';
}

const PasswordForm: React.FC<PasswordFormProps> = ({ 
  onPasswordSubmit, 
  isEncrypting, 
  isDecrypting,
  mode
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPasswordSubmit(password);
  };

  const isProcessing = isEncrypting || isDecrypting;
  const buttonText = mode === 'encrypt' ? 'Chiffrer le fichier' : 'Déchiffrer le fichier';
  const isButtonDisabled = isProcessing || !password || (mode === 'encrypt' && !confirmPassword);
  const title = mode === 'encrypt' ? 'Chiffrer un fichier' : 'Déchiffrer un fichier';
  const subtitle = mode === 'encrypt' ? 'Protégez vos fichiers confidentiels avec un mot de passe fort' : 'Déchiffrez vos fichiers avec votre mot de passe';

  return (
    <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2 text-center">
          <div className="inline-flex p-3 bg-purple-100 dark:bg-purple-900/50 rounded-full mb-2">
            <Lock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Entrez un mot de passe de chiffrement"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                disabled={isProcessing}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {mode === 'encrypt' && (
            <div className="space-y-2">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmez le mot de passe de chiffrement"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10"
                disabled={isProcessing}
              />
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          className={cn(
            "w-full",
            "bg-gradient-to-r from-purple-500 to-blue-400 hover:from-purple-600 hover:to-blue-500",
            "text-white font-medium py-2 px-4 rounded-md transition-all duration-200"
          )}
          disabled={isButtonDisabled}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </span>
          ) : buttonText}
        </Button>
      </form>
    </Card>
  );
};

export default PasswordForm;
