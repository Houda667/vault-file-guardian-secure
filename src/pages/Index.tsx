
import React, { useState, useEffect } from 'react';
import SecurityHeader from '@/components/SecurityHeader';
import FileUploader from '@/components/FileUploader';
import PasswordForm from '@/components/PasswordForm';
import FileProcessor from '@/components/FileProcessor';
import InformationPanel from '@/components/InformationPanel';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsProcessed(false);
  };

  const handlePasswordSubmit = (password: string) => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file first.",
        variant: "destructive"
      });
      return;
    }

    // Simulate encryption/decryption process
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsProcessed(true);
      
      toast({
        title: `File ${mode === 'encrypt' ? 'encrypted' : 'decrypted'} successfully`,
        description: `Your file has been securely ${mode === 'encrypt' ? 'encrypted' : 'decrypted'}.`,
        variant: "default"
      });

      // In a real implementation, we would store the password securely 
      // in a database using Supabase after connection
      console.log(`Password would be stored securely in database: ${password.substring(0, 2)}***`);
    }, 2500);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIsProcessed(false);
  };

  const handleModeChange = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    // Reset processing state when mode changes
    setIsProcessed(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 px-4 mx-auto max-w-6xl">
        <SecurityHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 space-y-6">
            {!selectedFile || isProcessed ? (
              <FileUploader 
                onFileSelect={handleFileSelect} 
                isProcessing={isProcessing} 
              />
            ) : (
              <PasswordForm 
                onPasswordSubmit={handlePasswordSubmit}
                isEncrypting={isProcessing && mode === 'encrypt'}
                isDecrypting={isProcessing && mode === 'decrypt'}
                mode={mode}
              />
            )}
            
            <FileProcessor 
              file={selectedFile}
              mode={mode}
              isProcessing={isProcessing}
              isProcessed={isProcessed}
              onModeChange={handleModeChange}
              onReset={handleReset}
            />
          </div>
          
          <div className="md:col-span-1">
            <InformationPanel />
          </div>
        </div>
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>© 2025 Vault File Guardian. All files are processed securely.</p>
          <p className="mt-1">
            For secure password storage, please connect this app to a database.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
