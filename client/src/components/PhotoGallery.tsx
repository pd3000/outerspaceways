import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Music, Share2, ExternalLink } from "lucide-react";
import landscapeImage from "@assets/generated_images/Mountain_sunset_landscape_photo_0590625f.png";
import portraitImage from "@assets/generated_images/Professional_portrait_photo_1e9b8fc3.png";
import streetImage from "@assets/generated_images/Black_white_street_photo_63e586de.png";

// todo: remove mock data
const mockArtists = [
  {
    id: 1,
    src: portraitImage,
    title: "Zara Cosmic",
    category: "Experimental Jazz",
    description: "Avant-garde saxophone and cosmic synthesizers",
    website: "https://zaracosmic.space",
  },
  {
    id: 2,
    src: streetImage,
    title: "The Afrofuture Collective",
    category: "Electronic",
    description: "Blending traditional rhythms with space-age sounds",
    website: "https://afrofuturecollective.net",
  },
  {
    id: 3,
    src: landscapeImage,
    title: "Solar Wind Orchestra",
    category: "Free Jazz",
    description: "17-piece ensemble exploring cosmic dimensions",
    website: "https://solarwindorchestra.org",
  },
  {
    id: 4,
    src: portraitImage,
    title: "Luna Bass",
    category: "Experimental",
    description: "Solo bass explorations of outer space",
    website: "https://lunabass.space",
  },
  {
    id: 5,
    src: streetImage,
    title: "Quantum Drummers",
    category: "Percussion",
    description: "Polyrhythmic journeys through time and space",
    website: "https://quantumdrummers.net",
  },
  {
    id: 6,
    src: landscapeImage,
    title: "Nebula Voices",
    category: "Vocal",
    description: "Ethereal harmonies from distant galaxies",
    website: "https://nebulavoices.space",
  },
];

const categories = ["All", "Experimental Jazz", "Electronic", "Free Jazz", "Percussion", "Vocal"];

export function ArtistGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxArtist, setLightboxArtist] = useState<typeof mockArtists[0] | null>(null);
  const [currentArtistIndex, setCurrentArtistIndex] = useState(0);

  const filteredArtists = selectedCategory === "All" 
    ? mockArtists 
    : mockArtists.filter(artist => artist.category === selectedCategory);

  const openLightbox = (artist: typeof mockArtists[0]) => {
    setLightboxArtist(artist);
    setCurrentArtistIndex(filteredArtists.findIndex(a => a.id === artist.id));
    console.log(`Opened lightbox for: ${artist.title}`);
  };

  const closeLightbox = () => {
    setLightboxArtist(null);
    console.log("Closed lightbox");
  };

  const nextArtist = () => {
    const nextIndex = (currentArtistIndex + 1) % filteredArtists.length;
    setCurrentArtistIndex(nextIndex);
    setLightboxArtist(filteredArtists[nextIndex]);
    console.log("Next artist");
  };

  const prevArtist = () => {
    const prevIndex = currentArtistIndex === 0 ? filteredArtists.length - 1 : currentArtistIndex - 1;
    setCurrentArtistIndex(prevIndex);
    setLightboxArtist(filteredArtists[prevIndex]);
    console.log("Previous artist");
  };

  const handleVisitWebsite = () => {
    if (lightboxArtist?.website) {
      window.open(lightboxArtist.website, '_blank');
      console.log(`Visiting: ${lightboxArtist.website}`);
    }
  };

  const handleShare = () => {
    console.log("Share artist");
    if (navigator.share) {
      navigator.share({
        title: lightboxArtist?.title,
        text: lightboxArtist?.description,
        url: window.location.href,
      });
    }
  };

  return (
    <section id="artists" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Artists</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Cosmic musicians and sound explorers pushing the boundaries of afro-futuristic expression.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className="cursor-pointer px-4 py-2 hover-elevate"
              onClick={() => {
                setSelectedCategory(category);
                console.log(`Filter changed to: ${category}`);
              }}
              data-testid={`filter-${category.toLowerCase()}`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <Card
              key={artist.id}
              className="group cursor-pointer overflow-hidden hover-elevate"
              onClick={() => openLightbox(artist)}
              data-testid={`artist-${artist.id}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={artist.src}
                  alt={artist.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                      <Music className="h-4 w-4" />
                      {artist.title}
                    </h3>
                    <p className="text-sm text-white/90">{artist.description}</p>
                  </div>
                </div>
                <Badge className="absolute top-2 right-2 bg-primary/80 text-white">
                  {artist.category}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Artist Lightbox */}
        {lightboxArtist && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={closeLightbox}
                data-testid="button-close-lightbox"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation buttons */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={prevArtist}
                data-testid="button-prev-artist"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={nextArtist}
                data-testid="button-next-artist"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Artist Image */}
              <img
                src={lightboxArtist.src}
                alt={lightboxArtist.title}
                className="max-w-full max-h-[80vh] object-contain"
              />

              {/* Artist info */}
              <div className="absolute bottom-4 left-4 right-4 text-white bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg flex items-center gap-2">
                      <Music className="h-5 w-5" />
                      {lightboxArtist.title}
                    </h3>
                    <p className="text-white/90 mb-1">{lightboxArtist.description}</p>
                    <Badge variant="secondary">{lightboxArtist.category}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={handleShare}
                      data-testid="button-share-artist"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={handleVisitWebsite}
                      data-testid="button-visit-website"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}