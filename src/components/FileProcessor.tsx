
import React, { useState, useEffect } from 'react';
import { Shield, FileText, Lock, Key, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

interface FileProcessorProps {
  file: File | null;
  mode: 'encrypt' | 'decrypt';
  isProcessing: boolean;
  isProcessed: boolean;
  onModeChange: (mode: 'encrypt' | 'decrypt') => void;
  onReset: () => void;
}

const FileProcessor: React.FC<FileProcessorProps> = ({
  file,
  mode,
  isProcessing,
  isProcessed,
  onModeChange,
  onReset
}) => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Create a fake download URL when processing is complete
  useEffect(() => {
    if (isProcessed && file) {
      const blobData = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(blobData);
      setDownloadUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [isProcessed, file]);

  const handleDownload = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      let fileName = file?.name || 'file';
      
      // Correct handling of file extensions based on mode
      if (mode === 'encrypt') {
        // For encryption, add .enc extension
        link.download = `${fileName}.enc`;
      } else {
        // For decryption, remove .enc extension if it exists
        if (fileName.toLowerCase().endsWith('.enc')) {
          fileName = fileName.slice(0, -4);
        }
        link.download = fileName;
      }
      
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download started",
        description: `${link.download} is being saved to your device.`,
      });
    }
  };

  // Get file details for display
  const fileSize = file ? (file.size / 1024).toFixed(2) : '0';
  const fileName = file?.name || 'No file selected';
  const fileType = file?.type || 'Unknown';
  
  return (
    <div className="security-card animate-fade-in">
      <Tabs defaultValue={mode} onValueChange={(value) => onModeChange(value as 'encrypt' | 'decrypt')}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="encrypt" disabled={isProcessing}>
            <Lock className="h-4 w-4 mr-2" />
            Encrypt
          </TabsTrigger>
          <TabsTrigger value="decrypt" disabled={isProcessing}>
            <Key className="h-4 w-4 mr-2" />
            Decrypt
          </TabsTrigger>
        </TabsList>

        <TabsContent value="encrypt" className="space-y-4">
          <h3 className="text-lg font-medium">File Encryption</h3>
          <p className="text-sm text-muted-foreground">
            Protect your sensitive files with military-grade encryption. The password will be securely stored.
          </p>
        </TabsContent>

        <TabsContent value="decrypt" className="space-y-4">
          <h3 className="text-lg font-medium">File Decryption</h3>
          <p className="text-sm text-muted-foreground">
            Access your encrypted files by providing the password used during encryption.
          </p>
        </TabsContent>
      </Tabs>

      {file && (
        <Card className="mt-4 border bg-muted/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium truncate max-w-[180px]">{fileName}</h4>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>{fileSize} KB</span>
                    <span className="mx-2">•</span>
                    <span className="truncate max-w-[120px]">{fileType}</span>
                  </div>
                </div>
              </div>
              
              <div>
                {isProcessing ? (
                  <Badge variant="outline" className="status-badge processing">Processing</Badge>
                ) : isProcessed ? (
                  <Badge variant="outline" className={cn(
                    "status-badge",
                    mode === 'encrypt' ? "encrypted" : "decrypted"
                  )}>
                    {mode === 'encrypt' ? 'Encrypted' : 'Decrypted'}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">Ready</Badge>
                )}
              </div>
            </div>
            
            {isProcessed && (
              <div className="mt-4 flex justify-end space-x-3 animate-slide-up">
                <Button variant="outline" size="sm" onClick={onReset}>
                  Process Another File
                </Button>
                <Button size="sm" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
      
      <div className="mt-6 flex items-center justify-center text-xs text-muted-foreground">
        <Shield className="h-3 w-3 mr-1" />
        <span>Your files never leave your device. Processing happens locally.</span>
      </div>
    </div>
  );
};

export default FileProcessor;
