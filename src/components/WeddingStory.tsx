import { Clock, MapPin, Gift, Music, Users, MessageSquare, Camera, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface StoryItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  emoji: string;
  content: React.ReactNode;
}

const WeddingStory = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [rsvpName, setRsvpName] = useState("");

  const handleRSVP = (status: 'sim' | 'nao') => {
    if (!rsvpName.trim()) {
      alert("Por favor, informe seu nome primeiro!");
      return;
    }
    
    const message = status === 'sim' 
      ? `Confirmação registrada para: ${rsvpName} ✅` 
      : `${rsvpName} - Não poderá comparecer ❌`;
    
    alert(message);
    setRsvpName("");
  };

  const stories: StoryItem[] = [
    {
      id: "horario",
      icon: <Clock className="w-6 h-6" />,
      label: "Horário",
      emoji: "⏰",
      content: (
        <div className="text-center space-y-3">
          <h3 className="text-xl font-semibold text-primary">Horário da Cerimônia</h3>
          <div className="space-y-2">
            <p className="text-lg font-medium">15h30 - Cerimônia</p>
            <p className="text-lg font-medium">17h00 - Festa</p>
            <p className="text-muted-foreground text-sm">Não se atrase! 💕</p>
          </div>
        </div>
      )
    },
    {
      id: "local",
      icon: <MapPin className="w-6 h-6" />,
      label: "Local",
      emoji: "📍",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-primary">Local do Evento</h3>
          <div className="space-y-2">
            <p className="font-medium">Fazenda Vista Alegre</p>
            <p className="text-sm text-muted-foreground">Rua das Flores, 123</p>
            <p className="text-sm text-muted-foreground">Cidade dos Sonhos</p>
          </div>
          <Button 
            className="w-full"
            onClick={() => window.open('https://maps.google.com', '_blank')}
          >
            Ver Rota no Google Maps
          </Button>
        </div>
      )
    },
    {
      id: "presentes",
      icon: <Gift className="w-6 h-6" />,
      label: "Presentes",
      emoji: "🎁",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-primary">Lista de Presentes</h3>
          <p className="text-sm text-muted-foreground">Sua presença já é o maior presente!</p>
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              Ver Lista Online
            </Button>
            <Button className="w-full" variant="outline">
              PIX dos Noivos
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "playlist",
      icon: <Music className="w-6 h-6" />,
      label: "Música",
      emoji: "🎵",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-primary">Playlist da Festa</h3>
          <p className="text-sm text-muted-foreground">Ouça as músicas que tocarão na festa!</p>
          <Button 
            className="w-full"
            onClick={() => window.open('https://open.spotify.com', '_blank')}
          >
            Abrir no Spotify
          </Button>
        </div>
      )
    },
    {
      id: "rsvp",
      icon: <Users className="w-6 h-6" />,
      label: "Confirmar Presença",
      emoji: "📬",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-primary">Confirmação de Presença</h3>
          <p className="text-sm text-muted-foreground">Por favor, confirme sua presença até 15 dias antes</p>
          
          <div className="space-y-3">
            <div className="text-left">
              <Label htmlFor="rsvp-name" className="text-sm font-medium">
                Nome(s) dos convidados
              </Label>
              <Input
                id="rsvp-name"
                placeholder="Ex: Alana e Matheus"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleRSVP('sim')}
              >
                ✅ Vou comparecer
              </Button>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handleRSVP('nao')}
              >
                ❌ Não poderei comparecer
              </Button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "dresscode",
      icon: <Shirt className="w-6 h-6" />,
      label: "Dress Code",
      emoji: "👗",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-primary">Dress Code</h3>
          <div className="space-y-2">
            <p className="font-medium">Traje: Social/Esporte Fino</p>
            <p className="text-sm text-muted-foreground">Cores a evitar: branco e nude</p>
            <p className="text-sm text-muted-foreground">Use sua roupa mais elegante! ✨</p>
          </div>
        </div>
      )
    },
    {
      id: "convite",
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Convite",
      emoji: "💌",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-primary">Convite Digital</h3>
          <p className="text-sm text-muted-foreground">Baixe ou compartilhe o convite oficial</p>
          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              📱 Baixar Convite
            </Button>
            <Button className="w-full" variant="outline">
              📤 Compartilhar
            </Button>
          </div>
        </div>
      )
    },
    {
      id: "fotos",
      icon: <Camera className="w-6 h-6" />,
      label: "Fotos",
      emoji: "📸",
      content: (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-primary">Galeria de Fotos</h3>
          <p className="text-sm text-muted-foreground">Compartilhe suas fotos do evento!</p>
          <Button className="w-full">
            Ver Galeria Completa
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="w-full">
      {/* Stories Horizontal Scroll */}
      <div className="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center space-y-2 cursor-pointer group"
            onClick={() => setSelectedStory(selectedStory === story.id ? null : story.id)}
          >
            <div className={`
              w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${selectedStory === story.id 
                ? 'border-primary bg-foreground/10 shadow-lg scale-105' 
                : 'border-border bg-card hover:border-foreground hover:scale-105'
              }
            `}>
              <span className="text-2xl">{story.emoji}</span>
            </div>
            <span className="text-xs font-medium text-center max-w-[60px] leading-tight">
              {story.label}
            </span>
          </div>
        ))}
      </div>

      {/* Selected Story Content */}
      {selectedStory && (
        <div className="mt-6 p-6 bg-card rounded-2xl border shadow-lg animate-in slide-in-from-bottom-4 duration-300">
          {stories.find(s => s.id === selectedStory)?.content}
        </div>
      )}
    </div>
  );
};

export default WeddingStory;