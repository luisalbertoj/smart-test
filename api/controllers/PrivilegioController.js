/**
 * PrivilegioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  cambiarPrivilegios: function (req, res) {
    let params = req.allParams();
    console.log("cambiar privilegios");
    console.log(params);
    Rol.replaceCollection(params.idRol, 'privilegios')
    .members(params.privilegios)
    .then(function (data) {
            return res.ok({status: 200, data: data, msg: 'Privilegios Actualizados'});
          }, function (err) {
            return res.badRequest({status: 500, data: err, msg: "Error"});
          });
  }
};
