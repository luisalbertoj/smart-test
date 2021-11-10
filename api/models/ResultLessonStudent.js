/**
 * ResultLessonStudent.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    respuestasEstudiante: {
      type: 'string',
    },

    respuestasCorrectas: {
      type: 'string',
    },

    preguntasTotales: {
      type: 'string',
    },

    aplicaEstudiante: {
      type: 'string',
      columnType: 'longtext',
    },
    aplicaFile: {
      type: 'string',
    },
    calificacionPreg: {
      type: 'number',
      defaultsTo: 0
    },
    calificacionAplica: {
      type: 'number',
      defaultsTo: 0
    },
    estado: {
      type: 'string',
      defaultsTo: '0'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    estudiante: {
      model: 'persona'
    },
    leccion: {
      model: 'leccion'
    }
  },

};

