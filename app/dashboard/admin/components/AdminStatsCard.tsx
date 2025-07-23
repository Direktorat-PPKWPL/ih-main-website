'use client';

import { Card, CardContent } from '@/app/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
    period?: string;
  };
  icon: LucideIcon;
  iconColor?: string;
}

export default function AdminStatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-blue-500'
}: AdminStatsCardProps) {
  const getChangeColor = (type: string) => {
    switch (type) {
      case 'increase': return 'text-green-600';
      case 'decrease': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'increase': return '↗';
      case 'decrease': return '↘';
      case 'neutral': return '→';
      default: return '';
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className={`flex items-center mt-1 ${getChangeColor(change.type)}`}>
                <span className="text-sm mr-1">{getChangeIcon(change.type)}</span>
                <span className="text-sm">{change.value}</span>
                {change.period && (
                  <span className="text-sm text-gray-500 ml-1">{change.period}</span>
                )}
              </div>
            )}
          </div>
          <Icon className={`h-8 w-8 ${iconColor}`} />
        </div>
      </CardContent>
    </Card>
  );
}
