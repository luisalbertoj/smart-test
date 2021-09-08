/**
 * LeccionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const _ = require('lodash');

module.exports = {
  createlesson: async function (req, res) {
    const parametros = req.allParams();
    console.log(parametros);
    var leccion = {preguntas: []};
    var preguntas = [];
    try {
      for await (let [key, pregunta] of parametros.preguntas.entries()) {
        pregunta.tipo = (await TipoPregunta.findOne({nombre: pregunta.tipo})).id;
        leccion.preguntas.push(
        pregunta.retroalimentacion !== ''?
        await Pregunta.create({ contenido: pregunta.contenido, tipo: pregunta.tipo, retroalimentacion: pregunta.retroalimentacion }).fetch():
        await Pregunta.create({ contenido: pregunta.contenido, tipo: pregunta.tipo }).fetch());        
        preguntas.push(leccion.preguntas[key].id);
        if(parametros.respuestas[key]) {
          for await (let [key2, respuesta] of parametros.respuestas[key].entries()) {
            leccion.preguntas[key].respuestas = [];
            leccion.preguntas[key].respuestas.push(await Respuesta.create({ contenido: respuesta.contenido, retroalimentacion: respuesta.retroalimentacion, preguntas: [leccion.preguntas[key].id]}).fetch());
            if(respuesta.correcta && leccion.preguntas[key] && leccion.preguntas[key].respuestas[key2]) {
              console.log(leccion.preguntas[key].id,leccion.preguntas[key].respuestas[key2].id);
              leccion.preguntas[key].respuestaCorrecta  =
              await Pregunta.updateOne({id: leccion.preguntas[key].id})
              .set({respuestaCorrecta: leccion.preguntas[key].respuestas[key2].id});
            }
          }
        }
      }
      for (let [key, preconcepto] of parametros.leccion.preconceptos.entries()) {
        parametros.leccion.preconceptos[key] = preconcepto.value.split('⌂')[0];
      }

      for (let [key, competencia] of parametros.leccion.competencias.entries()) {
        parametros.leccion.competencias[key] = competencia.value.split('⌂')[0];
      }

      leccion = await Leccion.create({
        titulo: parametros.leccion.titulo,
        introduccion: parametros.leccion.introduccion,
        observaciones: parametros.leccion.observaciones,
        conclusiones: parametros.leccion.conclusiones,
        aprender: parametros.leccion.aprender,
        practicar: preguntas,
        aplicar: parametros.leccion.aplicar,
        creador: parametros.leccion.creador || 1,
        competencias: parametros.leccion.competencias,
        preconceptos: parametros.leccion.preconceptos,
        objetivo: parametros.leccion.objetivo
      }).fetch();

    } catch (err) {
      switch (err.name) {
        case 'UsageError': return res.badRequest(err);
        default: throw err;
      }
    }
    return res.json({ status: 200, data: leccion, msg: 'Leccion creada' });
  },
  getleccion: async function (req, res) {
    const parametros = req.allParams();
    console.log(parametros);
    var leccion;
    try {
      leccion = await Leccion.findOne(parametros).populate('practicar').populate('preconceptos').populate('competencias');
      if(!leccion) {return res.badRequest('La leccion no se encontro');}
      if (leccion.practicar.length === 0) {
        return res.ok({ status: 500, data: 'no hay preguntas registradas', msg: 'Error' });
      } else {
        for await (let [key, pregunta] of leccion.practicar.entries()) {
          leccion.practicar[key] = await Pregunta.findOne({ id: pregunta.id }).populate('respuestas').populate('tipo');
        }
      }
    } catch (err) {
      switch (err.name) {
        case 'UsageError': return res.badRequest(err);
        default: throw err;
      }
    }

    return res.json({ status: 200, data: leccion, msg: 'Preguntas traidas' });

  },
  registrarleccion: async function (req, res) {
    const parametros = req.allParams();
    console.log(parametros);
    try {
    } catch (err) {
      switch (err.name) {
        case 'UsageError': return res.badRequest(err);
        default: throw err;
      }
    }

    return res.json({ status: 200, data: parametros, msg: 'Leccion registrada traidas' });
  },
  updatelesson:async ( req, res ) => {
    let params = req.allParams();
    let resultado = Object();
    // Leccion actualizar 
    let data = {
      titulo: params.leccion.titulo,
      introduccion: params.leccion.introduccion,
      referencias: params.leccion.referencias,
      conclusiones: params.leccion.conclusiones,
      aprender: params.leccion.aprender,
      aplicar: params.leccion.aplicar,
      slug: params.leccion.slug,
      creador: params.leccion.creador,
      objetivo: params.leccion.objetivo
    };
    if( data.objetivo == "" ) delete data.objetivo;
    data = _.omitBy(data, _.isNull);
    resultado = await Leccion.update( { id: params.id }, data );

    // Pregunta actualizar

    for( let row of params.preguntas ){
      data = {
        contenido: row.contenido,
        retroalimentacion: row.retroalimentacion,
        estado: row.estado,
        //tipo: row.tipo,
        id: row.id,
        respuestaCorrecta: row.respuestaCorrecta,
  
      };
      if( data.retroalimentacion == "" ) delete data.retroalimentacion;
      data = _.omitBy(data, _.isNull);
      resultado = await Pregunta.update( { id: data.id }, data );
    }


    // Respues actualizar

    for( let row of params.respuestas ){
      data = {
        contenido: row.contenido,
        retroalimentacion: row.retroalimentacion,
        estado: row.estado,
        id: row.id
      };
      if( data.retroalimentacion === '' ) delete data.retroalimentacion;
      data = _.omitBy(data, _.isNull);
      resultado = await Respuesta.update( { id: data.id }, data );
    }

    return res.json({ status: 200,  msg: 'actualizado correcto' });
  }

};

