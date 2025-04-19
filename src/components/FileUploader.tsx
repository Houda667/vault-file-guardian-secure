
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, Upload, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, isProcessing }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        setTimeout(() => {
          onFileSelect(selectedFile);
        }, 500);
      }
      setUploadProgress(progress);
    }, 200);
    
    toast({
      title: "File selected",
      description: `${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`,
    });
  }, [onFileSelect, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    disabled: isProcessing,
    maxFiles: 1
  });

  return (
    <div className="security-card animate-fade-in">
      <div className="mb-4 flex items-center">
        <div className="lock-icon-container mr-3">
          <Lock className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-semibold">Secure File Processing</h2>
      </div>
      
      <div 
        {...getRootProps()} 
        className={cn(
          "file-drop-area mt-4 cursor-pointer",
          isDragActive ? "active" : "",
          isProcessing ? "opacity-50 cursor-not-allowed" : ""
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="h-12 w-12 text-muted-foreground mb-3" />
          <p className="text-lg font-medium mb-1">
            {isDragActive ? "Drop your file here" : "Drag & drop your file here"}
          </p>
          <p className="text-sm text-muted-foreground mb-3">
            or click to browse your files
          </p>
          <Button variant="outline" disabled={isProcessing}>
            Select File
          </Button>
        </div>
      </div>

      {file && (
        <div className="mt-6 animate-slide-up">
          <div className="flex items-center mb-2">
            <File className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm font-medium truncate">{file.name}</span>
            <span className="ml-2 text-xs text-muted-foreground">
              ({(file.size / 1024).toFixed(2)} KB)
            </span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
          {uploadProgress === 100 && !isProcessing && (
            <p className="text-xs text-secure-success mt-1">Ready to process</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
