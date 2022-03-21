var util = require("util");

const newPregunta = {
  contenido: "New Pregunta",
  retroalimentacion: "test",
};

describe("Pregunta Crud 📑", () => {
  describe("#findAllPreguntas 🗂️", () => {
    it("find Preguntas", (done) => {
      Pregunta.find()
        .then((Preguntas) => {
          if (Preguntas.length === 0) {
            return done(
              new Error(
                "Should return Preguntas " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          return done();
        })
        .catch(done);
    });
  });
  describe("#CrudPregunta 🧩", () => {
    it("add Pregunta ➕", (done) => {
      Pregunta.create(newPregunta).fetch()
        .then((Pregunta) => {
          newPregunta.id = Pregunta.id;
          if (!Pregunta) {
            return done(
              new Error(
                "Should create Pregunta test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          return done();
        })
        .catch(done);
    });
    it("FindPregunta 🔍", (done) => {
      Persona.findOne(newPregunta.id)
        .then((Pregunta) => {
          if (!Pregunta) {
            return done(
              new Error(
                "Should create Pregunta test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Pregunta.id) {
            newPregunta.id = Pregunta.id;
          }
          return done();
        })
        .catch(done);
    });
    it("DeletePregunta 🗑️", (done) => {
      Pregunta.destroyOne(newPregunta.id)
        .then((isDeleted) => {
          if (!isDeleted) {
            return done(
              new Error(
                "Should delete Pregunta " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Pregunta.id) {
            newPregunta.id = Pregunta.id;
          }
          return done();
        })
        .catch(done);
    });
  });
});
