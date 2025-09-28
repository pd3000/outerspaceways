import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import landscapeImage from "@assets/generated_images/Mountain_sunset_landscape_photo_0590625f.png";
import portraitImage from "@assets/generated_images/Professional_portrait_photo_1e9b8fc3.png";
import streetImage from "@assets/generated_images/Black_white_street_photo_63e586de.png";

// todo: remove mock data
const mockPhotos = [
  {
    id: 1,
    src: landscapeImage,
    title: "Mountain Sunset",
    category: "Landscape",
    description: "Golden hour over the mountain peaks",
  },
  {
    id: 2,
    src: portraitImage,
    title: "Natural Portrait",
    category: "Portrait",
    description: "Professional headshot with natural lighting",
  },
  {
    id: 3,
    src: streetImage,
    title: "Urban Geometry",
    category: "Street",
    description: "Architectural shadows in the city",
  },
  {
    id: 4,
    src: landscapeImage,
    title: "Coastal Morning",
    category: "Landscape",
    description: "Misty dawn by the ocean",
  },
  {
    id: 5,
    src: portraitImage,
    title: "Studio Session",
    category: "Portrait",
    description: "Professional studio lighting setup",
  },
  {
    id: 6,
    src: streetImage,
    title: "Night Walk",
    category: "Street",
    description: "Evening street photography",
  },
];

const categories = ["All", "Landscape", "Portrait", "Street"];

export function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<typeof mockPhotos[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredPhotos = selectedCategory === "All" 
    ? mockPhotos 
    : mockPhotos.filter(photo => photo.category === selectedCategory);

  const openLightbox = (photo: typeof mockPhotos[0]) => {
    setLightboxImage(photo);
    setCurrentImageIndex(filteredPhotos.findIndex(p => p.id === photo.id));
    console.log(`Opened lightbox for: ${photo.title}`);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    console.log("Closed lightbox");
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredPhotos.length;
    setCurrentImageIndex(nextIndex);
    setLightboxImage(filteredPhotos[nextIndex]);
    console.log("Next image");
  };

  const prevImage = () => {
    const prevIndex = currentImageIndex === 0 ? filteredPhotos.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setLightboxImage(filteredPhotos[prevIndex]);
    console.log("Previous image");
  };

  const handleDownload = () => {
    console.log("Download protection: Download disabled");
    alert("Image downloads are disabled to protect the photographer's work.");
  };

  const handleShare = () => {
    console.log("Share image");
    if (navigator.share) {
      navigator.share({
        title: lightboxImage?.title,
        text: lightboxImage?.description,
        url: window.location.href,
      });
    }
  };

  return (
    <section id="gallery" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Photography Gallery</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of moments captured through the lens, each telling its own unique story.
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

        {/* Photo Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            userSelect: "none",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none"
          }}
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          {filteredPhotos.map((photo) => (
            <Card
              key={photo.id}
              className="group cursor-pointer overflow-hidden hover-elevate"
              onClick={() => openLightbox(photo)}
              data-testid={`photo-${photo.id}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-white text-center">
                    <h3 className="font-semibold text-lg mb-1">{photo.title}</h3>
                    <p className="text-sm text-white/90">{photo.description}</p>
                  </div>
                </div>
                <Badge className="absolute top-2 right-2 bg-black/50 text-white">
                  {photo.category}
                </Badge>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
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
                onClick={prevImage}
                data-testid="button-prev-image"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={nextImage}
                data-testid="button-next-image"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>

              {/* Image */}
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-w-full max-h-[80vh] object-contain"
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />

              {/* Image info */}
              <div className="absolute bottom-4 left-4 right-4 text-white bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{lightboxImage.title}</h3>
                    <p className="text-white/90">{lightboxImage.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={handleShare}
                      data-testid="button-share-image"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={handleDownload}
                      data-testid="button-download-image"
                    >
                      <Download className="h-4 w-4" />
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