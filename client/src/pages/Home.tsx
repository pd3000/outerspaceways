import { OuterspaceaaysIcon } from "@/components/OuterspaceaaysLogo";
import { GeometricOverlay } from "@/components/GeometricPatterns";
import { Calendar, Clock, MapPin } from "lucide-react";
import { format } from "date-fns";

const gigs: {
  id: number;
  title: string;
  date: Date;
  time: string;
  venue: string;
}[] = [
  { id: 1, title: "Outerspaceways Night", date: new Date("2026-07-04"), time: "9:00 PM", venue: "The Mothership, Atlanta GA" },
  { id: 2, title: "Late Night Session", date: new Date("2026-07-12"), time: "10:00 PM", venue: "Club Arkestra, New York NY" },
  { id: 3, title: "Open Air Gathering", date: new Date("2026-07-19"), time: "7:00 PM", venue: "Prospect Park, Brooklyn NY" },
  { id: 4, title: "Cosmic Jazz Evening", date: new Date("2026-08-02"), time: "8:30 PM", venue: "The Blue Note, New York NY" },
  { id: 5, title: "Afrofuture Festival", date: new Date("2026-08-15"), time: "6:00 PM", venue: "Grant Park, Chicago IL" },
];

const sortedGigs = [...gigs].sort((a, b) => a.date.getTime() - b.date.getTime());

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header banner */}
      <GeometricOverlay pattern="triangular" patternClass="text-white/10">
        <div className="relative flex items-center justify-center py-24 bg-black">
          <div className="relative z-10 text-center">
            <OuterspaceaaysIcon size={72} variant="light" />
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
