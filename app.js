express = require("express");

const app = express();

const {
  fetchJiomartVegetablesDataController,
} = require("./controller/scrapeController");
// Parse JSON request body
app.use(express.json());
// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.get("/api/jiomartfreshvegies", fetchJiomartVegetablesDataController);
