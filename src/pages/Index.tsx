import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  CheckSquare, 
  ShoppingBasket, 
  DollarSign, 
  Palette, 
  Users, 
  Gift, 
  Image, 
  Mail,
  Smartphone,
  Monitor,
  Download,
  UserPlus,
  Edit3,
  ArrowRight,
  Star,
  ChevronDown,
  Instagram,
  MessageCircle,
  BookOpen
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const features = [
    { icon: CheckSquare, title: "Checklist completo", description: "Organize todas as tarefas do seu casamento" },
    { icon: ShoppingBasket, title: "Lista de enxoval", description: "Pronta e editável conforme sua necessidade" },
    { icon: DollarSign, title: "Dashboard financeiro", description: "Controle total dos gastos e orçamento" },
    { icon: Palette, title: "Tarefas estilo Trello", description: "Visualização clara do progresso" },
    { icon: Image, title: "Mood board personalizado", description: "Pastas organizadas para suas inspirações" },
    { icon: Users, title: "Central dos Convidados", description: "Área otimizada para seus convidados" },
    { icon: Edit3, title: "Designer estilo Canva", description: "Crie convites e materiais únicos" },
    { icon: Gift, title: "Lista de presentes", description: "Compartilhável e fácil de gerenciar" },
    { icon: Mail, title: "E-mails automáticos", description: "Comunicação eficiente com convidados" }
  ];

  const plans = [
    {
      name: "Essencial",
      price: "R$ 14,90",
      period: "pagamento único",
      features: [
        "Checklist completo de casamento",
        "Lista de Enxoval (editável e exportável)",
        "Tarefas (Estilo Trello) - bloqueado",
        "Lista de Presentes - bloqueado",
        "Editor de Design - bloqueado",
        "Painel Financeiro - bloqueado"
      ],
      popular: false
    },
    {
      name: "Mensal",
      price: "R$ 29,90",
      period: "/mês", 
      features: [
        "Checklist completo (pré-pronto e editável)",
        "Lista de Enxoval (categorias e PDF)",
        "Tarefas (Estilo Trello) - completo",
        "Lista de Presentes - acesso completo",
        "Editor de Design dos Convidados",
        "Painel Financeiro com gráficos",
        "Área de Moodboard",
        "Gestão de Convidados"
      ],
      popular: true
    },
    {
      name: "Vitalício Premium",
      price: "R$ 319",
      period: "pagamento único",
      features: [
        "Tudo do plano mensal, sem limitações",
        "Central dos Convidados customizável",
        "Design único e compartilhável",
        "Gestão completa de Convidados",
        "Confirmação de presença em tempo real",
        "Acesso vitalício a todas as funcionalidades"
      ],
      popular: false
    }
  ];

  const faqs = [
    {
      question: "O app funciona no celular e no PC?",
      answer: "Sim! Nosso app é responsivo e funciona perfeitamente em qualquer dispositivo - celular, tablet ou computador."
    },
    {
      question: "Preciso baixar algo?",
      answer: "Não! É tudo online. Basta acessar pelo navegador e começar a usar imediatamente."
    },
    {
      question: "Os convidados precisam instalar o app?",
      answer: "Não! Eles acessam a Central dos Convidados através de um link que você compartilha."
    },
    {
      question: "Posso mudar de plano depois?",
      answer: "Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento."
    },
    {
      question: "As listas são editáveis?",
      answer: "Sim! Todas as listas são totalmente personalizáveis conforme suas necessidades."
    }
  ];

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="text-3xl font-serif font-bold text-foreground">LovanaApp</div>
          <div className="hidden md:flex space-x-8">
            <a href="#funcionalidades" className="text-foreground/80 hover:text-foreground transition-all duration-300 font-medium">Funcionalidades</a>
            <a href="#planos" className="text-foreground/80 hover:text-foreground transition-all duration-300 font-medium">Planos</a>
            <a href="#depoimentos" className="text-foreground/80 hover:text-foreground transition-all duration-300 font-medium">Depoimentos</a>
          </div>
          <Link to="/login">
            <Button variant="outline" className="border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
              Entrar
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-background via-background to-accent/30">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-serif font-bold text-foreground leading-tight">
                Transforme o <span className="italic text-foreground/80">caos do casamento</span> em leveza e clareza
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed max-w-lg">
                Um app criado para noivas que querem se organizar sem perder a magia do momento
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/formulario-pos-pagamento">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg">
                    Quero começar agora
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                  Comparar planos
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-accent to-background h-96 rounded-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Smartphone className="h-16 w-16 text-foreground/60 mx-auto" />
                    <p className="text-foreground/60 font-medium">Preview do App</p>
                    <div className="w-32 h-2 bg-foreground/20 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dor da Noiva Moderna */}
      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-8">
            Cansada de se organizar em mil lugares diferentes?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gradient-to-br from-accent/30 to-accent/10 border-border/50">
              <Instagram className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Prints no Instagram</h3>
              <p className="text-foreground/60 text-sm">Salvando inspirações que se perdem na galeria</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-accent/30 to-accent/10 border-border/50">
              <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Grupos no WhatsApp</h3>
              <p className="text-foreground/60 text-sm">Mensagens importantes perdidas no meio de outras conversas</p>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-accent/30 to-accent/10 border-border/50">
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Caderno de anotações</h3>
              <p className="text-foreground/60 text-sm">Informações espalhadas em diferentes lugares</p>
            </Card>
          </div>
          
          <p className="text-2xl text-foreground font-medium italic font-serif">
            "Se planejar está tomando o espaço do sonho, você precisa mudar de rota."
          </p>
        </div>
      </section>

      {/* Apresentação da Solução */}
      <section id="funcionalidades" className="py-24 px-6 bg-gradient-to-br from-accent/30 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Criamos um lugar só seu
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Para sonhar, planejar, controlar e realizar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group p-8 bg-gradient-to-br from-white to-accent/20 border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-0 text-center space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-background rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-foreground" />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mood Boards Exclusivo */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Mood Boards que fazem sentido 📁
              </h2>
              <p className="text-xl text-foreground/70 mb-6">
                Com o mood board da Central da Noiva, você salva suas inspirações e organiza por pastas personalizadas — e nunca mais perde o fio da sua ideia.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-foreground/70">Pasta Lua de Mel</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-foreground/70">Pasta Chá de Lingerie</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-foreground/70">Pasta Decoração</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-foreground/70">Pasta Vestidos</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-accent/50 to-accent/20 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <Image className="h-16 w-16 text-foreground/60 mx-auto mb-4" />
                <p className="text-foreground/60">Visualização do Mood Board</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Central dos Convidados */}
      <section className="py-24 px-6 bg-gradient-to-br from-accent/30 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 h-80 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <Users className="h-16 w-16 text-foreground mx-auto mb-4" />
                <p className="text-foreground/60">Central dos Convidados</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Central dos Convidados otimizada 👥
              </h2>
              <p className="text-xl text-foreground/70 mb-6">
                O que antes era um site engessado, agora virou uma Central otimizada para os convidados.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-foreground/70">Dress code e informações</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-foreground/70">Local e horário</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-foreground/70">Confirmação de presença</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-foreground/70">Lista de presentes integrada</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-foreground rounded-full"></div>
                  <span className="text-foreground/70">Playlist e galeria pós-evento</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mockups do App */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
            Visual leve, intuitivo e encantador
          </h2>
          <p className="text-xl text-foreground/70 mb-12">
            Pra você organizar com tranquilidade e estilo
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0 text-center">
                <CheckSquare className="h-12 w-12 text-foreground mx-auto mb-4" />
                <h3 className="font-semibold">Checklist</h3>
              </CardContent>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0 text-center">
                <Users className="h-12 w-12 text-foreground mx-auto mb-4" />
                <h3 className="font-semibold">Central dos Convidados</h3>
              </CardContent>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0 text-center">
                <Image className="h-12 w-12 text-foreground mx-auto mb-4" />
                <h3 className="font-semibold">Mood Board</h3>
              </CardContent>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 border-border/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0 text-center">
                <DollarSign className="h-12 w-12 text-foreground mx-auto mb-4" />
                <h3 className="font-semibold">Dashboard</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="planos" className="py-24 px-6 bg-gradient-to-br from-accent/30 to-background">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Planos de Investimento
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Escolha a experiência que mais combina com o seu estilo de planejamento
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative p-8 bg-white border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${plan.popular ? 'border-foreground shadow-xl scale-105' : 'border-border'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-4 py-1 text-sm font-medium">
                    Mais Escolhido
                  </Badge>
                )}
                <CardContent className="p-0 space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{plan.name}</h3>
                    <div className="flex items-baseline justify-center mb-2">
                      <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-foreground/60 ml-2">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckSquare className="h-5 w-5 text-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-3 transition-all duration-300 ${plan.popular ? 'bg-foreground hover:bg-foreground/90 text-background' : 'bg-foreground/10 hover:bg-foreground hover:text-background text-foreground'}`}
                    size="lg"
                  >
                    Escolher Plano
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimento */}
      <section className="py-24 px-6 bg-gradient-to-br from-accent/30 to-background">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-12 bg-white border-border/50 shadow-xl">
            <CardContent className="p-0">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl text-foreground font-medium italic mb-6 font-serif">
                "Quando encontrei o app, percebi que eu não precisava mais dar conta de tudo sozinha. Cada detalhe ganhou espaço e eu finalmente pude respirar."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-background rounded-full flex items-center justify-center">
                  <span className="text-foreground font-semibold">AC</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Ana Clara</p>
                  <p className="text-foreground/60">Noiva em MG</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-foreground to-foreground/90 text-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-8">
            Pronta para um planejamento de casamento de <span className="italic">luxo</span>?
          </h2>
          <p className="text-xl text-background/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Junte-se às noivas que escolheram a excelência e transformaram o stress em elegância
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/formulario-pos-pagamento">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-xl">
                Começar Agora
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-background/30 text-background hover:bg-background hover:text-foreground transition-all duration-300">
              Falar com Consultora
            </Button>
          </div>
        </div>
      </section>




      {/* FAQ */}
      <section id="faq" className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Perguntas Frequentes
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <button
                    className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => setFaqOpen(faqOpen === index ? null : index)}
                  >
                    <span className="font-semibold text-gray-900">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${faqOpen === index ? 'rotate-180' : ''}`} />
                  </button>
                  {faqOpen === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 bg-gradient-to-br from-foreground to-foreground/90 text-background">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold mb-8">
            Organizar seu casamento não precisa ser confuso
          </h2>
          <p className="text-xl text-background/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Com a Central da Noiva, você se sente no controle — com apoio, beleza e clareza
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/formulario-pos-pagamento">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-xl">
                Quero experimentar agora
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-gray-500 text-gray-600 hover:bg-gray-600 hover:text-background transition-all duration-300">
              Ver todos os planos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 bg-background text-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <div className="text-3xl font-serif font-bold mb-6">LovanaApp</div>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              A plataforma de planejamento de casamento mais inteligente e organizada do Brasil
            </p>
            <div className="flex justify-center space-x-8 mb-8">
              <a href="#funcionalidades" className="text-foreground/70 hover:text-foreground transition-colors">Funcionalidades</a>
              <a href="#planos" className="text-foreground/70 hover:text-foreground transition-colors">Planos</a>
              <a href="#depoimentos" className="text-foreground/70 hover:text-foreground transition-colors">Depoimentos</a>
            </div>
            <div className="border-t border-foreground/20 pt-8">
              <p className="text-foreground/60 text-sm">
                © 2024 LovanaApp. Todos os direitos reservados. Desenvolvido com 💍 para noivas organizadas.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
