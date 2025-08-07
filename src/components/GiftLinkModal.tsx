import { useState } from 'react';
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
import { ExternalLink, ShoppingBag } from 'lucide-react';

interface GiftLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (linkData: {
    name: string;
    url: string;
    store: string;
    price: number;
    description?: string;
    category: string;
  }) => void;
}

const stores = [
  { name: 'Amazon', domain: 'amazon.com.br' },
  { name: 'Magalu', domain: 'magazineluiza.com.br' },
  { name: 'Shopee', domain: 'shopee.com.br' },
  { name: 'Mercado Livre', domain: 'mercadolivre.com.br' },
  { name: 'Americanas', domain: 'americanas.com.br' },
  { name: 'Casas Bahia', domain: 'casasbahia.com.br' },
  { name: 'Submarino', domain: 'submarino.com.br' },
  { name: 'Outros', domain: '' },
];

const categories = ['Cozinha', 'Eletrodomésticos', 'Casa de Banho', 'Quarto', 'Sala', 'Decoração', 'Outros'];

const GiftLinkModal = ({ isOpen, onClose, onSave }: GiftLinkModalProps) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [store, setStore] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSave = () => {
    if (!name.trim() || !url.trim() || !store || !price.trim() || !category) return;

    onSave({
      name: name.trim(),
      url: url.trim(),
      store,
      price: parseFloat(price),
      description: description.trim(),
      category,
    });

    handleClose();
  };

  const handleClose = () => {
    setName('');
    setUrl('');
    setStore('');
    setPrice('');
    setDescription('');
    setCategory('');
    onClose();
  };

  const handleUrlChange = (inputUrl: string) => {
    setUrl(inputUrl);
    
    // Auto-detect store from URL
    if (inputUrl) {
      const foundStore = stores.find(s => 
        s.domain && inputUrl.toLowerCase().includes(s.domain)
      );
      if (foundStore) {
        setStore(foundStore.name);
      }
    }
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Adicionar Link Externo
          </DialogTitle>
          <DialogDescription>
            Adicione um link de produto de lojas externas como Amazon, Shopee, Magalu, etc.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* URL */}
          <div className="grid gap-2">
            <Label htmlFor="url">URL do Produto *</Label>
            <Input
              id="url"
              type="url"
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
              placeholder="https://www.amazon.com.br/produto-exemplo"
              className="w-full"
            />
            {url && !isValidUrl(url) && (
              <p className="text-sm text-red-600">Por favor, insira uma URL válida.</p>
            )}
          </div>

          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Jogo de Panelas Tramontina"
              className="w-full"
            />
          </div>

          {/* Store and Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="store">Loja *</Label>
              <Select value={store} onValueChange={setStore}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a loja" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((storeOption) => (
                    <SelectItem key={storeOption.name} value={storeOption.name}>
                      <div className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        {storeOption.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
          </div>

          {/* Category */}
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

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição (Opcional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Adicione detalhes sobre o produto..."
              className="min-h-[80px]"
            />
          </div>

          {/* Preview */}
          {name && url && store && price && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="text-sm font-medium text-muted-foreground mb-2">Preview:</p>
              <div className="bg-white rounded-lg p-3 border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded border">
                    {store}
                  </span>
                </div>
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
                <div className="mt-3">
                  <Button variant="outline" size="sm" disabled>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver na {store}
                  </Button>
                </div>
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
            disabled={!name.trim() || !url.trim() || !store || !price.trim() || !category || !isValidUrl(url)}
            className="bg-wedding-primary hover:bg-wedding-primary/90"
          >
            Adicionar Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GiftLinkModal;