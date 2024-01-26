import express from "express";
import cors from "cors";
import petRoutes from "./routes/pets.js";

const app = express();
const port = 8800;

app.use(cors());
app.use(express.json());

app.use("/", petRoutes);

app.listen(port, () => {
  console.log("Server running");
  console.log(`Access: http://localhost:${port}`);
});
