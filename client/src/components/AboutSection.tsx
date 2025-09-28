import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Award, Users, MapPin } from "lucide-react";
import photographerImage from "@assets/generated_images/Photographer_behind_scenes_photo_b2694374.png";

export function AboutSection() {
  const stats = [
    { icon: Camera, label: "Photos Captured", value: "10,000+" },
    { icon: Award, label: "Awards Won", value: "15" },
    { icon: Users, label: "Happy Clients", value: "500+" },
    { icon: MapPin, label: "Locations Visited", value: "50+" },
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={photographerImage}
              alt="Photographer at work"
              className="rounded-lg shadow-lg w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About the Artist</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Welcome to Outer Space Ways Photography. I'm passionate about capturing the extraordinary 
                in everyday moments and the breathtaking beauty of our natural world.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                With over a decade of experience in photography, I specialize in landscape, portrait, 
                and street photography. My work has been featured in numerous publications and 
                exhibitions, and I've had the privilege of working with clients from around the world.
              </p>
              
              <p className="text-muted-foreground leading-relaxed">
                Every photograph tells a story, and I believe in capturing authentic moments that 
                resonate with emotion and meaning. Whether it's the golden hour over mountain peaks 
                or the candid smile of a portrait subject, I strive to create images that stand the test of time.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 py-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="text-center hover-elevate">
                    <CardContent className="p-4">
                      <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={() => console.log("View portfolio clicked")}
                data-testid="button-view-portfolio"
              >
                View Full Portfolio
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => console.log("Get in touch clicked")}
                data-testid="button-get-in-touch"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}