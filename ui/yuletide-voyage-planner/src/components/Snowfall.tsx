import React, { useMemo } from 'react';

interface SnowflakeProps {
  style: React.CSSProperties;
}

const Snowflake: React.FC<SnowflakeProps> = ({ style }) => (
  <div
    className="absolute text-snow pointer-events-none animate-snowfall"
    style={style}
  >
    ❄
  </div>
);

interface SnowfallProps {
  count?: number;
}

const Snowfall: React.FC<SnowfallProps> = ({ count = 50 }) => {
  const snowflakes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animationDuration: `${8 + Math.random() * 12}s`,
        animationDelay: `${Math.random() * 10}s`,
        fontSize: `${8 + Math.random() * 16}px`,
        opacity: 0.3 + Math.random() * 0.7,
      } as React.CSSProperties,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} style={flake.style} />
      ))}
    </div>
  );
};

export default Snowfall;
