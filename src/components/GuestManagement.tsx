import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Users, 
  UserPlus, 
  Upload, 
  Download, 
  Share2, 
  Search, 
  Edit, 
  Trash2,
  Check,
  X,
  HelpCircle,
  Filter
} from 'lucide-react';
import { toast } from "sonner";
import AddGuestModal from './AddGuestModal';

interface Guest {
  id: string;
  name: string;
  group: string;
  status: 'confirmed' | 'declined' | 'pending';
  contact: string;
  notes: string;
}

const mockGuests: Guest[] = [
  {
    id: '1',
    name: 'Maria Silva',
    group: 'Família da Noiva',
    status: 'confirmed',
    contact: 'maria@email.com',
    notes: 'Vegetariana'
  },
  {
    id: '2',
    name: 'João Santos',
    group: 'Amigos do Noivo',
    status: 'pending',
    contact: '(11) 99999-9999',
    notes: ''
  },
  {
    id: '3',
    name: 'Ana Costa',
    group: 'Trabalho',
    status: 'declined',
    contact: 'ana.costa@empresa.com',
    notes: 'Estará viajando'
  },
  {
    id: '4',
    name: 'Pedro Oliveira',
    group: 'Família do Noivo',
    status: 'confirmed',
    contact: 'pedro@email.com',
    notes: 'Vai com esposa'
  },
  {
    id: '5',
    name: 'Carolina Souza',
    group: 'Amigos da Noiva',
    status: 'pending',
    contact: 'carol@email.com',
    notes: ''
  }
];

const GuestManagement = () => {
  const [guests, setGuests] = useState<Guest[]>(mockGuests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'declined' | 'pending'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filtrar convidados
  const filteredGuests = useMemo(() => {
    return guests.filter(guest => {
      const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           guest.group.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || guest.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [guests, searchTerm, statusFilter]);

  // Estatísticas
  const stats = useMemo(() => {
    const total = guests.length;
    const confirmed = guests.filter(g => g.status === 'confirmed').length;
    const declined = guests.filter(g => g.status === 'declined').length;
    const pending = guests.filter(g => g.status === 'pending').length;
    return { total, confirmed, declined, pending };
  }, [guests]);

  const getStatusIcon = (status: Guest['status']) => {
    switch (status) {
      case 'confirmed':
        return <Check className="h-4 w-4 text-green-600" />;
      case 'declined':
        return <X className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <HelpCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: Guest['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">✅ Confirmado</Badge>;
      case 'declined':
        return <Badge className="bg-red-100 text-red-800 border-red-200">❌ Recusado</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">❓ Pendente</Badge>;
    }
  };

  const handleAddGuest = (newGuest: Omit<Guest, 'id'>) => {
    const guest: Guest = {
      ...newGuest,
      id: Date.now().toString()
    };
    setGuests([...guests, guest]);
    toast.success("Convidado adicionado com sucesso!");
  };

  const handleDeleteGuest = (id: string) => {
    setGuests(guests.filter(g => g.id !== id));
    toast.success("Convidado removido com sucesso!");
  };

  const handleImportGuests = () => {
    // Simulação - em produção seria um input file
    toast.info("Funcionalidade de importação será implementada pelo desenvolvedor");
  };

  const handleExportGuests = () => {
    // Simulação - em produção geraria CSV
    toast.info("Funcionalidade de exportação será implementada pelo desenvolvedor");
  };

  const handleShareInvite = () => {
    // Simulação - em produção geraria link público
    navigator.clipboard.writeText("https://casamento.com/convite/ana-carlos");
    toast.success("Link de convite copiado para a área de transferência!");
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-serif font-bold text-black">👥 Gestão de Convidados</h1>
          <p className="text-foreground/70">Gerencie sua lista de convidados e confirmações</p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
              <div className="text-sm text-muted-foreground">Confirmados</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.declined}</div>
              <div className="text-sm text-muted-foreground">Recusados</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-muted-foreground">Pendentes</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Ações */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Adicionar Convidado
              </Button>
              <Button 
                variant="outline" 
                onClick={handleImportGuests}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Importar Lista
              </Button>
              <Button 
                variant="outline" 
                onClick={handleExportGuests}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Exportar Lista
              </Button>
              <Button 
                variant="outline" 
                onClick={handleShareInvite}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Compartilhar Convite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtros Laterais */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filtros
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Busca */}
              <div>
                <label className="text-xs font-medium mb-2 block">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Nome ou grupo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-xs font-medium mb-2 block">Status</label>
                <div className="space-y-2">
                  <Button
                    variant={statusFilter === 'all' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setStatusFilter('all')}
                  >
                    👥 Todos ({stats.total})
                  </Button>
                  <Button
                    variant={statusFilter === 'confirmed' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setStatusFilter('confirmed')}
                  >
                    ✅ Confirmados ({stats.confirmed})
                  </Button>
                  <Button
                    variant={statusFilter === 'declined' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setStatusFilter('declined')}
                  >
                    ❌ Recusados ({stats.declined})
                  </Button>
                  <Button
                    variant={statusFilter === 'pending' ? 'default' : 'ghost'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setStatusFilter('pending')}
                  >
                    ❓ Pendentes ({stats.pending})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Convidados */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">
                Lista de Convidados ({filteredGuests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Grupo/Família</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Contato</TableHead>
                      <TableHead>Observações</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {guest.group}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(guest.status)}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {guest.contact}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-32 truncate">
                          {guest.notes || '-'}
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toast.info("Edição será implementada pelo desenvolvedor")}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteGuest(guest.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredGuests.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhum convidado encontrado</p>
                    <p className="text-sm">Ajuste os filtros ou adicione novos convidados</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para Adicionar Convidado */}
      <AddGuestModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddGuest}
      />
    </div>
  );
};

export default GuestManagement;