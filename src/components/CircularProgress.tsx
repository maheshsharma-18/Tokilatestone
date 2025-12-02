import React from 'react';

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  showPercentage?: boolean;
}

export function CircularProgress({
  value,
  max = 100,
  size = 120,
  strokeWidth = 10,
  color = '#4F46E5',
  label,
  showPercentage = true,
}: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500 ease-out"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showPercentage && (
            <span className="text-2xl font-bold">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
      {label && (
        <p className="text-sm text-muted-foreground text-center">{label}</p>
      )}
    </div>
  );
}

interface GaugeChartProps {
  value: number;
  max?: number;
  label?: string;
  size?: number;
  thresholds?: {
    low: number;
    medium: number;
    high: number;
  };
}

export function GaugeChart({
  value,
  max = 100,
  label,
  size = 160,
  thresholds = { low: 33, medium: 66, high: 100 },
}: GaugeChartProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  // Determine color based on thresholds
  let color = '#10B981'; // green
  if (percentage < thresholds.low) {
    color = '#EF4444'; // red
  } else if (percentage < thresholds.medium) {
    color = '#F59E0B'; // amber
  }

  const angle = (percentage / 100) * 180 - 90;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size * 0.7 }}>
        <svg
          width={size}
          height={size * 0.7}
          viewBox={`0 0 ${size} ${size * 0.7}`}
          className="overflow-visible"
        >
          {/* Background arc */}
          <path
            d={describeArc(size / 2, size * 0.6, size * 0.35, -90, 90)}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Colored segments */}
          <path
            d={describeArc(size / 2, size * 0.6, size * 0.35, -90, -90 + (thresholds.low / 100) * 180)}
            fill="none"
            stroke="#EF4444"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.3"
          />
          <path
            d={describeArc(size / 2, size * 0.6, size * 0.35, -90 + (thresholds.low / 100) * 180, -90 + (thresholds.medium / 100) * 180)}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.3"
          />
          <path
            d={describeArc(size / 2, size * 0.6, size * 0.35, -90 + (thresholds.medium / 100) * 180, 90)}
            fill="none"
            stroke="#10B981"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.3"
          />
          {/* Progress arc */}
          <path
            d={describeArc(size / 2, size * 0.6, size * 0.35, -90, angle)}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          {/* Needle */}
          <line
            x1={size / 2}
            y1={size * 0.6}
            x2={size / 2 + Math.cos((angle * Math.PI) / 180) * (size * 0.3)}
            y2={size * 0.6 + Math.sin((angle * Math.PI) / 180) * (size * 0.3)}
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            className="transition-all duration-500"
          />
          {/* Center dot */}
          <circle
            cx={size / 2}
            cy={size * 0.6}
            r="6"
            fill={color}
          />
        </svg>
        {/* Value display */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center">
          <span className="text-3xl font-bold">{Math.round(percentage)}%</span>
        </div>
      </div>
      {label && (
        <p className="text-sm text-muted-foreground text-center mt-2">{label}</p>
      )}
    </div>
  );
}

// Helper function to create SVG arc path
function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M', start.x, start.y,
    'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(' ');
}

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
