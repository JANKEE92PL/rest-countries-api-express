const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.listen(3000, function () {
  console.log("listening on 3000");
});
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(
  "mongodb+srv://dbUser:Sdafskizpae4QQhB@cluster0.gatr2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("countries");
    const countriesCollection = db.collection("countries");

    app.get("/", (req, res) => {
      db.collection("countries")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { countries: results });
        })
        .catch((error) => console.error(error));
    });

    app.post("/countries", (req, res) => {
      countriesCollection
        .insertOne(req.body)
        .then((result) => {
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.put("/countries", (req, res) => {
      countriesCollection
        .findOneAndUpdate(
          { name: "Yoda" },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: true,
          }
        )
        .then((result) => {
          res.json("Success");
        })
        .catch((error) => console.log(error));
    });
    app.delete("/countries", (req, res) => {
      countriesCollection
        .deleteOne({ name: req.body.name })
          .then((result) => {
            if (result.deletedCount === 0) {
              return res.json("No quote to delete");
            }
              res.json(`Deleted Darth Vadar's quote`);
        })
        .catch((error) => console.error(error));
    });
  })
  .catch(console.error);
