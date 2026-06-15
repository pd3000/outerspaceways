import { AboutSection } from "@/components/AboutSection";
import { GeometricOverlay } from "@/components/GeometricPatterns";
import jaguarSticker from "@assets/outerspaceways_2'sticker_V2_1759110228249.jpg";

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Header banner */}
      <GeometricOverlay pattern="triangular" patternClass="text-white/10">
        <div className="relative flex items-center justify-center py-16 bg-black overflow-hidden">
          {/* Teal glow behind sticker */}
          <div className="absolute w-64 h-64 rounded-full bg-[hsl(var(--secondary)/0.25)] blur-3xl" />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <img
              src={jaguarSticker}
              alt="Outerspaceways"
              className="w-44 h-44 md:w-56 md:h-56 rounded-full object-cover shadow-2xl ring-4 ring-white/10"
            />
          </div>
        </div>
      </GeometricOverlay>

      <AboutSection />
    </div>
  );
}
