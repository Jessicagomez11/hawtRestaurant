var express = require("express");

var tableData = require("./data/tableData");
var waitListData = require("./data/waitinglistData");

var app = express();
var PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});
// app.get("/", function (req, res) {
//     res.json(tableData);
//     res.json({name: "ajay"});
// });

//server will send all the table data
app.get("/api/tables", function (req, res) {
    res.json(tableData);
});

app.post("/api/tables", function (req, res) {
    // if tables are available then send true
    if (tableData.length < 5) {
        tableData.push(req.body);
        res.json(true);
    }
    //otherwise send false
    else {
        waitListData.push(req.body);
        res.json(false);
    }
});

app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    tableData.length = 0;
    waitListData.length = 0;

    res.json({ ok: true });
});