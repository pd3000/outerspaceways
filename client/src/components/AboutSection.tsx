import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";

const artists: {
  name: string;
  website?: string;
  image?: string;
}[] = [
  { name: "Brian Settles", website: "https://www.briansettles.com", image: "https://www.briansettles.com/images/_I7C3603.jpg" },
  { name: "Jonathan Finlayson", website: "https://www.jonathanfinlayson.com", image: "https://jonathanfinlayson.com/images/edit1.jpg" },
];

export function AboutSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 max-w-3xl space-y-16">

        {/* About text */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Sun Ra preached spiritual liberation through music. Albert Ayler believed that music was the healing force of the universe. Pharoah Sanders assured us that the creator had a master plan. Fela Kuti told us music was a weapon. Music is a powerful force that has the power to heal, unite and liberate. My work is an homage to these ancestors and an attempt to bring new listeners to creative, improvised music for the purpose of collective liberation.
          </p>
        </div>

        {/* Artist roster */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Artists</h3>
          <div className="divide-y divide-border">
            {artists.map((artist, i) => (
              <div
                key={i}
                className="py-5 flex items-center gap-4"
                data-testid={`artist-${i}`}
              >
                <Avatar className="h-14 w-14 shrink-0">
                  <AvatarImage src={artist.image} alt={artist.name} className="object-cover object-top" />
                  <AvatarFallback className="text-lg font-semibold">
                    {artist.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-lg">{artist.name}</p>
                  {artist.website && (
                    <a
                      href={artist.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors truncate"
                      data-testid={`artist-website-${i}`}
                    >
                      <ExternalLink className="h-3 w-3 shrink-0" />
                      {artist.website.replace(/^https?:\/\//, "")}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
