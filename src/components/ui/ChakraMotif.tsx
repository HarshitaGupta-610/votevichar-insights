interface ChakraMotifProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const ChakraMotif = ({ size = "md", className = "" }: ChakraMotifProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
        {/* Outer ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-chakra-blue"
        />
        {/* Inner hub */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="currentColor"
          className="text-chakra-blue"
        />
        {/* 24 spokes */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 15 * Math.PI) / 180;
          const x1 = 50 + 12 * Math.cos(angle);
          const y1 = 50 + 12 * Math.sin(angle);
          const x2 = 50 + 42 * Math.cos(angle);
          const y2 = 50 + 42 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-chakra-blue"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ChakraMotif;