/**
 * ProyectController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const upload = async (req, res) => {
    const params = req.allParams();
    req.file('file0').upload({
        dirname: '../../assets/uploads/proyects'
    }, async (err, files) => {
        if (err) { return res.serverError(err); }
        if (files.length === 0) {
            return res.badRequest('No file was uploaded');
        }
        var fileNameArray = files[0].fd.split('\\');
        console.log('filenamecompleto:', files);
        var fileName = fileNameArray[fileNameArray.length - 1];
        console.log('fileName: ', fileName);
        const result = await Proyect.create({
            estudiante: params.estudiante,
            name: params.name + fileName,
            files: fileName
        }).fetch();
        return res.ok({ result });
    });
};
module.exports = { upload };

