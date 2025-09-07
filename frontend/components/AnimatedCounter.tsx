import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  label: string;
}

export function AnimatedCounter({
  end,
  duration = 2500,
  suffix = '',
  prefix = '',
  className = '',
  label
}: AnimatedCounterProps) {
  const { count, ref } = useCountUp({
    end,
    duration,
    suffix,
    prefix
  });

  return (
    <div ref={ref} className="text-center">
      <div className={`text-3xl font-bold text-brand-green transition-all duration-300 ${className}`}>
        {count}
      </div>
      <div className="text-sm opacity-80 mt-1">{label}</div>
    </div>
  );
}