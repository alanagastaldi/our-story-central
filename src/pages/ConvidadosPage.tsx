import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, MapPin, Gift, Music, User, Camera, MessageCircle, Share2, Download } from 'lucide-react';
import PhotoGallery from '@/components/PhotoGallery';
import MessageBoard from '@/components/MessageBoard';

interface StoryItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  emoji: string;
  content: React.ReactNode;
}

const ConvidadosPage = () => {
  const [selectedStory, setSelectedStory] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'stories' | 'gallery' | 'messages'>('stories');

  const stories: StoryItem[] = [
    {
      id: 'horario',
      icon: <span className="text-2xl">⏰</span>,
      label: 'Horário',
      emoji: '⏰',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Horário da Cerimônia</h3>
          <div className="space-y-2">
            <p className="text-muted-foreground">📅 <strong>Data:</strong> 15 de Junho, 2024</p>
            <p className="text-muted-foreground">⏰ <strong>Cerimônia:</strong> 16h00</p>
            <p className="text-muted-foreground">🎉 <strong>Festa:</strong> 18h00</p>
            <p className="text-muted-foreground">🌅 <strong>Término:</strong> 02h00</p>
          </div>
        </div>
      )
    },
    {
      id: 'local',
      icon: <span className="text-2xl">📍</span>,
      label: 'Local',
      emoji: '📍',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Local do Evento</h3>
          <div className="space-y-3">
            <div>
              <p className="font-medium">Fazenda Vista Alegre</p>
              <p className="text-muted-foreground">Rua das Flores, 123 - Campo Belo, SP</p>
            </div>
            <Button className="w-full" onClick={() => window.open('https://maps.google.com', '_blank')}>
              <MapPin className="w-4 h-4 mr-2" />
              Ver Rota no Google Maps
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'presentes',
      icon: <span className="text-2xl">🎁</span>,
      label: 'Lista de Presentes',
      emoji: '🎁',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Lista de Presentes</h3>
          <p className="text-muted-foreground">Sua presença já é o maior presente! Mas se quiser nos presentear:</p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
              <Gift className="w-4 h-4 mr-2" />
              Lista de Presentes
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'confirmacao',
      icon: <span className="text-2xl">📬</span>,
      label: 'Confirmar Presença',
      emoji: '📬',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Confirmação de Presença</h3>
          <div className="space-y-3">
            <Input placeholder="Seu nome completo" />
            <Input placeholder="Seu telefone" type="tel" />
            <Input placeholder="Seu e-mail" type="email" />
            <div className="flex gap-2">
              <Button className="flex-1">✅ Vou sim!</Button>
              <Button variant="outline" className="flex-1">❌ Não posso ir</Button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'playlist',
      icon: <span className="text-2xl">🎵</span>,
      label: 'Playlist',
      emoji: '🎵',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Playlist do Casamento</h3>
          <p className="text-muted-foreground">Entre no clima com a nossa playlist da festa!</p>
          <Button className="w-full" onClick={() => window.open('https://spotify.com', '_blank')}>
            <Music className="w-4 h-4 mr-2" />
            Abrir Playlist no Spotify
          </Button>
        </div>
      )
    },
    {
      id: 'dresscode',
      icon: <span className="text-2xl">👗</span>,
      label: 'Dress Code',
      emoji: '👗',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Dress Code</h3>
          <div className="space-y-3">
            <div className="p-4 bg-wedding-pink-light rounded-lg">
              <p className="font-medium">Traje Social</p>
              <p className="text-sm text-muted-foreground">Elegante e sofisticado</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm"><strong>🚫 Evitar:</strong> Branco, off-white e tons muito claros</p>
              <p className="text-sm"><strong>✨ Sugestão:</strong> Tons pastéis, navy, burgundy</p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-wedding-primary/20 via-wedding-pink/30 to-wedding-accent/20"></div>
        <div className="relative text-center py-16 px-4">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-wedding-primary to-wedding-accent bg-clip-text text-transparent mb-4">
              Ana & Carlos 💕
            </h1>
            <p className="text-lg text-muted-foreground font-medium">Bem-vindos à Central dos Convidados!</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border/50 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-2 py-3">
            <Button
              variant={activeTab === 'stories' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('stories')}
              className={`flex-1 transition-all duration-300 hover-scale ${
                activeTab === 'stories' 
                  ? 'bg-wedding-primary text-white shadow-lg' 
                  : 'hover:bg-wedding-primary/10'
              }`}
            >
              📱 Informações
            </Button>
            <Button
              variant={activeTab === 'gallery' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 transition-all duration-300 hover-scale ${
                activeTab === 'gallery' 
                  ? 'bg-wedding-primary text-white shadow-lg' 
                  : 'hover:bg-wedding-primary/10'
              }`}
            >
              📸 Galeria
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('messages')}
              className={`flex-1 transition-all duration-300 hover-scale ${
                activeTab === 'messages' 
                  ? 'bg-wedding-primary text-white shadow-lg' 
                  : 'hover:bg-wedding-primary/10'
              }`}
            >
              💌 Mensagens
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-8">
            {/* Welcome Message */}
            <div className="flex justify-center">
              <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-elegant rounded-3xl max-w-4xl mx-auto w-full">
                <CardContent className="p-6">
                  <div className="text-center animate-in fade-in duration-700">
                    <h3 className="text-xl font-bold text-primary mb-2">Bem-vindos ao nosso grande dia!</h3>
                    <p className="text-muted-foreground mb-4">
                      Toque nos círculos abaixo para ver todas as informações importantes sobre o nosso casamento
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stories Navigation - Instagram Style Centralizado */}
            <div className="flex justify-center">
              <div className="flex gap-8 overflow-x-auto scrollbar-hide px-4 py-6 max-w-4xl">
                {stories.map((story) => (
                  <button
                    key={story.id}
                    onClick={() => setSelectedStory(selectedStory === story.id ? '' : story.id)}
                    className="flex-shrink-0 flex flex-col items-center space-y-3 group"
                  >
                    {/* Story Circle with Emoji Inside */}
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-full p-1 transition-all duration-300 ${
                        selectedStory === story.id 
                          ? 'bg-white shadow-lg border-2 border-wedding-pink scale-110' 
                          : 'bg-white shadow-md border border-gray-200 group-hover:shadow-lg group-hover:border-wedding-pink'
                      }`}>
                        <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                          {/* Emoji replacing icon */}
                          <div className={`transition-transform duration-300 ${
                            selectedStory === story.id ? 'scale-110' : 'group-hover:scale-105'
                          }`}>
                            {story.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Story Label */}
                    <span className={`text-sm font-medium transition-colors duration-300 text-center min-w-0 ${
                      selectedStory === story.id 
                        ? 'text-primary font-semibold' 
                        : 'text-muted-foreground group-hover:text-primary'
                    }`}>
                      {story.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Story Content - Full Width Card */}
            {selectedStory && (
              <div className="animate-fade-in">
                <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden">
                  <div className="bg-gradient-to-r from-wedding-primary/10 to-wedding-accent/10 p-1">
                    <CardContent className="bg-white rounded-3xl p-8 m-1">
                      <div className="max-w-2xl mx-auto">
                        {stories.find(s => s.id === selectedStory)?.content}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            )}

          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-2">📸 Galeria de Fotos</h2>
              <p className="text-muted-foreground mb-4">Compartilhe e veja os momentos especiais do nosso grande dia!</p>
              
              <div className="bg-wedding-pink-soft p-6 rounded-lg text-left">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Para que ninguém fique pedindo fotos no WhatsApp depois do casamento, criamos esta galeria colaborativa. 
                  Aqui você poderá enviar as fotos e vídeos que registrou durante o casamento. 
                  Assim, todos os convidados terão acesso às memórias desse momento tão especial.
                </p>
              </div>
            </div>
            <PhotoGallery />
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">💌 Mensagens dos Convidados</h2>
              <p className="text-muted-foreground">Deixe uma mensagem carinhosa para os noivos!</p>
            </div>
            <MessageBoard />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative overflow-hidden mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-wedding-primary/10 via-wedding-pink/20 to-wedding-accent/10"></div>
        <div className="relative bg-white/60 backdrop-blur-sm py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="animate-fade-in">
              <p className="text-lg text-muted-foreground mb-6 font-medium">
                Obrigada por fazer parte do nosso grande dia! 🙏
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm" className="hover-scale border-wedding-primary/30 hover:bg-wedding-primary/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
                <Button variant="outline" size="sm" className="hover-scale border-wedding-primary/30 hover:bg-wedding-primary/10">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Fotos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConvidadosPage;