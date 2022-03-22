import express from "express"
import Product from "./model.js"
const productsRouter = express.Router();

productsRouter
    .get('/', async (req, res) => {
        const products = await Product.find({});
        res.status(200).send(products);
    })
    .get('/:id', async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).send()
            return
        }

        res.status(200).send(product);
    })
    .post('/', async (req, res) => {
        try {
            const product = new Product(req.body)
            await product.save()
            res.status(201).send(product)
        } catch (error) {
            res.status(400).send(error)
        }
    })

export default productsRouter