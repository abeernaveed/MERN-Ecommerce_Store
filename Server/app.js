//Imports
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config({ path: "./.env" });
const productRouter = require("./routes/productRoute");
const brandRouter = require("./routes/brandRoute");
const categoryRouter = require("./routes/categoryRoute");
const userRouter = require("./routes/userRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const reviewRouter = require("./routes/reviewRoute");
const inventoryRouter = require("./routes/inventoryRoute");
const messageRouter = require("./routes/messageRoute");

app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);

//Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// Mongo DB Connection
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
mongoose.connect(DB, {}).then(() => console.log("Mongo DB connected!😎!"));

// Rest Apis
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/brands", brandRouter);
app.use("/users", userRouter);
app.use("/carts", cartRouter);
app.use("/orders", orderRouter);
app.use("/reviews", reviewRouter);
app.use("/inventory", inventoryRouter);
app.use("/message", messageRouter);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
