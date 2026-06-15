import photographerImage from "@assets/generated_images/Photographer_behind_scenes_photo_b2694374.png";

export function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={photographerImage}
              alt="About Outerspaceways"
              className="rounded-lg shadow-lg w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">About</h2>
          </div>
        </div>
      </div>
    </section>
  );
}