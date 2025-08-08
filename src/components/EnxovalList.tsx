import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Trash2, 
  FileDown, 
  Mail, 
  Edit2, 
  Save, 
  X,
  Home,
  Bed,
  Utensils,
  Bath,
  Shirt,
  Sofa,
  Wrench,
  Sparkles,
  Heart,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface EnxovalItem {
  id: string;
  name: string;
  checked: boolean;
  notes: string;
  isCustom: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: any;
  color: string;
  items: EnxovalItem[];
}

const EnxovalList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Lista pré-definida de enxoval
  const initialCategories: Category[] = [
    {
      id: "quarto",
      name: "Quarto",
      icon: Bed,
      color: "bg-pink-50 border-pink-200",
      items: [
        { id: "1", name: "4 jogos de lençol (2 verão, 2 inverno)", checked: false, notes: "", isCustom: false },
        { id: "2", name: "2 edredons (leve e pesado)", checked: false, notes: "", isCustom: false },
        { id: "3", name: "1 cobertor", checked: false, notes: "", isCustom: false },
        { id: "4", name: "2 colchas ou cobre-leito", checked: false, notes: "", isCustom: false },
        { id: "5", name: "2 protetores de colchão (impermeável é ideal)", checked: false, notes: "", isCustom: false },
        { id: "6", name: "4 fronhas extras", checked: false, notes: "", isCustom: false },
        { id: "7", name: "2 travesseiros de dormir", checked: false, notes: "", isCustom: false },
        { id: "8", name: "2 travesseiros decorativos", checked: false, notes: "", isCustom: false },
        { id: "9", name: "1 almofada cervical ou de leitura", checked: false, notes: "", isCustom: false },
        { id: "10", name: "1 manta para os pés da cama", checked: false, notes: "", isCustom: false },
        { id: "11", name: "Cortina + varão", checked: false, notes: "", isCustom: false },
        { id: "12", name: "Cabides", checked: false, notes: "", isCustom: false },
        { id: "13", name: "Organizadores de gaveta", checked: false, notes: "", isCustom: false },
        { id: "14", name: "Caixas para roupas fora de estação", checked: false, notes: "", isCustom: false },
        { id: "15", name: "Porta-joias ou organizador de bijuterias", checked: false, notes: "", isCustom: false },
        { id: "16", name: "Cestos de roupa suja", checked: false, notes: "", isCustom: false }
      ]
    },
    {
      id: "banheiro",
      name: "Banheiro",
      icon: Bath,
      color: "bg-blue-50 border-blue-200",
      items: [
        { id: "17", name: "4 toalhas de banho", checked: false, notes: "", isCustom: false },
        { id: "18", name: "4 toalhas de rosto", checked: false, notes: "", isCustom: false },
        { id: "19", name: "2 toalhas de piso", checked: false, notes: "", isCustom: false },
        { id: "20", name: "2 roupões", checked: false, notes: "", isCustom: false },
        { id: "21", name: "1 toalha de lavabo", checked: false, notes: "", isCustom: false },
        { id: "22", name: "Lixeira com pedal", checked: false, notes: "", isCustom: false },
        { id: "23", name: "Porta-sabonete líquido", checked: false, notes: "", isCustom: false },
        { id: "24", name: "Porta-escova de dente", checked: false, notes: "", isCustom: false },
        { id: "25", name: "Suporte para papel higiênico", checked: false, notes: "", isCustom: false },
        { id: "26", name: "Suporte para toalhas", checked: false, notes: "", isCustom: false },
        { id: "27", name: "Cortina para box", checked: false, notes: "", isCustom: false },
        { id: "28", name: "Tapetes antiderrapantes", checked: false, notes: "", isCustom: false },
        { id: "29", name: "Espelho de aumento", checked: false, notes: "", isCustom: false },
        { id: "30", name: "Balancinha de banheiro", checked: false, notes: "", isCustom: false }
      ]
    },
    {
      id: "lavanderia",
      name: "Lavanderia / Serviço",
      icon: Shirt,
      color: "bg-green-50 border-green-200",
      items: [
        { id: "31", name: "Tábua de passar", checked: false, notes: "", isCustom: false },
        { id: "32", name: "Ferro ou vaporizador", checked: false, notes: "", isCustom: false },
        { id: "33", name: "Cesto de roupas limpas", checked: false, notes: "", isCustom: false },
        { id: "34", name: "Varal de chão", checked: false, notes: "", isCustom: false },
        { id: "35", name: "Pregadores de roupa", checked: false, notes: "", isCustom: false },
        { id: "36", name: "Balde multiuso", checked: false, notes: "", isCustom: false },
        { id: "37", name: "Escova para roupas", checked: false, notes: "", isCustom: false },
        { id: "38", name: "Rodo", checked: false, notes: "", isCustom: false },
        { id: "39", name: "Vassoura", checked: false, notes: "", isCustom: false },
        { id: "40", name: "Pá de lixo", checked: false, notes: "", isCustom: false },
        { id: "41", name: "Mop/Esfregão", checked: false, notes: "", isCustom: false },
        { id: "42", name: "Pano de chão (mínimo 5)", checked: false, notes: "", isCustom: false },
        { id: "43", name: "Panos multiuso", checked: false, notes: "", isCustom: false },
        { id: "44", name: "Luvas de limpeza", checked: false, notes: "", isCustom: false },
        { id: "45", name: "Saco para roupas delicadas", checked: false, notes: "", isCustom: false },
        { id: "46", name: "Sabão líquido ou em pó", checked: false, notes: "", isCustom: false },
        { id: "47", name: "Amaciante", checked: false, notes: "", isCustom: false },
        { id: "48", name: "Tira-manchas", checked: false, notes: "", isCustom: false },
        { id: "49", name: "Desinfetante", checked: false, notes: "", isCustom: false },
        { id: "50", name: "Água sanitária", checked: false, notes: "", isCustom: false },
        { id: "51", name: "Álcool 70%", checked: false, notes: "", isCustom: false },
        { id: "52", name: "Desengordurante", checked: false, notes: "", isCustom: false }
      ]
    },
    {
      id: "cozinha",
      name: "Cozinha",
      icon: Utensils,
      color: "bg-orange-50 border-orange-200",
      items: [
        { id: "53", name: "1 jogo de panelas completo", checked: false, notes: "", isCustom: false },
        { id: "54", name: "1 frigideira antiaderente", checked: false, notes: "", isCustom: false },
        { id: "55", name: "1 frigideira pequena para ovo", checked: false, notes: "", isCustom: false },
        { id: "56", name: "1 panela de pressão", checked: false, notes: "", isCustom: false },
        { id: "57", name: "1 escorredor de arroz/massas", checked: false, notes: "", isCustom: false },
        { id: "58", name: "Colher de pau ou silicone", checked: false, notes: "", isCustom: false },
        { id: "59", name: "Espátula", checked: false, notes: "", isCustom: false },
        { id: "60", name: "Concha de feijão", checked: false, notes: "", isCustom: false },
        { id: "61", name: "Pegador de salada", checked: false, notes: "", isCustom: false },
        { id: "62", name: "Abridor de latas e garrafas", checked: false, notes: "", isCustom: false },
        { id: "63", name: "Ralador", checked: false, notes: "", isCustom: false },
        { id: "64", name: "Peneiras (mínimo 2 tamanhos)", checked: false, notes: "", isCustom: false },
        { id: "65", name: "Tábua de corte", checked: false, notes: "", isCustom: false },
        { id: "66", name: "Facas de cozinha (conjunto)", checked: false, notes: "", isCustom: false },
        { id: "67", name: "Faca de pão", checked: false, notes: "", isCustom: false },
        { id: "68", name: "Tesoura de cozinha", checked: false, notes: "", isCustom: false },
        { id: "69", name: "Medidores (colher e copo)", checked: false, notes: "", isCustom: false },
        { id: "70", name: "Copo medidor", checked: false, notes: "", isCustom: false },
        { id: "71", name: "Assadeiras (redonda, retangular, forma de bolo)", checked: false, notes: "", isCustom: false },
        { id: "72", name: "Potes de vidro/plástico com tampa", checked: false, notes: "", isCustom: false },
        { id: "73", name: "Garrafa térmica", checked: false, notes: "", isCustom: false },
        { id: "74", name: "Paninhos de prato (mínimo 10)", checked: false, notes: "", isCustom: false },
        { id: "75", name: "Luva térmica", checked: false, notes: "", isCustom: false },
        { id: "76", name: "Porta-temperos", checked: false, notes: "", isCustom: false },
        { id: "77", name: "Escorredor de pratos", checked: false, notes: "", isCustom: false },
        { id: "78", name: "Lixeira de pia", checked: false, notes: "", isCustom: false },
        { id: "79", name: "Toalha de mesa", checked: false, notes: "", isCustom: false },
        { id: "80", name: "Jogo americano", checked: false, notes: "", isCustom: false },
        { id: "81", name: "Guardanapos de pano ou papel", checked: false, notes: "", isCustom: false },
        { id: "82", name: "Geladeira", checked: false, notes: "", isCustom: false },
        { id: "83", name: "Fogão ou cooktop + forno", checked: false, notes: "", isCustom: false },
        { id: "84", name: "Micro-ondas", checked: false, notes: "", isCustom: false },
        { id: "85", name: "Liquidificador", checked: false, notes: "", isCustom: false },
        { id: "86", name: "Batedeira", checked: false, notes: "", isCustom: false },
        { id: "87", name: "Sanduicheira/Grill", checked: false, notes: "", isCustom: false },
        { id: "88", name: "Cafeteira", checked: false, notes: "", isCustom: false },
        { id: "89", name: "Airfryer", checked: false, notes: "", isCustom: false },
        { id: "90", name: "Torradeira", checked: false, notes: "", isCustom: false },
        { id: "91", name: "Purificador de água/filtro", checked: false, notes: "", isCustom: false },
        { id: "92", name: "6 pratos rasos", checked: false, notes: "", isCustom: false },
        { id: "93", name: "6 pratos fundos", checked: false, notes: "", isCustom: false },
        { id: "94", name: "6 pratos de sobremesa", checked: false, notes: "", isCustom: false },
        { id: "95", name: "6 copos grandes", checked: false, notes: "", isCustom: false },
        { id: "96", name: "6 copos pequenos", checked: false, notes: "", isCustom: false },
        { id: "97", name: "6 xícaras de café + pires", checked: false, notes: "", isCustom: false },
        { id: "98", name: "6 canecas", checked: false, notes: "", isCustom: false },
        { id: "99", name: "Talheres (jogo para 6)", checked: false, notes: "", isCustom: false },
        { id: "100", name: "Conjunto de sobremesa", checked: false, notes: "", isCustom: false },
        { id: "101", name: "Travessas de servir", checked: false, notes: "", isCustom: false },
        { id: "102", name: "Jarra de suco", checked: false, notes: "", isCustom: false },
        { id: "103", name: "Saleiro/pimenteiro", checked: false, notes: "", isCustom: false }
      ]
    },
    {
      id: "sala",
      name: "Sala",
      icon: Sofa,
      color: "bg-purple-50 border-purple-200",
      items: [
        { id: "104", name: "Sofá", checked: false, notes: "", isCustom: false },
        { id: "105", name: "Tapete", checked: false, notes: "", isCustom: false },
        { id: "106", name: "Mesa de centro ou lateral", checked: false, notes: "", isCustom: false },
        { id: "107", name: "Rack ou painel", checked: false, notes: "", isCustom: false },
        { id: "108", name: "Cortina + varão", checked: false, notes: "", isCustom: false },
        { id: "109", name: "Almofadas decorativas", checked: false, notes: "", isCustom: false },
        { id: "110", name: "Manta para sofá", checked: false, notes: "", isCustom: false },
        { id: "111", name: "Abajur ou luminária", checked: false, notes: "", isCustom: false },
        { id: "112", name: "Velas aromáticas ou difusor", checked: false, notes: "", isCustom: false },
        { id: "113", name: "Quadro ou decoração de parede", checked: false, notes: "", isCustom: false },
        { id: "114", name: "Revisteiro", checked: false, notes: "", isCustom: false }
      ]
    },
    {
      id: "jantar",
      name: "Sala de Jantar",
      icon: Utensils,
      color: "bg-rose-50 border-rose-200",
      items: [
        { id: "115", name: "Mesa + cadeiras", checked: false, notes: "", isCustom: false },
        { id: "116", name: "Centro de mesa", checked: false, notes: "", isCustom: false },
        { id: "117", name: "Louças e talheres para ocasiões especiais", checked: false, notes: "", isCustom: false },
        { id: "118", name: "Sousplats", checked: false, notes: "", isCustom: false },
        { id: "119", name: "Jogo de taças (vinho, água, espumante)", checked: false, notes: "", isCustom: false },
        { id: "120", name: "Porta-guardanapos", checked: false, notes: "", isCustom: false },
        { id: "121", name: "Balde de gelo", checked: false, notes: "", isCustom: false }
      ]
    },
    {
      id: "ferramentas",
      name: "Ferramentas / Itens Gerais",
      icon: Wrench,
      color: "bg-gray-50 border-gray-200",
      items: [
        { id: "122", name: "Furadeira", checked: false, notes: "", isCustom: false },
        { id: "123", name: "Martelo", checked: false, notes: "", isCustom: false },
        { id: "124", name: "Chave de fenda e Philips", checked: false, notes: "", isCustom: false },
        { id: "125", name: "Fita isolante", checked: false, notes: "", isCustom: false },
        { id: "126", name: "Extensão elétrica", checked: false, notes: "", isCustom: false },
        { id: "127", name: "Filtro de linha", checked: false, notes: "", isCustom: false },
        { id: "128", name: "Lâmpadas extras", checked: false, notes: "", isCustom: false },
        { id: "129", name: "Vela + fósforo/isqueiro", checked: false, notes: "", isCustom: false },
        { id: "130", name: "Pilhas", checked: false, notes: "", isCustom: false },
        { id: "131", name: "Lanternas", checked: false, notes: "", isCustom: false },
        { id: "132", name: "Fita dupla face", checked: false, notes: "", isCustom: false },
        { id: "133", name: "Trena", checked: false, notes: "", isCustom: false },
        { id: "134", name: "Caixa de ferramentas", checked: false, notes: "", isCustom: false }
      ]
    },
    {
      id: "limpeza",
      name: "Limpeza Geral",
      icon: Sparkles,
      color: "bg-cyan-50 border-cyan-200",
      items: [
        { id: "135", name: "Balde", checked: false, notes: "", isCustom: false },
        { id: "136", name: "Borrifadores", checked: false, notes: "", isCustom: false },
        { id: "137", name: "Escova de vaso", checked: false, notes: "", isCustom: false },
        { id: "138", name: "Desentupidor", checked: false, notes: "", isCustom: false },
        { id: "139", name: "Sabão neutro", checked: false, notes: "", isCustom: false },
        { id: "140", name: "Saponáceo", checked: false, notes: "", isCustom: false },
        { id: "141", name: "Esponjas de louça", checked: false, notes: "", isCustom: false },
        { id: "142", name: "Esponja abrasiva", checked: false, notes: "", isCustom: false },
        { id: "143", name: "Paninhos de microfibra", checked: false, notes: "", isCustom: false },
        { id: "144", name: "Organizadores de produtos", checked: false, notes: "", isCustom: false },
        { id: "145", name: "Difusores de ambiente", checked: false, notes: "", isCustom: false }
      ]
    },
    {
      id: "pet",
      name: "Pet",
      icon: Heart,
      color: "bg-amber-50 border-amber-200",
      items: [
        { id: "146", name: "Comedouro e bebedouro", checked: false, notes: "", isCustom: false },
        { id: "147", name: "Caminha ou colchonete", checked: false, notes: "", isCustom: false },
        { id: "148", name: "Caixa de transporte", checked: false, notes: "", isCustom: false },
        { id: "149", name: "Tapete higiênico ou caixa de areia", checked: false, notes: "", isCustom: false },
        { id: "150", name: "Escova/pente", checked: false, notes: "", isCustom: false },
        { id: "151", name: "Shampoo", checked: false, notes: "", isCustom: false },
        { id: "152", name: "Brinquedos", checked: false, notes: "", isCustom: false },
        { id: "153", name: "Ração e petiscos", checked: false, notes: "", isCustom: false },
        { id: "154", name: "Kit de primeiros socorros para pet", checked: false, notes: "", isCustom: false }
      ]
    },
    {
      id: "extras",
      name: "Extras",
      icon: Package,
      color: "bg-indigo-50 border-indigo-200",
      items: [
        { id: "155", name: "Extensões de tomada", checked: false, notes: "", isCustom: false },
        { id: "156", name: "Filtro de linha", checked: false, notes: "", isCustom: false },
        { id: "157", name: "Relógio de parede", checked: false, notes: "", isCustom: false },
        { id: "158", name: "Porta-chaves", checked: false, notes: "", isCustom: false },
        { id: "159", name: "Porta-cartas", checked: false, notes: "", isCustom: false },
        { id: "160", name: "Lixeira maior para a cozinha", checked: false, notes: "", isCustom: false },
        { id: "161", name: "Protetores de móveis/pés", checked: false, notes: "", isCustom: false },
        { id: "162", name: "Cabideiros ou araras", checked: false, notes: "", isCustom: false },
        { id: "163", name: "Porta-documentos", checked: false, notes: "", isCustom: false },
        { id: "164", name: "Suporte para papel toalha e alumínio", checked: false, notes: "", isCustom: false },
        { id: "165", name: "Roupão ou pijama confortável para casa nova", checked: false, notes: "", isCustom: false }
      ]
    }
  ];

  // Carregar dados salvos ou usar inicial
  useEffect(() => {
    const savedData = localStorage.getItem("enxoval-list");
    if (savedData) {
      setCategories(JSON.parse(savedData));
    } else {
      setCategories(initialCategories);
    }
  }, []);

  // Salvar no localStorage sempre que categories mudar
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("enxoval-list", JSON.stringify(categories));
    }
  }, [categories]);

  const toggleItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            items: cat.items.map(item =>
              item.id === itemId ? { ...item, checked: !item.checked } : item
            )
          }
        : cat
    ));
  };

  const updateItemNotes = (categoryId: string, itemId: string, notes: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            items: cat.items.map(item =>
              item.id === itemId ? { ...item, notes } : item
            )
          }
        : cat
    ));
  };

  const addCustomItem = () => {
    if (!newItemName.trim() || !selectedCategory) return;
    
    const newItem: EnxovalItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      checked: false,
      notes: "",
      isCustom: true
    };

    setCategories(categories.map(cat => 
      cat.id === selectedCategory 
        ? { ...cat, items: [...cat.items, newItem] }
        : cat
    ));

    setNewItemName("");
    setSelectedCategory("");
  };

  const removeItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? {
            ...cat,
            items: cat.items.filter(item => item.id !== itemId)
          }
        : cat
    ));
  };

  const exportToPDF = () => {
    // Simular exportação para PDF
    const checkedItems = categories.flatMap(cat => 
      cat.items.filter(item => item.checked).map(item => `${cat.name}: ${item.name}`)
    );
    console.log("Exportando para PDF:", checkedItems);
    alert("Funcionalidade de export PDF será implementada!");
  };

  const sendByEmail = () => {
    // Simular envio por email
    console.log("Enviando por email...");
    alert("Funcionalidade de envio por email será implementada!");
  };

  const getTotalProgress = () => {
    const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
    const checkedItems = categories.reduce((sum, cat) => 
      sum + cat.items.filter(item => item.checked).length, 0
    );
    return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;
  };

  const filteredCategories = categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-2">Lista de Enxoval</h1>
          <p className="text-muted-foreground">
            Organize todos os itens necessários para sua casa nova
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button onClick={exportToPDF} variant="outline">
            <FileDown className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button onClick={sendByEmail} variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Enviar Email
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progresso Geral</span>
            <span className="text-sm text-muted-foreground">{getTotalProgress()}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${getTotalProgress()}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Search and Add Item */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Buscar itens..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Item Personalizado</DialogTitle>
              <DialogDescription>
                Adicione um item customizado à sua lista de enxoval
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Categoria</label>
                <select 
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Nome do Item</label>
                <Input
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Digite o nome do item..."
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addCustomItem} disabled={!newItemName.trim() || !selectedCategory}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Categories */}
      <Accordion type="multiple" className="space-y-4">
        {filteredCategories.map((category) => {
          const checkedCount = category.items.filter(item => item.checked).length;
          const totalCount = category.items.length;
          const progress = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
          
          return (
            <AccordionItem key={category.id} value={category.id}>
              <Card className={cn("transition-all duration-200", category.color)}>
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <category.icon className="h-6 w-6 text-primary" />
                      <div className="text-left">
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {checkedCount} de {totalCount} itens
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant="secondary">
                        {progress}%
                      </Badge>
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div 
                          key={item.id} 
                          className={cn(
                            "flex items-start space-x-3 p-3 rounded-lg border transition-all duration-200",
                            item.checked 
                              ? "bg-primary/5 border-primary/20" 
                              : "bg-background border-border hover:bg-muted/50"
                          )}
                        >
                          <Checkbox
                            checked={item.checked}
                            onCheckedChange={() => toggleItem(category.id, item.id)}
                            className="mt-1"
                          />
                          
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <span 
                                className={cn(
                                  "font-medium",
                                  item.checked && "line-through text-muted-foreground"
                                )}
                              >
                                {item.name}
                              </span>
                              
                              <div className="flex items-center space-x-2">
                                {item.isCustom && (
                                  <Badge variant="outline" className="text-xs">
                                    Personalizado
                                  </Badge>
                                )}
                                {editingItem === item.id ? (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setEditingItem(null)}
                                  >
                                    <Save className="h-3 w-3" />
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setEditingItem(item.id)}
                                  >
                                    <Edit2 className="h-3 w-3" />
                                  </Button>
                                )}
                                {item.isCustom && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => removeItem(category.id, item.id)}
                                    className="text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            </div>
                            
                            {editingItem === item.id ? (
                              <Textarea
                                placeholder="Adicione observações sobre este item..."
                                value={item.notes}
                                onChange={(e) => updateItemNotes(category.id, item.id, e.target.value)}
                                className="min-h-[60px]"
                              />
                            ) : (
                              item.notes && (
                                <p className="text-sm text-muted-foreground bg-muted p-2 rounded">
                                  {item.notes}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export default EnxovalList;