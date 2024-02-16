express = require("express");

const app = express();

const PORT = 3002;

const {
  fetchJiomartVegetablesDataController,
  fetchJiomartFruitsDataController,
  fetchJiomartAttaDataController,
} = require("./controller/scrapeController");
// Parse JSON request body
app.use(express.json());
// Start the server
app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send(
    "The Scrapper server is up and running!Currenly wokring routes are : \n /api/jiomartfreshfruits \n /api/jiomartfreshvegies \n /api/jiomartatta"
  );
});

app.get("/api/jiomartfreshfruits", fetchJiomartFruitsDataController);
app.get("/api/jiomartfreshvegies", fetchJiomartVegetablesDataController);
app.get("/api/jiomartatta", fetchJiomartAttaDataController);
