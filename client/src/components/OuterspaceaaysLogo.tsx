import { GeometricOverlay, TriangularPattern } from "./GeometricPatterns";

interface OuterspaceaaysLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark" | "brand";
  showPattern?: boolean;
  className?: string;
}

export function OuterspaceaaysLogo({ 
  size = "md", 
  variant = "brand", 
  showPattern = true,
  className = "" 
}: OuterspaceaaysLogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl", 
    lg: "text-4xl",
    xl: "text-6xl"
  };

  const variantClasses = {
    light: "text-white",
    dark: "text-foreground",
    brand: "text-primary"
  };

  if (showPattern) {
    return (
      <GeometricOverlay 
        pattern="triangular" 
        className="inline-block"
        patternClass={variant === "light" ? "text-white/20" : "text-primary/20"}
      >
        <div className="px-4 py-2" />
      </GeometricOverlay>
    );
  }

  return null;
}

export function OuterspaceaaysIcon({ 
  size = 24, 
  className = "",
  variant = "brand" 
}: { 
  size?: number; 
  className?: string;
  variant?: "light" | "dark" | "brand";
}) {
  const colorClass = {
    light: "text-white",
    dark: "text-foreground", 
    brand: "text-primary"
  }[variant];

  return (
    <div 
      className={`${colorClass} ${className}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Stylized cosmic eye icon based on the branding */}
        <circle cx="16" cy="16" r="15" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="0.5" fill="none"/>
        <ellipse cx="16" cy="16" rx="8" ry="4" fill="currentColor" opacity="0.7"/>
        <circle cx="16" cy="16" r="2" fill="currentColor"/>
        
        {/* Radiating lines */}
        <line x1="16" y1="1" x2="16" y2="6" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="16" y1="26" x2="16" y2="31" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="1" y1="16" x2="6" y2="16" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="26" y1="16" x2="31" y2="16" stroke="currentColor" strokeWidth="0.5"/>
        
        <line x1="4.8" y1="4.8" x2="8.1" y2="8.1" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="23.9" y1="23.9" x2="27.2" y2="27.2" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="27.2" y1="4.8" x2="23.9" y2="8.1" stroke="currentColor" strokeWidth="0.5"/>
        <line x1="8.1" y1="23.9" x2="4.8" y2="27.2" stroke="currentColor" strokeWidth="0.5"/>
      </svg>
    </div>
  );
}