/**
 * PruebaConocimiento.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    nombre: {
      type: 'string',
      required: true
    },
    observaciones: {
      type: 'string',
      required: true
    },
    contenido: {
      type: 'string',
      required: true
    },
    creador: {
      model: 'persona'
    },
    inicio: {
      type: 'string',
      required: true
    },
    cierre: {
      type: 'string',
      required: true
    },

    duracion: {
      type: 'string',
      required: true
    },
    slug: {
      type: 'slug',
      from: 'nombre',
      unique: true,
      blacklist: ['search']
    },
    

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    grupo: {
      model: 'grupo'
    },
    preguntas: {
      collection: 'pregunta',
      via: 'prueba',
      through: 'pruebapregunta'
    }

  },

};
