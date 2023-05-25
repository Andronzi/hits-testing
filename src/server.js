const express = require("express");
const app = express();
const minEatingSpeed = require("./koko.js");

app.use(express.json());

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect to the database");
  })
  .catch((err) => {
    console.log("cannot connect to the database");
  });

app.set("view engine", "ejs");

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = express.urlencoded({ extended: false });

app.get("/", function (request, response) {
  response.render("index.ejs", { result: "123" });
});

app.post("/", urlencodedParser, function (req, res) {
  console.log(req.body);
  if (Object.keys(req.body).length === 0) return res.sendStatus(400);
  const { piles, h } = req.body;

  if (!piles || !h) return res.sendStatus(400);

  if (piles.match(/[a-zA-Z]+/) || h.match(/[a-zA-Z]+/))
    return res.sendStatus(400);

  const result = minEatingSpeed(
    piles.split(" ").map((strVal) => +strVal),
    +h
  );
  res.json({
    result: result,
  });
});

require("./routes/tutorial.route.js")(app);

app.listen(3000, () => console.log("Сервер запущен..."));

module.exports = app;
