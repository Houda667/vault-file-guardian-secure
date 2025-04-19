
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isProcessing }) => {
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    onFileSelect(selectedFile);
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    disabled: isProcessing,
    maxFiles: 1
  });

  return (
    <Card className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-dashed">
      <div 
        {...getRootProps()} 
        className={cn(
          "rounded-lg p-8 text-center cursor-pointer transition-all duration-200",
          "hover:bg-white/50 dark:hover:bg-white/5",
          isDragActive ? "bg-white/50 dark:bg-white/5" : "",
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-purple-100 dark:bg-purple-900/50 rounded-full">
            <Upload className="h-8 w-8 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">
              {file ? file.name : "Sélectionnez un fichier à chiffrer"}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isDragActive ? "Déposez le fichier ici" : "Glissez et déposez votre fichier ici ou cliquez pour parcourir"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FileUploader;
