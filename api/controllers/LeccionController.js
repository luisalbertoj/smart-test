/**
 * LeccionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const slug = require('slug');
const _ = require('lodash');
const createlesson = async (req, res) => {
  const parametros = req.allParams();
  var leccion = { preguntas: [] };
  var preguntas = [];
  try {
    for await (let [key, pregunta] of parametros.preguntas.entries()) {
      pregunta.tipo = (await TipoPregunta.findOne({ slug: slug(pregunta.tipo.toLowerCase()) })).id;
      leccion.preguntas.push(
        pregunta.retroalimentacion !== '' ?
          await Pregunta.create({ contenido: pregunta.contenido, tipo: pregunta.tipo, retroalimentacion: pregunta.retroalimentacion, valor: pregunta.valor }).fetch() :
          await Pregunta.create({ contenido: pregunta.contenido, tipo: pregunta.tipo, valor: pregunta.valor }).fetch());
      preguntas.push(leccion.preguntas[key].id);
      if (parametros.respuestas[key]) {
        for await (let [key2, respuesta] of parametros.respuestas[key].entries()) {
          leccion.preguntas[key].respuestas = [];
          leccion.preguntas[key].respuestas.push(await Respuesta.create({ contenido: respuesta.contenido, retroalimentacion: respuesta.retroalimentacion, preguntas: [leccion.preguntas[key].id], valor: respuesta.valor }).fetch());
          if (respuesta.correcta && leccion.preguntas[key] && leccion.preguntas[key].respuestas[key2]) {
            console.log(leccion.preguntas[key].id, leccion.preguntas[key].respuestas[key2].id);
            leccion.preguntas[key].respuestaCorrecta =
              await Pregunta.updateOne({ id: leccion.preguntas[key].id })
                .set({ respuestaCorrecta: leccion.preguntas[key].respuestas[key2].id });
          }
        }
      }
    }
    for (let [key, preconcepto] of parametros.leccion.preconceptos.entries()) {
      parametros.leccion.preconceptos[key] = preconcepto.value.split('⌂')[0];
    }

    for (let [key, competencia] of parametros.leccion.competencias.entries()) {
      parametros.leccion.competencias[key] = competencia.value.split('⌂')[0];
    }

    leccion = await Leccion.create({
      titulo: parametros.leccion.titulo,
      introduccion: parametros.leccion.introduccion,
      observaciones: parametros.leccion.observaciones,
      conclusiones: parametros.leccion.conclusiones,
      aprender: parametros.leccion.aprender,
      practicar: preguntas,
      aplicar: parametros.leccion.aplicar,
      creador: parametros.leccion.creador || 1,
      competencias: parametros.leccion.competencias,
      preconceptos: parametros.leccion.preconceptos,
      objetivo: parametros.leccion.objetivo
    }).fetch();

  } catch (err) {
    return res.badRequest(err);
  }
  return res.json({ status: 200, data: leccion, msg: 'Leccion creada' });
};
const getleccion = async (req, res) => {
  const parametros = req.allParams();
  console.log(parametros);
  var leccion;
  try {
    leccion = await Leccion.findOne(parametros).populate('practicar').populate('preconceptos').populate('competencias');
    if (!leccion) { return res.badRequest('La leccion no se encontro'); }
    if (leccion.practicar.length === 0) {
      return res.ok({ status: 500, data: 'no hay preguntas registradas', msg: 'Error' });
    } else {
      for await (let [key, pregunta] of leccion.practicar.entries()) {
        leccion.practicar[key] = await Pregunta.findOne({ id: pregunta.id }).populate('respuestas').populate('tipo');
      }
    }
  } catch (err) {
    return res.badRequest(err);
  }

  return res.json({ status: 200, data: leccion, msg: 'Preguntas traidas' });

};

const processCompetencias = async (item, admin) => {
  let competencia1 = await Competencia.find().where({ nombre: (item[2] ? item[2] : '') });
  let competencia2 = await Competencia.find().where({ nombre: (item[3] ? item[3] : '') });
  if (competencia1.length > 0 || competencia2.length > 0) {
    competencia1 = competencia1[0];
    competencia2 = competencia2[0];
  } else {
    if (item[2]) {
      competencia1 = await Competencia.findOrCreate(
        { nombre: item[2] },
        { nombre: item[2], observaciones: ' ', creador: admin.id }
      );
    } else {
      return;
    }
    if (item[3] !== '' && item[3]) {
      competencia2 = await Competencia.findOrCreate(
        { nombre: item[3] },
        { nombre: item[3], observaciones: ' ', creador: admin.id }
      );
    }
  }

  if (competencia2) { competencia2 = competencia2.length > 0 ? competencia2[0] : null; }
  return (competencia1 && competencia2 && competencia1 !== undefined && competencia2 !== undefined) ?
    [competencia1.id, competencia2.id] : [competencia1.id];
};
const importLessons = async (req, res) => {
  const parametros = req.allParams();
  let tipo = await TipoPregunta.findOrCreate({ nombre: 'multiple' },
    { nombre: 'multiple' });
  const admin = await Persona.findOne({ username: 'administrador' });
  console.log('Admin', admin);
  if (!admin) return res.json({ code: 400, msg: 'EL administrador no existe' });
  if (tipo) {
    tipo = tipo.id;
    let lecciones = [];
    parametros.data.forEach(async (item, z) => {
      if (item[0] !== 'titulo' && item[1] !== 'objetivo') {
        let leccion = {};
        leccion.titulo = item[0];

        const leccionExist = await Leccion.findOne({ titulo: leccion.titulo });
        if (!leccionExist) {
          const objetivo = await Objetivo.findOrCreate({ titulo: item[1] },
            { titulo: 'Objetivo ' + z, contenido: item[1], creador: admin.id })
            .catch((err) => { console.log(err); });
          console.log('Objetivo', objetivo);
          if (objetivo) { leccion.objetivo = objetivo.id; }
          leccion.competencias = await processCompetencias(item, admin);
          let preconceptos = "";
          if (item[4]) {
            preconceptos = item[4].split('/');
          }

          let ids = [];
          for await (let preconcepto of preconceptos) {
            let temp = await Preconcepto.find().where({ titulo: preconcepto });
            if (temp.length > 0) { ids.push(temp[0].id); }
          }
          leccion.preconceptos = ids;
          leccion.introduccion = item[5];
          leccion.observaciones = item[6];
          leccion.conclusiones = item[7];
          leccion.aprender = item[8];
          let indice = 9;

          let preguntas = [];
          for (let m = 0; m < 4; m++) {
            /* console.log('Pregunta', item[indice]); */
            let preguntaTemp = await Pregunta.create({ contenido: item[indice], tipo: tipo }).fetch();
            let pregunta = null;
            let respuestaCorrecta = null;
            if (preguntaTemp) {
              pregunta = preguntaTemp.id;
              const respuestaCorrectaPos = item[indice + 1];
              for (let i = indice + 2; i < indice + 5; i++) {
                if (item[i] !== null && item[i] !== undefined) {
                  if (respuestaCorrectaPos === item[i]) {
                    respuestaCorrecta = await Respuesta.create(
                      { contenido: item[i], preguntas: [pregunta] }
                    ).fetch();
                  } else {
                    await Respuesta.create(
                      { contenido: item[i], preguntas: [pregunta] }
                    )
                  }
                  /* console.log('respuesta', item[i]); */
                }
              }
              if(respuestaCorrecta) {
                let preguntaUpdate = await Pregunta.updateOne({ id: pregunta })
                .set({ respuestaCorrecta: respuestaCorrecta.id })
                .catch((err) => { console.log(err); });
              if (!preguntaUpdate) { console.log('No pregunta update'); }
              console.log('respuesta correcta', respuestaCorrecta);
              console.log('pregunta', pregunta);
              preguntas.push(pregunta);
              }
              
            }
            indice += 5;
            /* console.log('Siguiente pregunta'); */
          }
          leccion.aplicar = item[29];
          leccion = await Leccion.create({
            titulo: leccion.titulo,
            introduccion: leccion.introduccion,
            observaciones: leccion.observaciones,
            conclusiones: leccion.conclusiones,
            aprender: leccion.aprender,
            practicar: preguntas,
            aplicar: leccion.aplicar,
            creador: admin.id,
            competencias: leccion.competencias,
            preconceptos: leccion.preconceptos,
            objetivo: leccion.objetivo
          });
          lecciones.push(leccion);
        }
      }
    });
    return res.ok({ message: 'Lecciones creadas', data: lecciones });
  }
  res.badRequest({ message: 'Datos incompletos' });
};
const updatelesson = async (req, res) => {
  let params = req.allParams();
  let resultado = Object();
  // Leccion actualizar 
  let data = {
    titulo: params.leccion.titulo,
    introduccion: params.leccion.introduccion,
    referencias: params.leccion.referencias,
    conclusiones: params.leccion.conclusiones,
    aprender: params.leccion.aprender,
    aplicar: params.leccion.aplicar,
    slug: params.leccion.slug,
    creador: params.leccion.creador,
    objetivo: params.leccion.objetivo
  };
  if (data.objetivo === '') delete data.objetivo;
  data = _.omitBy(data, _.isNull);
  resultado = await Leccion.update({ id: params.id }, data);

  // Pregunta actualizar

  for (let row of params.preguntas) {
    data = {
      contenido: row.contenido,
      retroalimentacion: row.retroalimentacion,
      estado: row.estado,
      //tipo: row.tipo,
      id: row.id,
      respuestaCorrecta: row.respuestaCorrecta,
      valor: row.valor
    };
    //console.log( "***", data, row)
    if (data.retroalimentacion === '') delete data.retroalimentacion;
    data = _.omitBy(data, _.isNull);
    resultado = await Pregunta.update({ id: data.id }, data);
  }


  // Respues actualizar

  for (let key of params.respuestas) {
    for (let row of key) {
      data = {
        contenido: row.contenido,
        //correcta: String( row.correcta || 'false' ),
        retroalimentacion: row.retroalimentacion,
        estado: row.estado,
        id: row.id
      };
      //console.log("***Params", params, "**DATA", data)
      if (data.retroalimentacion === '') delete data.retroalimentacion;
      data = _.omitBy(data, _.isNull);
      resultado = await Respuesta.update({ id: data.id }, data);
    }
  }

  return res.json({ status: 200, msg: 'actualizado correcto' });
};

const querys = async (req, res) => {
  let params = req.allParams();
  let resultado = Object();
  resultado = await Leccion.find
  ({ where: params.where || {}, sort: params.sort || 'createdAt DESC' })
  .paginate(params.skip || 0, params.limit || 10);
  return res.json({ status: 200, data: resultado, msg: 'Consulta completada' });
};
const reportes = async (req, res) => {
  let params = req.allParams();
  let resultado = Object();
  console.log(params);

  res.ok();
};
module.exports = { createlesson, getleccion, importLessons, updatelesson, querys, reportes };
