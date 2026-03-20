import express from "express";
import aiRoutes from "./routes/ai.route.js";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors({
  origin: "https://fixcodeai.vercel.app",
  methods: ["POST"]
}));

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});
app.post("/get-review", aiRoutes);

export default app;
