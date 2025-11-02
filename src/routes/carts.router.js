import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const manager = new CartManager('./data/carts.json');

router.post('/', async (req, res) => {
  const cart = await manager.createCart();
  res.status(201).json(cart);
});

router.get('/:cid', async (req, res) => {
  const cart = await manager.getCartById(Number(req.params.cid));
  cart ? res.json(cart.products) : res.status(404).send('Carrito no encontrado');
});

router.post('/:cid/product/:pid', async (req, res) => {
  const updated = await manager.addProductToCart(Number(req.params.cid), Number(req.params.pid));
  updated ? res.json(updated) : res.status(404).send('Carrito no encontrado');
});

export default router;
