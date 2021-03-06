const express = require('express');
const Product = require('../model/product');
const router = express.Router();

router.get('/', (request, response) => {
  Product.find()
    .then(products => {
      response.render('product/manage', { title: 'Products administration', products })
    })
    .catch(error => console.error(error));
});

router.post('/', (request, response) => {
  let errors = [];

  ['name', 'price', 'stock', 'picture'].forEach(property => {
    if (!request.body[property]) {
      errors.push({
        property,
        message: `${property} is required!`
      });
    }
  });

  if (errors.length) {
    Product.find()
      .then(products => response.render('product/manage', { title: 'Products administration', products, errors }))
      .catch(error => console.error(error));
    return;
  }

  let product = new Product(request.body);
  product.save()
    .then(() => response.redirect('/product'))
    .catch(error => console.error(error));
})

router.get('/:id', (request, response) => {
  Product.findById(request.params.id)
    .then(product => {
      response.render('product/article-details', {
        title: product.name,
        datum: {
          id: product._id,
          picture: product.picture,
          title: product.name,
          subtitle: product.price
        }
      });
    })
    .catch(error => { console.error(error) });
});

router.post('/:id/delete', (request, response) => {
  Product.remove({ _id: request.params.id })
    .then(() => {
      response.redirect('/product');
    })
    .catch(error => console.error(error));
});

router.get('/:id/edit', (request, response) => {
  Product.findById(request.params.id)
    .then(product => {
      Product.find()
        .then(products => {
          response.render('product/manage', { title: 'Products administration', products, product });
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
});

router.post('/:id/edit', (request, response) => {
  Product.findOneAndUpdate({ _id: request.params.id }, request.body)
    .then(() => response.redirect('/product'))
    .catch(error => console.error(error));
});

/**
 * @todo faire un formulaire pour cr??er un produit en BDD 
 *       Tous les champs doivent ??tre obligatoire et le prix et stock doivent ??tre en num??rique
 *       Afficher des les ??rreurs du formulaire s'il y en a en remettant les infos d??j?? saisie
 * @todo afficher les produits r??cup??rer depuis notre BDD sur la page d'accueil
 * @todo afficher le produit sur la page d??tails depuis notre BDD
 * 
 * @todo afficher dans un tableau html la liste des produits sous le formulaire de cr??ation
 * @todo rajouter une colonne action pour modifier ou supprimer les produits depuis le tableau
 * @todo pour la modification r??utiliser le m??me formulaire que la cr??ation
 */

module.exports = router;