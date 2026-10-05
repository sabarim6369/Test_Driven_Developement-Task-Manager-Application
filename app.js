const express = require("express");

const app = express();

app.get("/tasks", (req, res) => {
    res.status(200).json([]);
});

module.exports = app;