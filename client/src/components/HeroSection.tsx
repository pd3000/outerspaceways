import { Button } from "@/components/ui/button";
import { Music, ArrowDown, Play } from "lucide-react";
import heroImage from "@assets/generated_images/Mountain_sunset_landscape_photo_0590625f.png";

export function HeroSection() {
  const scrollToArtists = () => {
    const artistsSection = document.getElementById("artists");
    artistsSection?.scrollIntoView({ behavior: "smooth" });
    console.log("Scrolling to artists");
  };

  return (
    <section className="relative h-[60vh] md:h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <div className="flex items-center justify-center mb-6">
          <Music className="h-12 w-12 md:h-16 md:w-16 mb-2" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          Outerspaceways
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
          Cosmic sounds from afro-futuristic dimensions
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button 
            size="lg" 
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            onClick={scrollToArtists}
            data-testid="button-view-artists"
          >
            <Music className="h-4 w-4 mr-2" />
            View Artists
          </Button>
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
  );
}