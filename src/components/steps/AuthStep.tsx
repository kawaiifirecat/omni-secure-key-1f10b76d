import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send, Key, ArrowRight, AlertCircle, CheckCircle2, Loader2, Sparkles } from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-lg mx-auto"
    >
      <motion.div variants={itemVariants} className="text-center mb-8">
        <motion.div 
          className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary mb-4 shadow-elevated"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            delay: 0.3 
          }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
          >
            <Key className="h-8 w-8 text-primary-foreground" />
          </motion.div>
        </motion.div>
        <motion.h1 
          className="text-3xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Authentification
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Entrez le code unique envoyé par le bot Telegram Omni
        </motion.p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="shadow-card border-border overflow-hidden">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-lg flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Code d'authentification
            </CardTitle>
            <CardDescription>
              Ce code est unique, temporaire et ne peut être utilisé qu'une seule fois
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div 
                className="relative"
                whileFocus={{ scale: 1.02 }}
              >
                <Input
                  type="text"
                  placeholder="Entrez votre code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError("");
                  }}
                  disabled={isLoading || isValid}
                  className={`h-14 text-center text-xl font-mono tracking-wider transition-all duration-300 ${
                    error ? 'border-destructive focus-visible:ring-destructive animate-shake' : ''
                  } ${isValid ? 'border-success focus-visible:ring-success bg-success/5' : ''}`}
                  maxLength={12}
                />
                {isValid && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </motion.div>
                )}
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                  </motion.div>
                  <span>{error}</span>
                </motion.div>
              )}

              {isValid && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="flex items-center gap-2 text-sm text-success bg-success/10 p-3 rounded-lg"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: 2 }}
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                  </motion.div>
                  <span>Code validé ! Redirection en cours...</span>
                </motion.div>
              )}

              <motion.div
                whileHover={!isLoading && !isValid && code.length >= 6 ? { scale: 1.02 } : {}}
                whileTap={!isLoading && !isValid && code.length >= 6 ? { scale: 0.98 } : {}}
              >
                <Button
                  type="submit"
                  disabled={code.length < 6 || isLoading || isValid}
                  className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-all relative overflow-hidden"
                >
                  {!isLoading && !isValid && code.length >= 6 && (
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    />
                  )}
                  <span className="relative flex items-center justify-center">
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
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </motion.div>
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-6 p-4 rounded-lg bg-accent border border-border"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <div className="flex gap-3">
          <motion.div
            animate={{ 
              rotate: [0, 15, -15, 0],
              y: [0, -3, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Send className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          </motion.div>
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Comment obtenir un code ?</p>
            <p className="text-muted-foreground">
              Contactez le bot Telegram <span className="font-mono text-primary">@OmniBot</span> et 
              suivez les instructions pour recevoir votre code d'authentification unique.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
