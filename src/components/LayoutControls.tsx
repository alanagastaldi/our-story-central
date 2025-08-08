import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Layout, Move, Square } from 'lucide-react';

interface LayoutConfig {
  headerStyle: 'classic' | 'modern' | 'rustic';
  sectionSpacing: 'compact' | 'normal' | 'spacious';
  buttonStyle: 'rounded' | 'square' | 'pill';
  borderRadius: number;
}

interface LayoutControlsProps {
  config: LayoutConfig;
  onChange: (config: LayoutConfig) => void;
}

const LayoutControls: React.FC<LayoutControlsProps> = ({ config, onChange }) => {
  const updateConfig = (updates: Partial<LayoutConfig>) => {
    onChange({ ...config, ...updates });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Estilo do Cabeçalho
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={config.headerStyle === 'classic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ headerStyle: 'classic' })}
              className="justify-start"
            >
              Clássico - Tradicional e elegante
            </Button>
            <Button
              variant={config.headerStyle === 'modern' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ headerStyle: 'modern' })}
              className="justify-start"
            >
              Moderno - Minimalista e clean
            </Button>
            <Button
              variant={config.headerStyle === 'rustic' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ headerStyle: 'rustic' })}
              className="justify-start"
            >
              Rústico - Aconchegante e natural
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Move className="h-4 w-4" />
            Espaçamento
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={config.sectionSpacing === 'compact' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ sectionSpacing: 'compact' })}
              className="justify-start"
            >
              Compacto - Menos espaços
            </Button>
            <Button
              variant={config.sectionSpacing === 'normal' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ sectionSpacing: 'normal' })}
              className="justify-start"
            >
              Normal - Equilibrado
            </Button>
            <Button
              variant={config.sectionSpacing === 'spacious' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ sectionSpacing: 'spacious' })}
              className="justify-start"
            >
              Espaçoso - Mais respiro
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Square className="h-4 w-4" />
            Estilo dos Botões
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            <Button
              variant={config.buttonStyle === 'rounded' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ buttonStyle: 'rounded' })}
              className="justify-start rounded-md"
            >
              Arredondado - Padrão
            </Button>
            <Button
              variant={config.buttonStyle === 'square' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ buttonStyle: 'square' })}
              className="justify-start rounded-none"
            >
              Quadrado - Angular
            </Button>
            <Button
              variant={config.buttonStyle === 'pill' ? 'default' : 'outline'}
              size="sm"
              onClick={() => updateConfig({ buttonStyle: 'pill' })}
              className="justify-start rounded-full"
            >
              Pílula - Totalmente arredondado
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Bordas Personalizadas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <Label className="text-xs">Raio das Bordas: {config.borderRadius}px</Label>
            <Slider
              value={[config.borderRadius]}
              onValueChange={(value) => updateConfig({ borderRadius: value[0] })}
              max={50}
              min={0}
              step={1}
              className="mt-2"
            />
          </div>
          <div className="flex justify-center">
            <div
              className="w-16 h-16 bg-gray-200 border-2 border-gray-400 flex items-center justify-center text-xs"
              style={{ borderRadius: `${config.borderRadius}px` }}
            >
              Preview
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">🎨 Dicas de Design</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground space-y-2">
            <p>• Use cores contrastantes para melhor legibilidade</p>
            <p>• Mantenha consistência no estilo escolhido</p>
            <p>• Teste em diferentes dispositivos</p>
            <p>• Menos é mais - evite sobrecarregar</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LayoutControls;