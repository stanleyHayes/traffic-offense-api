import express from "express";

import driverV1Router from "./routes/v1/driver.routes.js";

const app = express();

app.use("/api/v1/drivers", driverV1Router);

export default app;