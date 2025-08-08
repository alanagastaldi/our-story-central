import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorPaletteProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ label, value, onChange }) => {
  const [customColor, setCustomColor] = useState(value);

  // Paletas pré-definidas
  const palettes = {
    sophisticated: {
      name: 'Sofisticado',
      colors: ['#F8F9FA', '#E9ECEF', '#6C757D', '#495057', '#343A40']
    },
    modern: {
      name: 'Moderno',
      colors: ['#FFFFFF', '#F1F3F4', '#4285F4', '#34A853', '#EA4335']
    },
    rustic: {
      name: 'Rústico',
      colors: ['#FFF8E1', '#F4E4BC', '#D4B483', '#8D6E63', '#5D4037']
    },
    romantic: {
      name: 'Romântico',
      colors: ['#FCE4EC', '#F8BBD9', '#E91E63', '#AD1457', '#880E4F']
    },
    elegant: {
      name: 'Elegante',
      colors: ['#F3E5F5', '#CE93D8', '#9C27B0', '#7B1FA2', '#4A148C']
    },
    classic: {
      name: 'Clássico',
      colors: ['#E8F5E8', '#C8E6C9', '#4CAF50', '#388E3C', '#1B5E20']
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium">{label}</Label>
      
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded border-2 border-gray-200 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => {/* Toggle color picker */}}
        />
        <Input
          value={customColor}
          onChange={(e) => setCustomColor(e.target.value)}
          onBlur={() => onChange(customColor)}
          placeholder="#FFFFFF"
          className="flex-1 text-xs"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="w-full text-xs">
            Paletas Predefinidas
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            {Object.entries(palettes).map(([key, palette]) => (
              <div key={key}>
                <Label className="text-xs font-medium mb-2 block">
                  {palette.name}
                </Label>
                <div className="flex gap-1">
                  {palette.colors.map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded border border-gray-200 hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        onChange(color);
                        setCustomColor(color);
                      }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ColorPalette;