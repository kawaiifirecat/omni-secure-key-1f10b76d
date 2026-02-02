import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Monitor, 
  Apple, 
  Terminal, 
  Download,
  Play,
  Wifi,
  Shield,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  Home,
  Zap,
  Clock,
  Lock
} from "lucide-react";

interface ConfigurationStepProps {
  selectedOs: string;
  onBackToMenu?: () => void;
}

export const ConfigurationStep = ({ selectedOs, onBackToMenu }: ConfigurationStepProps) => {
  // Map OS to tab value
  const getTabValue = () => {
    switch (selectedOs) {
      case "windows": return "windows";
      case "macos": return "macos";
      case "linux": return "linux";
      default: return "windows";
    }
  };

  const StepItem = ({ number, title, icon: Icon, children }: { number: number; title: string; icon: React.ElementType; children: React.ReactNode }) => (
    <motion.div 
      className="flex gap-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: number * 0.1 }}
    >
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-glow">
          {number}
        </div>
      </div>
      <div className="flex-1 space-y-3">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-primary" />
          <h4 className="font-semibold text-foreground text-lg">{title}</h4>
        </div>
        <div className="text-sm text-muted-foreground space-y-3 pl-7">{children}</div>
      </div>
    </motion.div>
  );

  const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
    <motion.div 
      className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20"
      whileHover={{ scale: 1.02, borderColor: "hsl(var(--primary) / 0.4)" }}
      transition={{ duration: 0.2 }}
    >
      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div>
        <h5 className="font-medium text-foreground text-sm">{title}</h5>
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      </div>
    </motion.div>
  );

  const renderOsContent = (osName: string, osIcon: React.ElementType, osDescription: string) => (
    <Card className="shadow-card border-border card-glow">
      <CardHeader>
        <div className="flex items-center gap-3">
          <motion.div 
            className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {osName === "Windows" && <Monitor className="h-6 w-6 text-primary" />}
            {osName === "macOS" && <Apple className="h-6 w-6 text-primary" />}
            {osName === "Linux" && <Terminal className="h-6 w-6 text-primary" />}
          </motion.div>
          <div>
            <CardTitle className="text-xl">Installation {osName}</CardTitle>
            <CardDescription>{osDescription}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Step 1: Download */}
        <StepItem number={1} title="Téléchargement de la licence" icon={Download}>
          <p>
            Après validation de votre demande par l'administrateur, vous recevrez via Telegram un fichier 
            <code className="mx-1 px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs">OmniLicense.zip</code>
          </p>
          <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg border border-border">
            <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Ce fichier ZIP est <strong>auto-exécutable</strong>. Il contient tout le nécessaire pour installer et configurer Omni automatiquement.
            </p>
          </div>
        </StepItem>

        <Separator className="opacity-50" />

        {/* Step 2: Execute */}
        <StepItem number={2} title="Exécution du fichier" icon={Play}>
          <p>
            Double-cliquez sur le fichier <code className="px-2 py-0.5 rounded bg-primary/10 text-primary font-mono text-xs">OmniLicense.zip</code> pour lancer l'installation.
          </p>
          <div className="space-y-2">
            <p className="font-medium text-foreground">Ce qui se passe automatiquement :</p>
            <ul className="space-y-2 list-none">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Installation des fichiers dans un dossier dédié</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Test de connexion (ping) vers le serveur proxy</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Vérification de la validité de la licence</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                <span>Configuration automatique du proxy dans les paramètres réseau</span>
              </li>
            </ul>
          </div>
          <div className="flex items-start gap-2 p-3 bg-secondary/50 rounded-lg border border-border">
            <Terminal className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm">
              Une fenêtre de terminal s'affiche pendant le processus. Elle se ferme automatiquement après <strong>5 secondes</strong> une fois la configuration terminée.
            </p>
          </div>
        </StepItem>

        <Separator className="opacity-50" />

        {/* Step 3: Automatic features */}
        <StepItem number={3} title="Fonctionnement automatique" icon={Zap}>
          <p className="mb-4">
            Une fois installé, Omni fonctionne de manière totalement <strong>transparente et discrète</strong>. Vous n'avez rien à faire !
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <FeatureCard 
              icon={RefreshCw} 
              title="Vérification au démarrage" 
              description="À chaque redémarrage de votre PC, la licence est automatiquement vérifiée."
            />
            <FeatureCard 
              icon={Wifi} 
              title="Détection réseau" 
              description="À chaque changement de réseau, une nouvelle vérification est effectuée."
            />
            <FeatureCard 
              icon={Lock} 
              title="Mode discret" 
              description="Tout se passe en arrière-plan, aucune intervention requise."
            />
            <FeatureCard 
              icon={Clock} 
              title="Expiration gérée" 
              description="Si la licence expire, vous serez automatiquement notifié."
            />
          </div>
        </StepItem>

        <Separator className="opacity-50" />

        {/* Step 4: License expiration */}
        <StepItem number={4} title="En cas d'expiration de la licence" icon={AlertCircle}>
          <p>
            Si le test de ping échoue car votre licence n'est plus valide (temps écoulé), voici les étapes à suivre :
          </p>
          <ol className="space-y-3 list-none mt-4">
            <li className="flex items-start gap-3 p-3 bg-destructive/5 rounded-lg border border-destructive/20">
              <span className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center text-destructive text-xs font-bold flex-shrink-0">1</span>
              <div>
                <span className="font-medium text-foreground">Retournez sur cette page</span>
                <p className="text-xs text-muted-foreground mt-1">Accédez au menu principal d'Omni</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-warning/5 rounded-lg border border-warning/20">
              <span className="h-6 w-6 rounded-full bg-warning/10 flex items-center justify-center text-warning text-xs font-bold flex-shrink-0">2</span>
              <div>
                <span className="font-medium text-foreground">Faites une nouvelle demande de licence</span>
                <p className="text-xs text-muted-foreground mt-1">Suivez le parcours complet : CGU → Authentification → Demande</p>
              </div>
            </li>
            <li className="flex items-start gap-3 p-3 bg-success/5 rounded-lg border border-success/20">
              <span className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center text-success text-xs font-bold flex-shrink-0">3</span>
              <div>
                <span className="font-medium text-foreground">Exécutez le nouveau fichier reçu</span>
                <p className="text-xs text-muted-foreground mt-1">Le nouveau ZIP remplacera automatiquement l'ancienne configuration</p>
              </div>
            </li>
          </ol>
        </StepItem>
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary mb-4 shadow-glow"
        >
          <Settings className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          Comment utiliser Omni
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-muted-foreground max-w-lg mx-auto"
        >
          Guide d'installation pour {selectedOs === "windows" ? "Windows" : selectedOs === "macos" ? "macOS" : "Linux"}
        </motion.p>
      </div>

      <Tabs value={getTabValue()} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 h-14 bg-secondary/50">
          <TabsTrigger value="windows" className="flex items-center gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={selectedOs !== "windows"}>
            <Monitor className="h-4 w-4" />
            Windows
          </TabsTrigger>
          <TabsTrigger value="macos" className="flex items-center gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={selectedOs !== "macos"}>
            <Apple className="h-4 w-4" />
            macOS
          </TabsTrigger>
          <TabsTrigger value="linux" className="flex items-center gap-2 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground" disabled={selectedOs !== "linux"}>
            <Terminal className="h-4 w-4" />
            Linux
          </TabsTrigger>
        </TabsList>

        <TabsContent value="windows">
          {renderOsContent("Windows", Monitor, "Windows 10 / 11 (64-bit)")}
        </TabsContent>

        <TabsContent value="macos">
          {renderOsContent("macOS", Apple, "macOS 12+ (Intel / Apple Silicon)")}
        </TabsContent>

        <TabsContent value="linux">
          {renderOsContent("Linux", Terminal, "Ubuntu 20.04+ / Debian 11+ / Fedora 35+")}
        </TabsContent>
      </Tabs>

      {onBackToMenu && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="w-full h-12 text-base font-medium border-primary/30 hover:bg-primary/5 hover:border-primary/50 transition-all group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour au menu principal
            <Home className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="mt-8 shadow-card border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <motion.div 
                className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="h-7 w-7 text-primary-foreground" />
              </motion.div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Installation simplifiée</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Omni s'installe en un clic et fonctionne automatiquement. Aucune configuration manuelle n'est nécessaire. 
                  En cas de problème, contactez le support via Telegram <span className="font-mono text-primary">@OmniBot</span>.
                </p>
                <div className="flex flex-wrap gap-2">
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className="flex items-center gap-1 bg-success/10 text-success border-success/20">
                      <Download className="h-3 w-3" />
                      Installation auto
                    </Badge>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className="flex items-center gap-1 bg-primary/10 text-primary border-primary/20">
                      <RefreshCw className="h-3 w-3" />
                      Vérification auto
                    </Badge>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <Badge className="flex items-center gap-1 bg-warning/10 text-warning border-warning/20">
                      <Lock className="h-3 w-3" />
                      Mode discret
                    </Badge>
                  </motion.div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
