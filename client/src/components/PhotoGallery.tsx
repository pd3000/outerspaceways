import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const photos: {
  id: number;
  src: string;
  caption?: string;
}[] = [];

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (index: number) => setLightboxIndex(index);
  const close = () => setLightboxIndex(null);

  const prev = () =>
    setLightboxIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  const next = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % photos.length));

  const current = lightboxIndex !== null ? photos[lightboxIndex] : null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {photos.length === 0 ? (
          <p className="text-muted-foreground">No photos yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="aspect-square overflow-hidden cursor-pointer hover-elevate rounded-md"
                onClick={() => open(index)}
                data-testid={`photo-${photo.id}`}
              >
                <img
                  src={photo.src}
                  alt={photo.caption ?? ""}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {current && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white"
              onClick={close}
              data-testid="button-close-lightbox"
            >
              <X className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
              onClick={prev}
              data-testid="button-prev-photo"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white"
              onClick={next}
              data-testid="button-next-photo"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
            <div className="text-center">
              <img
                src={current.src}
                alt={current.caption ?? ""}
                className="max-h-[85vh] max-w-full object-contain"
              />
              {current.caption && (
                <p className="text-white/70 mt-3 text-sm">{current.caption}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
