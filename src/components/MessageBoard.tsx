import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Send, MessageSquare } from "lucide-react";

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const MessageBoard = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages] = useState<Message[]>([
    {
      id: "1",
      name: "Maria Silva",
      message: "Que alegria imensa em poder celebrar esse momento tão especial com vocês! Desejo muito amor, felicidade e cumplicidade. ❤️",
      timestamp: "2 horas atrás"
    },
    {
      id: "2", 
      name: "João Santos",
      message: "Vocês são perfeitos um para o outro! Que Deus abençoe essa união e que seja repleta de momentos únicos e inesquecíveis! 🙏",
      timestamp: "5 horas atrás"
    },
    {
      id: "3",
      name: "Ana Costa",
      message: "Mal posso esperar para dançar na festa de vocês! Preparei meu look mais lindo para esse dia especial! 💃✨",
      timestamp: "1 dia atrás"
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && message.trim()) {
      // Em produção, enviaria para um backend
      alert("Mensagem enviada com sucesso! 💕");
      setName("");
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Send Message Form */}
      <Card className="border-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Deixe uma Mensagem Carinhosa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Seu nome</Label>
              <Input
                id="name"
                placeholder="Como você gostaria de assinar?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Sua mensagem</Label>
              <Textarea
                id="message"
                placeholder="Compartilhe seus votos de felicidade para os noivos..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              <Send className="w-4 h-4 mr-2" />
              Enviar Mensagem
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Messages Display */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Heart className="w-5 h-5 text-foreground" />
          Mensagens dos Convidados
        </h3>
        
        <div className="space-y-4">
          {messages.map((msg) => (
            <Card key={msg.id} className="bg-foreground/5 border-none">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{msg.name}</h4>
                    <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm leading-relaxed">{msg.message}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {messages.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-foreground" />
            <p>Seja o primeiro a deixar uma mensagem carinhosa! 💕</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBoard;