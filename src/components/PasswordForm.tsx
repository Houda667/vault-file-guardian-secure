
import React, { useState } from 'react';
import { Key, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'encrypt' && password !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "The passwords you entered don't match.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 8 && mode === 'encrypt') {
      toast({
        title: "Password too short",
        description: "Please use at least 8 characters for security.",
        variant: "destructive"
      });
      return;
    }

    onPasswordSubmit(password);
  };

  const isProcessing = isEncrypting || isDecrypting;
  const buttonText = mode === 'encrypt' ? 'Encrypt File' : 'Decrypt File';
  const isButtonDisabled = isProcessing || !password || (mode === 'encrypt' && !confirmPassword);

  return (
    <form onSubmit={handleSubmit} className="security-card animate-fade-in">
      <div className="mb-4 flex items-center">
        <div className="lock-icon-container mr-3">
          <Shield className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Secure {mode === 'encrypt' ? 'Encryption' : 'Decryption'}</h2>
      </div>

      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor="password">
            Password {mode === 'encrypt' && <span className="text-xs text-muted-foreground">(will be securely stored)</span>}
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Key className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your secure password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              disabled={isProcessing}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>

        {mode === 'encrypt' && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Key className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10"
                disabled={isProcessing}
              />
            </div>
          </div>
        )}
        
        {mode === 'encrypt' && (
          <div className="text-xs text-muted-foreground mt-2">
            <p>Password requirements:</p>
            <ul className="list-disc list-inside ml-1 mt-1 space-y-1">
              <li className={password.length >= 8 ? "text-secure-success" : ""}>
                At least 8 characters
              </li>
              <li className={/[A-Z]/.test(password) ? "text-secure-success" : ""}>
                At least one uppercase letter
              </li>
              <li className={/[0-9]/.test(password) ? "text-secure-success" : ""}>
                At least one number
              </li>
            </ul>
          </div>
        )}

        <Button 
          type="submit" 
          className="w-full" 
          disabled={isButtonDisabled}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : buttonText}
        </Button>
      </div>
    </form>
  );
};

export default PasswordForm;
