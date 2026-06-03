const userRoutes = require("./routes/userRoutes");
const express = require("express");
const cors = require("cors");
const performanceRoutes = require("./routes/performanceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors());

app.use(express.json());

/* ================= ROUTES ================= */

app.use("/bookings", bookingRoutes);

app.use("/users", userRoutes);

app.use("/performance", performanceRoutes);

/* ================= TEST API ================= */

app.get("/", (req,res)=>{

    res.send("Pitch Booker Backend Running ✅");

});

/* ================= SERVER ================= */

app.listen(5000, ()=>{

    console.log("Server running on port 5000 🚀");

});