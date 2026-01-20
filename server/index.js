const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8000;
app.use(express.json());
app.use(cookieParser());
const connect = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventryRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const returnRoutes = require("./routes/returnRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const quotationRoutes = require("./routes/quotationRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
app.get("/", (req, res) => {
    res.send("Hello from Express Server 🚀");
});
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/quotations", quotationRoutes);
app.use("/api/expenses", expenseRoutes);







connect()
    .then(() => {
        app.listen(PORT, () => {
            console.log(` Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error(" Failed to connect to MongoDB", err);
    });

