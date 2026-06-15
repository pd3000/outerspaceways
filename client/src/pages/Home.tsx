import { OuterspaceaaysLogo } from "@/components/OuterspaceaaysLogo";
import { GeometricOverlay } from "@/components/GeometricPatterns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";
import heroImage from "@assets/tock-page-outerspaceways-hero-logo_1759110228249.jpg";

const gigs: {
  id: number;
  title: string;
  date: Date;
  time: string;
  venue: string;
}[] = [];

const sortedGigs = [...gigs].sort((a, b) => a.date.getTime() - b.date.getTime());

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Background header with logo */}
      <GeometricOverlay pattern="triangular" patternClass="text-primary/10">
        <div
          className="relative flex items-center justify-center py-24"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/55 to-black/80" />
          <div className="relative z-10 text-center">
            <OuterspaceaaysLogo size="xl" variant="light" showPattern={true} />
          </div>
        </div>
      </GeometricOverlay>

      {/* Gig list */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h2 className="text-2xl font-bold mb-8">Upcoming Shows</h2>

        {sortedGigs.length === 0 ? (
          <p className="text-muted-foreground">No upcoming shows listed yet.</p>
        ) : (
          <div className="divide-y divide-border">
            {sortedGigs.map((gig) => (
              <div
                key={gig.id}
                className="py-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8"
                data-testid={`gig-${gig.id}`}
              >
                <div className="flex items-center gap-2 text-primary font-semibold min-w-[140px]">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>{format(gig.date, "MMM d, yyyy")}</span>
                </div>
                <div className="flex-1 font-medium">{gig.title}</div>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    {gig.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    {gig.venue}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
