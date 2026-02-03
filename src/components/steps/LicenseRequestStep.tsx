import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileKey, Send, CheckCircle2, MessageSquare, Monitor, Apple, Terminal, ArrowRight, Sparkles, FileText, Mail } from "lucide-react";

interface LicenseRequestStepProps {
  onComplete: (selectedOs: string) => void;
}

// Animation d'envoi de formulaire
const SendingAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative flex flex-col items-center"
      >
        {/* Document qui s'écrit */}
        <motion.div
          className="relative bg-card border border-border rounded-lg p-6 shadow-elevated w-64"
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 0.8, times: [0, 0.5, 1] }}
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <span className="font-semibold text-sm">Demande de licence</span>
          </div>
          
          {/* Lignes de texte qui s'écrivent */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="h-2 bg-muted rounded mb-2"
              initial={{ width: 0 }}
              animate={{ width: `${60 + Math.random() * 30}%` }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            />
          ))}
          
          {/* Signature/Validation */}
          <motion.div
            className="flex items-center gap-2 mt-4 pt-3 border-t border-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span className="text-xs text-success font-medium">Validé</span>
          </motion.div>
        </motion.div>

        {/* Enveloppe qui arrive et récupère le document */}
        <motion.div
          className="absolute"
          initial={{ x: 100, y: 50, opacity: 0, rotate: 10 }}
          animate={{ 
            x: [100, 0, 0, -200],
            y: [50, 0, 0, -100],
            opacity: [0, 1, 1, 0],
            rotate: [10, 0, 0, -10],
            scale: [0.8, 1, 1, 0.6]
          }}
          transition={{ 
            duration: 2.5, 
            delay: 1,
            times: [0, 0.3, 0.7, 1],
            ease: "easeInOut"
          }}
        >
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-4 shadow-glow">
            <Mail className="h-8 w-8 text-primary" />
          </div>
        </motion.div>

        {/* Texte de chargement */}
        <motion.p
          className="mt-8 text-muted-foreground font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Envoi de votre demande...
          </motion.span>
        </motion.p>

        {/* Points de progression */}
        <div className="flex gap-2 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-primary"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const LicenseRequestStep = ({ onComplete }: LicenseRequestStepProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    reason: "",
    os: "",
    duration: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSendingAnimation, setShowSendingAnimation] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = formData.firstName && formData.lastName && formData.reason && formData.os && formData.duration;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsSubmitting(true);
    setShowSendingAnimation(true);

    // Animation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 3500));

    localStorage.setItem("omni-selected-os", formData.os);
    
    setShowSendingAnimation(false);
    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleContinue = () => {
    onComplete(formData.os);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  // Écran de succès
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
          <CheckCircle2 className="h-10 w-10 text-success" />
        </motion.div>
        
        <h1 className="text-3xl font-bold text-foreground mb-3">Demande envoyée !</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Votre demande de licence a été transmise à l'administrateur pour validation.
        </p>

        <Card className="shadow-card border-border mb-6 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground mb-1">Réponse via Telegram</h3>
                <p className="text-sm text-muted-foreground">
                  La réponse à votre demande sera envoyée sur Telegram par le bot Omni.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleContinue}
          className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-all"
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            Continuer vers la configuration
            <ArrowRight className="h-4 w-4" />
          </span>
        </Button>
      </motion.div>
    );
  }

  return (
    <>
      {/* Animation d'envoi plein écran */}
      <AnimatePresence>
        {showSendingAnimation && <SendingAnimation />}
      </AnimatePresence>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        className="w-full max-w-2xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary mb-4 shadow-elevated">
            <FileKey className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Demande de licence</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Remplissez le formulaire ci-dessous pour demander votre licence Omni
          </p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Votre prénom"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Votre nom"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="os">Système d'exploitation</Label>
                  <Select
                    value={formData.os}
                    onValueChange={(value) => setFormData({ ...formData, os: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="os" className="h-11">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Durée souhaitée</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger id="duration" className="h-11">
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Motif de la demande</Label>
                  <Textarea
                    id="reason"
                    placeholder="Décrivez brièvement pourquoi vous avez besoin de cette licence..."
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    disabled={isSubmitting}
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-all"
                >
                  <span className="flex items-center justify-center">
                    <Send className="h-5 w-5 mr-2" />
                    Envoyer la demande
                  </span>
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};
