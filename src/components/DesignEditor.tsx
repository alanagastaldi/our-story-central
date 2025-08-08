import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Palette, 
  Type, 
  Upload, 
  RotateCcw, 
  RotateCw, 
  Save, 
  Eye, 
  Settings,
  Undo,
  Redo,
  RefreshCw,
  Send
} from "lucide-react";
import { toast } from "sonner";
import DesignPreview from './DesignPreview';
import ColorPalette from './ColorPalette';
import FontSelector from './FontSelector';
import LayoutControls from './LayoutControls';
import ContentEditor from './ContentEditor';

interface StoryContent {
  id: string;
  icon: string;
  label: string;
  title: string;
  description: string;
  details: {
    [key: string]: string;
  };
  buttons: Array<{
    label: string;
    url: string;
    style: 'primary' | 'outline';
  }>;
}

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
    welcomeMessage: {
      title: string;
      subtitle: string;
      description: string;
    };
    footerText: string;
    tabLabels: {
      info: string;
      gallery: string;
      messages: string;
    };
    stories: StoryContent[];
  };
  layout: {
    headerStyle: 'classic' | 'modern' | 'rustic';
    sectionSpacing: 'compact' | 'normal' | 'spacious';
    buttonStyle: 'rounded' | 'square' | 'pill';
    borderRadius: number;
  };
  images: {
    heroImage: string | null;
    galleryImages: string[];
  };
}

const defaultConfig: DesignConfig = {
  backgroundColor: '#FFFFFF',
  primaryColor: '#D6EAF8',
  secondaryColor: '#4A4A4A',
  fontFamily: 'Inter',
  content: {
    coupleNames: 'Ana & Carlos 💕',
    weddingDate: '15 de Junho, 2024',
    venue: 'Fazenda Vista Alegre',
    description: 'Bem-vindos à Central dos Convidados!',
    welcomeMessage: {
      title: 'Bem-vindos ao nosso grande dia!',
      subtitle: '💕',
      description: 'Toque nos círculos acima para ver todas as informações importantes sobre o nosso casamento'
    },
    footerText: 'Obrigada por fazer parte do nosso grande dia! 🙏',
    tabLabels: {
      info: '📱 Informações',
      gallery: '📸 Galeria',
      messages: '💌 Mensagens'
    },
    stories: [
      {
        id: 'horario',
        icon: '⏰',
        label: 'Horário',
        title: 'Horário da Cerimônia',
        description: '',
        details: {
          'data': '📅 Data: 15 de Junho, 2024',
          'cerimonia': '⏰ Cerimônia: 16h00',
          'festa': '🎉 Festa: 18h00',
          'termino': '🌅 Término: 02h00'
        },
        buttons: []
      },
      {
        id: 'local',
        icon: '📍',
        label: 'Local',
        title: 'Local do Evento',
        description: '',
        details: {
          'nome': 'Fazenda Vista Alegre',
          'endereco': 'Rua das Flores, 123 - Campo Belo, SP'
        },
        buttons: [
          {
            label: 'Ver Rota no Google Maps',
            url: 'https://maps.google.com',
            style: 'primary'
          }
        ]
      },
      {
        id: 'presentes',
        icon: '🎁',
        label: 'Presentes',
        title: 'Lista de Presentes',
        description: 'Sua presença já é o maior presente! Mas se quiser nos presentear:',
        details: {},
        buttons: [
          {
            label: 'Lista Casas Bahia',
            url: '#',
            style: 'outline'
          },
          {
            label: 'PIX: casamento@email.com',
            url: '#',
            style: 'outline'
          }
        ]
      },
      {
        id: 'confirmacao',
        icon: '📬',
        label: 'RSVP',
        title: 'Confirmação de Presença',
        description: '',
        details: {},
        buttons: [
          {
            label: '✅ Vou sim!',
            url: '#',
            style: 'primary'
          },
          {
            label: '❌ Não posso ir',
            url: '#',
            style: 'outline'
          }
        ]
      },
      {
        id: 'playlist',
        icon: '🎵',
        label: 'Playlist',
        title: 'Playlist do Casamento',
        description: 'Contribua com suas músicas favoritas para nossa festa!',
        details: {},
        buttons: [
          {
            label: 'Abrir Playlist no Spotify',
            url: 'https://spotify.com',
            style: 'primary'
          }
        ]
      },
      {
        id: 'dresscode',
        icon: '👗',
        label: 'Dress Code',
        title: 'Dress Code',
        description: '',
        details: {
          'traje': 'Traje Social - Elegante e sofisticado',
          'evitar': '🚫 Evitar: Branco, off-white e tons muito claros',
          'sugestao': '✨ Sugestão: Tons pastéis, navy, burgundy'
        },
        buttons: []
      }
    ]
  },
  layout: {
    headerStyle: 'classic',
    sectionSpacing: 'normal',
    buttonStyle: 'rounded',
    borderRadius: 8
  },
  images: {
    heroImage: null,
    galleryImages: []
  }
};

const DesignEditor = () => {
  const [config, setConfig] = useState<DesignConfig>(defaultConfig);
  const [history, setHistory] = useState<DesignConfig[]>([defaultConfig]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activePanel, setActivePanel] = useState<'visual' | 'content' | 'layout'>('visual');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Histórico de versões
  const saveToHistory = useCallback((newConfig: DesignConfig) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newConfig);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setConfig(newConfig);
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setConfig(history[newIndex]);
      toast.info("Alteração desfeita");
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setConfig(history[newIndex]);
      toast.info("Alteração refeita");
    }
  }, [history, historyIndex]);

  const resetToDefault = useCallback(() => {
    saveToHistory(defaultConfig);
    toast.success("Design resetado para o padrão");
  }, [saveToHistory]);

  // Auto-save
  React.useEffect(() => {
    const autoSave = setTimeout(() => {
      localStorage.setItem('wedding-design-draft', JSON.stringify(config));
    }, 1000);

    return () => clearTimeout(autoSave);
  }, [config]);

  const updateConfig = useCallback((updates: Partial<DesignConfig>) => {
    const newConfig = { ...config, ...updates };
    saveToHistory(newConfig);
  }, [config, saveToHistory]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        updateConfig({
          images: {
            ...config.images,
            heroImage: imageUrl
          }
        });
        toast.success("Imagem carregada com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };

  const publishChanges = () => {
    // Simular publicação
    localStorage.setItem('wedding-design-published', JSON.stringify(config));
    toast.success("Alterações publicadas com sucesso! ✨");
  };

  const previewFinal = () => {
    setIsPreviewMode(true);
    toast.info("Modo prévia ativado - veja como ficará para os convidados");
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header com controles principais */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-white">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-serif font-bold text-black flex items-center gap-2">
            🎨 Editor de Design
          </h1>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={undo}
              disabled={historyIndex === 0}
              title="Desfazer (Ctrl+Z)"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={redo}
              disabled={historyIndex === history.length - 1}
              title="Refazer (Ctrl+Y)"
            >
              <Redo className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefault}
              title="Resetar para padrão"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={previewFinal}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Prévia Final
          </Button>
          <Button
            onClick={publishChanges}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Publicar Alterações
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Painel lateral esquerdo - Controles visuais */}
        <div className="w-80 border-r border-border bg-white overflow-y-auto scrollbar-hide">
          <div className="p-4">
            <div className="flex mb-4">
              <Button
                variant={activePanel === 'visual' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActivePanel('visual')}
                className="flex-1"
              >
                🎨 Visual
              </Button>
              <Button
                variant={activePanel === 'content' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActivePanel('content')}
                className="flex-1"
              >
                ✏️ Conteúdo
              </Button>
              <Button
                variant={activePanel === 'layout' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActivePanel('layout')}
                className="flex-1"
              >
                🖼️ Layout
              </Button>
            </div>

            {activePanel === 'visual' && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      Cores
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ColorPalette
                      label="Cor de Fundo"
                      value={config.backgroundColor}
                      onChange={(color) => updateConfig({ backgroundColor: color })}
                    />
                    <ColorPalette
                      label="Cor Principal"
                      value={config.primaryColor}
                      onChange={(color) => updateConfig({ primaryColor: color })}
                    />
                    <ColorPalette
                      label="Cor Secundária"
                      value={config.secondaryColor}
                      onChange={(color) => updateConfig({ secondaryColor: color })}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Type className="h-4 w-4" />
                      Tipografia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FontSelector
                      value={config.fontFamily}
                      onChange={(font) => updateConfig({ fontFamily: font })}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Imagens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Carregar Imagem Principal
                      </Button>
                      {config.images.heroImage && (
                        <div className="relative">
                          <img
                            src={config.images.heroImage}
                            alt="Preview"
                            className="w-full h-20 object-cover rounded border"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => updateConfig({
                              images: { ...config.images, heroImage: null }
                            })}
                          >
                            ×
                          </Button>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activePanel === 'content' && (
              <ContentEditor
                stories={config.content.stories}
                onChange={(stories) => updateConfig({
                  content: { ...config.content, stories }
                })}
                welcomeMessage={config.content.welcomeMessage}
                onWelcomeChange={(welcome) => updateConfig({
                  content: { ...config.content, welcomeMessage: welcome }
                })}
                footerText={config.content.footerText}
                onFooterChange={(text) => updateConfig({
                  content: { ...config.content, footerText: text }
                })}
                tabLabels={config.content.tabLabels}
                onTabLabelsChange={(labels) => updateConfig({
                  content: { ...config.content, tabLabels: labels }
                })}
              />
            )}

            {activePanel === 'layout' && (
              <LayoutControls
                config={config.layout}
                onChange={(layout) => updateConfig({ layout })}
              />
            )}
          </div>
        </div>

        {/* Área central - Preview */}
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <DesignPreview 
            config={config} 
            isPreviewMode={isPreviewMode}
            onExitPreview={() => setIsPreviewMode(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default DesignEditor;