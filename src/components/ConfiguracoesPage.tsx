import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Heart, 
  Lock, 
  CreditCard, 
  UserX, 
  LogOut,
  Camera,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ConfiguracoesPage = () => {
  const [activeTab, setActiveTab] = useState("perfil");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  // Mock data - seria substituído por dados reais do Supabase
  const [dadosCasal, setDadosCasal] = useState({
    nomeNoiva: "Ana Silva",
    nomeNoivo: "João Santos",
    dataCasamento: "2024-12-15",
    localCerimonia: "Igreja São Francisco",
    localRecepcao: "Quinta do Vale",
    historia: "Nos conhecemos na faculdade em 2018...",
    fotoNoiva: "",
    fotoNoivo: "",
    fotoCasal: ""
  });

  const [senhaData, setSenhaData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: ""
  });

  const [dadosCobranca, setDadosCobranca] = useState({
    plano: "Premium",
    valor: "R$ 49,90/mês",
    proximaCobranca: "15/09/2024",
    cartao: "**** **** **** 1234"
  });

  const tabs = [
    { id: "perfil", label: "Dados do Casal", icon: Heart },
    { id: "senha", label: "Alterar Senha", icon: Lock },
    { id: "cobranca", label: "Dados de Cobrança", icon: CreditCard },
    { id: "conta", label: "Conta", icon: UserX }
  ];

  const handleSalvarDados = () => {
    // Aqui seria implementada a lógica para salvar no Supabase
    console.log("Salvando dados:", dadosCasal);
  };

  const handleAlterarSenha = () => {
    if (senhaData.novaSenha !== senhaData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    // Aqui seria implementada a lógica para alterar senha no Supabase
    console.log("Alterando senha...");
  };

  const handleCancelarAssinatura = () => {
    // Aqui seria implementada a lógica para cancelar assinatura
    console.log("Cancelando assinatura...");
  };

  const handleLogout = () => {
    // Aqui seria implementada a lógica de logout
    console.log("Fazendo logout...");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "perfil":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-2">Dados do Casal</h2>
              <p className="text-muted-foreground">Atualize as informações que aparecerão na central dos convidados</p>
            </div>

            {/* Fotos do Casal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Fotos do Casal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Label className="text-sm font-medium text-primary">Foto da Noiva</Label>
                    <div className="mt-2">
                      <Avatar className="h-24 w-24 mx-auto">
                        <AvatarImage src={dadosCasal.fotoNoiva} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">A</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Camera className="h-4 w-4 mr-2" />
                        Alterar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Label className="text-sm font-medium text-primary">Foto do Noivo</Label>
                    <div className="mt-2">
                      <Avatar className="h-24 w-24 mx-auto">
                        <AvatarImage src={dadosCasal.fotoNoivo} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">J</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Camera className="h-4 w-4 mr-2" />
                        Alterar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <Label className="text-sm font-medium text-primary">Foto do Casal</Label>
                    <div className="mt-2">
                      <Avatar className="h-24 w-24 mx-auto">
                        <AvatarImage src={dadosCasal.fotoCasal} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">♥</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="mt-2">
                        <Camera className="h-4 w-4 mr-2" />
                        Alterar
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dados Pessoais */}
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nomeNoiva">Nome da Noiva</Label>
                    <Input
                      id="nomeNoiva"
                      value={dadosCasal.nomeNoiva}
                      onChange={(e) => setDadosCasal({...dadosCasal, nomeNoiva: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nomeNoivo">Nome do Noivo</Label>
                    <Input
                      id="nomeNoivo"
                      value={dadosCasal.nomeNoivo}
                      onChange={(e) => setDadosCasal({...dadosCasal, nomeNoivo: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="dataCasamento">Data do Casamento</Label>
                  <Input
                    id="dataCasamento"
                    type="date"
                    value={dadosCasal.dataCasamento}
                    onChange={(e) => setDadosCasal({...dadosCasal, dataCasamento: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="localCerimonia">Local da Cerimônia</Label>
                    <Input
                      id="localCerimonia"
                      value={dadosCasal.localCerimonia}
                      onChange={(e) => setDadosCasal({...dadosCasal, localCerimonia: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="localRecepcao">Local da Recepção</Label>
                    <Input
                      id="localRecepcao"
                      value={dadosCasal.localRecepcao}
                      onChange={(e) => setDadosCasal({...dadosCasal, localRecepcao: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="historia">Nossa História</Label>
                  <Textarea
                    id="historia"
                    placeholder="Conte como vocês se conheceram..."
                    value={dadosCasal.historia}
                    onChange={(e) => setDadosCasal({...dadosCasal, historia: e.target.value})}
                    className="min-h-[120px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSalvarDados} className="bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        );

      case "senha":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-2">Alterar Senha</h2>
              <p className="text-muted-foreground">Mantenha sua conta segura com uma senha forte</p>
            </div>

            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Nova Senha</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="senhaAtual">Senha Atual</Label>
                  <div className="relative">
                    <Input
                      id="senhaAtual"
                      type={showPassword ? "text" : "password"}
                      value={senhaData.senhaAtual}
                      onChange={(e) => setSenhaData({...senhaData, senhaAtual: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="novaSenha">Nova Senha</Label>
                  <div className="relative">
                    <Input
                      id="novaSenha"
                      type={showNewPassword ? "text" : "password"}
                      value={senhaData.novaSenha}
                      onChange={(e) => setSenhaData({...senhaData, novaSenha: e.target.value})}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                  <Input
                    id="confirmarSenha"
                    type="password"
                    value={senhaData.confirmarSenha}
                    onChange={(e) => setSenhaData({...senhaData, confirmarSenha: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleAlterarSenha} className="w-full bg-primary hover:bg-primary/90">
                  <Lock className="h-4 w-4 mr-2" />
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "cobranca":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-2">Dados de Cobrança</h2>
              <p className="text-muted-foreground">Gerencie sua assinatura e dados de pagamento</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Plano Atual
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {dadosCobranca.plano}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Valor</Label>
                    <p className="text-2xl font-bold text-primary">{dadosCobranca.valor}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Próxima Cobrança</Label>
                    <p className="text-lg font-semibold">{dadosCobranca.proximaCobranca}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Cartão</Label>
                    <p className="text-lg font-semibold">{dadosCobranca.cartao}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Alterar Cartão
                  </Button>
                  <Button variant="outline">
                    Histórico de Pagamentos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "conta":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-2">Configurações da Conta</h2>
              <p className="text-muted-foreground">Gerencie sua conta e preferências</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <h3 className="font-semibold text-destructive mb-2">Cancelar Assinatura</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Ao cancelar sua assinatura, você perderá acesso aos recursos premium, 
                    mas seus dados serão mantidos por 30 dias caso deseje reativar.
                  </p>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">
                        <UserX className="h-4 w-4 mr-2" />
                        Cancelar Assinatura
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação cancelará sua assinatura premium. Você pode reativar 
                          dentro de 30 dias sem perder seus dados.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleCancelarAssinatura} className="bg-destructive hover:bg-destructive/90">
                          Confirmar Cancelamento
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-semibold mb-2">Sair da Conta</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Você será desconectada e precisará fazer login novamente.
                  </p>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair da Conta
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Fazer Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja sair da sua conta?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Configurações</h1>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e preferências da conta</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap",
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-[500px]">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ConfiguracoesPage;