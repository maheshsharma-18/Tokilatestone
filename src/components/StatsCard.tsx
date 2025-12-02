import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from './ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  onClick?: () => void;
}

const colorClasses = {
  primary: 'from-indigo-500 to-indigo-600',
  success: 'from-emerald-500 to-emerald-600',
  warning: 'from-amber-500 to-amber-600',
  danger: 'from-red-500 to-red-600',
  info: 'from-cyan-500 to-cyan-600',
  purple: 'from-purple-500 to-purple-600',
};

const iconBgClasses = {
  primary: 'bg-indigo-100 text-indigo-600',
  success: 'bg-emerald-100 text-emerald-600',
  warning: 'bg-amber-100 text-amber-600',
  danger: 'bg-red-100 text-red-600',
  info: 'bg-cyan-100 text-cyan-600',
  purple: 'bg-purple-100 text-purple-600',
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'primary',
  onClick,
}: StatsCardProps) {
  return (
    <Card
      className={`card-3d p-6 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground mb-2">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold">{value}</h3>
            {trend && (
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? 'text-emerald-600' : 'text-red-600'
                }`}
              >
                {trend.isPositive ? '+' : ''}
                {trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div
            className={`p-3 rounded-xl ${iconBgClasses[color]}`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </Card>
  );
}

interface GradientStatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple';
  onClick?: () => void;
}

export function GradientStatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'primary',
  onClick,
}: GradientStatsCardProps) {
  return (
    <div
      className={`card-3d p-6 bg-gradient-to-br ${colorClasses[color]} text-white rounded-2xl ${
        onClick ? 'cursor-pointer' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white/80 mb-2">{title}</p>
          <h3 className="text-4xl font-bold mb-1">{value}</h3>
          {subtitle && (
            <p className="text-sm text-white/70">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
            <Icon className="w-7 h-7 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}
