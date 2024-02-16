express = require("express");

const app = express();

const PORT = 3002;

const jiomartRoutes = require("./routes/JiomartRoutes");

// Parse JSON request body
app.use(express.json());

// Use Jiomart routes
app.use("/api", jiomartRoutes);
// Start the server
app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(
    "The Scrapper server is up and running!Currenly wokring routes are : \n /api/jiomartfreshfruits \n /api/jiomartfreshvegies \n /api/jiomartatta"
  );
});
