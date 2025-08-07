import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Upload, X } from 'lucide-react';
import type { GiftItem } from './GiftList';

interface GiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (gift: Omit<GiftItem, 'id' | 'createdAt' | 'purchased' | 'purchasedBy' | 'purchasedAt'>) => void;
  gift?: GiftItem | null;
}

const categories = ['Cozinha', 'Eletrodomésticos', 'Casa de Banho', 'Quarto', 'Sala', 'Decoração', 'Outros'];

const GiftModal = ({ isOpen, onClose, onSave, gift }: GiftModalProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (gift) {
      setName(gift.name || '');
      setDescription(gift.description || '');
      setPrice(gift.price.toString() || '');
      setImage(gift.image || '');
      setCategory(gift.category || '');
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setImage('');
      setCategory('');
    }
  }, [gift]);

  const handleSave = () => {
    if (!name.trim() || !price.trim() || !category) return;

    onSave({
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      image: image.trim(),
      category,
      type: 'internal',
    });

    handleClose();
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
    setCategory('');
    onClose();
  };

  const handleImageUrlChange = (url: string) => {
    setImage(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {gift ? 'Editar Presente' : 'Novo Presente'}
          </DialogTitle>
          <DialogDescription>
            {gift 
              ? 'Faça as alterações necessárias no presente.' 
              : 'Adicione um novo presente ao catálogo interno.'
            }
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Image Preview */}
          {image && (
            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={image} 
                alt="Preview"
                className="w-full h-full object-cover"
                onError={() => setImage('')}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setImage('')}
                className="absolute top-2 right-2 h-8 w-8 p-0 bg-white/90"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Image URL */}
          <div className="grid gap-2">
            <Label htmlFor="image">URL da Imagem</Label>
            <div className="flex gap-2">
              <Input
                id="image"
                value={image}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                placeholder="https://exemplo.com/imagem.jpg"
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => {
                  // Aqui você pode implementar upload de arquivo futuramente
                  const url = prompt('Cole a URL da imagem:');
                  if (url) handleImageUrlChange(url);
                }}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Cole a URL de uma imagem ou clique no botão para adicionar.
            </p>
          </div>

          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome do Presente *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Jogo de Panelas Tramontina"
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o presente, suas características, cor, tamanho..."
              className="min-h-[80px]"
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0,00"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preview Card */}
          {name && price && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-muted-foreground mb-2">Preview:</p>
              <div className="bg-white rounded-lg p-3 border">
                <h4 className="font-semibold text-sm">{name}</h4>
                <p className="text-lg font-bold text-wedding-primary">
                  {parseFloat(price || '0').toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </p>
                {description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {description}
                  </p>
                )}
                {category && (
                  <span className="inline-block mt-2 px-2 py-1 bg-gray-100 text-xs rounded">
                    {category}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!name.trim() || !price.trim() || !category}
            className="bg-wedding-primary hover:bg-wedding-primary/90"
          >
            {gift ? 'Salvar Alterações' : 'Adicionar Presente'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GiftModal;