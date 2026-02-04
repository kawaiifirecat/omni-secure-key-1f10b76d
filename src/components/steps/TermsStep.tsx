import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, AlertTriangle, CheckCircle2, FileText, ChevronDown, Sparkles } from "lucide-react";

interface TermsStepProps {
  onComplete: () => void;
}

export const TermsStep = ({ onComplete }: TermsStepProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    if (isAtBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const canContinue = hasScrolledToBottom && termsAccepted;

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
      className="w-full max-w-4xl mx-auto px-4 sm:px-0"
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
          <FileText className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        <motion.h1 
          className="text-3xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Bienvenue sur Omni
        </motion.h1>
        <motion.p 
          className="text-muted-foreground max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Avant de commencer, veuillez lire et accepter les conditions d'utilisation ci-dessous.
        </motion.p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Card className="shadow-card border-border overflow-hidden">
          <CardHeader className="border-b border-border bg-muted/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Shield className="h-5 w-5 text-primary" />
              </motion.div>
              Conditions d'utilisation
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea 
              className="h-[400px] p-6" 
              onScrollCapture={handleScroll}
            >
              <div className="space-y-6 text-sm text-foreground/90 leading-relaxed">
                {[
                  { num: "1", title: "Présentation du service", content: "Omni est un système de gestion de licences logicielles temporaires. L'accès aux fonctionnalités est soumis à validation par un administrateur via Telegram. Ce service est exclusivement disponible pour les systèmes Windows, macOS et Linux. Aucun support mobile n'est proposé." },
                  { num: "2", title: "Processus d'authentification", content: "L'authentification s'effectue exclusivement via un code unique et temporaire envoyé par le bot Telegram Omni. Ce code ne peut être utilisé qu'une seule fois et expire après un délai déterminé. Tout partage ou tentative de réutilisation de code est strictement interdit." },
                  { num: "3", title: "Attribution des licences", content: "Les licences Omni sont personnelles, temporaires et non transférables. Chaque utilisateur ne peut détenir qu'une seule licence active à la fois. La durée de validité est déterminée par l'administrateur lors de la validation de la demande." },
                  { num: "4", title: "Configuration requise", content: "L'utilisateur est responsable de la configuration correcte de son environnement selon les instructions fournies. Cela inclut le placement du dossier Omni, l'ajout du fichier de licence et la configuration du proxy réseau si nécessaire." },
                ].map((section, index) => (
                  <motion.section 
                    key={section.num}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">{section.num}</span>
                      {section.title}
                    </h3>
                    <p className="text-muted-foreground">{section.content}</p>
                  </motion.section>
                ))}

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                >
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-warning/20 text-warning text-xs flex items-center justify-center font-bold">!</span>
                    Responsabilités et limitations
                  </h3>
                  <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 text-muted-foreground">
                    <div className="flex gap-3">
                      <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Important</p>
                        <p>
                          Omni ne peut être tenu responsable des erreurs ou dysfonctionnements liés à 
                          l'environnement réseau de l'utilisateur, aux restrictions de l'établissement, 
                          ou à une mauvaise configuration du système. L'utilisateur s'engage à respecter 
                          la charte informatique de son établissement ou réseau.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">5</span>
                    Confidentialité
                  </h3>
                  <p className="text-muted-foreground">
                    Les informations collectées (nom, prénom, ID Telegram, système d'exploitation) sont 
                    utilisées uniquement pour la gestion des licences et la communication via Telegram. 
                    Ces données ne sont pas partagées avec des tiers.
                  </p>
                </motion.section>

                <motion.section
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                >
                  <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">6</span>
                    Suspension et résiliation
                  </h3>
                  <p className="text-muted-foreground">
                    L'administrateur se réserve le droit de suspendre ou révoquer une licence en cas de 
                    non-respect des présentes conditions, d'utilisation abusive, ou de toute autre raison 
                    jugée légitime. Aucun recours ne pourra être exercé en cas de suspension.
                  </p>
                </motion.section>

                <motion.div 
                  className="pt-8 pb-4 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                  </motion.div>
                  <p className="text-muted-foreground text-sm">
                    Vous avez lu l'intégralité des conditions d'utilisation.
                  </p>
                </motion.div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </motion.div>

      {!hasScrolledToBottom && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.div>
          <span>Faites défiler jusqu'en bas pour continuer</span>
        </motion.div>
      )}

      <motion.div
        variants={itemVariants}
        animate={{ opacity: hasScrolledToBottom ? 1 : 0.5 }}
        className="mt-6 space-y-4"
      >
        <motion.div 
          className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-300 ${
            hasScrolledToBottom 
              ? 'border-border bg-card cursor-pointer hover:bg-accent hover:border-primary/30' 
              : 'border-muted bg-muted/30 cursor-not-allowed'
          }`}
          onClick={() => hasScrolledToBottom && setTermsAccepted(!termsAccepted)}
          whileHover={hasScrolledToBottom ? { scale: 1.01 } : {}}
          whileTap={hasScrolledToBottom ? { scale: 0.99 } : {}}
        >
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => hasScrolledToBottom && setTermsAccepted(checked as boolean)}
            disabled={!hasScrolledToBottom}
            className="mt-0.5"
          />
          <label 
            htmlFor="terms" 
            className={`text-sm leading-relaxed ${hasScrolledToBottom ? 'cursor-pointer' : 'cursor-not-allowed text-muted-foreground'}`}
          >
            <span className="font-medium">J'accepte les conditions d'utilisation</span>
            <span className="block text-muted-foreground mt-1">
              Je confirme avoir lu et accepté les conditions ci-dessus, je m'engage à respecter 
              la charte de mon établissement/réseau, et je reconnais que les erreurs liées à 
              l'environnement réseau ne sont pas de la responsabilité d'Omni.
            </span>
          </label>
        </motion.div>

        <motion.div
          whileHover={canContinue ? { scale: 1.02 } : {}}
          whileTap={canContinue ? { scale: 0.98 } : {}}
        >
          <Button
            onClick={onComplete}
            disabled={!canContinue}
            className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
          >
            {canContinue && (
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
              />
            )}
            <span className="relative flex items-center justify-center gap-2">
              {canContinue ? (
                <>
                  <Sparkles className="h-4 w-4" />
                  Continuer
                </>
              ) : (
                "Veuillez lire et accepter les conditions"
              )}
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
