import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileKey, Send, Loader2, CheckCircle2, MessageSquare, Monitor, Apple, Terminal } from "lucide-react";

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

  const getOsIcon = (os: string) => {
    switch (os) {
      case "windows":
        return <Monitor className="h-4 w-4" />;
      case "macos":
        return <Apple className="h-4 w-4" />;
      case "linux":
        return <Terminal className="h-4 w-4" />;
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg mx-auto text-center"
      >
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-success/10 mb-6">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">Demande envoyée !</h1>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Votre demande de licence a été transmise à l'administrateur pour validation.
        </p>

        <Card className="shadow-card border-border mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
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

        <Button
          onClick={handleContinue}
          className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Continuer vers la configuration
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary mb-4 shadow-elevated">
          <FileKey className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Demande de licence</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Remplissez le formulaire ci-dessous pour demander votre licence Omni
        </p>
      </div>

      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Informations de la demande</CardTitle>
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
              className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
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
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
