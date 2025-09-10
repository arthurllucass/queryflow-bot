import { DashboardHeader } from "@/components/dashboard/header";
import { HeroSection } from "@/components/dashboard/hero-section";
import { StatsOverview } from "@/components/dashboard/stats-overview";
import { RecentConversations } from "@/components/dashboard/recent-conversations";
import { KnowledgeBaseStatus } from "@/components/dashboard/knowledge-base-status";
import { ApiStatus } from "@/components/dashboard/api-status";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <HeroSection />
        
        <StatsOverview />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RecentConversations />
          <div className="space-y-8">
            <KnowledgeBaseStatus />
            <ApiStatus />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
