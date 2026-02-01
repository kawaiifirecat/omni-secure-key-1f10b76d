import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileKey, Send, Loader2, CheckCircle2, MessageSquare, Monitor, Apple, Terminal, ArrowRight, Sparkles } from "lucide-react";

interface LicenseRequestStepProps {
  onComplete: (selectedOs: string) => void;
}

export const LicenseRequestStep = ({ onComplete }: LicenseRequestStepProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    reason: "",
    os: "",
    duration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = formData.firstName && formData.lastName && formData.reason && formData.os && formData.duration;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);

    // Simulated submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Store the selected OS for the configuration step
    localStorage.setItem("omni-selected-os", formData.os);
    
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleContinue = () => {
    onComplete(formData.os);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-full max-w-lg mx-auto text-center"
      >
        <motion.div 
          className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/10 mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: 2 }}
          >
            <CheckCircle2 className="h-10 w-10 text-success" />
          </motion.div>
        </motion.div>
        
        <motion.h1 
          className="text-3xl font-bold text-foreground mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Demande envoyée !
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground mb-8 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Votre demande de licence a été transmise à l'administrateur pour validation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-card border-border mb-6 overflow-hidden">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <motion.div 
                  className="flex-shrink-0"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    y: [0, -3, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                </motion.div>
                <div className="text-left">
                  <h3 className="font-semibold text-foreground mb-1">Réponse via Telegram</h3>
                  <p className="text-sm text-muted-foreground">
                    La réponse à votre demande sera envoyée sur Telegram par le bot Omni. 
                    Ce bot vous fournira toutes les informations nécessaires concernant votre licence.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            onClick={handleContinue}
            className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-all relative overflow-hidden group"
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            />
            <span className="relative flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4" />
              Continuer vers la configuration
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.div>
            </span>
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-2xl mx-auto"
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
          <FileKey className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        <motion.h1 
          className="text-3xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Demande de licence
        </motion.h1>
        <motion.p 
          className="text-muted-foreground max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Remplissez le formulaire ci-dessous pour demander votre licence Omni
        </motion.p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="shadow-card border-border overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Informations de la demande
            </CardTitle>
            <CardDescription>
              Toutes les informations sont obligatoires pour traiter votre demande
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                variants={itemVariants}
              >
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={isSubmitting}
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </motion.div>
                <motion.div 
                  className="space-y-2"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={isSubmitting}
                    className="transition-all duration-300 focus:scale-[1.02]"
                  />
                </motion.div>
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                <Label htmlFor="os">Système d'exploitation</Label>
                <Select
                  value={formData.os}
                  onValueChange={(value) => setFormData({ ...formData, os: value })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="os" className="h-11 transition-all duration-300 hover:border-primary/50">
                    <SelectValue placeholder="Sélectionnez votre OS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="windows">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        Windows
                      </div>
                    </SelectItem>
                    <SelectItem value="macos">
                      <div className="flex items-center gap-2">
                        <Apple className="h-4 w-4" />
                        macOS
                      </div>
                    </SelectItem>
                    <SelectItem value="linux">
                      <div className="flex items-center gap-2">
                        <Terminal className="h-4 w-4" />
                        Linux
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                <Label htmlFor="duration">Durée souhaitée</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  disabled={isSubmitting}
                >
                  <SelectTrigger id="duration" className="h-11 transition-all duration-300 hover:border-primary/50">
                    <SelectValue placeholder="Sélectionnez une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 jours</SelectItem>
                    <SelectItem value="14">14 jours</SelectItem>
                    <SelectItem value="30">30 jours</SelectItem>
                    <SelectItem value="60">60 jours</SelectItem>
                    <SelectItem value="90">90 jours</SelectItem>
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div 
                className="space-y-2"
                variants={itemVariants}
              >
                <Label htmlFor="reason">Motif de la demande</Label>
                <Textarea
                  id="reason"
                  placeholder="Décrivez brièvement pourquoi vous avez besoin de cette licence..."
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  disabled={isSubmitting}
                  rows={4}
                  className="resize-none transition-all duration-300 focus:scale-[1.01]"
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={isFormValid && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={isFormValid && !isSubmitting ? { scale: 0.98 } : {}}
              >
                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-all relative overflow-hidden"
                >
                  {isFormValid && !isSubmitting && (
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      animate={{ x: "200%" }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
                    />
                  )}
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        Envoyer la demande
                      </>
                    )}
                  </span>
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
