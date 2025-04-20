
import React from 'react';
import { Lock, Key } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FileProcessorProps {
  file: File | null;
  mode: 'encrypt' | 'decrypt';
  isProcessing: boolean;
  isProcessed: boolean;
  onModeChange: (mode: 'encrypt' | 'decrypt') => void;
  onReset: () => void;
}

const FileProcessor: React.FC<FileProcessorProps> = ({
  mode,
  isProcessing,
  onModeChange,
}) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <Tabs 
        defaultValue={mode} 
        onValueChange={(value) => onModeChange(value as 'encrypt' | 'decrypt')}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-4 bg-[#F5F5FB] rounded-lg p-1">
          <TabsTrigger 
            value="encrypt" 
            disabled={isProcessing}
            className={cn(
              "flex items-center justify-center gap-2 py-3 rounded-md transition-all duration-200",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6C63FF] data-[state=active]:to-[#4C45B3] data-[state=active]:text-white"
            )}
          >
            <Lock className="h-4 w-4" />
            Chiffrer
          </TabsTrigger>
          <TabsTrigger 
            value="decrypt" 
            disabled={isProcessing}
            className={cn(
              "flex items-center justify-center gap-2 py-3 rounded-md transition-all duration-200",
              "data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6C63FF] data-[state=active]:to-[#4C45B3] data-[state=active]:text-white"
            )}
          >
            <Key className="h-4 w-4" />
            Déchiffrer
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default FileProcessor;
