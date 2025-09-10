import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Clock, User, ArrowRight } from "lucide-react";

export function RecentConversations() {
  const conversations = [
    {
      id: "1",
      userName: "Maria Silva",
      userPhone: "+55 11 99999-1234",
      lastMessage: "Preciso de informações sobre horário de funcionamento",
      timestamp: "2 min atrás",
      status: "active",
      messageCount: 3,
      isBot: true
    },
    {
      id: "2", 
      userName: "João Santos",
      userPhone: "+55 11 99999-5678",
      lastMessage: "Obrigado pela ajuda! Problema resolvido.",
      timestamp: "15 min atrás",
      status: "resolved",
      messageCount: 8,
      isBot: true
    },
    {
      id: "3",
      userName: "Ana Costa",
      userPhone: "+55 11 99999-9012",
      lastMessage: "Gostaria de falar com um atendente",
      timestamp: "23 min atrás", 
      status: "human",
      messageCount: 5,
      isBot: false
    },
    {
      id: "4",
      userName: "Pedro Lima",
      userPhone: "+55 11 99999-3456",
      lastMessage: "Como posso cancelar meu pedido?",
      timestamp: "1h atrás",
      status: "active",
      messageCount: 2,
      isBot: true
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="secondary" className="bg-primary/10 text-primary">Ativo</Badge>;
      case 'resolved':
        return <Badge variant="secondary" className="bg-success/10 text-success">Resolvido</Badge>;
      case 'human':
        return <Badge variant="secondary" className="bg-warning/10 text-warning">Humano</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <span>Conversas Recentes</span>
        </CardTitle>
        <Button variant="ghost" size="sm">
          Ver Todas
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {conversations.map((conversation, index) => (
          <div 
            key={conversation.id}
            className="flex items-start space-x-4 p-4 rounded-lg border bg-gradient-card hover:shadow-soft transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {conversation.userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-foreground">{conversation.userName}</h4>
                  <p className="text-xs text-muted-foreground">{conversation.userPhone}</p>
                </div>
                {getStatusBadge(conversation.status)}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {conversation.lastMessage}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{conversation.timestamp}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="h-3 w-3" />
                    <span>{conversation.messageCount} mensagens</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    {conversation.isBot ? (
                      <>
                        <div className="h-2 w-2 bg-primary rounded-full" />
                        <span>Bot</span>
                      </>
                    ) : (
                      <>
                        <User className="h-3 w-3" />
                        <span>Humano</span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}