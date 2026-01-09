import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/layout/PageLayout";
import ChakraMotif from "@/components/ui/ChakraMotif";
import { BarChart3, CheckSquare, Vote, TrendingUp, Scale, Users } from "lucide-react";
import logo from "@/assets/votevichar-logo.png";

const Landing = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          {/* Decorative chakra motifs */}
          <ChakraMotif size="lg" className="absolute left-10 top-0 hidden lg:block" />
          <ChakraMotif size="md" className="absolute right-20 bottom-0 hidden lg:block" />
          
          <div className="flex justify-center mb-6">
            <img src={logo} alt="VoteVichar" className="h-24 w-auto" />
          </div>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Thoughtful, data-driven insights for election synchronization
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button asChild size="lg" className="gap-2">
              <Link to="/login">
                <CheckSquare className="w-5 h-5" />
                Start Analysis
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/signup">
                <BarChart3 className="w-5 h-5" />
                Create Account
              </Link>
            </Button>
          </div>
          
          <p className="text-sm text-muted-foreground mb-12">
            Or <Link to="/access" className="text-primary hover:underline">continue as guest</Link>
          </p>
        </div>

        {/* What is VoteVichar */}
        <Card className="mb-12 border-l-4 border-l-primary">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3 text-primary">What is VoteVichar?</h2>
            <p className="text-muted-foreground leading-relaxed">
              VoteVichar is an interactive simulation platform designed to help policymakers, 
              researchers, and civic stakeholders explore the implications of election synchronization 
              (One Nation One Election) through data-driven scenario analysis. The platform provides 
              neutral, evidence-based insights into financial, administrative, and governance impacts 
              without advocating for any particular political position.
            </p>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Scenario Comparison</h3>
            <p className="text-sm text-muted-foreground">
              Compare different election synchronization models side-by-side with visual dashboards
            </p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-india-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-india-green" />
            </div>
            <h3 className="font-semibold mb-2">Impact Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Visualize financial, administrative, and governance impacts through charts and metrics
            </p>
          </Card>
          
          <Card className="text-center p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-saffron/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-saffron" />
            </div>
            <h3 className="font-semibold mb-2">Policy Parameters</h3>
            <p className="text-sm text-muted-foreground">
              Configure parameters like states, cycles, and assumptions for realistic simulations
            </p>
          </Card>
        </div>

        {/* Visual Elements */}
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <div className="flex justify-center gap-8 mb-4">
            <Vote className="w-10 h-10 text-primary opacity-60" />
            <CheckSquare className="w-10 h-10 text-india-green opacity-60" />
            <BarChart3 className="w-10 h-10 text-saffron opacity-60" />
          </div>
          <p className="text-sm text-muted-foreground">
            Neutral • Evidence-Based • Transparent • Decision-Support Focused
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Landing;