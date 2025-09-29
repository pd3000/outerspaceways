// Geometric pattern components inspired by Outerspaceways branding
export function TriangularPattern({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="triangular" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M20 0L40 35H0L20 0Z" fill="currentColor" opacity="0.1"/>
          <path d="M0 35L20 5L40 35" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        </pattern>
        <pattern id="lines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M0 0L20 20M20 0L0 20" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#triangular)"/>
      <rect width="100%" height="100%" fill="url(#lines)"/>
    </svg>
  );
}

export function CosmicEyePattern({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="eyeGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.05"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.02"/>
        </radialGradient>
      </defs>
      
      {/* Concentric circles */}
      <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
      <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.4"/>
      <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.5"/>
      
      {/* Radiating lines */}
      {Array.from({ length: 24 }, (_, i) => {
        const angle = (i * 15) * (Math.PI / 180);
        const x1 = 100 + Math.cos(angle) * 60;
        const y1 = 100 + Math.sin(angle) * 60;
        const x2 = 100 + Math.cos(angle) * 90;
        const y2 = 100 + Math.sin(angle) * 90;
        return (
          <line 
            key={i} 
            x1={x1} 
            y1={y1} 
            x2={x2} 
            y2={y2} 
            stroke="currentColor" 
            strokeWidth="0.5" 
            opacity="0.3"
          />
        );
      })}
      
      {/* Central eye shape */}
      <ellipse cx="100" cy="100" rx="30" ry="15" fill="url(#eyeGradient)" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
      <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.8"/>
    </svg>
  );
}

export function StripedPattern({ className = "", direction = "diagonal" }: { className?: string; direction?: "horizontal" | "vertical" | "diagonal" }) {
  const pathData = {
    horizontal: "M0 0h400v10H0zM0 20h400v10H0z",
    vertical: "M0 0v400h10V0zM20 0v400h10V0z", 
    diagonal: "M0 0l400 400h-10L0 10zM10 0l400 400h-10L10 0z"
  };

  return (
    <svg className={className} viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id={`stripes-${direction}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d={pathData[direction]} fill="currentColor" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#stripes-${direction})`}/>
    </svg>
  );
}

export function GeometricOverlay({ 
  children, 
  pattern = "triangular", 
  className = "",
  patternClass = "text-primary"
}: { 
  children: React.ReactNode; 
  pattern?: "triangular" | "eye" | "stripes"; 
  className?: string;
  patternClass?: string;
}) {
  const PatternComponent = {
    triangular: TriangularPattern,
    eye: CosmicEyePattern,
    stripes: StripedPattern
  }[pattern];

  return (
    <div className={`relative ${className}`}>
      <PatternComponent className={`absolute inset-0 w-full h-full ${patternClass}`} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}