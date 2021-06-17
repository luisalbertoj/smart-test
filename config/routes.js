/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  'POST /persona/search' : {action: 'persona/search'},
  'POST /persona/registrar' : {action: 'persona/registrar'},
  'POST /persona/actualizar' : {action: 'persona/actualizar'},
  'POST /privilegio/cambiarprivilegios' : {action: 'privilegio/cambiarPrivilegios'},
  'GET /getprueba/:id' : {action: 'pruebaConocimiento/getprueba'},
  'GET /getleccion/:slug' : {action: 'leccion/getleccion'},
  'POST /persona/login' : {action: 'persona/login'},
  'POST /recursoEducativo/upload' : {action: 'recursoEducativo/upload'},
  'POST /leccion/createlesson': {action: 'leccion/createlesson'}


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
