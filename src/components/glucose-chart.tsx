import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { GlucoseReading } from "@/components/ui/glucose-card";

interface GlucoseChartProps {
  readings: GlucoseReading[];
  onShare?: () => void;
}

export function GlucoseChart({ readings, onShare }: GlucoseChartProps) {
  const chartData = readings.map((reading, index) => ({
    time: reading.timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    value: reading.value,
    status: reading.status,
    fullTime: reading.timestamp.toLocaleString()
  }));

  const getLineColor = (value: number) => {
    if (value < 2.8 || value > 20) return '#dc2626'; // Critical
    if (value < 4.0 || value > 10.0) return '#ea580c'; // Warning
    return '#16a34a'; // Normal
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 border rounded-lg shadow-lg">
          <p className="text-sm font-medium">{data.fullTime}</p>
          <p className="text-lg font-bold" style={{ color: getLineColor(data.value) }}>
            {data.value.toFixed(1)} mmol/L
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Glucose Trends</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share2 className="h-4 w-4 mr-2" />
              Share with Doctor
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, 25]}
                tick={{ fontSize: 12 }}
                label={{ value: 'mmol/L', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Reference lines for normal ranges */}
              <ReferenceLine y={4.0} stroke="#16a34a" strokeDasharray="5 5" />
              <ReferenceLine y={7.8} stroke="#16a34a" strokeDasharray="5 5" />
              <ReferenceLine y={2.8} stroke="#dc2626" strokeDasharray="3 3" />
              <ReferenceLine y={20} stroke="#dc2626" strokeDasharray="3 3" />
              
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#2563eb"
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-normal"></div>
            <span>Normal Range (4.0-7.8)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-critical"></div>
            <span>Critical Levels (&lt;2.8 or &gt;20)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}