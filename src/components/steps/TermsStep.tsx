import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, AlertTriangle, CheckCircle2, FileText, ChevronDown } from "lucide-react";

interface TermsStepProps {
  onComplete: () => void;
}

export const TermsStep = ({ onComplete }: TermsStepProps) => {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
    if (isAtBottom) {
      setHasScrolledToBottom(true);
    }
  };

  const canContinue = hasScrolledToBottom && termsAccepted;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary mb-4 shadow-elevated">
          <FileText className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Bienvenue sur Omni</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Avant de commencer, veuillez lire et accepter les conditions d'utilisation ci-dessous.
        </p>
      </div>

      <Card className="shadow-card border-border">
        <CardHeader className="border-b border-border bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5 text-primary" />
            Conditions d'utilisation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea 
            className="h-[400px] p-6" 
            onScrollCapture={handleScroll}
          >
            <div className="space-y-6 text-sm text-foreground/90 leading-relaxed">
              <section>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">1</span>
                  Présentation du service
                </h3>
                <p className="text-muted-foreground">
                  Omni est un système de gestion de licences logicielles temporaires. L'accès aux fonctionnalités 
                  est soumis à validation par un administrateur via Telegram. Ce service est exclusivement 
                  disponible pour les systèmes Windows, macOS et Linux. Aucun support mobile n'est proposé.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">2</span>
                  Processus d'authentification
                </h3>
                <p className="text-muted-foreground">
                  L'authentification s'effectue exclusivement via un code unique et temporaire envoyé par le 
                  bot Telegram Omni. Ce code ne peut être utilisé qu'une seule fois et expire après un délai 
                  déterminé. Tout partage ou tentative de réutilisation de code est strictement interdit.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">3</span>
                  Attribution des licences
                </h3>
                <p className="text-muted-foreground">
                  Les licences Omni sont personnelles, temporaires et non transférables. Chaque utilisateur 
                  ne peut détenir qu'une seule licence active à la fois. La durée de validité est déterminée 
                  par l'administrateur lors de la validation de la demande.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">4</span>
                  Configuration requise
                </h3>
                <p className="text-muted-foreground">
                  L'utilisateur est responsable de la configuration correcte de son environnement selon 
                  les instructions fournies. Cela inclut le placement du dossier Omni, l'ajout du fichier 
                  de licence et la configuration du proxy réseau si nécessaire.
                </p>
              </section>

              <section>
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
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">5</span>
                  Confidentialité
                </h3>
                <p className="text-muted-foreground">
                  Les informations collectées (nom, prénom, ID Telegram, système d'exploitation) sont 
                  utilisées uniquement pour la gestion des licences et la communication via Telegram. 
                  Ces données ne sont pas partagées avec des tiers.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">6</span>
                  Suspension et résiliation
                </h3>
                <p className="text-muted-foreground">
                  L'administrateur se réserve le droit de suspendre ou révoquer une licence en cas de 
                  non-respect des présentes conditions, d'utilisation abusive, ou de toute autre raison 
                  jugée légitime. Aucun recours ne pourra être exercé en cas de suspension.
                </p>
              </section>

              <div className="pt-8 pb-4 text-center">
                <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">
                  Vous avez lu l'intégralité des conditions d'utilisation.
                </p>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {!hasScrolledToBottom && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm"
        >
          <ChevronDown className="h-4 w-4 animate-bounce" />
          <span>Faites défiler jusqu'en bas pour continuer</span>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hasScrolledToBottom ? 1 : 0.5 }}
        className="mt-6 space-y-4"
      >
        <div 
          className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
            hasScrolledToBottom 
              ? 'border-border bg-card cursor-pointer hover:bg-accent' 
              : 'border-muted bg-muted/30 cursor-not-allowed'
          }`}
          onClick={() => hasScrolledToBottom && setTermsAccepted(!termsAccepted)}
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
        </div>

        <Button
          onClick={onComplete}
          disabled={!canContinue}
          className="w-full h-12 text-base font-medium gradient-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {canContinue ? "Continuer" : "Veuillez lire et accepter les conditions"}
        </Button>
      </motion.div>
    </motion.div>
  );
};
