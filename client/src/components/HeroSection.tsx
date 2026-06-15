import { Button } from "@/components/ui/button";
import { ArrowDown, Play } from "lucide-react";
import { OuterspaceaaysLogo } from "@/components/OuterspaceaaysLogo";
import { GeometricOverlay } from "@/components/GeometricPatterns";
import heroImage from "@assets/tock-page-outerspaceways-hero-logo_1759110228249.jpg";

export function HeroSection() {
  return (
    <GeometricOverlay pattern="triangular" patternClass="text-primary/10">
      <section className="relative h-[60vh] md:h-[100vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <OuterspaceaaysLogo size="xl" variant="light" showPattern={true} />
          </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            data-testid="button-upcoming-shows"
            onClick={() => console.log("Upcoming shows clicked")}
          >
            <Play className="h-4 w-4 mr-2" />
            Upcoming Shows
          </Button>
        </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-6 w-6 text-white/70" />
          </div>
        </div>
      </section>
    </GeometricOverlay>
  );
}