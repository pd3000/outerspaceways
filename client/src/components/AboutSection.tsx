import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Star, Users, Volume2 } from "lucide-react";
import photographerImage from "@assets/generated_images/Photographer_behind_scenes_photo_b2694374.png";

export function AboutSection() {
  const stats: { icon: typeof Volume2; label: string; value: string }[] = [];

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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">About Outerspaceways</h2>
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
                onClick={() => console.log("View artists clicked")}
                data-testid="button-view-artists"
              >
                <Music className="h-4 w-4 mr-2" />
                Explore Artists
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => console.log("Join community clicked")}
                data-testid="button-join-community"
              >
                <Star className="h-4 w-4 mr-2" />
                Join Our Community
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}