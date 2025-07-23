import { useState, useEffect } from 'react';
import { GlucoseCard, GlucoseReading } from "@/components/ui/glucose-card";
import { GlucoseChart } from "@/components/glucose-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Phone, AlertTriangle, Clock } from "lucide-react";
import { createGlucoseReading, shouldAlertEmergencyContact, getGlucoseAdvice } from "@/utils/glucose-classifier";
import { useToast } from "@/hooks/use-toast";

// Mock patient data - in real app, this would come from database
const mockPatient = {
  name: "Sarah Johnson",
  age: 34,
  emergencyContact: "+1 (555) 123-4567"
};

export default function Dashboard() {
  const [currentReading, setCurrentReading] = useState<GlucoseReading>(
    createGlucoseReading(6.2)
  );
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [isConnected, setIsConnected] = useState(true);
  const { toast } = useToast();

  // Simulate receiving glucose readings every 5 minutes
  useEffect(() => {
    const simulateReading = () => {
      // Generate realistic glucose values (some variation around current)
      const variation = (Math.random() - 0.5) * 2; // ±1 mmol/L variation
      const newValue = Math.max(1, Math.min(25, currentReading.value + variation));
      const newReading = createGlucoseReading(newValue);
      
      setCurrentReading(newReading);
      setReadings(prev => [...prev.slice(-23), newReading]); // Keep last 24 readings (2 hours)
      
      // Check for emergency alerts
      if (shouldAlertEmergencyContact(newReading.status)) {
        toast({
          title: "CRITICAL ALERT",
          description: `Emergency contact has been notified. Glucose: ${newValue.toFixed(1)} mmol/L`,
          variant: "destructive",
        });
      }
    };

    // Initial readings
    const initialReadings: GlucoseReading[] = [];
    for (let i = 23; i >= 0; i--) {
      const timestamp = new Date(Date.now() - i * 5 * 60 * 1000);
      const value = 5.5 + Math.sin(i / 4) * 1.5 + (Math.random() - 0.5) * 0.8;
      initialReadings.push(createGlucoseReading(Math.max(1, value), timestamp));
    }
    setReadings(initialReadings);

    const interval = setInterval(simulateReading, 30000); // Every 30 seconds for demo
    return () => clearInterval(interval);
  }, [currentReading.value, toast]);

  const handleShare = () => {
    toast({
      title: "Sharing with Doctor",
      description: "Glucose trends have been shared with your healthcare provider.",
    });
  };

  const lastUpdate = new Date().toLocaleTimeString();

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Diabetes Monitor</h1>
          <p className="text-muted-foreground">Real-time glucose monitoring</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={isConnected ? "default" : "destructive"} className="px-3 py-1">
            <div className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-normal' : 'bg-critical'}`} />
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Emergency Contact Card */}
      {shouldAlertEmergencyContact(currentReading.status) && (
        <Card className="border-critical bg-critical/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-critical" />
              <div className="flex-1">
                <h3 className="font-semibold text-critical">Emergency Contact Alerted</h3>
                <p className="text-sm text-muted-foreground">
                  {mockPatient.emergencyContact} has been notified of your critical glucose level
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Reading */}
        <div className="lg:col-span-1">
          <GlucoseCard 
            reading={currentReading}
            patientName={mockPatient.name}
            patientAge={mockPatient.age}
          />
          
          {/* Last Update Info */}
          <Card className="mt-4">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">Last Update</p>
                  <p className="text-muted-foreground">{lastUpdate}</p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium mb-1">Advice:</p>
                <p className="text-sm text-muted-foreground">
                  {getGlucoseAdvice(currentReading.status)}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <GlucoseChart readings={readings} onShare={handleShare} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {readings.length > 0 
                ? (readings.reduce((sum, r) => sum + r.value, 0) / readings.length).toFixed(1)
                : '0.0'
              }
              <span className="text-sm font-normal ml-1">mmol/L</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time in Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-normal">
              {readings.length > 0 
                ? Math.round((readings.filter(r => r.status === 'normal').length / readings.length) * 100)
                : 0
              }%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Alerts Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning-high">
              {readings.filter(r => r.status.includes('warning') || r.status.includes('critical')).length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sensor Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium text-normal">Active</div>
            <div className="text-xs text-muted-foreground">6 days remaining</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}