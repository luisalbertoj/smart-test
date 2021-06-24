/**
 * RecursoEducativoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  upload: function (req, res) {
    console.log('-------------------Files---------------------------');
    let params = req.allParams();
    console.log('Parametros', params);
    req.file('file0').upload({
      dirname: '../../assets/uploads'
    }, (err, files) => {
      if (err) {return res.serverError(err);}
      if (files.length === 0) {
        return res.badRequest('No file was uploaded');
      }
      var fileNameArray = files[0].fd.split('\\');
      console.log('filenamecompleto:', files);
      var fileName = fileNameArray[fileNameArray.length - 1];
      console.log('fileName: ', fileName);
      let recurso = { link: fileName, nombre: params.nombre, contenido: params.contenido, creador: params.creador, leccion: params.leccion };
      RecursoEducativo
        .create(recurso)
        .fetch()
        .then((newElement) => {
          return res.ok({ status: 200, data: newElement, msg: 'Modelo creado' });
        }, (err) => {
          return res.badRequest({ status: 500, data: err, msg: 'Error al crear el registro' });
        });
    });
  }
};
