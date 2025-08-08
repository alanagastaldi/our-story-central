import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Users, Heart, Camera, Music, Utensils, Gift, Download, Edit3, Trash2, Filter, CheckCircle2, Clock } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  priority: 'alta' | 'media' | 'baixa';
  deadline?: string;
}

const ChecklistComponent = () => {
  const [items, setItems] = useState<ChecklistItem[]>([
    // 12 meses antes
    { id: '1', title: 'Definir data do casamento', completed: false, category: 'Planejamento Inicial', priority: 'alta', deadline: '12 meses antes' },
    { id: '2', title: 'Escolher local da cerimônia', completed: false, category: 'Planejamento Inicial', priority: 'alta', deadline: '12 meses antes' },
    { id: '3', title: 'Escolher local da festa', completed: false, category: 'Planejamento Inicial', priority: 'alta', deadline: '12 meses antes' },
    { id: '4', title: 'Definir orçamento geral', completed: false, category: 'Planejamento Inicial', priority: 'alta', deadline: '12 meses antes' },
    { id: '5', title: 'Fazer lista preliminar de convidados', completed: false, category: 'Convidados', priority: 'media', deadline: '12 meses antes' },
    
    // 10 meses antes
    { id: '6', title: 'Contratar fotógrafo', completed: false, category: 'Fornecedores', priority: 'alta', deadline: '10 meses antes' },
    { id: '7', title: 'Contratar videomaker', completed: false, category: 'Fornecedores', priority: 'media', deadline: '10 meses antes' },
    { id: '8', title: 'Escolher vestido de noiva', completed: false, category: 'Vestuário', priority: 'alta', deadline: '10 meses antes' },
    { id: '9', title: 'Contratar decoração', completed: false, category: 'Fornecedores', priority: 'alta', deadline: '10 meses antes' },
    
    // 8 meses antes
    { id: '10', title: 'Contratar buffet/catering', completed: false, category: 'Gastronomia', priority: 'alta', deadline: '8 meses antes' },
    { id: '11', title: 'Contratar DJ/banda', completed: false, category: 'Entretenimento', priority: 'alta', deadline: '8 meses antes' },
    { id: '12', title: 'Escolher alianças', completed: false, category: 'Joias', priority: 'alta', deadline: '8 meses antes' },
    { id: '13', title: 'Definir madrinhas e padrinhos', completed: false, category: 'Convidados', priority: 'media', deadline: '8 meses antes' },
    
    // 6 meses antes
    { id: '14', title: 'Fazer convites', completed: false, category: 'Convites', priority: 'alta', deadline: '6 meses antes' },
    { id: '15', title: 'Contratar cerimonialista', completed: false, category: 'Fornecedores', priority: 'media', deadline: '6 meses antes' },
    { id: '16', title: 'Reservar lua de mel', completed: false, category: 'Viagem', priority: 'media', deadline: '6 meses antes' },
    { id: '17', title: 'Fazer lista de presentes', completed: false, category: 'Presentes', priority: 'media', deadline: '6 meses antes' },
    
    // 4 meses antes
    { id: '18', title: 'Enviar convites', completed: false, category: 'Convites', priority: 'alta', deadline: '4 meses antes' },
    { id: '19', title: 'Escolher traje do noivo', completed: false, category: 'Vestuário', priority: 'alta', deadline: '4 meses antes' },
    { id: '20', title: 'Fazer prova do bolo', completed: false, category: 'Gastronomia', priority: 'media', deadline: '4 meses antes' },
    
    // 2 meses antes
    { id: '21', title: 'Confirmar número final de convidados', completed: false, category: 'Convidados', priority: 'alta', deadline: '2 meses antes' },
    { id: '22', title: 'Fazer ensaio fotográfico', completed: false, category: 'Fotografia', priority: 'media', deadline: '2 meses antes' },
    { id: '23', title: 'Escolher sapatos e acessórios', completed: false, category: 'Vestuário', priority: 'media', deadline: '2 meses antes' },
    
    // 1 mês antes
    { id: '24', title: 'Última prova do vestido', completed: false, category: 'Vestuário', priority: 'alta', deadline: '1 mês antes' },
    { id: '25', title: 'Confirmar todos os fornecedores', completed: false, category: 'Fornecedores', priority: 'alta', deadline: '1 mês antes' },
    { id: '26', title: 'Fazer cronograma do dia', completed: false, category: 'Organização', priority: 'alta', deadline: '1 mês antes' },
    
    // 1 semana antes
    { id: '27', title: 'Buscar vestido', completed: false, category: 'Vestuário', priority: 'alta', deadline: '1 semana antes' },
    { id: '28', title: 'Fazer unhas', completed: false, category: 'Beleza', priority: 'media', deadline: '1 semana antes' },
    { id: '29', title: 'Organizar kit emergência', completed: false, category: 'Organização', priority: 'media', deadline: '1 semana antes' },
    
    // Dia do casamento
    { id: '30', title: 'Tomar café da manhã', completed: false, category: 'Dia do Casamento', priority: 'alta', deadline: 'Dia do casamento' },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [filterStatus, setFilterStatus] = useState<'todas' | 'concluidas' | 'pendentes'>('todas');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Planejamento Inicial',
    priority: 'media' as 'alta' | 'media' | 'baixa',
    deadline: ''
  });

  const categories = [
    'Todas',
    'Planejamento Inicial',
    'Fornecedores', 
    'Convidados',
    'Vestuário',
    'Gastronomia',
    'Entretenimento',
    'Convites',
    'Organização',
    'Beleza',
    'Dia do Casamento'
  ];

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addNewItem = () => {
    if (!newItem.title.trim()) return;
    
    const item: ChecklistItem = {
      id: Date.now().toString(),
      title: newItem.title,
      completed: false,
      category: newItem.category,
      priority: newItem.priority,
      deadline: newItem.deadline || undefined
    };
    
    setItems([...items, item]);
    setNewItem({ title: '', category: 'Planejamento Inicial', priority: 'media', deadline: '' });
    setIsAddDialogOpen(false);
  };

  const updateItem = () => {
    if (!editingItem || !editingItem.title.trim()) return;
    
    setItems(items.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Checklist do Casamento</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .progress { margin-bottom: 20px; }
            .item { margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
            .completed { background-color: #f0f9ff; }
            .category { font-weight: bold; color: #666; }
            .priority { padding: 2px 8px; border-radius: 4px; font-size: 12px; }
            .alta { background-color: #fee2e2; color: #dc2626; }
            .media { background-color: #fef3c7; color: #d97706; }
            .baixa { background-color: #dcfce7; color: #16a34a; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ Checklist do Casamento</h1>
            <p>Progresso: ${completedItems}/${totalItems} itens concluídos (${progressPercentage.toFixed(1)}%)</p>
          </div>
          ${filteredItems.map(item => `
            <div class="item ${item.completed ? 'completed' : ''}">
              <div>
                <strong>${item.completed ? '✅' : '⬜'} ${item.title}</strong>
                <span class="priority ${item.priority}">${item.priority}</span>
              </div>
              <div class="category">${item.category}${item.deadline ? ` • ${item.deadline}` : ''}</div>
            </div>
          `).join('')}
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  let filteredItems = selectedCategory === 'Todas' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  // Apply status filter
  if (filterStatus === 'concluidas') {
    filteredItems = filteredItems.filter(item => item.completed);
  } else if (filterStatus === 'pendentes') {
    filteredItems = filteredItems.filter(item => !item.completed);
  }

  const completedItems = items.filter(item => item.completed).length;
  const totalItems = items.length;
  const progressPercentage = (completedItems / totalItems) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'media': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'baixa': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Convidados': return <Users className="w-4 h-4" />;
      case 'Fornecedores': return <Heart className="w-4 h-4" />;
      case 'Vestuário': return <Heart className="w-4 h-4" />;
      case 'Gastronomia': return <Utensils className="w-4 h-4" />;
      case 'Entretenimento': return <Music className="w-4 h-4" />;
      case 'Fotografia': return <Camera className="w-4 h-4" />;
      case 'Presentes': return <Gift className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Elegante */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Checklist do Casamento
            </h1>
          </div>
          <p className="text-gray-600 text-lg font-medium">Organize cada detalhe do seu grande dia com amor e cuidado</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-3">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-rose-600">Adicionar Nova Tarefa</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Título da tarefa"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  />
                  <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== 'Todas').map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={newItem.priority} onValueChange={(value: 'alta' | 'media' | 'baixa') => setNewItem({...newItem, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Prazo (ex: 6 meses antes)"
                    value={newItem.deadline}
                    onChange={(e) => setNewItem({...newItem, deadline: e.target.value})}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={addNewItem} className="bg-rose-500 hover:bg-rose-600">
                      Adicionar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              onClick={generatePDF}
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </div>

          {/* Filter Status */}
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'todas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('todas')}
              className={filterStatus === 'todas' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              Todas
            </Button>
            <Button
              variant={filterStatus === 'pendentes' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('pendentes')}
              className={filterStatus === 'pendentes' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              <Clock className="w-3 h-3 mr-1" />
              Pendentes
            </Button>
            <Button
              variant={filterStatus === 'concluidas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('concluidas')}
              className={filterStatus === 'concluidas' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Concluídas
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-white/70 backdrop-blur-sm border-rose-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Progresso Geral
              </span>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {completedItems}/{totalItems} concluídos
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Progress 
                value={progressPercentage} 
                className="h-4 bg-rose-100" 
              />
              <p className="text-gray-700 font-medium text-center">
                🎉 {progressPercentage.toFixed(1)}% do seu sonho já está realizado!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg scale-105' 
                  : 'border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300'
              }`}
            >
              {getCategoryIcon(category)}
              <span className="ml-2">{category}</span>
            </Button>
          ))}
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className={`transition-all duration-500 hover-scale ${
                item.completed 
                  ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 opacity-80' 
                  : 'bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-xl hover:border-rose-200'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="w-5 h-5 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-lg leading-6 ${
                      item.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Badge variant="outline" className="bg-rose-50 border-rose-200 text-rose-700">
                        {getCategoryIcon(item.category)}
                        <span className="ml-1">{item.category}</span>
                      </Badge>
                      
                      {item.deadline && (
                        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.deadline}
                        </Badge>
                      )}
                      
                      <Badge className={`${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingItem(item)}
                          className="text-gray-500 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-rose-600">Editar Tarefa</DialogTitle>
                        </DialogHeader>
                        {editingItem && (
                          <div className="space-y-4">
                            <Input
                              placeholder="Título da tarefa"
                              value={editingItem.title}
                              onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                            />
                            <Select 
                              value={editingItem.category} 
                              onValueChange={(value) => setEditingItem({...editingItem, category: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.filter(cat => cat !== 'Todas').map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select 
                              value={editingItem.priority} 
                              onValueChange={(value: 'alta' | 'media' | 'baixa') => setEditingItem({...editingItem, priority: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Prioridade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alta">Alta</SelectItem>
                                <SelectItem value="media">Média</SelectItem>
                                <SelectItem value="baixa">Baixa</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Prazo (ex: 6 meses antes)"
                              value={editingItem.deadline || ''}
                              onChange={(e) => setEditingItem({...editingItem, deadline: e.target.value})}
                            />
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" onClick={() => setEditingItem(null)}>
                                Cancelar
                              </Button>
                              <Button onClick={updateItem} className="bg-rose-500 hover:bg-rose-600">
                                Salvar
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteItem(item.id)}
                      className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum item encontrado</h3>
            <p className="text-gray-600 mb-6">Tente ajustar os filtros ou adicione uma nova tarefa</p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeira Tarefa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistComponent;