const express = require("express");
const app = express();
const PORT = 8000;
app.use(express.json());
const connect = require("./config/db");
const inventoryRoutes = require("./routes/inventryRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const returnRoutes = require("./routes/returnRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");

app.get("/", (req, res) => {
    res.send("Hello from Express Server 🚀");
});



app.use("/api/inventory", inventoryRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/returns", returnRoutes);






connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(" Failed to connect to MongoDB", err);
    });

