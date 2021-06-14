/**
 * PruebaConocimientoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getprueba: function (req, res) {
    const parametros = req.allParams();
    console.log(parametros);
    function enviarRespuesta(respuestaFormat) {
      return res.ok({ status: 200, data: respuestaFormat, msg: 'Pruebas traidas' });
    }
    PruebaConocimiento.findOne(parametros)
      .populate('preguntas')
      .then(
        function (newData) {
          for (let i = 0; i < newData.preguntas.length; i++) {
            Pregunta.findOne({ id: newData.preguntas[i].id })
              .populate('respuestas').then(function (data2) {
                newData.preguntas[i].respuestas = data2.respuestas;
                newData.preguntas.length === i + 1 ? enviarRespuesta(newData) : 0;
              },
              function (err) {
                return res.badRequest({ status: 500, data: err, msg: "Error" });
              });
          }
          return res.ok({ status: 500, data: 'no hay preguntas registradas', msg: "Error" });
        }, function (err) {
          return res.badRequest({ status: 500, data: err, msg: "Error" });
        }
      );

  }

};


