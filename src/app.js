import express from "express";

import placesRoutes from "./routes/places.routes.js";

const app = express();

app.use("/place", placesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: `endpoint ${req.path.replace("/", "")} not found`,
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


export default app;
