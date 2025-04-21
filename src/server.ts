import express from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

export async function connectDB() {
  await db.authenticate();
  db.sync();
}
connectDB();

const server = express();

server.use(express.json());

server.use("/api/products", router);

server.get("/api", (req, res) => {
  res.json({ msg: "Desde API" });
});

export default server;
