import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  ExternalLink, 
  Edit2, 
  Trash2, 
  Search,
  Eye,
  EyeOff,
  ShoppingCart,
  Gift,
  Link2,
  Package
} from 'lucide-react';
import { cn } from '@/lib/utils';
import GiftCard from './GiftCard';
import GiftModal from './GiftModal';
import GiftLinkModal from './GiftLinkModal';
import { useToast } from '@/hooks/use-toast';

export interface GiftItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  type: 'internal' | 'external';
  externalUrl?: string;
  store?: string;
  purchased: boolean;
  purchasedBy?: string;
  purchasedAt?: string;
  createdAt: string;
}

const initialGifts: GiftItem[] = [
  {
    id: '1',
    name: 'Jogo de Panelas Tramontina',
    description: 'Conjunto completo com 5 peças em alumínio antiaderente',
    price: 299.90,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop',
    category: 'Cozinha',
    type: 'internal',
    purchased: false,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Liquidificador Philips Walita',
    description: 'Liquidificador de alta potência 1000W',
    price: 159.90,
    category: 'Eletrodomésticos',
    type: 'external',
    externalUrl: 'https://amazon.com.br/produto-exemplo',
    store: 'Amazon',
    purchased: true,
    purchasedBy: 'Tia Maria',
    purchasedAt: '2024-01-05',
    createdAt: '2024-01-02',
  },
  {
    id: '3',
    name: 'Conjunto de Toalhas Banho',
    description: 'Kit com 4 toalhas de banho 100% algodão',
    price: 89.90,
    image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c0b050?w=300&h=300&fit=crop',
    category: 'Casa de Banho',
    type: 'internal',
    purchased: false,
    createdAt: '2024-01-03',
  },
];

const categories = ['Todos', 'Cozinha', 'Eletrodomésticos', 'Casa de Banho', 'Quarto', 'Sala'];

const GiftList = () => {
  const [gifts, setGifts] = useState<GiftItem[]>(initialGifts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [editingGift, setEditingGift] = useState<GiftItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [isPublished, setIsPublished] = useState(false);
  const { toast } = useToast();

  const filteredGifts = gifts.filter((gift) => {
    const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gift.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || gift.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCreateGift = () => {
    setEditingGift(null);
    setIsModalOpen(true);
  };

  const handleCreateLink = () => {
    setIsLinkModalOpen(true);
  };

  const handleEditGift = (gift: GiftItem) => {
    setEditingGift(gift);
    setIsModalOpen(true);
  };

  const handleDeleteGift = (giftId: string) => {
    setGifts((gifts) => gifts.filter((gift) => gift.id !== giftId));
    toast({
      title: "Presente removido",
      description: "O presente foi removido da lista com sucesso.",
    });
  };

  const handleSaveGift = (giftData: Omit<GiftItem, 'id' | 'createdAt' | 'purchased' | 'purchasedBy' | 'purchasedAt'>) => {
    if (editingGift) {
      // Edit existing gift
      setGifts((gifts) =>
        gifts.map((gift) =>
          gift.id === editingGift.id
            ? { ...gift, ...giftData }
            : gift
        )
      );
      toast({
        title: "Presente atualizado",
        description: "As informações do presente foram atualizadas.",
      });
    } else {
      // Create new gift
      const newGift: GiftItem = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        purchased: false,
        ...giftData,
      };

      setGifts((gifts) => [...gifts, newGift]);
      toast({
        title: "Presente adicionado",
        description: "O presente foi adicionado à lista com sucesso.",
      });
    }
    setIsModalOpen(false);
  };

  const handleSaveLink = (linkData: { name: string; url: string; store: string; price: number; description?: string; category: string }) => {
    const newGift: GiftItem = {
      id: Date.now().toString(),
      name: linkData.name,
      description: linkData.description,
      price: linkData.price,
      category: linkData.category,
      type: 'external',
      externalUrl: linkData.url,
      store: linkData.store,
      purchased: false,
      createdAt: new Date().toISOString(),
    };

    setGifts((gifts) => [...gifts, newGift]);
    setIsLinkModalOpen(false);
    toast({
      title: "Link adicionado",
      description: "O link externo foi adicionado à lista com sucesso.",
    });
  };

  const handleTogglePurchased = (giftId: string, purchased: boolean, purchasedBy?: string) => {
    setGifts((gifts) =>
      gifts.map((gift) =>
        gift.id === giftId
          ? {
              ...gift,
              purchased,
              purchasedBy: purchased ? purchasedBy : undefined,
              purchasedAt: purchased ? new Date().toISOString() : undefined,
            }
          : gift
      )
    );
  };

  const handlePublish = () => {
    setIsPublished(!isPublished);
    toast({
      title: isPublished ? "Lista despublicada" : "Lista publicada",
      description: isPublished 
        ? "A lista não está mais visível para os convidados." 
        : "A lista agora está visível na Central dos Convidados.",
    });
  };

  const stats = {
    total: gifts.length,
    purchased: gifts.filter(g => g.purchased).length,
    available: gifts.filter(g => !g.purchased).length,
    totalValue: gifts.reduce((sum, gift) => sum + gift.price, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            🎁 Lista de Presentes
            {isPublished && (
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Eye className="h-3 w-3 mr-1" />
                Publicada
              </Badge>
            )}
          </h2>
          <p className="text-muted-foreground mt-1">
            Gerencie sua lista de presentes e links externos
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            onClick={handleCreateLink}
            className="flex items-center gap-2"
          >
            <Link2 className="h-4 w-4" />
            Adicionar Link
          </Button>
          <Button 
            onClick={handleCreateGift}
            className="bg-wedding-primary hover:bg-wedding-primary/90 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Novo Presente
          </Button>
          <Button 
            onClick={handlePublish}
            variant={isPublished ? "outline" : "default"}
            className={cn(
              "flex items-center gap-2",
              !isPublished && "bg-green-600 hover:bg-green-700"
            )}
          >
            {isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {isPublished ? "Despublicar" : "Publicar Lista"}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-lg font-semibold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Comprados</p>
                <p className="text-lg font-semibold">{stats.purchased}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Disponíveis</p>
                <p className="text-lg font-semibold">{stats.available}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <span className="text-green-600">R$</span>
              <div>
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="text-lg font-semibold">
                  {stats.totalValue.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar presentes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Gifts Grid */}
      {filteredGifts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGifts.map((gift) => (
            <GiftCard
              key={gift.id}
              gift={gift}
              onEdit={() => handleEditGift(gift)}
              onDelete={() => handleDeleteGift(gift.id)}
              onTogglePurchased={handleTogglePurchased}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum presente encontrado</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || selectedCategory !== 'Todos' 
                ? 'Tente ajustar os filtros de busca.'
                : 'Comece adicionando presentes à sua lista.'
              }
            </p>
            {!searchTerm && selectedCategory === 'Todos' && (
              <div className="flex gap-2 justify-center">
                <Button onClick={handleCreateGift}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Presente
                </Button>
                <Button variant="outline" onClick={handleCreateLink}>
                  <Link2 className="h-4 w-4 mr-2" />
                  Adicionar Link
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Modals */}
      <GiftModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGift}
        gift={editingGift}
      />

      <GiftLinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        onSave={handleSaveLink}
      />
    </div>
  );
};

export default GiftList;