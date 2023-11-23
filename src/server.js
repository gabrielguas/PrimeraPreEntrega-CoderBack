import express from "express";
import productRouter from './routes/product.router.js'

const app = express();

//Main
app.get("/", (req, res) => {
    res.json({
        mensaje: "Bienvenido",
    });
});


// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/products", productRouter);

app.listen(8080, () => console.log("Server listening on port 8080"));
