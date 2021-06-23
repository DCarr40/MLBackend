const express = require('express');
const repoContext = require('./repository/repository-wrapper');
const cors = require('cors');
const {validateProduct} = require('./middleware/products-validation');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(5000, () => {console.log("Server started. Listening on port 5000.");})


//GET Requests
app.get('/api/products', (req, res) =>{
    const products = repoContext.products.findAllProducts();
    const songs = repoContext.songs.findAllSongs();
    return res.send(products);
})

app.get('/api/products/:id', (req, res) =>{
    const id = req.params.id;
    const products = repoContext.products.findProductById(id);
    return res.send(products);
})


//POST Requests

app.post('/api/products',[validateProduct], (req, res) =>{
    const newProducts = req.body;
    const addedProducts = repoContext.products.createProduct(newProducts);
    return res.send(addedProducts);
})


//PUT Requests

app.put('/api/products/:id',[validateProduct], (req, res) =>{
    const id = req.params.id;
    const productPropertiesToUpdate = req.body;
    const updatedProducts = repoContext.products.updateProduct(id, productPropertiesToUpdate);
    return res.send(updatedProducts);
})


//DELETE Requests

app.delete('/api/products/:id', (req, res) =>{
    const id = req.params.id;
    const updatedDataSet = repoContext.products.deleteProduct(id);
    return res.send(updatedDataSet);
})