
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({
        title: "Connexion réussie!",
        description: "Vous êtes maintenant connecté.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur de connexion",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast({
        title: "Inscription réussie!",
        description: "Un email de confirmation vous a été envoyé.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur d'inscription",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 overflow-hidden relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000000_1px,transparent_1px)] bg-[size:16px_16px] z-0" />
      
      <Card className="relative z-10 w-full max-w-md p-8 bg-white border border-gray-100 shadow-2xl rounded-2xl transform transition-all duration-300 hover:scale-[1.01] animate-fade-in">
        <div className="space-y-6">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-block p-4 rounded-full bg-primary/10 mb-4 animate-bounce-slow">
              <ShieldCheck className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">
              {isSignUp ? "Créer un compte" : "Connexion"}
            </h1>
            <p className="text-gray-600">
              {isSignUp
                ? "Rejoignez-nous pour sécuriser vos fichiers"
                : "Connectez-vous pour accéder à vos fichiers sécurisés"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 border-gray-300 focus:border-primary focus:ring-primary/50"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 border-gray-300 focus:border-primary focus:ring-primary/50"
              />
            </div>

            <Button
              onClick={isSignUp ? handleSignUp : handleSignIn}
              disabled={loading}
              className="w-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Chargement...
                </div>
              ) : isSignUp ? (
                "Créer un compte"
              ) : (
                "Se connecter"
              )}
            </Button>

            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="w-full text-primary/70 hover:text-primary text-sm transition-colors mt-4"
            >
              {isSignUp
                ? "Déjà un compte ? Connectez-vous"
                : "Pas de compte ? Inscrivez-vous"}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Auth;

