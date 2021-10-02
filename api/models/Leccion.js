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
      unique: true,
      required: true
    },

    introduccion: {
      type: 'string',
      columnType: 'longtext',
      required: true
    },

    referencias: {
      type: 'string',
      columnType: 'longtext'
    },

    conclusiones: {
      type: 'string',
      columnType: 'longtext'
    },

    aprender: {
      type: 'string',
      columnType: 'longtext'
    },

    aplicar: {
      type: 'string',
      columnType: 'longtext'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    slug: {
      type: 'slug',
      from: 'titulo',
      unique: true,
      blacklist: ['search']
    },

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    estudiantes: {
      collection: 'persona',
      via: 'leccion',
      through: 'personaleccion'
    },

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
    },
    grupos: {
      collection: 'grupo',
      via: 'lecciones'
    }
  },

};
