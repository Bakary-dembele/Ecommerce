const app = require('express');
const Product = require('../model/product');
const router = app.Router();

router.get('/', (request, response) => {
  Product.find()
    .then(products => {
      let data = products.map(product => {
        return {
          id: product._id,
          title: product.name,
          subtitle: product.price,
          picture: product.picture,
          primaryCta: `/product/${product._id}`,
          primaryCtaLabel: 'Détails',
          secondaryCta: true
        };
      });
      response.render('card-list', { title: 'Home', data });
    })
    .catch(error => console.error(error));
});

module.exports = router;
