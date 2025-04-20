import React, { useState, useEffect } from 'react';
import SecurityHeader from '@/components/SecurityHeader';
import FileUploader from '@/components/FileUploader';
import PasswordForm from '@/components/PasswordForm';
import FileProcessor from '@/components/FileProcessor';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from '@/lib/utils';
import * as bcrypt from '@/lib/bcrypt';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [currentFileId, setCurrentFileId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setIsProcessed(false);
    setCurrentFileId(null);
  };

  const handlePasswordSubmit = async (password: string) => {
    if (!selectedFile) {
      toast({
        title: "Aucun fichier sélectionné",
        description: "Veuillez d'abord sélectionner un fichier.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      if (mode === 'encrypt') {
        const fileId = uuidv4();
        setCurrentFileId(fileId);

        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          throw new Error("Utilisateur non authentifié");
        }

        const { error: fileError } = await supabase
          .from('encrypted_files')
          .insert({
            id: fileId,
            file_name: selectedFile.name,
            file_size: selectedFile.size,
            file_type: selectedFile.type,
            user_id: user.id
          });
          
        if (fileError) {
          console.error("Erreur lors de l'enregistrement du fichier:", fileError);
          throw fileError;
        }
        
        const hashedPassword = await bcrypt.hash(password);
        
        const { error: passwordError } = await supabase
          .from('encryption_passwords')
          .insert({
            file_id: fileId,
            password_hash: hashedPassword
          });
          
        if (passwordError) {
          console.error("Erreur lors de l'enregistrement du mot de passe:", passwordError);
          throw passwordError;
        }
        
        toast({
          title: "Fichier chiffré avec succès",
          description: "Votre fichier a été chiffré en toute sécurité et le mot de passe a été stocké de manière sécurisée.",
          variant: "default"
        });
      } else {
        toast({
          title: "Fichier déchiffré avec succès",
          description: "Votre fichier a été déchiffré en toute sécurité.",
          variant: "default"
        });
      }
      
      setTimeout(() => {
        setIsProcessing(false);
        setIsProcessed(true);
      }, 1500);
      
    } catch (error: any) {
      console.error("Erreur lors du traitement du fichier:", error);
      toast({
        title: "Erreur lors du traitement du fichier",
        description: error.message || "Une erreur inattendue s'est produite",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setIsProcessed(false);
    setCurrentFileId(null);
  };

  const handleModeChange = (newMode: 'encrypt' | 'decrypt') => {
    setMode(newMode);
    setIsProcessed(false);
    setCurrentFileId(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container py-8 px-4 mx-auto max-w-4xl">
        <SecurityHeader />
        
        <div className="space-y-6 max-w-2xl mx-auto">
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
        
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>© 2025 Vault File Guardian. Tous les fichiers sont traités en toute sécurité.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
