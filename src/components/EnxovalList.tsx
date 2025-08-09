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
import { 
  Plus, 
  Download, 
  Edit3, 
  Trash2, 
  Filter, 
  CheckCircle2, 
  Clock,
  Home,
  Bed,
  ShirtIcon,
  ChefHat,
  Sofa,
  Utensils,
  Wrench,
  Sparkles,
  Heart,
  Package
} from 'lucide-react';

interface EnxovalItem {
  id: string;
  name: string;
  completed: boolean;
  category: string;
  notes?: string;
  isCustom?: boolean;
  quantity?: string;
}

const EnxovalList = () => {
  const [items, setItems] = useState<EnxovalItem[]>([
    // Quarto
    { id: '1', name: '4 jogos de lençol (2 verão, 2 inverno)', completed: false, category: '🛏️ Quarto' },
    { id: '2', name: '2 edredons (leve e pesado)', completed: false, category: '🛏️ Quarto' },
    { id: '3', name: '1 cobertor', completed: false, category: '🛏️ Quarto' },
    { id: '4', name: '2 colchas ou cobre-leito', completed: false, category: '🛏️ Quarto' },
    { id: '5', name: '2 protetores de colchão (impermeável é ideal)', completed: false, category: '🛏️ Quarto' },
    { id: '6', name: '4 fronhas extras', completed: false, category: '🛏️ Quarto' },
    { id: '7', name: '2 travesseiros de dormir', completed: false, category: '🛏️ Quarto' },
    { id: '8', name: '2 travesseiros decorativos', completed: false, category: '🛏️ Quarto' },
    { id: '9', name: '1 almofada cervical ou de leitura (opcional)', completed: false, category: '🛏️ Quarto' },
    { id: '10', name: '1 manta para os pés da cama', completed: false, category: '🛏️ Quarto' },
    { id: '11', name: 'Cortina + varão', completed: false, category: '🛏️ Quarto' },
    { id: '12', name: 'Cabides', completed: false, category: '🛏️ Quarto' },
    { id: '13', name: 'Organizadores de gaveta', completed: false, category: '🛏️ Quarto' },
    { id: '14', name: 'Caixas para roupas fora de estação', completed: false, category: '🛏️ Quarto' },
    { id: '15', name: 'Porta-joias ou organizador de bijuterias', completed: false, category: '🛏️ Quarto' },
    { id: '16', name: 'Cestos de roupa suja', completed: false, category: '🛏️ Quarto' },

    // Banheiro
    { id: '17', name: '4 toalhas de banho', completed: false, category: '🚿 Banheiro' },
    { id: '18', name: '4 toalhas de rosto', completed: false, category: '🚿 Banheiro' },
    { id: '19', name: '2 toalhas de piso', completed: false, category: '🚿 Banheiro' },
    { id: '20', name: '2 roupões (opcional)', completed: false, category: '🚿 Banheiro' },
    { id: '21', name: '1 toalha de lavabo', completed: false, category: '🚿 Banheiro' },
    { id: '22', name: 'Lixeira com pedal', completed: false, category: '🚿 Banheiro' },
    { id: '23', name: 'Porta-sabonete líquido', completed: false, category: '🚿 Banheiro' },
    { id: '24', name: 'Porta-escova de dente', completed: false, category: '🚿 Banheiro' },
    { id: '25', name: 'Suporte para papel higiênico', completed: false, category: '🚿 Banheiro' },
    { id: '26', name: 'Suporte para toalhas', completed: false, category: '🚿 Banheiro' },
    { id: '27', name: 'Cortina para box (se necessário)', completed: false, category: '🚿 Banheiro' },
    { id: '28', name: 'Tapetes antiderrapantes', completed: false, category: '🚿 Banheiro' },
    { id: '29', name: 'Espelho de aumento', completed: false, category: '🚿 Banheiro' },
    { id: '30', name: 'Balancinha de banheiro (opcional)', completed: false, category: '🚿 Banheiro' },

    // Lavanderia/Serviço
    { id: '31', name: 'Tábua de passar', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '32', name: 'Ferro ou vaporizador', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '33', name: 'Cesto de roupas limpas', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '34', name: 'Varal de chão', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '35', name: 'Pregadores de roupa', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '36', name: 'Balde multiuso', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '37', name: 'Escova para roupas', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '38', name: 'Rodo', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '39', name: 'Vassoura', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '40', name: 'Pá de lixo', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '41', name: 'Mop/Esfregão', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '42', name: 'Pano de chão (mínimo 5)', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '43', name: 'Panos multiuso', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '44', name: 'Luvas de limpeza', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '45', name: 'Saco para roupas delicadas', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '46', name: 'Sabão líquido ou em pó', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '47', name: 'Amaciante', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '48', name: 'Tira-manchas', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '49', name: 'Desinfetante', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '50', name: 'Água sanitária', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '51', name: 'Álcool 70%', completed: false, category: '👗 Lavanderia/Serviço' },
    { id: '52', name: 'Desengordurante', completed: false, category: '👗 Lavanderia/Serviço' },

    // Cozinha
    { id: '53', name: '1 jogo de panelas completo', completed: false, category: '🍽️ Cozinha' },
    { id: '54', name: '1 frigideira antiaderente', completed: false, category: '🍽️ Cozinha' },
    { id: '55', name: '1 frigideira pequena para ovo', completed: false, category: '🍽️ Cozinha' },
    { id: '56', name: '1 panela de pressão', completed: false, category: '🍽️ Cozinha' },
    { id: '57', name: '1 escorredor de arroz/massas', completed: false, category: '🍽️ Cozinha' },
    { id: '58', name: 'Colher de pau ou silicone', completed: false, category: '🍽️ Cozinha' },
    { id: '59', name: 'Espátula', completed: false, category: '🍽️ Cozinha' },
    { id: '60', name: 'Concha de feijão', completed: false, category: '🍽️ Cozinha' },
    { id: '61', name: 'Pegador de salada', completed: false, category: '🍽️ Cozinha' },
    { id: '62', name: 'Abridor de latas e garrafas', completed: false, category: '🍽️ Cozinha' },
    { id: '63', name: 'Ralador', completed: false, category: '🍽️ Cozinha' },
    { id: '64', name: 'Peneiras (mínimo 2 tamanhos)', completed: false, category: '🍽️ Cozinha' },
    { id: '65', name: 'Tábua de corte (madeira ou silicone)', completed: false, category: '🍽️ Cozinha' },
    { id: '66', name: 'Facas de cozinha (conjunto)', completed: false, category: '🍽️ Cozinha' },
    { id: '67', name: 'Faca de pão', completed: false, category: '🍽️ Cozinha' },
    { id: '68', name: 'Tesoura de cozinha', completed: false, category: '🍽️ Cozinha' },
    { id: '69', name: 'Medidores (colher e copo)', completed: false, category: '🍽️ Cozinha' },
    { id: '70', name: 'Copo medidor', completed: false, category: '🍽️ Cozinha' },
    { id: '71', name: 'Assadeiras (redonda, retangular, forma de bolo)', completed: false, category: '🍽️ Cozinha' },
    { id: '72', name: 'Potes de vidro/plástico com tampa', completed: false, category: '🍽️ Cozinha' },
    { id: '73', name: 'Garrafa térmica', completed: false, category: '🍽️ Cozinha' },
    { id: '74', name: 'Paninhos de prato (mínimo 10)', completed: false, category: '🍽️ Cozinha' },
    { id: '75', name: 'Luva térmica', completed: false, category: '🍽️ Cozinha' },
    { id: '76', name: 'Porta-temperos', completed: false, category: '🍽️ Cozinha' },
    { id: '77', name: 'Escorredor de pratos', completed: false, category: '🍽️ Cozinha' },
    { id: '78', name: 'Lixeira de pia', completed: false, category: '🍽️ Cozinha' },
    { id: '79', name: 'Toalha de mesa', completed: false, category: '🍽️ Cozinha' },
    { id: '80', name: 'Jogo americano', completed: false, category: '🍽️ Cozinha' },
    { id: '81', name: 'Guardanapos de pano ou papel', completed: false, category: '🍽️ Cozinha' },
    { id: '82', name: 'Geladeira', completed: false, category: '🍽️ Cozinha' },
    { id: '83', name: 'Fogão ou cooktop + forno', completed: false, category: '🍽️ Cozinha' },
    { id: '84', name: 'Micro-ondas', completed: false, category: '🍽️ Cozinha' },
    { id: '85', name: 'Liquidificador', completed: false, category: '🍽️ Cozinha' },
    { id: '86', name: 'Batedeira (ou mixer, ou ambos)', completed: false, category: '🍽️ Cozinha' },
    { id: '87', name: 'Sanduicheira/Grill', completed: false, category: '🍽️ Cozinha' },
    { id: '88', name: 'Cafeteira', completed: false, category: '🍽️ Cozinha' },
    { id: '89', name: 'Airfryer', completed: false, category: '🍽️ Cozinha' },
    { id: '90', name: 'Torradeira (opcional)', completed: false, category: '🍽️ Cozinha' },
    { id: '91', name: 'Purificador de água/filtro', completed: false, category: '🍽️ Cozinha' },
    { id: '92', name: '6 pratos rasos', completed: false, category: '🍽️ Cozinha' },
    { id: '93', name: '6 pratos fundos', completed: false, category: '🍽️ Cozinha' },
    { id: '94', name: '6 pratos de sobremesa', completed: false, category: '🍽️ Cozinha' },
    { id: '95', name: '6 copos grandes', completed: false, category: '🍽️ Cozinha' },
    { id: '96', name: '6 copos pequenos', completed: false, category: '🍽️ Cozinha' },
    { id: '97', name: '6 xícaras de café + pires', completed: false, category: '🍽️ Cozinha' },
    { id: '98', name: '6 canecas', completed: false, category: '🍽️ Cozinha' },
    { id: '99', name: 'Talheres (jogo para 6)', completed: false, category: '🍽️ Cozinha' },
    { id: '100', name: 'Conjunto de sobremesa (colherzinha, potinhos)', completed: false, category: '🍽️ Cozinha' },
    { id: '101', name: 'Travessas de servir', completed: false, category: '🍽️ Cozinha' },
    { id: '102', name: 'Jarra de suco', completed: false, category: '🍽️ Cozinha' },
    { id: '103', name: 'Saleiro/pimenteiro', completed: false, category: '🍽️ Cozinha' },

    // Sala
    { id: '104', name: 'Sofá', completed: false, category: '🛋️ Sala' },
    { id: '105', name: 'Tapete', completed: false, category: '🛋️ Sala' },
    { id: '106', name: 'Mesa de centro ou lateral', completed: false, category: '🛋️ Sala' },
    { id: '107', name: 'Rack ou painel', completed: false, category: '🛋️ Sala' },
    { id: '108', name: 'Cortina + varão', completed: false, category: '🛋️ Sala' },
    { id: '109', name: 'Almofadas decorativas', completed: false, category: '🛋️ Sala' },
    { id: '110', name: 'Manta para sofá', completed: false, category: '🛋️ Sala' },
    { id: '111', name: 'Abajur ou luminária', completed: false, category: '🛋️ Sala' },
    { id: '112', name: 'Velas aromáticas ou difusor', completed: false, category: '🛋️ Sala' },
    { id: '113', name: 'Quadro ou decoração de parede', completed: false, category: '🛋️ Sala' },
    { id: '114', name: 'Revisteiro (opcional)', completed: false, category: '🛋️ Sala' },

    // Sala de Jantar
    { id: '115', name: 'Mesa + cadeiras', completed: false, category: '🍷 Sala de Jantar' },
    { id: '116', name: 'Centro de mesa', completed: false, category: '🍷 Sala de Jantar' },
    { id: '117', name: 'Louças e talheres para ocasiões especiais', completed: false, category: '🍷 Sala de Jantar' },
    { id: '118', name: 'Sousplats', completed: false, category: '🍷 Sala de Jantar' },
    { id: '119', name: 'Jogo de taças (vinho, água, espumante)', completed: false, category: '🍷 Sala de Jantar' },
    { id: '120', name: 'Porta-guardanapos', completed: false, category: '🍷 Sala de Jantar' },
    { id: '121', name: 'Balde de gelo', completed: false, category: '🍷 Sala de Jantar' },

    // Ferramentas
    { id: '122', name: 'Furadeira', completed: false, category: '🧰 Ferramentas' },
    { id: '123', name: 'Martelo', completed: false, category: '🧰 Ferramentas' },
    { id: '124', name: 'Chave de fenda e Philips', completed: false, category: '🧰 Ferramentas' },
    { id: '125', name: 'Fita isolante', completed: false, category: '🧰 Ferramentas' },
    { id: '126', name: 'Extensão elétrica', completed: false, category: '🧰 Ferramentas' },
    { id: '127', name: 'Filtro de linha', completed: false, category: '🧰 Ferramentas' },
    { id: '128', name: 'Lâmpadas extras', completed: false, category: '🧰 Ferramentas' },
    { id: '129', name: 'Vela + fósforo/isqueiro', completed: false, category: '🧰 Ferramentas' },
    { id: '130', name: 'Pilhas', completed: false, category: '🧰 Ferramentas' },
    { id: '131', name: 'Lanternas', completed: false, category: '🧰 Ferramentas' },
    { id: '132', name: 'Fita dupla face', completed: false, category: '🧰 Ferramentas' },
    { id: '133', name: 'Trena', completed: false, category: '🧰 Ferramentas' },
    { id: '134', name: 'Caixa de ferramentas (mínimo com kit básico)', completed: false, category: '🧰 Ferramentas' },

    // Limpeza Geral
    { id: '135', name: 'Balde', completed: false, category: '🧹 Limpeza Geral' },
    { id: '136', name: 'Borrifadores', completed: false, category: '🧹 Limpeza Geral' },
    { id: '137', name: 'Escova de vaso', completed: false, category: '🧹 Limpeza Geral' },
    { id: '138', name: 'Desentupidor', completed: false, category: '🧹 Limpeza Geral' },
    { id: '139', name: 'Sabão neutro', completed: false, category: '🧹 Limpeza Geral' },
    { id: '140', name: 'Saponáceo', completed: false, category: '🧹 Limpeza Geral' },
    { id: '141', name: 'Esponjas de louça', completed: false, category: '🧹 Limpeza Geral' },
    { id: '142', name: 'Esponja abrasiva', completed: false, category: '🧹 Limpeza Geral' },
    { id: '143', name: 'Paninhos de microfibra', completed: false, category: '🧹 Limpeza Geral' },
    { id: '144', name: 'Organizadores de produtos', completed: false, category: '🧹 Limpeza Geral' },
    { id: '145', name: 'Difusores de ambiente', completed: false, category: '🧹 Limpeza Geral' },

    // Pet
    { id: '146', name: 'Comedouro e bebedouro', completed: false, category: '🐶 Pet' },
    { id: '147', name: 'Caminha ou colchonete', completed: false, category: '🐶 Pet' },
    { id: '148', name: 'Caixa de transporte', completed: false, category: '🐶 Pet' },
    { id: '149', name: 'Tapete higiênico ou caixa de areia', completed: false, category: '🐶 Pet' },
    { id: '150', name: 'Escova/pente', completed: false, category: '🐶 Pet' },
    { id: '151', name: 'Shampoo', completed: false, category: '🐶 Pet' },
    { id: '152', name: 'Brinquedos', completed: false, category: '🐶 Pet' },
    { id: '153', name: 'Ração e petiscos', completed: false, category: '🐶 Pet' },
    { id: '154', name: 'Kit de primeiros socorros para pet', completed: false, category: '🐶 Pet' },

    // Kit Primeiros Socorros
    { id: '155', name: 'Termômetro', completed: false, category: '💊 Kit Primeiros Socorros' },
    { id: '156', name: 'Algodão', completed: false, category: '💊 Kit Primeiros Socorros' },
    { id: '157', name: 'Band-aids', completed: false, category: '💊 Kit Primeiros Socorros' },
    { id: '158', name: 'Antisséptico', completed: false, category: '💊 Kit Primeiros Socorros' },
    { id: '159', name: 'Soro fisiológico', completed: false, category: '💊 Kit Primeiros Socorros' },
    { id: '160', name: 'Remédio para dor', completed: false, category: '💊 Kit Primeiros Socorros' },
    { id: '161', name: 'Tesourinha', completed: false, category: '💊 Kit Primeiros Socorros' },
    { id: '162', name: 'Gaze', completed: false, category: '💊 Kit Primeiros Socorros' },
    { id: '163', name: 'Pomada para queimaduras', completed: false, category: '💊 Kit Primeiros Socorros' },
    { id: '164', name: 'Termômetro digital', completed: false, category: '💊 Kit Primeiros Socorros' },

    // Extras
    { id: '165', name: 'Extensões de tomada', completed: false, category: '📦 Extras' },
    { id: '166', name: 'Filtro de linha', completed: false, category: '📦 Extras' },
    { id: '167', name: 'Relógio de parede', completed: false, category: '📦 Extras' },
    { id: '168', name: 'Porta-chaves', completed: false, category: '📦 Extras' },
    { id: '169', name: 'Porta-cartas', completed: false, category: '📦 Extras' },
    { id: '170', name: 'Lixeira maior para a cozinha', completed: false, category: '📦 Extras' },
    { id: '171', name: 'Protetores de móveis/pés', completed: false, category: '📦 Extras' },
    { id: '172', name: 'Cabideiros ou araras', completed: false, category: '📦 Extras' },
    { id: '173', name: 'Porta-documentos', completed: false, category: '📦 Extras' },
    { id: '174', name: 'Suporte para papel toalha e alumínio', completed: false, category: '📦 Extras' },
    { id: '175', name: 'Roupão ou pijama confortável para casa nova', completed: false, category: '📦 Extras' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState<{name: string, category: string, notes: string}>({ name: '', category: '', notes: '' });
  const [editingItem, setEditingItem] = useState<EnxovalItem | null>(null);

  const categories = [
    '🛏️ Quarto',
    '🚿 Banheiro', 
    '👗 Lavanderia/Serviço',
    '🍽️ Cozinha',
    '🛋️ Sala',
    '🍷 Sala de Jantar',
    '🧰 Ferramentas',
    '🧹 Limpeza Geral',
    '🐶 Pet',
    '💊 Kit Primeiros Socorros',
    '📦 Extras'
  ];

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addNewItem = () => {
    if (!newItem.name.trim() || !newItem.category) return;
    
    const item: EnxovalItem = {
      id: Date.now().toString(),
      name: newItem.name,
      completed: false,
      category: newItem.category,
      notes: newItem.notes || undefined,
      isCustom: true
    };

    setItems([...items, item]);
    setNewItem({ name: '', category: '', notes: '' });
    setIsAddDialogOpen(false);
  };

  const updateItem = (updatedItem: EnxovalItem) => {
    setItems(items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const generatePDF = () => {
    const printContent = `
      <html>
        <head><title>Lista de Enxoval</title></head>
        <body>
          <h1>🏡 LISTA DE ENXOVAL</h1>
          ${categories.map(category => {
            const categoryItems = items.filter(item => item.category === category);
            return `
              <h2>${category}</h2>
              <ul>
                ${categoryItems.map(item => `
                  <li style="${item.completed ? 'text-decoration: line-through;' : ''}">
                    ${item.completed ? '✅' : '☐'} ${item.name}
                    ${item.notes ? ` - ${item.notes}` : ''}
                  </li>
                `).join('')}
              </ul>
            `;
          }).join('')}
        </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(printContent);
      newWindow.document.close();
      newWindow.print();
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'completed' && item.completed) ||
      (filterStatus === 'pending' && !item.completed);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getCompletedCount = () => items.filter(item => item.completed).length;
  const getTotalCount = () => items.length;
  const getProgressPercentage = () => {
    const total = getTotalCount();
    return total > 0 ? Math.round((getCompletedCount() / total) * 100) : 0;
  };

  const getCategoryStats = (category: string) => {
    const categoryItems = items.filter(item => item.category === category);
    const completed = categoryItems.filter(item => item.completed).length;
    return { completed, total: categoryItems.length };
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">🏡 Lista de Enxoval</CardTitle>
          <p className="text-muted-foreground">
            Organize tudo que você precisa para sua casa nova
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso Geral</span>
              <span>{getCompletedCount()} de {getTotalCount()} itens</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-3" />
            <div className="text-center text-sm text-muted-foreground">
              {getProgressPercentage()}% concluído
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                placeholder="🔍 Buscar itens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Item
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Item</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Nome do item"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    />
                    <Select 
                      value={newItem.category} 
                      onValueChange={(value) => setNewItem({...newItem, category: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Textarea
                      placeholder="Observações (opcional)"
                      value={newItem.notes}
                      onChange={(e) => setNewItem({...newItem, notes: e.target.value})}
                    />
                    <Button onClick={addNewItem} className="w-full">
                      Adicionar Item
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button variant="outline" onClick={generatePDF}>
                <Download className="h-4 w-4 mr-2" />
                Baixar PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{getCompletedCount()}</div>
              <div className="text-sm text-muted-foreground">Itens Concluídos</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{getTotalCount() - getCompletedCount()}</div>
              <div className="text-sm text-muted-foreground">Itens Pendentes</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getProgressPercentage()}%</div>
              <div className="text-sm text-muted-foreground">Progresso</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="h-4 w-4" />
              Filtrar por categoria:
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                Todas ({getTotalCount()})
              </Button>
              {categories.map(category => {
                const stats = getCategoryStats(category);
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category} ({stats.completed}/{stats.total})
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4" />
              Status:
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                Todos
              </Button>
              <Button
                variant={filterStatus === 'completed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('completed')}
              >
                ✅ Concluídos
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('pending')}
              >
                ⏳ Pendentes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      <div className="space-y-4">
        {categories.map(category => {
          const categoryItems = filteredItems.filter(item => item.category === category);
          if (categoryItems.length === 0) return null;

          const stats = getCategoryStats(category);
          const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

          return (
            <Card key={category}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {stats.completed}/{stats.total}
                    </Badge>
                    <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">{progress}%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryItems.map(item => (
                    <div key={item.id} className="flex items-start gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-1"
                      />
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${
                            item.completed ? "line-through text-muted-foreground" : ""
                          }`}>
                            {item.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {item.isCustom && (
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setEditingItem(item)}
                                >
                                  <Edit3 className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {item.notes && (
                          <p className="text-sm text-muted-foreground">
                            📝 {item.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">
              Nenhum item encontrado com os filtros atuais.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Edit Item Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={editingItem.name}
                onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
              />
              <Textarea
                placeholder="Observações"
                value={editingItem.notes || ''}
                onChange={(e) => setEditingItem({...editingItem, notes: e.target.value})}
              />
              <Button onClick={() => updateItem(editingItem)} className="w-full">
                Salvar Alterações
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EnxovalList;
