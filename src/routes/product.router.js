import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const pm = new ProductManager('./src/products.json')

const getProducts_middleware = async (req, res, next) => {
  const products = pm.getProducts(req, res);
  req.products = products;
  next();
};

router.get("/", getProducts_middleware, (req, res) => {
  const { products } = req;
  res.json(
    { products }
  );
});

const getProductByID_middleware = (req, res, next) => {
  const { ID } = req.params;
  const product = pm.getProductByID(ID);
  req.product = product;
  next();
};

router.get("/:ID", getProductByID_middleware, (req, res) => {
  const { product } = req;
  res.json({ product });
});
//revisar middlware
router.post("/", (req, res) => {
  console.log("Cuerpo de la solicitud:", req.body);

  const { title, description, price, code, stock, category, thumbnails } = req.body;

  try {
    pm.addProduct(title, description, price, code, stock, category, thumbnails);
    res.status(201).json({ message: "Producto agregado con éxito." });
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(400).json({ error: "Error al agregar el producto." });
  }
});




export default router;
