import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, Key, ArrowRight, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface AuthStepProps {
  onComplete: () => void;
}

export const AuthStep = ({ onComplete }: AuthStepProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) {
      setError("Le code doit contenir au moins 6 caractères");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulated validation - in production, this would call the backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Demo: accept any code with 6+ characters
    if (code.length >= 6) {
      setIsValid(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    } else {
      setError("Code invalide ou expiré. Veuillez réessayer.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary mb-4 shadow-elevated">
          <Key className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Authentification</h1>
        <p className="text-muted-foreground">
          Entrez le code unique envoyé par le bot Telegram Omni
        </p>
      </div>

      <Card className="shadow-card border-border">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-lg">Code d'authentification</CardTitle>
          <CardDescription>
            Ce code est unique, temporaire et ne peut être utilisé qu'une seule fois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Entrez votre code"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError("");
                }}
                disabled={isLoading || isValid}
                className={`h-14 text-center text-xl font-mono tracking-wider ${
                  error ? 'border-destructive focus-visible:ring-destructive' : ''
                } ${isValid ? 'border-success focus-visible:ring-success' : ''}`}
                maxLength={12}
              />
              {isValid && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  <CheckCircle2 className="h-6 w-6 text-success" />
                </motion.div>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
              >
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {isValid && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-success bg-success/10 p-3 rounded-lg"
              >
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                <span>Code validé ! Redirection en cours...</span>
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={code.length < 6 || isLoading || isValid}
              className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Vérification...
                </>
              ) : isValid ? (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Validé
                </>
              ) : (
                <>
                  Valider le code
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 rounded-lg bg-accent border border-border">
        <div className="flex gap-3">
          <Send className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Comment obtenir un code ?</p>
            <p className="text-muted-foreground">
              Contactez le bot Telegram <span className="font-mono text-primary">@OmniBot</span> et 
              suivez les instructions pour recevoir votre code d'authentification unique.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
