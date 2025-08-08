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
      price: "R$ 97",
      period: "/mês",
      features: [
        "Checklist completo",
        "Lista de enxoval",
        "Dashboard financeiro básico",
        "Central dos Convidados",
        "Suporte por email"
      ],
      popular: false
    },
    {
      name: "Premium",
      price: "R$ 197",
      period: "/mês", 
      features: [
        "Tudo do plano Essencial",
        "Mood board com pastas ilimitadas",
        "Designer integrado",
        "E-mails automáticos",
        "Dashboard financeiro avançado",
        "Suporte prioritário"
      ],
      popular: true
    },
    {
      name: "Completo",
      price: "R$ 297",
      period: "/mês",
      features: [
        "Tudo do plano Premium",
        "Consultoria personalizada",
        "Templates exclusivos",
        "Backup automático",
        "Acesso vitalício ao app"
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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-pink-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-pink-600">LovanaApp</div>
          <div className="hidden md:flex space-x-6">
            <a href="#funcionalidades" className="text-gray-700 hover:text-pink-600 transition-colors">Funcionalidades</a>
            <a href="#planos" className="text-gray-700 hover:text-pink-600 transition-colors">Planos</a>
            <a href="#faq" className="text-gray-700 hover:text-pink-600 transition-colors">FAQ</a>
          </div>
          <Link to="/login">
            <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transforme o <span className="text-pink-600">caos do casamento</span> em leveza e clareza
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Um app criado para noivas que querem se organizar sem perder a magia do momento
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/formulario-pos-pagamento">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3">
                Quero começar agora 💕
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-pink-200 text-pink-600 hover:bg-pink-50">
              Comparar planos
            </Button>
          </div>
        </div>
      </section>

      {/* Dor da Noiva Moderna */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Cansada de se organizar em mil lugares diferentes?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-gray-50 border-gray-200">
              <Instagram className="h-12 w-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Prints no Instagram</h3>
              <p className="text-gray-600 text-sm">Salvando inspirações que se perdem na galeria</p>
            </Card>
            
            <Card className="p-6 bg-gray-50 border-gray-200">
              <MessageCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Grupos no WhatsApp</h3>
              <p className="text-gray-600 text-sm">Mensagens importantes perdidas no meio de outras conversas</p>
            </Card>
            
            <Card className="p-6 bg-gray-50 border-gray-200">
              <BookOpen className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Caderno de anotações</h3>
              <p className="text-gray-600 text-sm">Informações espalhadas em diferentes lugares</p>
            </Card>
          </div>
          
          <p className="text-2xl text-gray-700 font-medium italic">
            "Se planejar está tomando o espaço do sonho, você precisa mudar de rota."
          </p>
        </div>
      </section>

      {/* Apresentação da Solução */}
      <section id="funcionalidades" className="py-16 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Criamos um lugar só seu
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Para sonhar, planejar, controlar e realizar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-0">
                  <feature.icon className="h-12 w-12 text-pink-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mood Boards Exclusivo */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Mood Boards que fazem sentido 📁
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Com o mood board do LovanaApp, você salva suas inspirações e organiza por pastas personalizadas — e nunca mais perde o fio da sua ideia.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                  <span className="text-gray-700">Pasta Lua de Mel</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                  <span className="text-gray-700">Pasta Chá de Lingerie</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                  <span className="text-gray-700">Pasta Decoração</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-600 rounded-full"></div>
                  <span className="text-gray-700">Pasta Vestidos</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <Image className="h-16 w-16 text-pink-600 mx-auto mb-4" />
                <p className="text-gray-600">Visualização do Mood Board</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Central dos Convidados */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-2xl p-8 h-80 flex items-center justify-center">
              <div className="text-center">
                <Users className="h-16 w-16 text-pink-600 mx-auto mb-4" />
                <p className="text-gray-600">Central dos Convidados</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Central dos Convidados otimizada 👥
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                O que antes era um site engessado, agora virou uma Central otimizada para os convidados.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Dress code e informações</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Local e horário</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Confirmação de presença</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Lista de presentes integrada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativo de Planos */}
      <section id="planos" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Escolha o plano ideal para você
            </h2>
            <p className="text-xl text-gray-600">
              Todos os planos incluem 7 dias de teste grátis
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative p-8 ${plan.popular ? 'border-pink-500 shadow-lg scale-105' : 'border-gray-200'}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white">
                    Mais Popular
                  </Badge>
                )}
                <CardContent className="p-0">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-pink-600">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckSquare className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-pink-600 hover:bg-pink-700' : 'bg-gray-800 hover:bg-gray-900'}`}
                    size="lg"
                  >
                    Começar agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mockups do App */}
      <section className="py-16 px-4 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Visual leve, intuitivo e encantador
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Pra você organizar com tranquilidade e estilo
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0 text-center">
                <CheckSquare className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold">Checklist</h3>
              </CardContent>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0 text-center">
                <Users className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold">Central dos Convidados</h3>
              </CardContent>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0 text-center">
                <Image className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold">Mood Board</h3>
              </CardContent>
            </Card>
            <Card className="p-6 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0 text-center">
                <DollarSign className="h-12 w-12 text-pink-600 mx-auto mb-4" />
                <h3 className="font-semibold">Dashboard</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimento */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="p-12 bg-gradient-to-r from-pink-50 to-purple-50 border-pink-200">
            <CardContent className="p-0">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl text-gray-800 font-medium italic mb-6">
                "Quando encontrei o app, percebi que eu não precisava mais dar conta de tudo sozinha. Cada detalhe ganhou espaço e eu finalmente pude respirar."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
                  <span className="text-pink-600 font-semibold">AC</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Ana Clara</p>
                  <p className="text-gray-600">Noiva em MG</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Organizar seu casamento não precisa ser confuso
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Com o LovanaApp, você se sente no controle — com apoio, beleza e clareza
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/formulario-pos-pagamento">
              <Button size="lg" className="bg-pink-600 hover:bg-pink-700 text-lg px-8 py-3">
                Quero experimentar agora 💕
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-pink-200 text-pink-600 hover:bg-pink-50">
              Ver todos os planos
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="text-2xl font-bold text-pink-400 mb-4">LovanaApp</div>
          <p className="text-gray-400 mb-6">
            Transformando o planejamento de casamentos em uma experiência encantadora
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Termos de Uso</a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Privacidade</a>
            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
