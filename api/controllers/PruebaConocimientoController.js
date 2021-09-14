/**
 * PruebaConocimientoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  getprueba: async function (req, res) {
    const parametros = req.allParams();
    var prueba;
    try {
      prueba = await PruebaConocimiento.findOne(parametros).populate('preguntas');
      if (prueba.preguntas.length === 0) {
        return res.ok({ status: 500, data: 'no hay preguntas registradas', msg: 'Error' });
      } else {
        for await (let [key, pregunta] of prueba.preguntas.entries()) {
          prueba.preguntas[key] = await Pregunta.findOne({ id: pregunta.id }).populate('respuestas').populate('tipo').populate('respuestaCorrecta');
        }
      }
    } catch (err) {
      switch (err.name) {
        case 'UsageError': return res.badRequest(err);
        default: throw err;
      }
    }

    return res.json({ status: 200, data: prueba, msg: 'Pruebas traidas' });

  },

  createtest: async function (req, res) {
    const parametros = req.allParams();
    console.log(parametros);
    var test = {preguntas: []};
    var preguntas = [];
    try {
      for await (let [key, pregunta] of parametros.preguntas.entries()) {
        pregunta.tipo = (await TipoPregunta.findOne({nombre: pregunta.tipo})).id;
        pregunta.retroalimentacion !== ''?
        test.preguntas.push(await Pregunta.create({ contenido: pregunta.contenido, retroalimentacion: pregunta.retroalimentacion, tipo: pregunta.tipo }).fetch()):
        test.preguntas.push(await Pregunta.create({ contenido: pregunta.contenido, tipo: pregunta.tipo }).fetch());
        preguntas.push(test.preguntas[key].id);
        if(parametros.respuestas[key]) {
          for await (let [key2, respuesta] of parametros.respuestas[key].entries()) {
            test.preguntas[key].respuestas = [];
            test.preguntas[key].respuestas.push(await Respuesta.create({ contenido: respuesta.contenido, retroalimentacion: respuesta.retroalimentacion, preguntas: [test.preguntas[key].id]}).fetch());
            if(respuesta.correcta && test.preguntas[key] && test.preguntas[key].respuestas[key2]) {
              console.log(test.preguntas[key].id,test.preguntas[key].respuestas[key2].id);
              test.preguntas[key].respuestaCorrecta  =
              await Pregunta.updateOne({id: test.preguntas[key].id})
              .set({respuestaCorrecta: test.preguntas[key].respuestas[key2].id});
            }
          }
        }
      }

      test = await PruebaConocimiento.create({
        nombre: parametros.test.nombre,
        observaciones: parametros.test.observaciones,
        contenido: parametros.test.contenido,
        inicio: parametros.test.inicio,
        cierre: parametros.test.cierre,
        duracion: parametros.test.duracion,
        preguntas: preguntas,
        creador: parametros.test.creador || 1,
        grupo: parametros.test.grupo
      }).fetch();

    } catch (err) {
      switch (err.name) {
        case 'UsageError': return res.badRequest(err);
        default: throw err;
      }
    }
    return res.json({ status: 200, data: test, msg: 'Test creado' });
  },

  updatetest: async ( req, res )=>{
    let params = req.allParams();
    let resultado = Object();


    // test
    await PruebaConocimiento.update({ id: params.id },{
      nombre: params.test.nombre,
      observaciones: params.test.observaciones,
      contenido: params.test.contenido,
      inicio: params.test.inicio,
      cierre: params.test.cierre,
      duracion: params.test.duracion,
      creador: params.test.creador || 1,
      grupo: params.test.grupo
    });


    

    return res.json({ status: 200, data: resultado, msg: 'Test Actualizado' });

  }

};
