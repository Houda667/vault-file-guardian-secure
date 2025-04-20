import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Lock, User } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(40deg,#6366f1,#8b5cf6,#d946ef)] opacity-20" />
        <div className="absolute inset-0 animate-pulse-slow mix-blend-overlay bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-repeat bg-[length:20px_20px]" />
      </div>

      <Card className="w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl transform hover:scale-[1.01] transition-all duration-300">
        <div className="space-y-6">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-block p-3 rounded-full bg-white/10 backdrop-blur-sm mb-4 animate-bounce-slow">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
              {isSignUp ? "Créer un compte" : "Connexion"}
            </h1>
            <p className="text-white/70">
              {isSignUp
                ? "Rejoignez-nous pour sécuriser vos fichiers"
                : "Connectez-vous pour accéder à vos fichiers sécurisés"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/40"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="password"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-white/40"
              />
            </div>

            <Button
              onClick={isSignUp ? handleSignUp : handleSignIn}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:ring-2 focus:ring-white/50 disabled:opacity-50"
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
              className="w-full text-white/70 hover:text-white text-sm transition-colors mt-4"
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
