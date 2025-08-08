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
    { icon: CheckSquare, title: "💍 Checklist Completo", description: "Organize todas as etapas do seu casamento com elegância" },
    { icon: Gift, title: "🎁 Lista de Presentes", description: "Compartilhe seus sonhos de forma sofisticada" },
    { icon: Users, title: "✨ Central dos Convidados", description: "Uma experiência única para seus convidados" }
  ];

  const plans = [
    {
      name: "Mensal",
      price: "R$ 47",
      period: "/mês",
      features: [
        "Checklist completo e personalizável",
        "Lista de presentes elegante",
        "Site do casamento responsivo",
        "Suporte por email",
        "Acesso por 30 dias"
      ],
      popular: false
    },
    {
      name: "Premium Mensal",
      price: "R$ 97",
      period: "/mês", 
      features: [
        "Tudo do plano Mensal",
        "Mood board ilimitado",
        "Dashboard financeiro",
        "Templates premium",
        "Suporte prioritário",
        "Backup automático"
      ],
      popular: true
    },
    {
      name: "Vitalício",
      price: "R$ 497",
      period: "pagamento único",
      features: [
        "Acesso vitalício completo",
        "Todas as funcionalidades premium",
        "Atualizações futuras incluídas",
        "Consultoria personalizada",
        "Templates exclusivos",
        "Suporte VIP"
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
                O casamento dos seus <span className="italic text-foreground/80">sonhos</span> merece um planejamento eficiente
              </h1>
              <p className="text-xl text-foreground/70 leading-relaxed max-w-lg">
                Uma plataforma inteligente e organizada para noivas que valorizam eficiência em cada detalhe
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/formulario-pos-pagamento">
                  <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90 text-lg px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg">
                    Começar Agora
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-foreground/20 text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                  Ver Planos
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

      {/* Features Section */}
      <section id="funcionalidades" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-foreground mb-6">
              Funcionalidades ✨ Inteligentes
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Tudo que você precisa para planejar o casamento perfeito, em uma plataforma eficiente e organizada
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Testimonial Section */}
      <section id="depoimentos" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
              Depoimentos 💕
            </h2>
            <p className="text-xl text-foreground/70">
              O que nossas noivas falam sobre a experiência LovanaApp
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 bg-gradient-to-br from-white to-accent/20 border-border/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 space-y-6">
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground/80 italic text-center leading-relaxed">
                  "Finalmente um app que entende o que uma noiva realmente precisa. Elegante e funcional!"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-background rounded-full flex items-center justify-center">
                    <span className="text-foreground font-semibold">MC</span>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Maria Clara</p>
                    <p className="text-foreground/60 text-sm">São Paulo, SP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-accent/20 border-border/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 space-y-6">
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground/80 italic text-center leading-relaxed">
                  "O design é lindo e a organização me salvou. Consegui ter controle total do meu casamento."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-background rounded-full flex items-center justify-center">
                    <span className="text-foreground font-semibold">AC</span>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Ana Clara</p>
                    <p className="text-foreground/60 text-sm">Rio de Janeiro, RJ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-white to-accent/20 border-border/50 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0 space-y-6">
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-foreground/80 italic text-center leading-relaxed">
                  "Investimento que valeu cada centavo. Meu casamento saiu exatamente como sonhei."
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-background rounded-full flex items-center justify-center">
                    <span className="text-foreground font-semibold">JS</span>
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-foreground">Júlia Santos</p>
                    <p className="text-foreground/60 text-sm">Belo Horizonte, MG</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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
            Com o LovanaApp, você se sente no controle — com apoio, beleza e clareza
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/formulario-pos-pagamento">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 text-lg px-10 py-4 rounded-lg transition-all duration-300 hover:shadow-xl">
                Quero experimentar agora
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-10 py-4 border-background/30 text-background hover:bg-background hover:text-foreground transition-all duration-300">
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
