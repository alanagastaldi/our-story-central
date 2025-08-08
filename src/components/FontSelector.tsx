import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from 'lucide-react';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Fontes populares do Google Fonts para casamentos
  const popularFonts = [
    'Inter',
    'Playfair Display',
    'Lora',
    'Montserrat',
    'Cormorant Garamond',
    'Dancing Script',
    'Great Vibes',
    'Libre Baskerville',
    'Crimson Text',
    'Merriweather',
    'Open Sans',
    'Poppins',
    'Raleway',
    'Source Sans Pro',
    'Nunito',
    'Roboto',
    'Oswald',
    'PT Sans',
    'Lato',
    'Ubuntu'
  ];

  const filteredFonts = popularFonts.filter(font =>
    font.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadGoogleFont = (fontName: string) => {
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`;
    
    // Check if font is already loaded
    if (!document.querySelector(`link[href="${fontUrl}"]`)) {
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  };

  useEffect(() => {
    // Load current font
    if (value && value !== 'Inter') {
      loadGoogleFont(value);
    }
  }, [value]);

  const handleFontSelect = (fontName: string) => {
    loadGoogleFont(fontName);
    onChange(fontName);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">Fonte Tipográfica</Label>
      
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="w-full justify-between text-left font-normal"
            style={{ fontFamily: value }}
          >
            {value || 'Selecionar fonte'}
            <Search className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-3">
            <Input
              placeholder="Buscar fontes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-3"
            />
            <ScrollArea className="h-64">
              <div className="space-y-1">
                {filteredFonts.map((font) => (
                  <Button
                    key={font}
                    variant={value === font ? "default" : "ghost"}
                    className="w-full justify-start font-normal"
                    style={{ fontFamily: font }}
                    onClick={() => handleFontSelect(font)}
                    onMouseEnter={() => loadGoogleFont(font)}
                  >
                    {font}
                  </Button>
                ))}
                {filteredFonts.length === 0 && (
                  <div className="text-center text-muted-foreground py-4">
                    Nenhuma fonte encontrada
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>

      {/* Preview text */}
      <div 
        className="p-3 border rounded-md text-center bg-gray-50"
        style={{ fontFamily: value }}
      >
        <div className="text-lg font-semibold">Ana & Carlos</div>
        <div className="text-sm opacity-70">15 de Junho, 2024</div>
      </div>
    </div>
  );
};

export default FontSelector;