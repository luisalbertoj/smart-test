/**
 * PruebaConocimientoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getprueba : function (req,res) {
      const parametros = req.allParams();
      PruebaConocimiento.findOne(parametros).populate(['preguntas']).then(
        function (newData) {
            return res.ok({status: 200, data: newData, msg: 'Pruebas traidas'});
          }, function (err) {
            return res.badRequest({status: 500, data: err, msg: "Error"});
          }
      );

  }

};


