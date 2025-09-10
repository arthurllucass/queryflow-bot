import { StatsCard } from "@/components/ui/stats-card";
import { 
  MessageCircle, 
  Users, 
  Clock, 
  TrendingUp,
  Bot,
  UserCheck
} from "lucide-react";

export function StatsOverview() {
  const stats = [
    {
      title: "Mensagens Hoje",
      value: "1,234",
      change: "+12% vs ontem",
      changeType: "positive" as const,
      icon: MessageCircle
    },
    {
      title: "Usuários Ativos",
      value: "89",
      change: "+5 novos hoje",
      changeType: "positive" as const,
      icon: Users
    },
    {
      title: "Tempo Resposta Médio",
      value: "2.3s",
      change: "-0.5s vs ontem",
      changeType: "positive" as const,
      icon: Clock
    },
    {
      title: "Taxa de Resolução",
      value: "94%",
      change: "+2% vs semana passada",
      changeType: "positive" as const,
      icon: TrendingUp
    },
    {
      title: "Respostas Automáticas",
      value: "856",
      change: "87% do total",
      changeType: "neutral" as const,
      icon: Bot
    },
    {
      title: "Handoffs Humanos",
      value: "23",
      change: "13% do total",
      changeType: "neutral" as const,
      icon: UserCheck
    }
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Visão Geral</h2>
        <p className="text-sm text-muted-foreground">Atualizado há 2 minutos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <StatsCard {...stat} />
          </div>
        ))}
      </div>
    </section>
  );
}