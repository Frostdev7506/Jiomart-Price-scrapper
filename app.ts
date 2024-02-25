import express, { Request, Response } from "express";
import jiomartRoutes from "./routes/JiomartRoutes";

const app = express();

const PORT = 3002;

// Parse JSON request body
app.use(express.json());

// Use Jiomart routes
app.use("/api", jiomartRoutes);

// Start the server
app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req: Request, res: Response) => {
  let routes: string[] = [];
  jiomartRoutes.stack.forEach(function (r: any) {
    if (r.route && r.route.path) {
      routes.push("/api" + r.route.path);
    }
  });

  res.send(
    "The Scrapper server is up and running!<br/>  Currently working routes are : <br/>  " +
      routes.join("<br/> ")
  );
});
