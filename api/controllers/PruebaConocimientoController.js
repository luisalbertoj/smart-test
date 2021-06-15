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
          prueba.preguntas[key] = await Pregunta.findOne({ id: pregunta.id }).populate('respuestas');
        }
      }
    } catch (err) {
      switch (err.name) {
        case 'UsageError': return res.badRequest(err);
        default: throw err;
      }
    }

    return res.json({ status: 200, data: prueba, msg: 'Pruebas traidas' });

  }

};
