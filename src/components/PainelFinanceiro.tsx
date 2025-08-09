import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Trash2, Plus, DollarSign } from "lucide-react";

interface Gasto {
  id: string;
  categoria: string;
  descricao: string;
  valor: number;
  data: string;
}

const categorias = [
  "Decoração",
  "Buffet",
  "Vestido",
  "Música",
  "Fotografia",
  "Local",
  "Flores",
  "Convites",
  "Transporte",
  "Outros"
];

const cores = [
  "#F8BBD9",
  "#E4C1F9", 
  "#D0C4F7",
  "#C8B6E2",
  "#B8A9C9",
  "#DDD5EA",
  "#FFE5CC",
  "#FFE4B5",
  "#FFF2B2",
  "#B4C7E7"
];

const PainelFinanceiro = () => {
  const [gastos, setGastos] = useState<Gasto[]>([
    {
      id: "1",
      categoria: "Vestido",
      descricao: "Vestido da noiva",
      valor: 2500,
      data: "2024-01-15"
    },
    {
      id: "2", 
      categoria: "Buffet",
      descricao: "Jantar para 150 pessoas",
      valor: 8000,
      data: "2024-01-20"
    }
  ]);

  const [novoGasto, setNovoGasto] = useState({
    categoria: "",
    descricao: "",
    valor: "",
    data: ""
  });

  const [anotacoes, setAnotacoes] = useState("Orçamento total estimado: R$ 25.000\nReserva de emergência: 10%");

  const adicionarGasto = () => {
    if (novoGasto.categoria && novoGasto.descricao && novoGasto.valor) {
      const gasto: Gasto = {
        id: Date.now().toString(),
        categoria: novoGasto.categoria,
        descricao: novoGasto.descricao,
        valor: parseFloat(novoGasto.valor),
        data: novoGasto.data || new Date().toISOString().split('T')[0]
      };
      
      setGastos([...gastos, gasto]);
      setNovoGasto({ categoria: "", descricao: "", valor: "", data: "" });
    }
  };

  const removerGasto = (id: string) => {
    setGastos(gastos.filter(g => g.id !== id));
  };

  const totalGastos = gastos.reduce((total, gasto) => total + gasto.valor, 0);

  const dadosGrafico = categorias.map(categoria => {
    const totalCategoria = gastos
      .filter(g => g.categoria === categoria)
      .reduce((total, g) => total + g.valor, 0);
    
    return {
      name: categoria,
      value: totalCategoria,
      fill: cores[categorias.indexOf(categoria)]
    };
  }).filter(item => item.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Painel Financeiro</h2>
        <p className="text-gray-600">Gerencie todos os gastos do seu casamento</p>
      </div>

      {/* Resumo Financeiro */}
      <Card className="bg-gradient-to-r from-accent/10 to-accent/5 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Resumo dos Gastos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">
            R$ {totalGastos.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p className="text-gray-600 mt-1">{gastos.length} itens registrados</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Adicionar Novo Gasto */}
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Novo Gasto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="categoria">Categoria</Label>
              <Select 
                value={novoGasto.categoria} 
                onValueChange={(value) => setNovoGasto({...novoGasto, categoria: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                placeholder="Ex: Vestido da noiva, Flores da decoração..."
                value={novoGasto.descricao}
                onChange={(e) => setNovoGasto({...novoGasto, descricao: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="valor">Valor (R$)</Label>
                <Input
                  id="valor"
                  type="number"
                  placeholder="0,00"
                  value={novoGasto.valor}
                  onChange={(e) => setNovoGasto({...novoGasto, valor: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={novoGasto.data}
                  onChange={(e) => setNovoGasto({...novoGasto, data: e.target.value})}
                />
              </div>
            </div>
            
            <Button 
              onClick={adicionarGasto}
              className="w-full bg-foreground hover:bg-foreground/90 text-background"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Gasto
            </Button>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            {dadosGrafico.length > 0 ? (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosGrafico}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {dadosGrafico.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [
                        `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                        'Valor'
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                Adicione gastos para visualizar o gráfico
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Lista de Gastos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Gastos</CardTitle>
        </CardHeader>
        <CardContent>
          {gastos.length > 0 ? (
            <div className="space-y-3">
              {gastos.map((gasto) => (
                <div 
                  key={gasto.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary">{gasto.categoria}</Badge>
                      <span className="text-sm text-gray-500">{gasto.data}</span>
                    </div>
                    <p className="font-medium">{gasto.descricao}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg">
                      R$ {gasto.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removerGasto(gasto.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Nenhum gasto registrado ainda. Adicione o primeiro!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Anotações Financeiras */}
      <Card>
        <CardHeader>
          <CardTitle>Anotações Financeiras</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Anote aqui observações sobre o orçamento, lembretes, negociações..."
            value={anotacoes}
            onChange={(e) => setAnotacoes(e.target.value)}
            className="min-h-32"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PainelFinanceiro;