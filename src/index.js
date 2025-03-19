import express from "express";
import { config } from "dotenv";
config();

import placesRoutes from "./routes/places.routes.js";

const app = express();

app.use("/place", placesRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
