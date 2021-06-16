/**
 * Leccion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    titulo: {
      type: 'string',
      required: true
    },

    introduccion: {
      type: 'string',
      required: true
    },

    observaciones: {
      type: 'string',
    },

    conclusiones: {
      type: 'string'
    },

    aprender: {
      type: 'string'
    },

    aplicar: {
      type: 'string'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    slug: {
      type: 'slug',
      from: 'titulo',
      blacklist: ['search']
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    practicar: {
      collection: 'pregunta',
      via: 'lecciones'
    },

    creador: {
      model: 'persona'
    },

    competencias: {
      collection: 'competencia',
      via: 'lecciones'
    },

    preconceptos: {
      collection: 'preconcepto',
      via: 'lecciones'
    },
    objetivo: {
      model: 'objetivo'
    },
    items: {
      collection: 'item',
      via: 'leccion'
    }
  },

};
