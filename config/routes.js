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
  /*  Rutas Persona */
  'POST /persona/search' : {action: 'persona/search'},
  'POST /persona/registrar' : {action: 'persona/registrar'},
  'POST /persona/actualizar' : {action: 'persona/actualizar'},
  'POST /persona/querys' : {action: 'persona/querys'},
  'POST /persona/login' : {action: 'persona/login'},
  
  'POST /privilegio/cambiarprivilegios' : {action: 'privilegio/cambiarPrivilegios'},
  'GET /getprueba/:id' : {action: 'pruebaConocimiento/getprueba'},
  
  /* Rutas Leccion */
  'POST /leccion/query': {action: 'leccion/query'},
  'POST /leccion/createlesson': {action: 'leccion/createlesson'},
  'POST /leccion/registrarleccion': {action: 'resultLessonStudent/registrarleccion'},
  'POST /lesson/importLessons': {action: 'leccion/importLessons'},
  'POST /leccion/updatelesson': {action: 'leccion/updatelesson'},
  'POST /leccion/querys': {action: 'leccion/querys'},
  'POST /leccion/reportes': {action: 'leccion/reportes'},
  'GET /getleccion/:slug' : {action: 'leccion/getleccion'},
  'POST /leccion/reporte': {action: 'resultLessonStudent/reporte'},
  /* Rutas prueba conocimiento */
  'POST /pruebaconocimiento/createtest': {action: 'pruebaconocimiento/createtest'},
  'POST /pruebaconocimiento/getprueba' : {action: 'pruebaConocimiento/getprueba'},
  'POST /pruebaconocimiento/updatetest': {action: 'pruebaconocimiento/updatetest'},
  'POST /recursoEducativo/upload' : {action: 'recursoEducativo/upload'},

  'POST /preconcepto/uploadFiles': {action: 'preconcepto/uploadFiles'},
  
  'POST /proyect/upload': {action: 'proyect/upload'},
  'GET  /rol/initDb': {action: 'rol/initDb'},
  



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
