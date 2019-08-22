const routes = require('next-routes')

module.exports = routes()
  .add('film', '/film/:id')
  .add('character', '/character/:id')
  .add('planet', '/planet/:id')
  .add('species', '/species/:id')
  .add('vehicle', '/vehicle/:id')
  .add('starship', '/starship/:id')
