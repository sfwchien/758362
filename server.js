// Import Express
const express = require("express");
const app = express();

// Middleware để xử lý JSON
app.use(express.json());

// Endpoint GET
app.get("/", (req, res) => {
    res.send("Hello, this is my backend!");
});

// Endpoint POST
app.post("/data", (req, res) => {
    const data = req.body;
    res.send({ message: "Data received!", data });
});

// Chạy server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
