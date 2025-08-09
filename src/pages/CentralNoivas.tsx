import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckSquare, 
  Gift, 
  ShoppingBasket, 
  Palette, 
  DollarSign, 
  Settings, 
  Image, 
  Users,
  Lock,
  Menu,
  X,
  ClipboardList
} from "lucide-react";
import { cn } from "@/lib/utils";
import Moodboard from "@/components/Moodboard";
import PainelFinanceiro from "@/components/PainelFinanceiro";
import KanbanBoard from "@/components/KanbanBoard";
import GiftList from "@/components/GiftList";
import ConfiguracoesPage from "@/components/ConfiguracoesPage";
import EnxovalList from "@/components/EnxovalList";
import ChecklistComponent from "@/components/ChecklistComponent";
import DesignEditor from "@/components/DesignEditor";
import GuestManagement from "@/components/GuestManagement";

const CentralNoivas = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sections = [
    { id: "dashboard", label: "Dashboard", icon: Menu, premium: false },
    { id: "tarefas", label: "Tarefas", icon: CheckSquare, premium: false },
    { id: "checklist", label: "Checklist", icon: ClipboardList, premium: false },
    { id: "presentes", label: "Lista de Presentes", icon: Gift, premium: false },
    { id: "enxoval", label: "Lista de Enxoval", icon: ShoppingBasket, premium: false },
    { id: "design", label: "Central dos Convidados", icon: Palette, premium: true },
    { id: "financeiro", label: "Painel Financeiro", icon: DollarSign, premium: true },
    { id: "moodboard", label: "Moodboard", icon: Image, premium: false },
    { id: "convidados", label: "Gestão de Convidados", icon: Users, premium: false },
    { id: "configuracoes", label: "Configurações", icon: Settings, premium: false }
  ];

  const dashboardCards = [
    {
      title: "Tarefas Pendentes",
      description: "Organize seu planejamento com sistema visual",
      icon: CheckSquare,
      color: "bg-gradient-to-br from-accent/30 to-accent/10 border-border/50",
      premium: false,
      onClick: () => setActiveSection("tarefas")
    },
    {
      title: "Checklist do Casamento",
      description: "Lista completa de tarefas por prazo",
      icon: ClipboardList,
      color: "bg-gradient-to-br from-accent/30 to-accent/10 border-border/50",
      premium: false,
      onClick: () => setActiveSection("checklist")
    },
    {
      title: "Lista de Presentes",
      description: "Gerencie presentes e links externos",
      icon: Gift,
      color: "bg-gradient-to-br from-accent/30 to-accent/10 border-border/50",
      premium: false,
      onClick: () => setActiveSection("presentes")
    },
    {
      title: "Lista de Enxoval",
      description: "Controle itens por categoria",
      icon: ShoppingBasket,
      color: "bg-gradient-to-br from-accent/30 to-accent/10 border-border/50",
      premium: false,
      onClick: () => setActiveSection("enxoval")
    },
    {
      title: "Central dos Convidados",
      description: "Personalize a central dos convidados",
      icon: Palette,
      color: "bg-gradient-to-br from-accent/20 to-accent/5 border-border/50",
      premium: true,
      onClick: () => setActiveSection("design")
    },
    {
      title: "Painel Financeiro",
      description: "Controle gastos e orçamento",
      icon: DollarSign,
      color: "bg-gradient-to-br from-accent/20 to-accent/5 border-border/50",
      premium: true,
      onClick: () => setActiveSection("financeiro")
    },
    {
      title: "Moodboard",
      description: "Grade de inspiração e referências",
      icon: Image,
      color: "bg-gradient-to-br from-accent/30 to-accent/10 border-border/50",
      premium: false,
      onClick: () => setActiveSection("moodboard")
    },
    {
      title: "Gestão de Convidados",
      description: "Acompanhe confirmações de presença",
      icon: Users,
      color: "bg-gradient-to-br from-accent/30 to-accent/10 border-border/50",
      premium: false,
      onClick: () => setActiveSection("convidados")
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-serif font-bold text-black mb-2">Central das Noivas</h1>
              <p className="text-foreground/70">Organize todos os detalhes do seu casamento em um só lugar</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardCards.map((card) => (
                <Card 
                  key={card.title}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1",
                    card.color
                  )}
                  onClick={card.onClick}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div className="flex items-center space-x-2">
                      <card.icon className="h-6 w-6 text-foreground" />
                      {card.premium && (
                        <Lock className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                    {card.premium && (
                      <Badge variant="secondary" className="bg-amber-100 text-amber-800 border border-amber-200">
                        Premium
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-2 font-serif text-black">{card.title}</CardTitle>
                    <p className="text-sm text-foreground/70">{card.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      
      case "tarefas":
        return <KanbanBoard />;
      
      case "checklist":
        return <ChecklistComponent />;
      
      case "presentes":
        return <GiftList />;
      
      case "enxoval":
        return <EnxovalList />;
      
      case "moodboard":
        return <Moodboard />;
      
      case "financeiro":
        return <PainelFinanceiro />;
      
      case "design":
        return <DesignEditor />;
      
      case "convidados":
        return <GuestManagement />;
      
      case "configuracoes":
        return <ConfiguracoesPage />;
      
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-serif font-semibold mb-2 text-black">Em desenvolvimento</h2>
            <p className="text-foreground/70">Esta seção estará disponível em breve!</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 border-r border-border",
        sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-serif font-bold text-black">LovanaApp</h1>
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-foreground/70 mt-1">Ana & João</p>
        </div>
        
        <nav className="p-4 space-y-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "ghost"}
              className={cn(
                "w-full h-10 justify-start hover:bg-accent/50 transition-all duration-200 flex items-center",
                activeSection === section.id && "bg-foreground text-background hover:bg-foreground/90"
              )}
              onClick={() => {
                setActiveSection(section.id);
                setSidebarOpen(false);
              }}
            >
              <section.icon className="h-4 w-4 mr-3 flex-shrink-0" />
              <span className="flex-1 text-left">{section.label}</span>
              {section.premium && (
                <Lock className="h-3 w-3 ml-2 text-amber-600 flex-shrink-0" />
              )}
            </Button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-border">
          <div className="px-6 py-4 flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-foreground/20 text-foreground hover:bg-foreground hover:text-background">
                Ver Central dos Convidados
              </Button>
              <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                <span className="text-background text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default CentralNoivas;