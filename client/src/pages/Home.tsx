import { useState } from "react";
import { GeometricOverlay } from "@/components/GeometricPatterns";
import { Calendar, Clock, MapPin, List, ChevronLeft, ChevronRight, X } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, subMonths, isSameMonth, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/tock-page-outerspaceways-hero-logo_1759110228249.jpg";

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

function gigsOnDay(date: Date) {
  return gigs.filter((g) => isSameDay(g.date, date));
}

function CalendarView() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    const first = sortedGigs[0]?.date ?? new Date();
    return startOfMonth(first);
  });
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let cursor = gridStart;
  while (cursor <= gridEnd) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }

  const selectedGigs = selectedDay ? gigsOnDay(selectedDay) : [];

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          data-testid="button-prev-month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="font-semibold text-lg">{format(currentMonth, "MMMM yyyy")}</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          data-testid="button-next-month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 border-l border-t border-border">
        {days.map((day, i) => {
          const dayGigs = gigsOnDay(day);
          const hasGig = dayGigs.length > 0;
          const isCurrentMonth = isSameMonth(day, currentMonth);
          const isSelected = selectedDay ? isSameDay(day, selectedDay) : false;

          return (
            <div
              key={i}
              className={[
                "border-r border-b border-border min-h-[64px] p-1 relative",
                !isCurrentMonth ? "opacity-30" : "",
                hasGig ? "cursor-pointer" : "",
              ].join(" ")}
              onClick={() => hasGig && setSelectedDay(isSelected ? null : day)}
              data-testid={hasGig ? `cal-day-${format(day, "yyyy-MM-dd")}` : undefined}
            >
              <span
                className={[
                  "text-xs font-medium inline-flex items-center justify-center w-6 h-6 rounded-full",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground",
                ].join(" ")}
              >
                {format(day, "d")}
              </span>
              {hasGig && (
                <div className="mt-1 space-y-0.5">
                  {dayGigs.map((g) => (
                    <div
                      key={g.id}
                      className="text-[10px] leading-tight bg-foreground text-background rounded px-1 truncate"
                    >
                      {g.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected day detail */}
      {selectedDay && selectedGigs.length > 0 && (
        <div className="mt-6 border border-border rounded-md p-4 relative">
          <button
            className="absolute top-3 right-3 text-muted-foreground"
            onClick={() => setSelectedDay(null)}
            data-testid="button-close-day-detail"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="font-semibold mb-3">{format(selectedDay, "EEEE, MMMM d, yyyy")}</p>
          {selectedGigs.map((gig) => (
            <div key={gig.id} className="py-2 border-t border-border first:border-t-0">
              <p className="font-medium">{gig.title}</p>
              <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {gig.time}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" /> {gig.venue}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [view, setView] = useState<"list" | "calendar">("list");

  return (
    <div className="min-h-screen">
      {/* Header banner */}
      <div className="relative w-full">
        <img
          src={heroImage}
          alt="Outerspaceways"
          className="w-full object-cover object-center h-48 sm:h-64 md:h-80 lg:max-h-[420px] lg:h-auto"
        />
      </div>

      {/* Gig list / calendar */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <h2 className="text-2xl font-bold">Upcoming Shows</h2>
          <div className="flex items-center gap-1 border border-border rounded-md p-1">
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("list")}
              data-testid="button-view-list"
            >
              <List className="h-4 w-4 mr-1.5" /> List
            </Button>
            <Button
              variant={view === "calendar" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("calendar")}
              data-testid="button-view-calendar"
            >
              <Calendar className="h-4 w-4 mr-1.5" /> Calendar
            </Button>
          </div>
        </div>

        {view === "list" ? (
          sortedGigs.length === 0 ? (
            <p className="text-muted-foreground">No upcoming shows listed yet.</p>
          ) : (
            <div className="divide-y divide-border">
              {sortedGigs.map((gig) => (
                <div
                  key={gig.id}
                  className="py-5 flex flex-col gap-1 sm:grid sm:items-center sm:gap-x-6"
                  style={{ gridTemplateColumns: "160px 1fr 90px 1fr" }}
                  data-testid={`gig-${gig.id}`}
                >
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <Calendar className="h-4 w-4 shrink-0" />
                    <span>{format(gig.date, "MMM d, yyyy")}</span>
                  </div>
                  <div className="font-medium">{gig.title}</div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5 shrink-0" />
                    <span>{gig.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{gig.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <CalendarView />
        )}
      </div>
    </div>
  );
}
