import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Settings, 
  Monitor, 
  Apple, 
  Terminal, 
  FolderOpen, 
  FileKey, 
  Globe, 
  CheckCircle2,
  Copy,
  Check,
  Info
} from "lucide-react";

interface ConfigurationStepProps {
  selectedOs: string;
}

export const ConfigurationStep = ({ selectedOs }: ConfigurationStepProps) => {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  
  // Map OS to tab value
  const getTabValue = () => {
    switch (selectedOs) {
      case "windows": return "windows";
      case "macos": return "macos";
      case "linux": return "linux";
      default: return "windows";
    }
  };

  const copyToClipboard = (text: string, item: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const CodeBlock = ({ code, label }: { code: string; label: string }) => (
    <div className="relative group">
      <pre className="bg-secondary/50 border border-border rounded-lg p-4 text-sm font-mono overflow-x-auto">
        <code className="text-foreground">{code}</code>
      </pre>
      <button
        onClick={() => copyToClipboard(code, label)}
        className="absolute top-2 right-2 p-2 rounded-md bg-background/80 border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent"
        aria-label="Copier"
      >
        {copiedItem === label ? (
          <Check className="h-4 w-4 text-success" />
        ) : (
          <Copy className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
    </div>
  );

  const StepItem = ({ number, title, children }: { number: number; title: string; children: React.ReactNode }) => (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
          {number}
        </div>
      </div>
      <div className="flex-1 space-y-3">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <div className="text-sm text-muted-foreground space-y-3">{children}</div>
      </div>
    </div>
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
          className="inline-flex items-center justify-center h-16 w-16 rounded-2xl gradient-primary mb-4 shadow-elevated"
        >
          <Settings className="h-8 w-8 text-primary-foreground" />
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-3xl font-bold text-foreground mb-2"
        >
          Configuration d'Omni
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-muted-foreground max-w-lg mx-auto"
        >
          Instructions de configuration pour {selectedOs === "windows" ? "Windows" : selectedOs === "macos" ? "macOS" : "Linux"}
        </motion.p>
      </div>

      <Tabs value={getTabValue()} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 h-14">
          <TabsTrigger value="windows" className="flex items-center gap-2 text-base" disabled={selectedOs !== "windows"}>
            <Monitor className="h-4 w-4" />
            Windows
          </TabsTrigger>
          <TabsTrigger value="macos" className="flex items-center gap-2 text-base" disabled={selectedOs !== "macos"}>
            <Apple className="h-4 w-4" />
            macOS
          </TabsTrigger>
          <TabsTrigger value="linux" className="flex items-center gap-2 text-base" disabled={selectedOs !== "linux"}>
            <Terminal className="h-4 w-4" />
            Linux
          </TabsTrigger>
        </TabsList>

        <TabsContent value="windows">
          <Card className="shadow-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Monitor className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Configuration Windows</CardTitle>
                  <CardDescription>Windows 10 / 11 (64-bit)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <StepItem number={1} title="Placement du dossier Omni">
                <p>Téléchargez et extrayez le dossier Omni à l'emplacement suivant :</p>
                <CodeBlock code="C:\Users\VotreNom\AppData\Local\Omni" label="windows-path" />
                <div className="flex items-start gap-2 p-3 bg-accent rounded-lg">
                  <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Vous pouvez accéder rapidement à ce dossier en tapant <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-xs">%LOCALAPPDATA%</code> dans la barre d'adresse de l'Explorateur.
                  </p>
                </div>
              </StepItem>

              <Separator />

              <StepItem number={2} title="Ajout du fichier de licence">
                <p>Placez le fichier de licence reçu par Telegram dans le dossier Omni :</p>
                <CodeBlock code="C:\Users\VotreNom\AppData\Local\Omni\license.key" label="windows-license" />
                <p>Le fichier doit s'appeler exactement <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-xs">license.key</code></p>
              </StepItem>

              <Separator />

              <StepItem number={3} title="Configuration du proxy (si nécessaire)">
                <p>Si votre réseau utilise un proxy, configurez-le dans les paramètres Windows :</p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>Ouvrez <strong>Paramètres</strong> → <strong>Réseau et Internet</strong> → <strong>Proxy</strong></li>
                  <li>Activez "Utiliser un serveur proxy"</li>
                  <li>Entrez l'adresse et le port fournis par votre administrateur réseau</li>
                </ol>
                <CodeBlock code="Adresse : proxy.example.com&#10;Port : 8080" label="windows-proxy" />
              </StepItem>

              <Separator />

              <StepItem number={4} title="Vérification de la connexion">
                <p>Pour vérifier que tout fonctionne correctement :</p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>Ouvrez l'invite de commandes (cmd)</li>
                  <li>Exécutez la commande suivante :</li>
                </ol>
                <CodeBlock code="cd %LOCALAPPDATA%\Omni && omni --verify" label="windows-verify" />
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Si vous voyez "Connection verified", tout est configuré correctement !</span>
                </div>
              </StepItem>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="macos">
          <Card className="shadow-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Apple className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Configuration macOS</CardTitle>
                  <CardDescription>macOS 12+ (Intel / Apple Silicon)</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <StepItem number={1} title="Placement du dossier Omni">
                <p>Téléchargez et extrayez le dossier Omni à l'emplacement suivant :</p>
                <CodeBlock code="~/Library/Application Support/Omni" label="macos-path" />
                <div className="flex items-start gap-2 p-3 bg-accent rounded-lg">
                  <Info className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Dans le Finder, utilisez <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-xs">Cmd + Shift + G</code> et collez le chemin pour y accéder directement.
                  </p>
                </div>
              </StepItem>

              <Separator />

              <StepItem number={2} title="Ajout du fichier de licence">
                <p>Placez le fichier de licence reçu par Telegram dans le dossier Omni :</p>
                <CodeBlock code="~/Library/Application Support/Omni/license.key" label="macos-license" />
                <p>Le fichier doit s'appeler exactement <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-xs">license.key</code></p>
              </StepItem>

              <Separator />

              <StepItem number={3} title="Configuration du proxy (si nécessaire)">
                <p>Si votre réseau utilise un proxy :</p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>Ouvrez <strong>Préférences Système</strong> → <strong>Réseau</strong></li>
                  <li>Sélectionnez votre connexion → <strong>Avancé</strong> → <strong>Proxys</strong></li>
                  <li>Configurez le proxy HTTP/HTTPS selon les informations fournies</li>
                </ol>
                <p className="mt-2">Ou via le Terminal :</p>
                <CodeBlock code="export HTTP_PROXY=http://proxy.example.com:8080&#10;export HTTPS_PROXY=http://proxy.example.com:8080" label="macos-proxy" />
              </StepItem>

              <Separator />

              <StepItem number={4} title="Vérification de la connexion">
                <p>Pour vérifier que tout fonctionne correctement :</p>
                <ol className="list-decimal list-inside space-y-2 pl-2">
                  <li>Ouvrez le Terminal</li>
                  <li>Exécutez les commandes suivantes :</li>
                </ol>
                <CodeBlock code="cd ~/Library/Application\ Support/Omni&#10;./omni --verify" label="macos-verify" />
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Si vous voyez "Connection verified", tout est configuré correctement !</span>
                </div>
              </StepItem>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="linux">
          <Card className="shadow-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Terminal className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Configuration Linux</CardTitle>
                  <CardDescription>Ubuntu 20.04+ / Debian 11+ / Fedora 35+</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <StepItem number={1} title="Placement du dossier Omni">
                <p>Téléchargez et extrayez le dossier Omni à l'emplacement suivant :</p>
                <CodeBlock code="~/.config/omni" label="linux-path" />
                <p className="mt-2">Ou créez le dossier avec les bonnes permissions :</p>
                <CodeBlock code="mkdir -p ~/.config/omni && chmod 700 ~/.config/omni" label="linux-mkdir" />
              </StepItem>

              <Separator />

              <StepItem number={2} title="Ajout du fichier de licence">
                <p>Placez le fichier de licence reçu par Telegram dans le dossier Omni :</p>
                <CodeBlock code="~/.config/omni/license.key" label="linux-license" />
                <p>Assurez-vous que le fichier a les bonnes permissions :</p>
                <CodeBlock code="chmod 600 ~/.config/omni/license.key" label="linux-chmod" />
              </StepItem>

              <Separator />

              <StepItem number={3} title="Configuration du proxy (si nécessaire)">
                <p>Si votre réseau utilise un proxy, ajoutez ces lignes à votre <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-xs">~/.bashrc</code> ou <code className="bg-secondary px-1.5 py-0.5 rounded font-mono text-xs">~/.zshrc</code> :</p>
                <CodeBlock code="export HTTP_PROXY=http://proxy.example.com:8080&#10;export HTTPS_PROXY=http://proxy.example.com:8080&#10;export NO_PROXY=localhost,127.0.0.1" label="linux-proxy" />
                <p className="mt-2">Puis rechargez votre configuration :</p>
                <CodeBlock code="source ~/.bashrc  # ou source ~/.zshrc" label="linux-source" />
              </StepItem>

              <Separator />

              <StepItem number={4} title="Vérification de la connexion">
                <p>Pour vérifier que tout fonctionne correctement :</p>
                <CodeBlock code="cd ~/.config/omni && ./omni --verify" label="linux-verify" />
                <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Si vous voyez "Connection verified", tout est configuré correctement !</span>
                </div>
              </StepItem>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8 shadow-card border-border bg-accent/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Configuration terminée</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Une fois la configuration effectuée et la vérification réussie, Omni est prêt à être utilisé. 
                En cas de problème, contactez le support via le bot Telegram <span className="font-mono text-primary">@OmniBot</span>.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <FolderOpen className="h-3 w-3" />
                  Dossier configuré
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <FileKey className="h-3 w-3" />
                  Licence ajoutée
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Proxy configuré
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
