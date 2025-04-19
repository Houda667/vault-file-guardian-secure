
import React from 'react';
import { Shield, Lock, Database, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const InformationPanel: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Shield className="h-5 w-5 mr-2 text-secure-success" />
            Enterprise-Grade Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Our tool uses military-grade encryption algorithms to ensure your files stay protected.
            We implement AES-256 encryption, the same standard used by governments and security professionals.
          </CardDescription>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Database className="h-5 w-5 mr-2 text-primary" />
            Secure Password Storage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Your encryption passwords are securely stored in our database, not locally.
            This provides an additional layer of security and allows you to decrypt your files across devices.
          </CardDescription>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <FileText className="h-5 w-5 mr-2 text-secure-light" />
            Compatible With Any File Type
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            Encrypt any type of file - documents, images, videos, archives, and more.
            There are no limitations on file types or sizes.
          </CardDescription>
        </CardContent>
      </Card>
      
      <div className="text-center mt-8 text-sm text-muted-foreground">
        <p className="flex items-center justify-center">
          <Lock className="h-4 w-4 mr-1 text-secure" />
          Your security is our top priority
        </p>
      </div>
    </div>
  );
};

export default InformationPanel;
