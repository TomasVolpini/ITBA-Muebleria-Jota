import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./server/.env" });

const connectionString = process.env.MONGO_URI;

export const connectToDB = async () => {
  if (!connectionString) {
    throw new Error("MONGO_URI no está definida en las variables de entorno");
  }

  await mongoose.connect(connectionString);
  console.log("Contectado a la base de datos");
};
