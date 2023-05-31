import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

import {MONGODB_URI} from "./config/config.js";

import driverV1Router from "./routes/v1/driver.routes.js";
import vehicleV1Router from "./routes/v1/vehicle.routes.js";
import offenseV1Router from "./routes/v1/offense.routes.js";
import adminsV1Router from "./routes/v1/admin.routes.js";
import authV1Router from "./routes/v1/authentication.routes.js";
import dashboardV1Router from "./routes/v1/dashboard.routes.js";

const app = express();
mongoose.connect(MONGODB_URI).then(value => {
    console.log(`Connected to MongoDB on host ${value.connection.host}`);
}).catch(error => {
    console.log(`Error connecting to MongoDB: ${error}`);
});

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({limit: "10mb"}));
app.use("/api/v1/drivers", driverV1Router);
app.use("/api/v1/auth", authV1Router);
app.use("/api/v1/vehicles", vehicleV1Router);
app.use("/api/v1/offenses", offenseV1Router);
app.use("/api/v1/admins", adminsV1Router);
app.use("/api/v1/dashboard", dashboardV1Router);

export default app;