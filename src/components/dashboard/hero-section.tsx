import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Settings, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero rounded-2xl p-8 text-primary-foreground">
      <div className="relative z-10 max-w-2xl">
        <div className="flex items-center space-x-2 mb-4">
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse-soft" />
            Sistema Ativo
          </Badge>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            <TrendingUp className="w-3 h-3 mr-1" />
            98% Uptime
          </Badge>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Chatbot RAG para WhatsApp
        </h1>
        
        <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
          Sistema inteligente de atendimento automatizado com integração OpenAI. 
          Respostas precisas e contextuais para seus clientes.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 shadow-medium"
          >
            <Play className="mr-2 h-4 w-4" />
            Ver Conversas Ativas
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Settings className="mr-2 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>
      
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
        <img 
          src={heroImage} 
          alt="Dashboard Preview" 
          className="w-full h-full object-cover rounded-r-2xl"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-primary opacity-90" />
    </section>
  );
}