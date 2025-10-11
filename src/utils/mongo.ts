import mongoose from "mongoose";
import config from "../config";

let isConnected = false;

const getMongoUri = (): string => {
  const mongoUri = config?.backend?.MONGODB_URI || "";
  if (mongoUri === "") {
    console.error("Mongo URI could not be found in config.");
  }
  return mongoUri;
};

export const connectToDatabase = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  const uri = getMongoUri();

  if (!uri) {
    throw new Error("MongoDB URI not found in configuration");
  }

  try {
    await mongoose.connect(uri);
    isConnected = true;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

export const getConnection = (): typeof mongoose => {
  if (!isConnected) {
    throw new Error("Database not connected. Call connectToDatabase() first.");
  }
  return mongoose;
};

export const closeDatabase = async (): Promise<void> => {
  if (isConnected) {
    await mongoose.disconnect();
    isConnected = false;
    console.log("Disconnected from MongoDB");
  }
};

// Graceful shutdown handler
process.on("SIGINT", async () => {
  await closeDatabase();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDatabase();
  process.exit(0);
});
