import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Upload, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nomeDaNoiva: z.string().min(2, "Nome da noiva é obrigatório"),
  nomeDoNoivoOuNoiva: z.string().min(2, "Nome do(a) parceiro(a) é obrigatório"),
  emailContato: z.string().email("E-mail inválido"),
  dataCasamento: z.date({ required_error: "Data do casamento é obrigatória" }),
  horarioCerimonia: z.string().optional(),
  localCasamento: z.string().min(2, "Local do casamento é obrigatório"),
  comoSeConheceram: z.string().max(280, "Máximo de 280 caracteres").min(10, "Conte um pouco mais sobre vocês"),
  estiloCasamento: z.string({ required_error: "Selecione um estilo" }),
  fotoCasal: z.any().optional(),
  receberLembretes: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

const FormularioPosPagamento = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [characterCount, setCharacterCount] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receberLembretes: true,
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("fotoCasal", file);
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    toast({
      title: "Dados salvos com sucesso! 💕",
      description: "Redirecionando para sua Central da Noiva...",
    });
    
    setTimeout(() => {
      navigate("/central-noivas");
    }, 1500);
  };

  const estilosCasamento = [
    "Clássico",
    "Rústico", 
    "Moderno",
    "Praia",
    "Intimista",
    "Outro"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 text-2xl opacity-40">💌</div>
      <div className="absolute top-20 right-12 text-xl opacity-30">💒</div>
      <div className="absolute bottom-20 left-12 text-xl opacity-30">📅</div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif text-slate-800 mb-4">
              Antes de começarmos, conte um pouco sobre vocês
            </h1>
            <p className="text-slate-600 text-lg">
              Vamos personalizar sua experiência para tornar este momento ainda mais especial
            </p>
          </div>

          {/* Form */}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-xl shadow-rose-200/30 p-8 border border-white/50">
              
              {/* Names Section */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <Label htmlFor="nomeDaNoiva" className="text-slate-700 font-medium flex items-center gap-2">
                    💐 Nome da Noiva
                  </Label>
                  <Input
                    id="nomeDaNoiva"
                    {...form.register("nomeDaNoiva")}
                    placeholder="Digite seu nome"
                    className="h-12 rounded-xl border-rose-200 focus:border-rose-300 focus:ring-rose-200 bg-white/70 transition-all duration-300 focus:shadow-lg focus:shadow-rose-200/30"
                  />
                  {form.formState.errors.nomeDaNoiva && (
                    <p className="text-red-500 text-sm">{form.formState.errors.nomeDaNoiva.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nomeDoNoivoOuNoiva" className="text-slate-700 font-medium flex items-center gap-2">
                    💍 Nome do Noivo ou da Noiva
                  </Label>
                  <Input
                    id="nomeDoNoivoOuNoiva"
                    {...form.register("nomeDoNoivoOuNoiva")}
                    placeholder="Nome do(a) parceiro(a)"
                    className="h-12 rounded-xl border-rose-200 focus:border-rose-300 focus:ring-rose-200 bg-white/70 transition-all duration-300 focus:shadow-lg focus:shadow-rose-200/30"
                  />
                  {form.formState.errors.nomeDoNoivoOuNoiva && (
                    <p className="text-red-500 text-sm">{form.formState.errors.nomeDoNoivoOuNoiva.message}</p>
                  )}
                </div>
              </div>

              {/* Contact Email */}
              <div className="space-y-2 mb-8">
                <Label htmlFor="emailContato" className="text-slate-700 font-medium flex items-center gap-2">
                  💌 E-mail de contato principal
                </Label>
                <Input
                  id="emailContato"
                  type="email"
                  {...form.register("emailContato")}
                  placeholder="seu@email.com"
                  className="h-12 rounded-xl border-rose-200 focus:border-rose-300 focus:ring-rose-200 bg-white/70 transition-all duration-300 focus:shadow-lg focus:shadow-rose-200/30"
                />
                {form.formState.errors.emailContato && (
                  <p className="text-red-500 text-sm">{form.formState.errors.emailContato.message}</p>
                )}
              </div>

              {/* Date and Time Section */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Wedding Date */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium flex items-center gap-2">
                    📅 Data do casamento
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "h-12 w-full justify-start text-left font-normal rounded-xl border-rose-200 focus:border-rose-300 bg-white/70",
                          !form.watch("dataCasamento") && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch("dataCasamento") ? (
                          format(form.watch("dataCasamento"), "dd/MM/yyyy")
                        ) : (
                          <span>Selecione a data</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.watch("dataCasamento")}
                        onSelect={(date) => form.setValue("dataCasamento", date!)}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.dataCasamento && (
                    <p className="text-red-500 text-sm">{form.formState.errors.dataCasamento.message}</p>
                  )}
                </div>

                {/* Ceremony Time */}
                <div className="space-y-2">
                  <Label htmlFor="horarioCerimonia" className="text-slate-700 font-medium flex items-center gap-2">
                    🕐 Horário da cerimônia (opcional)
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      id="horarioCerimonia"
                      type="time"
                      {...form.register("horarioCerimonia")}
                      className="h-12 pl-10 rounded-xl border-rose-200 focus:border-rose-300 focus:ring-rose-200 bg-white/70 transition-all duration-300 focus:shadow-lg focus:shadow-rose-200/30"
                    />
                  </div>
                </div>
              </div>

              {/* Wedding Location */}
              <div className="space-y-2 mb-8">
                <Label htmlFor="localCasamento" className="text-slate-700 font-medium flex items-center gap-2">
                  💒 Local do casamento
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    id="localCasamento"
                    {...form.register("localCasamento")}
                    placeholder="Igreja, salão, praia..."
                    className="h-12 pl-10 rounded-xl border-rose-200 focus:border-rose-300 focus:ring-rose-200 bg-white/70 transition-all duration-300 focus:shadow-lg focus:shadow-rose-200/30"
                  />
                </div>
                {form.formState.errors.localCasamento && (
                  <p className="text-red-500 text-sm">{form.formState.errors.localCasamento.message}</p>
                )}
              </div>

              {/* How They Met */}
              <div className="space-y-2 mb-8">
                <Label htmlFor="comoSeConheceram" className="text-slate-700 font-medium flex items-center gap-2">
                  💕 Como vocês se conheceram?
                </Label>
                <Textarea
                  id="comoSeConheceram"
                  {...form.register("comoSeConheceram")}
                  placeholder="Conte sua história de amor..."
                  className="min-h-24 rounded-xl border-rose-200 focus:border-rose-300 focus:ring-rose-200 bg-white/70 transition-all duration-300 focus:shadow-lg focus:shadow-rose-200/30 resize-none"
                  maxLength={280}
                  onChange={(e) => {
                    setCharacterCount(e.target.value.length);
                    form.setValue("comoSeConheceram", e.target.value);
                  }}
                />
                <div className="flex justify-between text-sm text-slate-500">
                  <span>{characterCount}/280 caracteres</span>
                  {form.formState.errors.comoSeConheceram && (
                    <span className="text-red-500">{form.formState.errors.comoSeConheceram.message}</span>
                  )}
                </div>
              </div>

              {/* Wedding Style */}
              <div className="space-y-2 mb-8">
                <Label className="text-slate-700 font-medium flex items-center gap-2">
                  ✨ Estilo do casamento
                </Label>
                <Select onValueChange={(value) => form.setValue("estiloCasamento", value)}>
                  <SelectTrigger className="h-12 rounded-xl border-rose-200 focus:border-rose-300 focus:ring-rose-200 bg-white/70">
                    <SelectValue placeholder="Selecione o estilo" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-rose-200">
                    {estilosCasamento.map((estilo) => (
                      <SelectItem key={estilo} value={estilo}>
                        {estilo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.estiloCasamento && (
                  <p className="text-red-500 text-sm">{form.formState.errors.estiloCasamento.message}</p>
                )}
              </div>

              {/* Photo Upload */}
              <div className="space-y-4 mb-8">
                <Label className="text-slate-700 font-medium flex items-center gap-2">
                  📸 Foto do casal
                </Label>
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-full border-4 border-rose-200 border-dashed bg-white/50 flex items-center justify-center overflow-hidden">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="text-rose-300 h-8 w-8" />
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-sm text-slate-500 text-center">
                    Clique para adicionar uma foto
                  </p>
                </div>
              </div>

              {/* Email Reminders Toggle */}
              <div className="flex items-center justify-between p-4 bg-rose-50/50 rounded-xl mb-8">
                <div className="space-y-1">
                  <Label className="text-slate-700 font-medium flex items-center gap-2">
                    🔔 Receber lembretes por e-mail
                  </Label>
                  <p className="text-sm text-slate-500">
                    Receba dicas e lembretes importantes para seu casamento
                  </p>
                </div>
                <Switch
                  checked={form.watch("receberLembretes")}
                  onCheckedChange={(checked) => form.setValue("receberLembretes", checked)}
                  className="data-[state=checked]:bg-rose-400"
                />
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="h-14 px-12 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-800/30 transform hover:scale-105"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Salvando..." : "Salvar e ir para a Central da Noiva"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormularioPosPagamento;