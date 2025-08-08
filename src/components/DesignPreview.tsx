import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Clock, MapPin, Gift, Music, User, Camera, MessageCircle } from 'lucide-react';

interface DesignConfig {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  content: {
    coupleNames: string;
    weddingDate: string;
    venue: string;
    description: string;
  };
  layout: {
    headerStyle: 'classic' | 'modern' | 'rustic';
    sectionSpacing: 'compact' | 'normal' | 'spacious';
    buttonStyle: 'rounded' | 'square' | 'pill';
    borderRadius: number;
  };
  images: {
    heroImage: string | null;
  };
}

interface DesignPreviewProps {
  config: DesignConfig;
  isPreviewMode: boolean;
  onExitPreview: () => void;
}

const DesignPreview: React.FC<DesignPreviewProps> = ({ config, isPreviewMode, onExitPreview }) => {
  const stories = [
    { id: 'horario', icon: '⏰', label: 'Horário' },
    { id: 'local', icon: '📍', label: 'Local' },
    { id: 'presentes', icon: '🎁', label: 'Presentes' },
    { id: 'confirmacao', icon: '📬', label: 'RSVP' },
    { id: 'playlist', icon: '🎵', label: 'Playlist' },
    { id: 'dresscode', icon: '👗', label: 'Dress Code' }
  ];

  const getSpacingClass = () => {
    switch (config.layout.sectionSpacing) {
      case 'compact': return 'space-y-4';
      case 'spacious': return 'space-y-12';
      default: return 'space-y-8';
    }
  };

  const getButtonClass = () => {
    const base = "transition-all duration-300";
    switch (config.layout.buttonStyle) {
      case 'square': return `${base} rounded-none`;
      case 'pill': return `${base} rounded-full`;
      default: return `${base} rounded-md`;
    }
  };

  const headerStyleClass = () => {
    switch (config.layout.headerStyle) {
      case 'modern': return 'text-3xl md:text-4xl font-light tracking-wide';
      case 'rustic': return 'text-3xl md:text-4xl font-serif font-bold';
      default: return 'text-3xl md:text-4xl font-bold';
    }
  };

  return (
    <div className="h-full relative">
      {isPreviewMode && (
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="secondary"
            size="sm"
            onClick={onExitPreview}
            className="shadow-lg"
          >
            <X className="h-4 w-4 mr-2" />
            Sair da Prévia
          </Button>
        </div>
      )}

      <div 
        className="h-full overflow-y-auto"
        style={{ 
          backgroundColor: config.backgroundColor,
          fontFamily: config.fontFamily
        }}
      >
        {/* Header */}
        <div 
          className="text-center py-8 px-4"
          style={{
            background: `linear-gradient(to bottom, ${config.primaryColor}, ${config.backgroundColor})`
          }}
        >
          {config.images.heroImage && (
            <div className="mb-6">
              <img
                src={config.images.heroImage}
                alt="Wedding"
                className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
              />
            </div>
          )}
          <h1 
            className={headerStyleClass()}
            style={{ color: config.secondaryColor }}
          >
            {config.content.coupleNames}
          </h1>
          <p 
            className="text-lg mt-2"
            style={{ color: config.secondaryColor, opacity: 0.8 }}
          >
            {config.content.description}
          </p>
          <p 
            className="text-sm mt-1"
            style={{ color: config.secondaryColor, opacity: 0.6 }}
          >
            {config.content.weddingDate} • {config.content.venue}
          </p>
        </div>

        {/* Navigation Tabs */}
        <div 
          className="sticky top-0 backdrop-blur-sm border-b z-10"
          style={{ 
            backgroundColor: `${config.backgroundColor}95`,
            borderColor: config.primaryColor
          }}
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex space-x-1">
              <Button
                className={`flex-1 ${getButtonClass()}`}
                style={{
                  backgroundColor: config.primaryColor,
                  color: config.secondaryColor,
                  borderRadius: `${config.layout.borderRadius}px`
                }}
              >
                📱 Informações
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 ${getButtonClass()}`}
                style={{ 
                  color: config.secondaryColor,
                  borderRadius: `${config.layout.borderRadius}px`
                }}
              >
                📸 Galeria
              </Button>
              <Button
                variant="ghost"
                className={`flex-1 ${getButtonClass()}`}
                style={{ 
                  color: config.secondaryColor,
                  borderRadius: `${config.layout.borderRadius}px`
                }}
              >
                💌 Mensagens
              </Button>
            </div>
          </div>
        </div>

        <div className={`max-w-4xl mx-auto px-4 py-6 ${getSpacingClass()}`}>
          {/* Stories Navigation */}
          <div className="flex justify-center">
            <div className="flex gap-8 overflow-x-auto scrollbar-hide px-4 py-6 max-w-4xl">
              {stories.map((story) => (
                <button
                  key={story.id}
                  className="flex-shrink-0 flex flex-col items-center space-y-3 group cursor-pointer"
                >
                  <div className="relative">
                    <div 
                      className="w-20 h-20 rounded-full p-1 transition-all duration-300 group-hover:scale-105"
                      style={{
                        background: `linear-gradient(to right, ${config.primaryColor}, ${config.primaryColor}90)`
                      }}
                    >
                      <div 
                        className="w-full h-full rounded-full flex items-center justify-center"
                        style={{ backgroundColor: config.backgroundColor }}
                      >
                        <span className="text-2xl">{story.icon}</span>
                      </div>
                    </div>
                  </div>
                  <span 
                    className="text-sm font-medium text-center min-w-0"
                    style={{ color: config.secondaryColor }}
                  >
                    {story.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💕</div>
            <h3 
              className="text-2xl font-bold mb-2"
              style={{ color: config.secondaryColor }}
            >
              Bem-vindos ao nosso grande dia!
            </h3>
            <p 
              className="mb-8 max-w-md mx-auto"
              style={{ color: config.secondaryColor, opacity: 0.7 }}
            >
              Toque nos círculos acima para ver todas as informações importantes sobre o nosso casamento
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                className={getButtonClass()}
                style={{
                  borderColor: config.primaryColor,
                  color: config.secondaryColor,
                  borderRadius: `${config.layout.borderRadius}px`
                }}
              >
                <Camera className="w-4 h-4 mr-2" />
                Ver Galeria
              </Button>
              <Button 
                className={getButtonClass()}
                style={{
                  backgroundColor: config.primaryColor,
                  color: config.secondaryColor,
                  borderRadius: `${config.layout.borderRadius}px`
                }}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Deixar Mensagem
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer 
          className="py-8 mt-12"
          style={{ backgroundColor: `${config.primaryColor}50` }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p 
              className="mb-4"
              style={{ color: config.secondaryColor, opacity: 0.8 }}
            >
              Obrigada por fazer parte do nosso grande dia! 🙏
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                className={getButtonClass()}
                style={{
                  borderColor: config.secondaryColor,
                  color: config.secondaryColor,
                  borderRadius: `${config.layout.borderRadius}px`
                }}
              >
                Compartilhar
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className={getButtonClass()}
                style={{
                  borderColor: config.secondaryColor,
                  color: config.secondaryColor,
                  borderRadius: `${config.layout.borderRadius}px`
                }}
              >
                Baixar Fotos
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DesignPreview;