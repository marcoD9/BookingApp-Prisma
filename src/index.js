import express from "express";
import * as Sentry from "@sentry/node";
import loginRouter from "./routes/login.js";
import usersRouter from "./routes/users.js";
import propertiesRouter from "./routes/properties.js";
import hostsRouter from "./routes/hosts.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";
import log from "./middleware/logMiddleware.js";
import "dotenv/config";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 3000;

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    // Automatically instrument Node.js libraries and frameworks
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
// RequestHandler creates a separate execution context, so that all
// transactions/spans/breadcrumbs are isolated across requests
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use(log);

app.use("/login", loginRouter);

app.use("/users", usersRouter);

app.use("/properties", propertiesRouter);

app.use("/hosts", hostsRouter);

app.use("/amenities", amenitiesRouter);

app.use("/bookings", bookingsRouter);

app.use("/reviews", reviewsRouter);

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
