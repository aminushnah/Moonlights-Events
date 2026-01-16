const express = require("express");
const app = express();
const PORT = 3000;
const connect = require("./config/db");

app.use(express.json());


app.get("/", (req, res) => {
    res.send("Hello from Express Server 🚀");
});

// app.use("/api/invoices", require("./routes/invoiceRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/inventory", require("./routes/inventryRoutes"));


connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(" Failed to connect to MongoDB", err);
    });

