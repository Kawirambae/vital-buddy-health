import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, UserPlus, BarChart3, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating glucose molecules */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-primary/10 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-normal/20 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-primary/5 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-accent/30 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-primary/8 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
        
        {/* Floating medical icons */}
        <div className="absolute top-1/4 left-1/3 opacity-10 animate-pulse" style={{animationDelay: '0s', animationDuration: '2s'}}>
          <Activity className="h-6 w-6 text-primary" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-10 animate-pulse" style={{animationDelay: '1s', animationDuration: '3s'}}>
          <Shield className="h-8 w-8 text-normal" />
        </div>
        <div className="absolute top-1/2 left-1/6 opacity-10 animate-pulse" style={{animationDelay: '2s', animationDuration: '2.5s'}}>
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-5"></div>
      </div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Activity className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            SukariSafe
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time blood glucose monitoring with intelligent alerts and emergency notifications.
            Stay in control of your health with precision monitoring every 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button asChild size="lg" className="px-8">
              <Link to="/dashboard">
                <Activity className="mr-2 h-5 w-5" />
                View Dashboard
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8">
              <Link to="/register">
                <UserPlus className="mr-2 h-5 w-5" />
                Setup Profile
              </Link>
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Activity className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Real-time Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Continuous glucose readings every 5 minutes with instant classification
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-8 w-8 text-normal mx-auto mb-2" />
              <CardTitle className="text-lg">Smart Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Intelligent warnings for dangerous glucose levels with emergency contact notifications
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Visual trends and patterns to share with your healthcare provider
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <UserPlus className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Medical Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Complete medical information accessible to emergency personnel
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Critical Levels Info */}
        <div className="mt-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Glucose Level Classifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-normal/10 rounded-lg">
                  <div className="text-lg font-bold text-normal">Normal</div>
                  <div className="text-sm text-muted-foreground">4.0 - 10.0 mmol/L</div>
                </div>
                <div className="text-center p-4 bg-warning-low/10 rounded-lg">
                  <div className="text-lg font-bold text-warning-low">Low Warning</div>
                  <div className="text-sm text-muted-foreground">2.8 - 4.0 mmol/L</div>
                </div>
                <div className="text-center p-4 bg-warning-high/10 rounded-lg">
                  <div className="text-lg font-bold text-warning-high">High Warning</div>
                  <div className="text-sm text-muted-foreground">10.0 - 20.0 mmol/L</div>
                </div>
                <div className="text-center p-4 bg-critical/10 rounded-lg">
                  <div className="text-lg font-bold text-critical">Critical</div>
                  <div className="text-sm text-muted-foreground">&lt;2.8 or &gt;20.0 mmol/L</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
