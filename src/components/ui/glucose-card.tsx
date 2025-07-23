import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Activity, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GlucoseReading {
  value: number;
  timestamp: Date;
  status: 'normal' | 'warning-low' | 'warning-high' | 'critical-low' | 'critical-high';
}

interface GlucoseCardProps {
  reading: GlucoseReading;
  patientName: string;
  patientAge: number;
}

export function GlucoseCard({ reading, patientName, patientAge }: GlucoseCardProps) {
  const getStatusConfig = (status: GlucoseReading['status']) => {
    switch (status) {
      case 'normal':
        return {
          color: 'normal',
          icon: Heart,
          message: 'Blood glucose is within normal range',
          urgency: 'normal'
        };
      case 'warning-low':
        return {
          color: 'warning-low',
          icon: AlertTriangle,
          message: 'Blood glucose is low - consider eating',
          urgency: 'warning'
        };
      case 'warning-high':
        return {
          color: 'warning-high',
          icon: AlertTriangle,
          message: 'Blood glucose is high - monitor closely',
          urgency: 'warning'
        };
      case 'critical-low':
        return {
          color: 'critical',
          icon: AlertTriangle,
          message: 'CRITICAL: Dangerously low glucose - seek immediate help!',
          urgency: 'critical'
        };
      case 'critical-high':
        return {
          color: 'critical',
          icon: AlertTriangle,
          message: 'CRITICAL: Dangerously high glucose - seek immediate help!',
          urgency: 'critical'
        };
    }
  };

  const config = getStatusConfig(reading.status);
  const StatusIcon = config.icon;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{patientName}</div>
            <div className="text-sm text-muted-foreground">Age: {patientAge}</div>
          </div>
          <Activity className="h-5 w-5 text-primary" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Reading */}
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-glucose-text">
              {reading.value.toFixed(1)}
              <span className="text-lg font-normal ml-1">mmol/L</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {reading.timestamp.toLocaleTimeString()}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge 
              variant="outline"
              className={cn(
                "px-3 py-1 text-sm font-medium flex items-center gap-2",
                config.color === 'normal' && "bg-normal text-normal-foreground border-normal",
                config.color === 'warning-low' && "bg-warning-low text-warning-low-foreground border-warning-low",
                config.color === 'warning-high' && "bg-warning-high text-warning-high-foreground border-warning-high",
                config.color === 'critical' && "bg-critical text-critical-foreground border-critical animate-pulse"
              )}
            >
              <StatusIcon className="h-4 w-4" />
              {config.urgency === 'critical' ? 'CRITICAL!' : 
               config.urgency === 'warning' ? 'Warning' : 'Normal'}
            </Badge>
          </div>

          {/* Message */}
          <div className={cn(
            "text-center p-3 rounded-lg text-sm",
            config.urgency === 'critical' && "bg-critical/10 text-critical font-medium",
            config.urgency === 'warning' && "bg-warning-high/10 text-warning-high",
            config.urgency === 'normal' && "bg-normal/10 text-normal"
          )}>
            {config.message}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}