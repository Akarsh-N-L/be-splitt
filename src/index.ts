import express from "express";
import indexRouter from "./routes";
import config from "./config";
import { connectToDatabase } from "./utils/mongo";
import errorHandler from "./middleware/error";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// Routes
app.use("/", indexRouter);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectToDatabase();

    // Start the server
    app.listen(config.backend.dev_port, () => {
      console.log("Server is running on port ", config.backend.dev_port);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
