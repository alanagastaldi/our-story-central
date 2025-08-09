import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, X } from 'lucide-react';

interface AddGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (guest: {
    name: string;
    group: string;
    status: 'confirmed' | 'declined' | 'pending';
    contact: string;
    notes: string;
  }) => void;
}

const groupOptions = [
  'Família da Noiva',
  'Família do Noivo',
  'Amigos da Noiva',
  'Amigos do Noivo',
  'Trabalho',
  'Escola/Faculdade',
  'Vizinhos',
  'Outros'
];

const AddGuestModal: React.FC<AddGuestModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState<{
    name: string;
    group: string;
    status: 'confirmed' | 'declined' | 'pending';
    contact: string;
    notes: string;
  }>({
    name: '',
    group: '',
    status: 'pending',
    contact: '',
    notes: ''
  });
  const [customGroup, setCustomGroup] = useState('');
  const [isCustomGroup, setIsCustomGroup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return;
    }

    const finalGroup = isCustomGroup ? customGroup : formData.group;
    
    onAdd({
      ...formData,
      name: formData.name.trim(),
      group: finalGroup || 'Outros',
      contact: formData.contact.trim(),
      notes: formData.notes.trim()
    });

    // Reset form
    setFormData({
      name: '',
      group: '',
      status: 'pending',
      contact: '',
      notes: ''
    });
    setCustomGroup('');
    setIsCustomGroup(false);
    onClose();
  };

  const handleClose = () => {
    setFormData({
      name: '',
      group: '',
      status: 'pending',
      contact: '',
      notes: ''
    });
    setCustomGroup('');
    setIsCustomGroup(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-white z-50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Adicionar Novo Convidado
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {/* Nome */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Nome Completo *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Digite o nome completo"
                required
                className="mt-1"
              />
            </div>

            {/* Grupo */}
            <div>
              <Label className="text-sm font-medium">Grupo/Família *</Label>
              <div className="mt-1 space-y-2">
                <Select
                  value={isCustomGroup ? 'custom' : formData.group}
                  onValueChange={(value) => {
                    if (value === 'custom') {
                      setIsCustomGroup(true);
                      setFormData({ ...formData, group: '' });
                    } else {
                      setIsCustomGroup(false);
                      setFormData({ ...formData, group: value });
                    }
                  }}
                >
                  <SelectTrigger className="bg-white border border-input">
                    <SelectValue placeholder="Selecione um grupo" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg z-[60] max-h-60 overflow-y-auto">
                    {groupOptions.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                    <SelectItem value="custom">+ Criar novo grupo</SelectItem>
                  </SelectContent>
                </Select>
                
                {isCustomGroup && (
                  <Input
                    value={customGroup}
                    onChange={(e) => setCustomGroup(e.target.value)}
                    placeholder="Digite o nome do novo grupo"
                    className="mt-2"
                  />
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <Label className="text-sm font-medium">Status Inicial</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => 
                  setFormData({ ...formData, status: value as 'confirmed' | 'declined' | 'pending' })
                }
              >
                <SelectTrigger className="mt-1 bg-white border border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-[60]">
                  <SelectItem value="pending">❓ Pendente</SelectItem>
                  <SelectItem value="confirmed">✅ Confirmado</SelectItem>
                  <SelectItem value="declined">❌ Recusado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contato */}
            <div>
              <Label htmlFor="contact" className="text-sm font-medium">
                Contato (E-mail ou Telefone)
              </Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="email@exemplo.com ou (11) 99999-9999"
                className="mt-1"
              />
            </div>

          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!formData.name.trim()}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Convidado
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGuestModal;