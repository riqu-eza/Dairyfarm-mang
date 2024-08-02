import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import FarmRouter from "./routes/farm.route.js"
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"
import LivestockRouter from "./routes/Livestock.route.js";
import ProductionRouter from "./routes/milkproduction.route.js";
import FoodSupplyRouter from "./routes/foodsupply.route.js";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

// const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});


app.use("/api/farm", FarmRouter)
app.use("/api/Livestock", LivestockRouter)
app.use("/api/milk-production", ProductionRouter)
app.use("/api/food-supply", FoodSupplyRouter)

// app.use(express.static(path.join(__dirname, "/client/dist")));

// app.get("*", (req, res, next) => {
//   res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
// });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
