/**
 * PersonaController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
Passwords = require('machinepack-passwords');
module.exports = {
  search: function (req, res) {
    console.log('Search');
    let params = req.allParams();
    let populate = null;
    let limit = null;
    let skip = null;
    delete params.app;
    sails.log(req.allParams());
    if (params.populate) {
      populate = params.populate;
      delete params.populate;
    }
    if (params.limit) {
      limit = params.limit;
      delete params.limit;
    }
    if (params.skip) {
      skip = params.skip;
      delete params.skip;
    }
    if (populate && limit && skip) {
      sails.log(
        '-params:' +
        params +
        '-populate:' +
        populate +
        '-limit:' +
        limit +
        '-skip:' +
        skip
      );
      console.log('entro aqui')
      Persona.count().exec((err, conteo) => {
        if (err) {
          return res.badRequest(err);
        }
        Persona.find()
          .populate(populate)
          .exec((err, result) => {
            if (err) {
              return res.badRequest(err);
            }
            console.log(result);
            return res.ok({ status: 200, data: result, count: conteo });
          });
      });
    } else if (populate) {
      sails.log('-params:' + params + '-populate:' + populate);
      Persona.find(params)
        .populate(populate)
        .exec((err, result) => {
          if (err) {
            return res.badRequest(err);
          }
          return res.ok({ status: 200, data: result });
        });
    } else {
      sails.log('-params:' + params);
      Persona.find(params).exec((err, result) => {
        if (err) {
          return res.badRequest(err);
        }
        return res.ok({ status: 200, data: result });
      });
    }
  },
  login: function (req, res) {
    var params = req.allParams();
    console.log('login');
    console.log(params);
    if (!params.password) {
      res.badRequest({ status: 404, msg: 'el usuario no trae contaseña' });
    }
    Passwords.encryptPassword({
      password: params.password,
    }).exec({
      error: function (err) {
        return res.serverError(err);
      },
      success: function () {
        console.log(params);
        Persona.findOne({ username: params.username }).populate('grupos')
          .then((persona) => {
            if (persona) {
              console.log(params.password);
              console.log(persona.password);
              if (persona.password === params.password) {
                Rol.findOne({ id: persona.idRol }).populate('privilegios').then(
                  (rol) => {
                    persona.idRol = rol;
                    return res.ok({ status: 200, data: persona, msg: 'ok' });
                  },
                  () => {
                    return res.badRequest({ status: 404, msg: 'Error al cargar los privilegios' });
                  }
                );
              } else {
                return res.badRequest({ status: 404, msg: 'Contraseña Incorrecta' });
              }
            } else {
              return res.badRequest({ status: 404, msg: 'Usuario no encontrado' });
            }
          }, (err) => {
            return res.badRequest({ status: 500, data: err, msg: 'Error al Crete el User' });
          });

      }
    });
  },
  registrar: function (req, res) {
    var params = req.allParams();
    console.log(params);
    if (!params.password) {
      res.badRequest({ status: 404, msg: 'el usuario no trae contaseña' });
    }
    Passwords.encryptPassword({
      password: params.password,
    }).exec({
      error: function (err) {
        return res.serverError(err);
      },
      success: function () {
        console.log(params);
        Persona.create(params)
          .fetch()
          .then((persona) => {
            return res.ok({ status: 200, data: persona, msg: 'Usuario creado' });
          }, (err) => {
            return res.badRequest({ status: 500, data: err, msg: 'Error al Crete el User' });
          });

      }
    });
  },
  actualizar: function (req, res) {
    var params = req.allParams();
    console.log(params);
    if (!params.password) {
      res.badRequest({ status: 404, msg: 'el usuario no trae contaseña' });
    }
    Passwords.encryptPassword({
      password: params.password,
    }).exec({
      error: function (err) {
        return res.serverError(err);
      },
      success: function () {
        console.log(params);
        Persona.update({ id: params.id }).set({ nombre: params.nombre, apellido: params.apellido, email: params.email, password: params.password, idRol: params.idRol })
          .fetch()
          .then((persona) => {
            return res.ok({ status: 200, data: persona, msg: 'Usuario Actualizado' });
          }, (err) => {
            return res.badRequest({ status: 500, data: err, msg: 'Error al actualizar el User' });
          });

      }
    });
  }
};
