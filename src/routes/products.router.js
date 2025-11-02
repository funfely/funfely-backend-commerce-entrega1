import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const manager = new ProductManager('./data/products.json');

router.get('/', async (req, res) => {
  res.json(await manager.getProducts());
});

router.get('/:pid', async (req, res) => {
  const product = await manager.getProductById(Number(req.params.pid));
  product ? res.json(product) : res.status(404).send('Producto no encontrado');
});

router.post('/', async (req, res) => {
  const nuevo = await manager.addProduct(req.body);
  res.status(201).json(nuevo);
});

router.put('/:pid', async (req, res) => {
  const actualizado = await manager.updateProduct(Number(req.params.pid), req.body);
  actualizado ? res.json(actualizado) : res.status(404).send('No encontrado');
});

router.delete('/:pid', async (req, res) => {
  await manager.deleteProduct(Number(req.params.pid));
  res.status(204).send();
});

export default router;
