/**
 * ResultLessonStudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const registrarleccion = async (req, res) => {
  const params = req.allParams();
  console.log("parametros", params);
  req.file("file0").upload(
    {
      dirname: "../../assets/uploads/aplica",
    },
    async (err, files) => {
      if (err) {
        let resultLesson = await ResultLessonStudent.create({
          respuestasEstudiante: JSON.stringify({ data: params.resUser }),
          respuestasCorrectas: params.correctasLength,
          preguntasTotales: params.totales,
          aplicaEstudiante: params.aplica,
          estudiante: params.estudiante,
          leccion: params.leccion,
          calificacionPreg: params.nota
        }).fetch();
        return res.ok({ resultLesson });
      }
      if (files.length === 0) {
        let resultLesson = await ResultLessonStudent.create({
          respuestasEstudiante: JSON.stringify({ data: params.resUser }),
          respuestasCorrectas: params.correctasLength,
          preguntasTotales: params.totales,
          aplicaEstudiante: params.aplica,
          estudiante: params.estudiante,
          leccion: params.leccion,
          calificacionPreg: params.nota
        }).fetch();
        return res.ok({ resultLesson });
      }
      var fileNameArray = files[0].fd.split("\\");
      console.log("filenamecompleto:", files);
      var fileName = fileNameArray[fileNameArray.length - 1];
      console.log("fileName: ", fileName);
      let resultLesson = await ResultLessonStudent.create({
        respuestasEstudiante: JSON.stringify({ data: params.resUser }),
        respuestasCorrectas: params.correctasLength,
        preguntasTotales: params.totales,
        aplicaEstudiante: params.aplica,
        aplicaFile: fileName,
        estudiante: params.estudiante,
        leccion: params.leccion,
        calificacionPreg: params.nota
      }).fetch();
      return res.ok({ resultLesson });
    }
  );
};
module.exports = { registrarleccion };
