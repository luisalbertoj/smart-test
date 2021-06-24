/**
 * Pregunta.js
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

    retroalimentacion: {
      type: 'string'
    },

    estado: {
      type: 'string',
      defaultsTo: '1'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    tipo: {
      model: 'tipoPregunta'
    },

    etiquetas: {
      collection: 'tags',
      via: 'preguntas'
    },

    respuestas: {
      collection: 'respuesta',
      via: 'preguntas'
    },

    pruebas: {
      collection: 'pruebaconocimiento',
      via: 'pregunta',
      through: 'pruebapregunta'
    },
    respuestaCorrecta: {
      model: 'respuesta'
    },
    lecciones: {
      collection: 'leccion',
      via: 'practicar'
    },
    personaslecciones: {
      collection: 'personaleccion',
      via: 'correctas'
    }
  },

};
