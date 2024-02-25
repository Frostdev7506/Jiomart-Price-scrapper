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
  let routes = [];
  jiomartRoutes.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      routes.push("/api" + r.route.path);
    }
  });

  res.send(
    "The Data Scrapper server is up and running!<br/> <br/>  Currently working routes are : <br/> ---------------------------------<br/>  " +
      routes.join("<br/> ")
  );
});
