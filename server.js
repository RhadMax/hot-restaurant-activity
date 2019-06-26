// Dependencies
// =============================================================
const express = require("express");
const path = require("path");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//(DATA)
// =============================================================
const tables = [];
const waiting = [];

// Routes
// =============================================================
app.get("/api/waitlist", (req, res) => {
    return res.json(waiting);
});
app.get("/api/tables", (req, res) => {
    return res.json(tables);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.post("/api/reserve", (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newReserve = req.body;

    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newCharacter.routeName = newCharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReserve);
    if (tables.length > 4) {
        waiting.push(newReserve);
    } else {
        tables.push(newReserve)
    }

    res.json(newReserve);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });