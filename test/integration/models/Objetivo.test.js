var util = require("util");

const newObjetivo = {
  titulo: "New Objetivo",
  contenido: "Objetivo de test",
};

describe("Objetivo Crud 📑", () => {
  describe("#findAllObjetivos 🗂️", () => {
    it("find Objetivos", (done) => {
      Objetivo.find()
        .then((Objetivos) => {
          if (Objetivos.length === 0) {
            return done(
              new Error(
                "Should return Objetivos " +
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
  describe("#CrudObjetivo 🧩", () => {
    it("add Objetivo ➕", (done) => {
      Objetivo.create(newObjetivo)
        .then((Objetivo) => {
          if (!Objetivo) {
            return done(
              new Error(
                "Should create Objetivo test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          return done();
        })
        .catch(done);
    });
    it("FindObjetivo 🔍", (done) => {
      Persona.findOne(newObjetivo.titulo)
        .then((Objetivo) => {
          if (!Objetivo) {
            return done(
              new Error(
                "Should create Objetivo test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Objetivo.id) {
            newObjetivo.id = Objetivo.id;
          }
          return done();
        })
        .catch(done);
    });
    it("DeleteObjetivo 🗑️", (done) => {
      Objetivo.destroyOne(newObjetivo.id)
        .then((isDeleted) => {
          if (!isDeleted) {
            return done(
              new Error(
                "Should delete Objetivo " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Objetivo.id) {
            newObjetivo.id = Objetivo.id;
          }
          return done();
        })
        .catch(done);
    });
  });
});
