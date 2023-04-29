import express from "express";
import mongoose from "mongoose";

import {MONGODB_URI} from "./config/config.js";

import driverV1Router from "./routes/v1/driver.routes.js";

const app = express();
mongoose.connect(MONGODB_URI).then(value => {
    console.log(`Connected to MongoDB on host ${value.connection.host}`);
}).catch(error => {
    console.log(`Error connecting to MongoDB: ${error}`);
})


app.use("/api/v1/drivers", driverV1Router);

export default app;