import React, { useMemo } from 'react';

type SnowflakeStyle = React.CSSProperties & {
  '--snow-drift'?: string;
};

interface SnowflakeProps {
  style: SnowflakeStyle;
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
    return Array.from({ length: count }, (_, i) => {
      const drift = `${(Math.random() * 80 - 40).toFixed(0)}px`;
      const size = `${8 + Math.random() * 14}px`;
      const opacity = 0.25 + Math.random() * 0.5;
      const blur = `${Math.random() * 1.5}px`;

      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${-10 - Math.random() * 60}vh`,
          fontSize: size,
          opacity,
          filter: `blur(${blur})`,
          animationDuration: `${10 + Math.random() * 12}s`,
          animationDelay: `-${Math.random() * 12}s`,
          '--snow-drift': drift,
        } as SnowflakeStyle,
      };
    });
  }, [count]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
      aria-hidden="true"
    >
      {snowflakes.map((flake) => (
        <Snowflake key={flake.id} style={flake.style} />
      ))}
    </div>
  );
};

export default Snowfall;
