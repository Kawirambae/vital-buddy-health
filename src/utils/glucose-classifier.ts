import { GlucoseReading } from "@/components/ui/glucose-card";

export function classifyGlucoseLevel(value: number): GlucoseReading['status'] {
  // Critical levels
  if (value < 2.8) return 'critical-low';
  if (value > 20) return 'critical-high';
  
  // Warning levels
  if (value < 4.0) return 'warning-low';
  if (value > 10.0) return 'warning-high';
  
  // Normal range (4.0 - 10.0 mmol/L)
  return 'normal';
}

export function createGlucoseReading(value: number, timestamp: Date = new Date()): GlucoseReading {
  return {
    value,
    timestamp,
    status: classifyGlucoseLevel(value)
  };
}

export function shouldAlertEmergencyContact(status: GlucoseReading['status']): boolean {
  return status === 'critical-low' || status === 'critical-high';
}

export function getGlucoseAdvice(status: GlucoseReading['status']): string {
  switch (status) {
    case 'normal':
      return 'Continue monitoring. Maintain your current routine.';
    case 'warning-low':
      return 'Consider having a snack with carbohydrates. Monitor closely.';
    case 'warning-high':
      return 'Check your medication timing. Avoid high-carb foods.';
    case 'critical-low':
      return 'URGENT: Consume fast-acting glucose immediately. Contact emergency services if symptoms worsen.';
    case 'critical-high':
      return 'URGENT: Contact your healthcare provider immediately. Check ketones if possible.';
    default:
      return 'Monitor your glucose levels regularly.';
  }
}