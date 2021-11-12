/**
 * ResultLessonStudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var memo = {};
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
          calificacionPreg: params.nota,
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
          calificacionPreg: params.nota,
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
        calificacionPreg: params.nota,
      }).fetch();
      return res.ok({ resultLesson });
    }
  );
};
const procesCompetencias = async (leccion, competencias) => {
  if (!memo[leccion]) {
    memo[leccion] = await Leccion.findOne({ id: leccion })
      .populate("competencias")
      .select("id");
    for (const competencia of competencias) {
      memo[leccion].competencias.find((element) => {
        if (competencia === element.id) return memo[leccion];
      });
    }
    return null;
  }
  return memo[leccion];
};
const procesGrupo = async (grupo, params) => {
  for (const persona of grupo.personas) {
    const resPer = await ResultLessonStudent.find({
      estudiante: persona.id,
      createdAt: {
        ">": Date.parse(params.fechaInicio).toString(),
        "<": Date.parse(params.fechaFin).toString(),
      },
    });
    persona.resultados = resPer;
    if (params.competencias.length > 0) {
      for (const resultado of persona.resultados) {
        resultado.leccion = await procesCompetencias(
          resultado.leccion,
          params.competencias
        );
      }
    }
  }
  return grupo;
};

const reporte = async (req, res) => {
  memo = {};
  const params = req.allParams();
  let grpText = "";
  /* params.grupos.forEach((element) => {
    grpText += '\'' + element.id + '\',';
  }); */
  const grupos = await Grupo.find({
    id: { in: [params.grupos.id] },
  })
    .select(["id", "nombre"])
    .populate(["docente", "personas"]);
  for (let grupo of grupos) {
    grupo = await procesGrupo(grupo, params);
  }
  memo = {};
  return res.ok({ data: grupos });
  /* let queryFecha = await ResultLessonStudent.find().where({
    createdAt: { ">": Date.parse(params.fechaInicio).toString() },
  })
  .select(['id', 'leccion'])
  .populate('estudiante');
  if (!queryFecha)
    return res.json({
      code: 401,
      msg: "No hay datos dentro del rango de fechas expecificado",
    });
  if (params.competencias) {
    for (const element of queryFecha) {
      const leccion = await Leccion.findOne({ id: element.leccion }).populate(
        'competencias').select(['id', 'titulo']);
      const estudiante = await Persona.findOne({id: element.estudiante}).populate(
        'grupos'
      ).select(['id', 'nombre', 'codigo']);
      element.leccion = leccion;
      element.estudiante = estudiante
    }
  }
  return res.ok({ data: queryFecha }); */
};
module.exports = { registrarleccion, reporte };
