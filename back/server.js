const express = require("express");
const cors = require("cors");
const loginRoutes = require("./routes/login.routes");
const signupRoutes = require("./routes/signup.routes");
const productRouter = require("./routes/product.routes");
const categoryRouter = require("./routes/category.routes");
const cartRouter = require("./routes/cart.routes");

const app = express();


const corsOptions = {
    origin: ['http://localhost:3000'],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
    credentials: true,
    enablePreflight: true
}

app.use(cors(corsOptions));

app.use(express.json())

app.use("/", loginRoutes);
app.use("/", signupRoutes);
app.use("/products", productRouter);
app.use("/categorys", categoryRouter);
app.use("/cart", cartRouter);



app.listen(8080, () => 
    console.log("Listening on port 8080")
)

