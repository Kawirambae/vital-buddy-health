import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, UserPlus, BarChart3, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 p-4 rounded-full">
              <Activity className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-4">
            Diabetes Monitor
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
