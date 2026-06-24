import type { Express } from "express";
import { createServer, type Server } from "http";

const CALENDAR_BASE = "https://www.googleapis.com/calendar/v3/calendars";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/events", async (req, res) => {
    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;

    if (!calendarId || !apiKey) {
      return res.status(500).json({ error: "Calendar not configured." });
    }

    try {
      const timeMin = new Date().toISOString();
      const url =
        `${CALENDAR_BASE}/${encodeURIComponent(calendarId)}/events` +
        `?key=${apiKey}` +
        `&timeMin=${timeMin}` +
        `&orderBy=startTime` +
        `&singleEvents=true` +
        `&maxResults=50`;

      const gcalRes = await fetch(url);

      if (!gcalRes.ok) {
        const body = await gcalRes.text();
        console.error("Google Calendar API error:", gcalRes.status, body);
        return res.status(502).json({ error: "Failed to fetch calendar events." });
      }

      const data = await gcalRes.json() as { items?: any[] };
      const items = data.items ?? [];

      const events = items.map((item: any) => {
        const start = item.start?.dateTime ?? item.start?.date ?? "";
        const end = item.end?.dateTime ?? item.end?.date ?? "";
        return {
          id: item.id as string,
          title: (item.summary as string) ?? "(No title)",
          start,
          end,
          allDay: !item.start?.dateTime,
          location: (item.location as string) ?? "",
          description: (item.description as string) ?? "",
          url: (item.htmlLink as string) ?? "",
        };
      });

      res.json(events);
    } catch (err) {
      console.error("Error fetching calendar events:", err);
      res.status(500).json({ error: "Internal server error." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
