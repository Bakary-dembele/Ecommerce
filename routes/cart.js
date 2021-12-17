const express = require('express');
const router = express.Router();
const Product = require('../model/product');

router.get('/', (request, response) => {
  let cart = [];
  let total = 0;
  let index = 0;

  if (!request.session.cart || !request.session.cart.length) {
    response.render('cart/index', { cart, title: 'Cart', total });
    return;
  }

  async function putProductsInCart() {
    for (let cartItem of request.session.cart) {
      index++;
      try {
        const product = await Product.findById(cartItem.productId);
        cart.push({ product, quantity: cartItem.quantity });

        total += product.price * cartItem.quantity;

        if (index === request.session.cart.length) {
          response.render('cart/index', { cart, title: 'Cart', total });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  putProductsInCart();
});

router.post('/add/:id', (request, response) => {
  if (!request.session.cart) {
    request.session.cart = [];
  }
  let productInCart = request.session.cart.find(cartItem => {
    return cartItem.productId === request.params.id;
  });

  if (productInCart) {
    productInCart.quantity += parseInt(request.body.quantity);
  } else {
    if (!request.session.cart) {
      request.session.cart = [];
    }
    request.session.cart.push({ productId: request.params.id, quantity: parseInt(request.body.quantity) });
  }

  response.redirect(request.header('Referer') || '/');
});

router.post('/validate', (request, response) => {
  response.redirect('/checkout/address');
})

module.exports = router;
