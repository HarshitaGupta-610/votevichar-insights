import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import ChakraMotif from "@/components/ui/ChakraMotif";
import { Progress } from "@/components/ui/progress";
import { Cog, BarChart3, FileText } from "lucide-react";

const Processing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      navigate("/analysis");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <PageLayout showFooter={false}>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto text-center">
          <div className="relative mb-8">
            {/* Animated Chakra */}
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 animate-spin-slow">
                <ChakraMotif size="lg" className="w-full h-full opacity-40" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Cog className="w-12 h-12 text-primary animate-spin" style={{ animationDuration: "3s" }} />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">
            Running Simulation
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Running scenario-based impact analysis…
          </p>

          <div className="space-y-6 mb-12">
            <Progress value={66} className="h-2" />
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Cog className="w-5 h-5 text-primary" />
                </div>
                <span>Processing</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-india-green/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-india-green" />
                </div>
                <span>Analyzing</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-muted-foreground opacity-50">
                <div className="w-10 h-10 rounded-full bg-saffron/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-saffron" />
                </div>
                <span>Generating</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Calculating financial impact, administrative workload, and governance metrics…
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Processing;