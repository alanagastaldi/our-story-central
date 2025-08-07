import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ExternalLink, 
  Edit2, 
  Trash2, 
  Check,
  Package,
  ShoppingCart,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { GiftItem } from './GiftList';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface GiftCardProps {
  gift: GiftItem;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePurchased: (giftId: string, purchased: boolean, purchasedBy?: string) => void;
}

const GiftCard = ({ gift, onEdit, onDelete, onTogglePurchased }: GiftCardProps) => {
  const [showPurchaseForm, setShowPurchaseForm] = useState(false);
  const [purchasedBy, setPurchasedBy] = useState('');

  const handleMarkAsPurchased = () => {
    if (purchasedBy.trim()) {
      onTogglePurchased(gift.id, true, purchasedBy.trim());
      setShowPurchaseForm(false);
      setPurchasedBy('');
    }
  };

  const handleMarkAsAvailable = () => {
    onTogglePurchased(gift.id, false);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-lg",
      gift.purchased && "opacity-75 border-green-200"
    )}>
      <div className="relative">
        {/* Image */}
        <div className="aspect-square bg-gray-100 relative overflow-hidden">
          {gift.image ? (
            <img 
              src={gift.image} 
              alt={gift.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          {/* Purchase status overlay */}
          {gift.purchased && (
            <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
              <div className="bg-white rounded-full p-2">
                <Check className="h-6 w-6 text-green-600" />
              </div>
            </div>
          )}

          {/* Store badge for external links */}
          {gift.type === 'external' && gift.store && (
            <Badge className="absolute top-2 left-2 bg-blue-100 text-blue-800 border-blue-200">
              {gift.store}
            </Badge>
          )}

          {/* Action buttons */}
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            >
              <Edit2 className="h-3 w-3" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white hover:border-red-300"
            >
              <Trash2 className="h-3 w-3 text-red-600" />
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title and Price */}
          <div>
            <h3 className="font-semibold text-sm leading-tight line-clamp-2">{gift.name}</h3>
            <p className="text-lg font-bold text-wedding-primary mt-1">
              {formatPrice(gift.price)}
            </p>
          </div>

          {/* Description */}
          {gift.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {gift.description}
            </p>
          )}

          {/* Category */}
          <Badge variant="secondary" className="text-xs">
            {gift.category}
          </Badge>

          {/* Purchase Status */}
          {gift.purchased ? (
            <div className="space-y-2">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm font-medium text-green-800 flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Comprado por {gift.purchasedBy}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {gift.purchasedAt && new Date(gift.purchasedAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAsAvailable}
                className="w-full text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Marcar como Disponível
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              {showPurchaseForm ? (
                <div className="space-y-2">
                  <Input
                    placeholder="Nome de quem comprou"
                    value={purchasedBy}
                    onChange={(e) => setPurchasedBy(e.target.value)}
                    className="text-sm"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleMarkAsPurchased}
                      disabled={!purchasedBy.trim()}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Confirmar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowPurchaseForm(false);
                        setPurchasedBy('');
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setShowPurchaseForm(true)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Marcar como Comprado
                </Button>
              )}
            </div>
          )}

          {/* External Link */}
          {gift.type === 'external' && gift.externalUrl && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(gift.externalUrl, '_blank')}
              className="w-full"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver na {gift.store}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GiftCard;