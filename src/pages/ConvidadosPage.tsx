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
      icon: <Clock className="w-6 h-6" />,
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
      icon: <MapPin className="w-6 h-6" />,
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
      icon: <Gift className="w-6 h-6" />,
      label: 'Presentes',
      emoji: '🎁',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Lista de Presentes</h3>
          <p className="text-muted-foreground">Sua presença já é o maior presente! Mas se quiser nos presentear:</p>
          <div className="space-y-2">
            <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
              <Gift className="w-4 h-4 mr-2" />
              Lista Casas Bahia
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.open('#', '_blank')}>
              <Gift className="w-4 h-4 mr-2" />
              PIX: casamento@email.com
            </Button>
          </div>
        </div>
      )
    },
    {
      id: 'confirmacao',
      icon: <User className="w-6 h-6" />,
      label: 'RSVP',
      emoji: '📬',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Confirmação de Presença</h3>
          <div className="space-y-3">
            <Input placeholder="Seu nome completo" />
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
      icon: <Music className="w-6 h-6" />,
      label: 'Playlist',
      emoji: '🎵',
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-primary">Playlist do Casamento</h3>
          <p className="text-muted-foreground">Contribua com suas músicas favoritas para nossa festa!</p>
          <Button className="w-full" onClick={() => window.open('https://spotify.com', '_blank')}>
            <Music className="w-4 h-4 mr-2" />
            Abrir Playlist no Spotify
          </Button>
        </div>
      )
    },
    {
      id: 'dresscode',
      icon: <span className="text-lg">👗</span>,
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-center py-8 px-4 bg-gradient-to-b from-wedding-pink-soft to-background">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          Ana & Carlos 💕
        </h1>
        <p className="text-muted-foreground">Bem-vindos à Central dos Convidados!</p>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-1">
            <Button
              variant={activeTab === 'stories' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('stories')}
              className="flex-1"
            >
              📱 Informações
            </Button>
            <Button
              variant={activeTab === 'gallery' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('gallery')}
              className="flex-1"
            >
              📸 Galeria
            </Button>
            <Button
              variant={activeTab === 'messages' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('messages')}
              className="flex-1"
            >
              💌 Mensagens
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-8">
            {/* Stories Navigation - Instagram Style */}
            <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4 py-6">
              {stories.map((story) => (
                <button
                  key={story.id}
                  onClick={() => setSelectedStory(selectedStory === story.id ? '' : story.id)}
                  className="flex-shrink-0 flex flex-col items-center space-y-3 group"
                >
                  {/* Story Circle with Gradient Border */}
                  <div className="relative">
                    <div className={`w-20 h-20 rounded-full p-1 transition-all duration-300 ${
                      selectedStory === story.id 
                        ? 'bg-gradient-to-r from-wedding-pink via-wedding-pink-light to-wedding-pink scale-110' 
                        : 'bg-gradient-to-r from-wedding-pink-soft to-wedding-pink-light group-hover:from-wedding-pink group-hover:to-wedding-pink-light'
                    }`}>
                      <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                        <div className={`text-wedding-dark transition-transform duration-300 ${
                          selectedStory === story.id ? 'scale-110' : 'group-hover:scale-105'
                        }`}>
                          {story.icon}
                        </div>
                      </div>
                    </div>
                    {/* Story Emoji */}
                    <div className="absolute -bottom-1 -right-1 text-lg bg-background rounded-full w-8 h-8 flex items-center justify-center border-2 border-wedding-pink-light">
                      {story.emoji}
                    </div>
                  </div>
                  
                  {/* Story Label */}
                  <span className={`text-sm font-medium transition-colors duration-300 ${
                    selectedStory === story.id 
                      ? 'text-primary font-semibold' 
                      : 'text-muted-foreground group-hover:text-primary'
                  }`}>
                    {story.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Selected Story Content - Full Width Card */}
            {selectedStory && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <Card className="border-0 shadow-elegant bg-gradient-to-br from-background to-wedding-pink-soft/30">
                  <CardContent className="p-8">
                    <div className="max-w-2xl mx-auto">
                      {stories.find(s => s.id === selectedStory)?.content}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Welcome Message when no story selected */}
            {!selectedStory && (
              <div className="text-center py-12 animate-in fade-in duration-700">
                <div className="text-6xl mb-4">💕</div>
                <h3 className="text-2xl font-bold text-primary mb-2">Bem-vindos ao nosso grande dia!</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Toque nos círculos acima para ver todas as informações importantes sobre o nosso casamento
                </p>
                <div className="flex justify-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('gallery')}
                    className="hover:bg-wedding-pink-soft border-wedding-pink"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Ver Galeria
                  </Button>
                  <Button 
                    onClick={() => setActiveTab('messages')}
                    className="bg-wedding-dark hover:bg-wedding-dark/90"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Deixar Mensagem
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-primary mb-2">📸 Galeria de Fotos</h2>
              <p className="text-muted-foreground">Compartilhe e veja os momentos especiais do nosso grande dia!</p>
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
      <footer className="bg-wedding-pink-soft py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Obrigada por fazer parte do nosso grande dia! 🙏
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Baixar Fotos
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConvidadosPage;