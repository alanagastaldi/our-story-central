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
import { Plus, Calendar, Users, Heart, Camera, Music, Utensils, Gift, Download, Edit3, Trash2, Filter, CheckCircle2, Clock } from 'lucide-react';

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
    // Planejamento Inicial
    { id: '1', title: 'Definir a data e local do casamento', completed: false, category: 'Planejamento Inicial', priority: 'alta' },
    { id: '2', title: 'Definir o orçamento total', completed: false, category: 'Planejamento Inicial', priority: 'alta' },
    { id: '3', title: 'Criar planilha de controle de gastos', completed: false, category: 'Planejamento Inicial', priority: 'alta' },
    { id: '4', title: 'Conversar com a família sobre regime de bens', completed: false, category: 'Planejamento Inicial', priority: 'media' },
    { id: '5', title: 'Verificar documentação necessária para casamento civil', completed: false, category: 'Planejamento Inicial', priority: 'alta' },
    { id: '6', title: 'Agendar o casamento civil', completed: false, category: 'Planejamento Inicial', priority: 'alta' },
    { id: '7', title: 'Reservar a data no cartório', completed: false, category: 'Planejamento Inicial', priority: 'alta' },
    { id: '8', title: 'Escolher padrinhos e madrinhas', completed: false, category: 'Planejamento Inicial', priority: 'media' },
    { id: '9', title: 'Definir data final dos pedidos', completed: false, category: 'Planejamento Inicial', priority: 'media' },
    { id: '10', title: 'Fazer lista de convidados', completed: false, category: 'Planejamento Inicial', priority: 'media' },
    { id: '11', title: 'Fazer teste de cabelo e maquiagem', completed: false, category: 'Planejamento Inicial', priority: 'media' },
    { id: '12', title: 'Fazer acompanhamento dertal', completed: false, category: 'Planejamento Inicial', priority: 'baixa' },
    { id: '13', title: 'Cuidar da alimentação', completed: false, category: 'Planejamento Inicial', priority: 'baixa' },
    { id: '14', title: 'Fazer silicone ou limpeza de pele', completed: false, category: 'Planejamento Inicial', priority: 'baixa' },
    { id: '15', title: 'Fazer acompanhamento estético (opcional)', completed: false, category: 'Planejamento Inicial', priority: 'baixa' },
    { id: '16', title: 'Ir à academia / fazer cardio', completed: false, category: 'Planejamento Inicial', priority: 'baixa' },
    { id: '17', title: 'Agendar depilação', completed: false, category: 'Planejamento Inicial', priority: 'baixa' },
    { id: '18', title: 'Escrever votos', completed: false, category: 'Planejamento Inicial', priority: 'media' },

    // Local & Assessoria
    { id: '19', title: 'Escolher o local da cerimônia', completed: false, category: 'Local & Assessoria', priority: 'alta' },
    { id: '20', title: 'Escolher assessoria', completed: false, category: 'Local & Assessoria', priority: 'alta' },
    { id: '21', title: 'Escolher o local da recepção (caso separado)', completed: false, category: 'Local & Assessoria', priority: 'alta' },
    { id: '22', title: 'Fazer visita técnica(s) local(is)', completed: false, category: 'Local & Assessoria', priority: 'media' },
    { id: '23', title: 'Contratar assessora/cerimonialista', completed: false, category: 'Local & Assessoria', priority: 'media' },
    { id: '24', title: 'Roteiro da cerimônia', completed: false, category: 'Local & Assessoria', priority: 'baixa' },
    { id: '25', title: 'Roteiro da recepção', completed: false, category: 'Local & Assessoria', priority: 'baixa' },
    { id: '26', title: 'Alinhamento final com fornecedores e cerimonial', completed: false, category: 'Local & Assessoria', priority: 'alta' },

    // Recepção & Decoração
    { id: '27', title: 'Escolher paleta de cores', completed: false, category: 'Recepção & Decoração', priority: 'media' },
    { id: '28', title: 'Escolher tema da decoração', completed: false, category: 'Recepção & Decoração', priority: 'media' },
    { id: '29', title: 'Criar moodboard de referências (Pinterest ajuda muito!)', completed: false, category: 'Recepção & Decoração', priority: 'baixa' },
    { id: '30', title: 'Contratar decoradora', completed: false, category: 'Recepção & Decoração', priority: 'alta' },
    { id: '31', title: 'Contratar florista', completed: false, category: 'Recepção & Decoração', priority: 'media' },
    { id: '32', title: 'Reunião com DJ/Banda e decoradora', completed: false, category: 'Recepção & Decoração', priority: 'media' },
    { id: '33', title: 'Definir arranjos das mesas', completed: false, category: 'Recepção & Decoração', priority: 'media' },
    { id: '34', title: 'Definir vasos e objetos', completed: false, category: 'Recepção & Decoração', priority: 'baixa' },
    { id: '35', title: 'Definir pista de dança', completed: false, category: 'Recepção & Decoração', priority: 'baixa' },
    { id: '36', title: 'Contratar atrações (música, banda, capoeirista etc.)', completed: false, category: 'Recepção & Decoração', priority: 'baixa' },
    { id: '37', title: 'Contratar DJ ou Banda', completed: false, category: 'Recepção & Decoração', priority: 'alta' },
    { id: '38', title: 'Reunião com DJ/Banda para definir as músicas', completed: false, category: 'Recepção & Decoração', priority: 'media' },

    // Noiva
    { id: '39', title: 'Escolher o vestido de noiva', completed: false, category: 'Noiva', priority: 'alta' },
    { id: '40', title: 'Provar vestido + realizar ajustes', completed: false, category: 'Noiva', priority: 'alta' },
    { id: '41', title: 'Escolher véu', completed: false, category: 'Noiva', priority: 'media' },
    { id: '42', title: 'Escolher joias', completed: false, category: 'Noiva', priority: 'media' },
    { id: '43', title: 'Comprar sapato', completed: false, category: 'Noiva', priority: 'media' },
    { id: '44', title: 'Escolher buquê (principal e reserva)', completed: false, category: 'Noiva', priority: 'media' },
    { id: '45', title: 'Provar o buquê', completed: false, category: 'Noiva', priority: 'baixa' },
    { id: '46', title: 'Escolher acessórios (grinalda, brincos, etc.)', completed: false, category: 'Noiva', priority: 'baixa' },
    { id: '47', title: 'Reservar "Dia da Noiva"', completed: false, category: 'Noiva', priority: 'media' },
    { id: '48', title: 'Contratar cabelo e maquiagem', completed: false, category: 'Noiva', priority: 'alta' },

    // Gastronomia
    { id: '49', title: 'Escolher e contratar buffet', completed: false, category: 'Gastronomia', priority: 'alta' },
    { id: '50', title: 'Degustação do buffet', completed: false, category: 'Gastronomia', priority: 'alta' },
    { id: '51', title: 'Contratar bar / bartender', completed: false, category: 'Gastronomia', priority: 'media' },
    { id: '52', title: 'Definir drinks personalizados', completed: false, category: 'Gastronomia', priority: 'baixa' },
    { id: '53', title: 'Contratar bolo verdadeiro', completed: false, category: 'Gastronomia', priority: 'media' },
    { id: '54', title: 'Contratar bolo fake', completed: false, category: 'Gastronomia', priority: 'baixa' },
    { id: '55', title: 'Contratar docinhos', completed: false, category: 'Gastronomia', priority: 'media' },
    { id: '56', title: 'Contratar bem-casados', completed: false, category: 'Gastronomia', priority: 'baixa' },
    { id: '57', title: 'Definir mesa de doces', completed: false, category: 'Gastronomia', priority: 'baixa' },

    // Foto e Vídeo
    { id: '58', title: 'Contratar fotógrafo', completed: false, category: 'Foto e Vídeo', priority: 'alta' },
    { id: '59', title: 'Contratar equipe de filmagem', completed: false, category: 'Foto e Vídeo', priority: 'media' },
    { id: '60', title: 'Fazer pré-wedding', completed: false, category: 'Foto e Vídeo', priority: 'media' },
    { id: '61', title: 'Agendar sessão com o noivo', completed: false, category: 'Foto e Vídeo', priority: 'baixa' },
    { id: '62', title: 'Fazer sessão boudoir (opcional)', completed: false, category: 'Foto e Vídeo', priority: 'baixa' },
    { id: '63', title: 'Confirmar horário com fotógrafo no dia', completed: false, category: 'Foto e Vídeo', priority: 'alta' },
    { id: '64', title: 'Lista de fotos obrigatórias (com quem você quer foto)', completed: false, category: 'Foto e Vídeo', priority: 'media' },

    // Convites & Papelaria
    { id: '65', title: 'Criar site do casamento', completed: false, category: 'Convites & Papelaria', priority: 'media' },
    { id: '66', title: 'Definir identidade visual e papelaria', completed: false, category: 'Convites & Papelaria', priority: 'media' },
    { id: '67', title: 'Contratar designer de papelaria', completed: false, category: 'Convites & Papelaria', priority: 'baixa' },
    { id: '68', title: 'Fazer convite oficial', completed: false, category: 'Convites & Papelaria', priority: 'alta' },
    { id: '69', title: 'Save the Date', completed: false, category: 'Convites & Papelaria', priority: 'baixa' },
    { id: '70', title: 'Enviar Save the Date', completed: false, category: 'Convites & Papelaria', priority: 'baixa' },
    { id: '71', title: 'Entregar convites físicos', completed: false, category: 'Convites & Papelaria', priority: 'alta' },
    { id: '72', title: 'Enviar convites digitais', completed: false, category: 'Convites & Papelaria', priority: 'alta' },
    { id: '73', title: 'Criar lista de presentes (com links de lojas)', completed: false, category: 'Convites & Papelaria', priority: 'media' },
    { id: '74', title: 'Criar RSVP no site', completed: false, category: 'Convites & Papelaria', priority: 'media' },
    { id: '75', title: 'Confirmar presença dos convidados', completed: false, category: 'Convites & Papelaria', priority: 'alta' },
    { id: '76', title: 'Definir lembrancinhas', completed: false, category: 'Convites & Papelaria', priority: 'baixa' },
    { id: '77', title: 'Contratar lembrancinhas', completed: false, category: 'Convites & Papelaria', priority: 'baixa' },

    // Detalhes Finais
    { id: '78', title: 'Escolher alianças', completed: false, category: 'Detalhes Finais', priority: 'alta' },
    { id: '79', title: 'Gravar as alianças', completed: false, category: 'Detalhes Finais', priority: 'media' },
    { id: '80', title: 'Alinhar quem entra com quem na cerimônia', completed: false, category: 'Detalhes Finais', priority: 'media' },
    { id: '81', title: 'Reservar noite de núpcias', completed: false, category: 'Detalhes Finais', priority: 'baixa' },
    { id: '82', title: 'Fazer ensaio no local', completed: false, category: 'Detalhes Finais', priority: 'media' },
    { id: '83', title: 'Checklist final com todos os fornecedores', completed: false, category: 'Detalhes Finais', priority: 'alta' },
    { id: '84', title: 'Reunião final com cerimonialista', completed: false, category: 'Detalhes Finais', priority: 'alta' },
    { id: '85', title: 'Confirmar horários de entrega/montagem com todos', completed: false, category: 'Detalhes Finais', priority: 'alta' },
    { id: '86', title: 'Separar kit emergência da noiva (aspirina, fio dental, costura, etc.)', completed: false, category: 'Detalhes Finais', priority: 'media' },
    { id: '87', title: 'Visita técnica no local do casamento para alinhamento final', completed: false, category: 'Detalhes Finais', priority: 'media' },

    // Lua de Mel
    { id: '88', title: 'Definir destino da lua de mel', completed: false, category: 'Lua de Mel', priority: 'media' },
    { id: '89', title: 'Comprar passagens', completed: false, category: 'Lua de Mel', priority: 'media' },
    { id: '90', title: 'Reservar hotel/airbnb', completed: false, category: 'Lua de Mel', priority: 'media' },
    { id: '91', title: 'Providenciar passaporte/visto (se necessário)', completed: false, category: 'Lua de Mel', priority: 'alta' },
    { id: '92', title: 'Fazer mala de lua de mel', completed: false, category: 'Lua de Mel', priority: 'baixa' },
    { id: '93', title: 'Agendar transporte até o aeroporto', completed: false, category: 'Lua de Mel', priority: 'baixa' },

    // Pré-evento & Bastidores
    { id: '94', title: 'Definir responsável por levar e buscar vestido, terno e acessórios no dia', completed: false, category: 'Pré-evento & Bastidores', priority: 'alta' },
    { id: '95', title: 'Definir quem fica com alianças até a hora da cerimônia', completed: false, category: 'Pré-evento & Bastidores', priority: 'alta' },
    { id: '96', title: 'Levar saúde buriti para o making of (vestido e terno)', completed: false, category: 'Pré-evento & Bastidores', priority: 'baixa' },
    { id: '97', title: 'Separar roupa leve e camisola para o making of da noiva', completed: false, category: 'Pré-evento & Bastidores', priority: 'baixa' },
    { id: '98', title: 'Definir quem vai usar no dia', completed: false, category: 'Pré-evento & Bastidores', priority: 'media' },
    { id: '99', title: 'Definir responsável por levar buquê, véu e acessórios (para captarem o making of)', completed: false, category: 'Pré-evento & Bastidores', priority: 'media' },
    { id: '100', title: 'Alinhar horários do salão com fotógrafo/videomaker (para captarem o making of)', completed: false, category: 'Pré-evento & Bastidores', priority: 'media' },

    // Pós-evento
    { id: '101', title: 'Definir quem ficará responsável por recolher e guardar os presentes', completed: false, category: 'Pós-evento', priority: 'media' },
    { id: '102', title: 'Definir quem levará os doces e bolo que sobrarem', completed: false, category: 'Pós-evento', priority: 'baixa' },
    { id: '103', title: 'Combinar com alguém para guardar fotos do bolo e lembrancinhas extras', completed: false, category: 'Pós-evento', priority: 'baixa' },
    { id: '104', title: 'Ver se o vestido precisa ser lavado antes de ficar guardado (onde fazer se sim)', completed: false, category: 'Pós-evento', priority: 'baixa' },
    { id: '105', title: 'Marcar data para pegar fotos e vídeos dos fornecedores (opcional)', completed: false, category: 'Pós-evento', priority: 'baixa' },
    { id: '106', title: 'Fazer álbum de fotos', completed: false, category: 'Pós-evento', priority: 'baixa' },
    { id: '107', title: 'Escrever cartões de agradecimento aos convidados (opcional)', completed: false, category: 'Pós-evento', priority: 'baixa' },
    { id: '108', title: 'Postar agradecimento nas redes sociais', completed: false, category: 'Pós-evento', priority: 'baixa' },
    { id: '109', title: 'Guardar buquê ou mandar desidratar/secar (se quiser manter de recordação)', completed: false, category: 'Pós-evento', priority: 'baixa' },
    { id: '110', title: 'Solicitar mais formal ou só resto de todos os fornecedores', completed: false, category: 'Pós-evento', priority: 'baixa' },

    // Eventos Paralelos do Casamento
    { id: '111', title: 'Chá de Panela / Chá Bar / Chá de Casa Nova', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '112', title: 'Definir tipo do evento (chá de panela, bar, casa nova, misto etc.)', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '113', title: 'Definir local (casa, salão, restaurante...)', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '114', title: 'Criar lista com/dados', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '115', title: 'Escolher o tema e a decoração', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '116', title: 'Criar identidade visual / convite', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '117', title: 'Fazer lista de presentes (separada do casamento)', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '118', title: 'Enviar convites', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '119', title: 'Definir responsável pela organização', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '120', title: 'Contratar buffet e DJ, agendar comes e bebes', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '121', title: 'Criar brincadeiras e roteiro e bebes', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },
    { id: '122', title: 'Definir quem vai registrar (foto/vídeo)', completed: false, category: 'Eventos Paralelos', priority: 'baixa' },

    // Chá de Lingerie
    { id: '123', title: 'Definir local (salão, casa, spa, hotel etc.)', completed: false, category: 'Chá de Lingerie', priority: 'baixa' },
    { id: '124', title: 'Convidar apenas amigas íntimas (atenção ao perfil!)', completed: false, category: 'Chá de Lingerie', priority: 'baixa' },
    { id: '125', title: 'Criar lista de lingeries (tamanhos e estilos)', completed: false, category: 'Chá de Lingerie', priority: 'baixa' },
    { id: '126', title: 'Criar convite criativo', completed: false, category: 'Chá de Lingerie', priority: 'baixa' },
    { id: '127', title: 'Escolher decoração (pode ser sensual e divertida)', completed: false, category: 'Chá de Lingerie', priority: 'baixa' },
    { id: '128', title: 'Preparar playlist animada', completed: false, category: 'Chá de Lingerie', priority: 'baixa' },
    { id: '129', title: 'Criar jogos e brincadeiras (pode ser mais livre)', completed: false, category: 'Chá de Lingerie', priority: 'baixa' },
    { id: '130', title: 'Separar bebidas e comidinhas leves', completed: false, category: 'Chá de Lingerie', priority: 'baixa' },
    { id: '131', title: 'Organizar mimo para as convidadas', completed: false, category: 'Chá de Lingerie', priority: 'baixa' },

    // Despedida de Solteira(o)
    { id: '132', title: 'Escolher o estilo (viagem, festa, bar, jantar, day spa etc.)', completed: false, category: 'Despedida de Solteira(o)', priority: 'baixa' },
    { id: '133', title: 'Definir quem vai organizar (noiva, madrinhas, amigas etc.)', completed: false, category: 'Despedida de Solteira(o)', priority: 'baixa' },
    { id: '134', title: 'Definir orçamento', completed: false, category: 'Despedida de Solteira(o)', priority: 'baixa' },
    { id: '135', title: 'Marcar data e local', completed: false, category: 'Despedida de Solteira(o)', priority: 'baixa' },
    { id: '136', title: 'Criar identidade visual (camisetas, ex "Team Bride", "Bye Bye Solteira"...)', completed: false, category: 'Despedida de Solteira(o)', priority: 'baixa' },
    { id: '137', title: 'Criar lembrancinha aos convidados (camisetas, bottons, brindes)', completed: false, category: 'Despedida de Solteira(o)', priority: 'baixa' },

    // Pré-Wedding / Ensaio Fotográfico
    { id: '138', title: 'Definir estilo (casual, romântico, praia, campo...)', completed: false, category: 'Pré-Wedding', priority: 'baixa' },
    { id: '139', title: 'Escolher local', completed: false, category: 'Pré-Wedding', priority: 'baixa' },
    { id: '140', title: 'Agendar data com fotógrafo', completed: false, category: 'Pré-Wedding', priority: 'baixa' },
    { id: '141', title: 'Escolher looks (roupas combinando ou complementares)', completed: false, category: 'Pré-Wedding', priority: 'baixa' },
    { id: '142', title: 'Verificar clima / previsão do tempo', completed: false, category: 'Pré-Wedding', priority: 'baixa' },
    { id: '143', title: 'Levar acessórios e props (plaquinhas, planilhas "save the date" etc.)', completed: false, category: 'Pré-Wedding', priority: 'baixa' },
    { id: '144', title: 'Pensar em penteado e make (leve ou criativa alguém)', completed: false, category: 'Pré-Wedding', priority: 'baixa' },
    { id: '145', title: 'Levar água, lanches e toalha se for externo', completed: false, category: 'Pré-Wedding', priority: 'baixa' },
    { id: '146', title: 'Organizar transporte se for longe', completed: false, category: 'Pré-Wedding', priority: 'baixa' },

    // Jantar dos Padrinhos / Ensaio Geral
    { id: '147', title: 'Marcar data com todos os padrinhos e pais', completed: false, category: 'Jantar dos Padrinhos', priority: 'baixa' },
    { id: '148', title: 'Escolher local do jantar', completed: false, category: 'Jantar dos Padrinhos', priority: 'baixa' },
    { id: '149', title: 'Ensaiar as entradas (pais, padrinhos, noivos, daminhas etc.)', completed: false, category: 'Jantar dos Padrinhos', priority: 'media' },
    { id: '150', title: 'Repassar roteiro da cerimônia', completed: false, category: 'Jantar dos Padrinhos', priority: 'media' },
    { id: '151', title: 'Entregar kits dos padrinhos com todas as informações importantes (horários, endereços no grande dia)', completed: false, category: 'Jantar dos Padrinhos', priority: 'media' },

    // Preparação Pessoal e Logística do Dia
    { id: '152', title: 'Fazer mala para o local da cerimônia com tudo mesmo', completed: false, category: 'Preparação Pessoal', priority: 'alta' },
    { id: '153', title: 'documento, aliança, escova de dente...)', completed: false, category: 'Preparação Pessoal', priority: 'alta' },
    { id: '154', title: 'Levar uma muda de roupa confortável para depois da festa', completed: false, category: 'Preparação Pessoal', priority: 'baixa' },
    { id: '155', title: 'Levar necessaire com itens de emergência (desodorante, perfume, etc.)', completed: false, category: 'Preparação Pessoal', priority: 'media' },
    { id: '156', title: 'Separar kit de costura básico para machucado (band-aid, esparadrapo, etc.)', completed: false, category: 'Preparação Pessoal', priority: 'media' },
    { id: '157', title: 'Levar lanchinhos leve para comer antes de vestir o sapato', completed: false, category: 'Preparação Pessoal', priority: 'baixa' },
    { id: '158', title: 'Levar água isotônico para se hidratar antes e depois da cerimônia', completed: false, category: 'Preparação Pessoal', priority: 'baixa' },
    { id: '159', title: 'Colocar nome do noivo no sapato das madrinhas (superstição tradicional)', completed: false, category: 'Preparação Pessoal', priority: 'baixa' },

    // Noivo
    { id: '160', title: 'Escolher e comprar/alugar terno ou traje', completed: false, category: 'Noivo', priority: 'alta' },
    { id: '161', title: 'Escolher acessórios (abotoado, gravata, suspensório)', completed: false, category: 'Noivo', priority: 'media' },
    { id: '162', title: 'Fazer barba e corte de cabelo', completed: false, category: 'Noivo', priority: 'media' },
    { id: '163', title: 'Escrever votos', completed: false, category: 'Noivo', priority: 'media' }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [filterStatus, setFilterStatus] = useState<'todas' | 'concluidas' | 'pendentes'>('todas');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ChecklistItem | null>(null);
  const [newItem, setNewItem] = useState({
    title: '',
    category: 'Planejamento Inicial',
    priority: 'media' as 'alta' | 'media' | 'baixa',
    deadline: ''
  });

  const categories = [
    'Todas',
    'Planejamento Inicial',
    'Local & Assessoria',
    'Recepção & Decoração',
    'Noiva',
    'Gastronomia',
    'Foto e Vídeo',
    'Convites & Papelaria',
    'Detalhes Finais',
    'Lua de Mel',
    'Pré-evento & Bastidores',
    'Pós-evento',
    'Eventos Paralelos',
    'Chá de Lingerie',
    'Despedida de Solteira(o)',
    'Pré-Wedding',
    'Jantar dos Padrinhos',
    'Preparação Pessoal',
    'Noivo'
  ];

  const toggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addNewItem = () => {
    if (!newItem.title.trim()) return;
    
    const item: ChecklistItem = {
      id: Date.now().toString(),
      title: newItem.title,
      completed: false,
      category: newItem.category,
      priority: newItem.priority,
      deadline: newItem.deadline || undefined
    };
    
    setItems([...items, item]);
    setNewItem({ title: '', category: 'Planejamento Inicial', priority: 'media', deadline: '' });
    setIsAddDialogOpen(false);
  };

  const updateItem = () => {
    if (!editingItem || !editingItem.title.trim()) return;
    
    setItems(items.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    setEditingItem(null);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const generatePDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Checklist do Casamento</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .progress { margin-bottom: 20px; }
            .item { margin-bottom: 10px; padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
            .completed { background-color: #f0f9ff; }
            .category { font-weight: bold; color: #666; }
            .priority { padding: 2px 8px; border-radius: 4px; font-size: 12px; }
            .alta { background-color: #fee2e2; color: #dc2626; }
            .media { background-color: #fef3c7; color: #d97706; }
            .baixa { background-color: #dcfce7; color: #16a34a; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>✅ Checklist do Casamento</h1>
            <p>Progresso: ${completedItems}/${totalItems} itens concluídos (${progressPercentage.toFixed(1)}%)</p>
          </div>
          ${filteredItems.map(item => `
            <div class="item ${item.completed ? 'completed' : ''}">
              <div>
                <strong>${item.completed ? '✅' : '⬜'} ${item.title}</strong>
                <span class="priority ${item.priority}">${item.priority}</span>
              </div>
              <div class="category">${item.category}${item.deadline ? ` • ${item.deadline}` : ''}</div>
            </div>
          `).join('')}
        </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

  let filteredItems = selectedCategory === 'Todas' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  // Apply status filter
  if (filterStatus === 'concluidas') {
    filteredItems = filteredItems.filter(item => item.completed);
  } else if (filterStatus === 'pendentes') {
    filteredItems = filteredItems.filter(item => !item.completed);
  }

  const completedItems = items.filter(item => item.completed).length;
  const totalItems = items.length;
  const progressPercentage = (completedItems / totalItems) * 100;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'media': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'baixa': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-white p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Elegante */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              Checklist do Casamento
            </h1>
          </div>
          <p className="text-gray-600 text-lg font-medium">Organize cada detalhe do seu grande dia com amor e cuidado</p>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-wrap gap-3">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-rose-600">Adicionar Nova Tarefa</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Título da tarefa"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                  />
                  <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== 'Todas').map(cat => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={newItem.priority} onValueChange={(value: 'alta' | 'media' | 'baixa') => setNewItem({...newItem, priority: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="media">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Prazo (ex: 6 meses antes)"
                    value={newItem.deadline}
                    onChange={(e) => setNewItem({...newItem, deadline: e.target.value})}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={addNewItem} className="bg-rose-500 hover:bg-rose-600">
                      Adicionar
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button 
              variant="outline" 
              onClick={generatePDF}
              className="border-rose-200 text-rose-600 hover:bg-rose-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar PDF
            </Button>
          </div>

          {/* Filter Status */}
          <div className="flex gap-2">
            <Button
              variant={filterStatus === 'todas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('todas')}
              className={filterStatus === 'todas' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              Todas
            </Button>
            <Button
              variant={filterStatus === 'pendentes' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('pendentes')}
              className={filterStatus === 'pendentes' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              <Clock className="w-3 h-3 mr-1" />
              Pendentes
            </Button>
            <Button
              variant={filterStatus === 'concluidas' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('concluidas')}
              className={filterStatus === 'concluidas' ? 'bg-rose-500 hover:bg-rose-600' : ''}
            >
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Concluídas
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card className="bg-white/70 backdrop-blur-sm border-rose-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Progresso Geral
              </span>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {completedItems}/{totalItems} concluídos
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Progress 
                value={progressPercentage} 
                className="h-4 bg-rose-100" 
              />
              <p className="text-gray-700 font-medium text-center">
                🎉 {progressPercentage.toFixed(1)}% do seu sonho já está realizado!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-300 ${
                selectedCategory === category 
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg scale-105' 
                  : 'border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300'
              }`}
            >
              {getCategoryIcon(category)}
              <span className="ml-2">{category}</span>
            </Button>
          ))}
        </div>

        {/* Checklist Items */}
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className={`transition-all duration-500 hover-scale ${
                item.completed 
                  ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 opacity-80' 
                  : 'bg-white/70 backdrop-blur-sm border-rose-100 hover:shadow-xl hover:border-rose-200'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="mt-1">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="w-5 h-5 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-semibold text-lg leading-6 ${
                      item.completed 
                        ? 'line-through text-gray-500' 
                        : 'text-gray-900'
                    }`}>
                      {item.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Badge variant="outline" className="bg-rose-50 border-rose-200 text-rose-700">
                        {getCategoryIcon(item.category)}
                        <span className="ml-1">{item.category}</span>
                      </Badge>
                      
                      {item.deadline && (
                        <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.deadline}
                        </Badge>
                      )}
                      
                      <Badge className={`${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingItem(item)}
                          className="text-gray-500 hover:text-rose-600 hover:bg-rose-50"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle className="text-rose-600">Editar Tarefa</DialogTitle>
                        </DialogHeader>
                        {editingItem && (
                          <div className="space-y-4">
                            <Input
                              placeholder="Título da tarefa"
                              value={editingItem.title}
                              onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                            />
                            <Select 
                              value={editingItem.category} 
                              onValueChange={(value) => setEditingItem({...editingItem, category: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Categoria" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.filter(cat => cat !== 'Todas').map(cat => (
                                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Select 
                              value={editingItem.priority} 
                              onValueChange={(value: 'alta' | 'media' | 'baixa') => setEditingItem({...editingItem, priority: value})}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Prioridade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alta">Alta</SelectItem>
                                <SelectItem value="media">Média</SelectItem>
                                <SelectItem value="baixa">Baixa</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              placeholder="Prazo (ex: 6 meses antes)"
                              value={editingItem.deadline || ''}
                              onChange={(e) => setEditingItem({...editingItem, deadline: e.target.value})}
                            />
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" onClick={() => setEditingItem(null)}>
                                Cancelar
                              </Button>
                              <Button onClick={updateItem} className="bg-rose-500 hover:bg-rose-600">
                                Salvar
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteItem(item.id)}
                      className="text-gray-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-12 h-12 text-rose-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhum item encontrado</h3>
            <p className="text-gray-600 mb-6">Tente ajustar os filtros ou adicione uma nova tarefa</p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Primeira Tarefa
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChecklistComponent;