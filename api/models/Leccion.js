/**
 * Leccion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

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
    
    practicar: {
      type: 'string'
    },

    aplicar: {
      type: 'string'
    },

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    slug: {
      type: 'slug',
      from: 'titulo',
      blacklist: ['search']
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    creador: {
      model: 'persona'
    },

    competencia: {
      model: 'competencia'
    },

    preconceptos: {
      collection: 'preconcepto',
      via: 'lecciones'
    },
    objetivos: {
      collection: 'objetivo',
      via: 'lecciones'
    },
    items: {
      collection: 'item',
      via: 'leccion'
    }
  },

};
