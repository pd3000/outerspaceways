import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Music, Users, Headphones } from "lucide-react";
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from "date-fns";

// todo: remove mock data - replace with Google Calendar API
const mockEvents = [
  {
    id: 1,
    title: "Zara Cosmic Live",
    date: new Date(),
    time: "8:00 PM",
    location: "The Cosmic Lounge",
    type: "Live Performance",
    description: "Avant-garde saxophone meets interstellar soundscapes.",
  },
  {
    id: 2,
    title: "Afrofuture Collective Showcase",
    date: addDays(new Date(), 3),
    time: "7:30 PM",
    location: "Space Station Venue",
    type: "Electronic",
    description: "Traditional rhythms reimagined for the space age.",
  },
  {
    id: 3,
    title: "Solar Wind Orchestra",
    date: addDays(new Date(), 7),
    time: "9:00 PM",
    location: "The Observatory",
    type: "Free Jazz",
    description: "17 musicians exploring cosmic dimensions together.",
  },
  {
    id: 4,
    title: "Outerspaceways Open Mic",
    date: addDays(new Date(), 14),
    time: "6:00 PM",
    location: "Nebula Arts Center",
    type: "Open Mic",
    description: "Monthly gathering for experimental musicians.",
  },
];

export function EventsCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");

  const currentMonth = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const calendarDays = eachDayOfInterval({ start: currentMonth, end: monthEnd });

  const getEventsForDate = (date: Date) => {
    return mockEvents.filter(event => isSameDay(event.date, date));
  };

  const upcomingEvents = mockEvents
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "Live Performance":
        return <Music className="h-4 w-4" />;
      case "Electronic":
        return <Headphones className="h-4 w-4" />;
      case "Free Jazz":
        return <Music className="h-4 w-4" />;
      case "Open Mic":
        return <Users className="h-4 w-4" />;
      default:
        return <Music className="h-4 w-4" />;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Live Performance":
        return "bg-orange-500";
      case "Electronic":
        return "bg-teal-500";
      case "Free Jazz":
        return "bg-purple-500";
      case "Open Mic":
        return "bg-red-500";
      default:
        return "bg-primary";
    }
  };

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Upcoming Shows</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience cosmic sounds and afro-futuristic music in intimate venues across the galaxy.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2">
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => {
                setViewMode("list");
                console.log("Switched to list view");
              }}
              data-testid="button-list-view"
            >
              List View
            </Button>
            <Button
              variant={viewMode === "calendar" ? "default" : "outline"}
              onClick={() => {
                setViewMode("calendar");
                console.log("Switched to calendar view");
              }}
              data-testid="button-calendar-view"
            >
              Calendar View
            </Button>
          </div>
        </div>

        {viewMode === "list" ? (
          /* List View */
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover-elevate" data-testid={`event-${event.id}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getEventTypeIcon(event.type)}
                      {event.title}
                    </CardTitle>
                    <Badge variant="secondary">{event.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {format(event.date, "MMMM d, yyyy")}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {event.location}
                    </div>
                    <p className="text-sm mt-3">{event.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Calendar View */
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {format(selectedDate, "MMMM yyyy")}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day) => {
                    const eventsOnDay = getEventsForDate(day);
                    const isCurrentDay = isToday(day);
                    
                    return (
                      <div
                        key={day.toISOString()}
                        className={`min-h-[60px] p-2 border rounded-md cursor-pointer hover-elevate ${
                          isCurrentDay ? "bg-primary/10 border-primary" : "border-border"
                        }`}
                        onClick={() => {
                          setSelectedDate(day);
                          console.log(`Selected date: ${format(day, "yyyy-MM-dd")}`);
                        }}
                        data-testid={`calendar-day-${format(day, "yyyy-MM-dd")}`}
                      >
                        <div className="text-sm font-medium">{format(day, "d")}</div>
                        <div className="space-y-1">
                          {eventsOnDay.slice(0, 2).map((event) => (
                            <div
                              key={event.id}
                              className={`text-xs px-1 py-0.5 rounded text-white ${getEventTypeColor(event.type)}`}
                            >
                              {event.title.length > 10 ? `${event.title.slice(0, 10)}...` : event.title}
                            </div>
                          ))}
                          {eventsOnDay.length > 2 && (
                            <div className="text-xs text-muted-foreground">
                              +{eventsOnDay.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}