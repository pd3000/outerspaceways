import express, { type Request, Response, NextFunction } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Remove "X-Powered-By: Express" header and add standard security headers
app.use(helmet({
  contentSecurityPolicy: false, // kept off so Vite HMR works in dev
}));
app.disable("x-powered-by");

// Rate limit all API routes — 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many requests, please try again later." },
});
app.use("/api", apiLimiter);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false, limit: "10kb" }));

// Dev request logger (API routes only, server-side only)
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // 404 handler for unknown API routes — no details leaked
  app.use("/api/*", (_req: Request, res: Response) => {
    res.status(404).json({ message: "Not found" });
  });

  // Global error handler — never expose stack traces or internal messages
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const isProd = app.get("env") !== "development";

    // In production, only pass through explicit HTTP errors (4xx); mask everything else
    const message =
      isProd && status >= 500
        ? "Internal Server Error"
        : err.message || "Internal Server Error";

    res.status(status).json({ message });

    // Still log the real error server-side so it's not silently swallowed
    if (status >= 500) {
      console.error(err);
    }
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    { port, host: "0.0.0.0", reusePort: true },
    () => { log(`serving on port ${port}`); }
  );
})();
