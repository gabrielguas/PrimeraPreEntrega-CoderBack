import { readFileSync, writeFileSync } from 'fs';
import  Product  from './Product.js';

class ProductManager {
    constructor(path) {
        this.path = path;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = readFileSync(this.path, 'utf8');
            if (data) {
                this.products = JSON.parse(data);
            }
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        writeFileSync(this.path, data);
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (title && description && price && thumbnail && code && stock) {
            if (this.validateCode(code)) {
                const lastID = this.products.length > 0 ? this.products[this.products.length - 1].ID : -1;
                const newID = lastID + 1;
                const newProduct = new Product(title, description, price, thumbnail, code, stock, newID);
                this.products.push(newProduct);
                this.saveProducts();
                console.log("Producto agregado correctamente.");
            } else {
                console.log("Ya existe un producto con el mismo código.");
            }
        } else {
            console.log("Todos los campos son obligatorios.");
        }
    }

    validateCode(code) {
        return !this.products.some(product => product.code === code);
    }

    getProducts() {
        return this.products;
    }

    getProductByID(ID) {
        const product = this.products.find(product => product.ID === ID);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado.");
        }
    }

    updateProduct(ID, updatedProduct) {
        const index = this.products.findIndex(product => product.ID === ID);
        if (index !== -1) {
            updatedProduct.ID = this.products[index].ID;
            this.products[index] = updatedProduct;
            this.saveProducts();
            console.log("Producto actualizado correctamente.");
        } else {
            console.log("No se encontró el producto con el ID proporcionado.");
        }
    }

    deleteProduct(ID) {
        const index = this.products.findIndex(product => product.ID === ID);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log("Producto eliminado correctamente.");
        } else {
            console.log("No se encontró el producto con el ID proporcionado.");
        }
    }
}

export default ProductManager;