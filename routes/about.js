const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
  request.session.name = 'Khalid';

  let persons = [
    { name: 'Khalid', age: 25 },
    { name: 'Amel', age: 4 },
    { name: 'Noam', age: 1 }
  ];

  persons = persons.map(person => {
    return {
      title: person.name,
      subtitle: person.age,
      primaryCta: '/profile/iduser',
      primaryCtaLabel: 'See profile'
    };
  })

  response.render('card-list', { title: 'About us', data: persons });
});

module.exports = router;
