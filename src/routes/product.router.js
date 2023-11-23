import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

const pm = new ProductManager('./src/products.json')

const getProducts_middleware = async (req, res, next) => {
  let products = pm.getProducts();
  req.products = products;
  next();
};

router.get("/", getProducts_middleware, (req, res) => {
  const { products } = req;
  res.json(
    { products }
  );
});

export default router;
