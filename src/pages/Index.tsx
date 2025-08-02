import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heart, Share2, Calendar, MapPin } from "lucide-react";
import WeddingStory from "@/components/WeddingStory";
import PhotoGallery from "@/components/PhotoGallery";
import MessageBoard from "@/components/MessageBoard";

const Index = () => {
  const [activeSection, setActiveSection] = useState<string>("inicio");

  const sections = [
    { id: "inicio", label: "Início", emoji: "💕" },
    { id: "fotos", label: "Fotos", emoji: "📸" },
    { id: "mensagens", label: "Mensagens", emoji: "💌" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-wedding-pink-soft to-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-wedding-pink rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-wedding-dark" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Nossa História Central</h1>
                <p className="text-sm text-muted-foreground">Ana & João • 15 Dezembro 2024</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex gap-2 p-1 bg-card rounded-xl border">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveSection(section.id)}
              className="flex-1"
            >
              <span className="mr-2">{section.emoji}</span>
              {section.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {activeSection === "inicio" && (
          <div className="space-y-8">
            {/* Welcome Message */}
            <Card className="border-wedding-pink bg-gradient-to-r from-card to-wedding-pink-soft">
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <span className="text-4xl">💕</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">Bem-vindos à Nossa Central dos Convidados!</h2>
                <p className="text-muted-foreground mb-4">
                  Aqui você encontra tudo sobre o nosso grande dia. 
                  Explore, compartilhe e faça parte desta celebração única!
                </p>
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    15 Dezembro 2024
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    Fazenda Vista Alegre
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stories Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Informações do Evento</h2>
              <WeddingStory />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-wedding-pink-light border-none">
                <CardContent className="p-4 text-center">
                  <span className="text-2xl mb-2 block">⏰</span>
                  <h3 className="font-medium mb-1">Horário</h3>
                  <p className="text-sm text-muted-foreground">Cerimônia às 15h30</p>
                </CardContent>
              </Card>
              <Card className="bg-wedding-pink-light border-none">
                <CardContent className="p-4 text-center">
                  <span className="text-2xl mb-2 block">📍</span>
                  <h3 className="font-medium mb-1">Local</h3>
                  <p className="text-sm text-muted-foreground">Fazenda Vista Alegre</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === "fotos" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Galeria de Fotos 📸</h2>
              <p className="text-muted-foreground">
                Compartilhe suas fotos e vídeos do nosso grande dia!
              </p>
            </div>
            <PhotoGallery />
          </div>
        )}

        {activeSection === "mensagens" && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Mensagens Carinhosas 💌</h2>
              <p className="text-muted-foreground">
                Deixe seus votos de felicidade para os noivos!
              </p>
            </div>
            <MessageBoard />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-6 text-center">
          <div className="space-y-2">
            <p className="font-medium">Obrigada por fazer parte do nosso grande dia! 🙏</p>
            <p className="text-sm text-muted-foreground">
              Com amor, Ana & João 💕
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
