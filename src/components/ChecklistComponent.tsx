import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Calendar, Users, Heart, Camera, Music, Utensils, Gift } from 'lucide-react';

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

  const filteredItems = selectedCategory === 'Todas' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const completedItems = items.filter(item => item.completed).length;
  const totalItems = items.length;
  const progressPercentage = (completedItems / totalItems) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-800 border-green-200';
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checklist do Casamento</h1>
          <p className="text-gray-600">Organize todas as tarefas do seu planejamento</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Item
        </Button>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Progresso Geral</span>
            <Badge variant="outline">{completedItems}/{totalItems} concluídos</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-gray-600">
              {progressPercentage.toFixed(1)}% do planejamento concluído
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className="text-xs"
          >
            {getCategoryIcon(category)}
            <span className="ml-1">{category}</span>
          </Button>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className={`transition-all duration-200 ${item.completed ? 'opacity-60 bg-green-50' : 'hover:shadow-md'}`}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="w-5 h-5"
                />
                
                <div className="flex-1">
                  <h3 className={`font-medium ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {getCategoryIcon(item.category)}
                      <span className="ml-1">{item.category}</span>
                    </Badge>
                    {item.deadline && (
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {item.deadline}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum item encontrado</h3>
          <p className="text-gray-600">Tente selecionar uma categoria diferente</p>
        </div>
      )}
    </div>
  );
};

export default ChecklistComponent;