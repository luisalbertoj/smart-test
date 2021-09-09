/**
 * ResultLessonStudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const upload = async (req, res) => {
    console.log('-------------------Files---------------------------');
    let params = req.allParams();
    console.log('Parametros', params);
    req.file('file0').upload({
        dirname: '../../assets/uploads'
    }, (err, files) => {
        if (err) { return res.serverError(err); }
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
};

const registrarleccion = async (req, res) => {
    const params = req.allParams();
    console.log('parametros', params);
    req.file('file0').upload({
        dirname: '../../assets/uploads/aplica'
    }, async (err, files) => {
        if (err) { return res.serverError(err); }
        if (files.length === 0) {
            return res.badRequest('No file was uploaded');
        }
        var fileNameArray = files[0].fd.split('\\');
        console.log('filenamecompleto:', files);
        var fileName = fileNameArray[fileNameArray.length - 1];
        console.log('fileName: ', fileName);
        let resultLesson = await ResultLessonStudent.create({
            respuestasEstudiante: JSON.stringify({ data: params.resUser }),
            respuestasCorrectas: (params.correctas.length),
            preguntasTotales: (params.totales),
            aplicaEstudiante: (params.aplica),
            aplicaFile: (fileName),
            estudiante: params.estudiante,
            leccion: params.leccion,
        }).fetch();
        return res.ok({ resultLesson });
    });
};
module.exports = { registrarleccion };

