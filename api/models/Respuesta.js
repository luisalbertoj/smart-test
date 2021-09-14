/**
 * Respuesta.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    contenido: {
      type: 'string',
      required: true
    },
    etiquetas: {
      collection: 'tags',
      via: 'respuestas'
    },
    slug: {
      type: 'slug',
      from: 'contenido',
      blacklist: ['search']
    },
    preguntas: {
      collection: 'pregunta',
      via: 'respuestas'
    },
    respuestasEstudiante: {
      collection: 'respuestasEstudiante',
      via: 'respuestas'
    },
    retroalimentacion: {
      type: 'string',
      columnType: 'longtext'
    },
    estado: {
      type: 'string',
      defaultsTo: '1'
    },
    valor: {
      type: 'string',
      defaultsTo: '0'
    },
    
    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};

