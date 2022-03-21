var util = require("util");

const newCompetencia = {
  nombre: "New Competencia",
  observaciones: "test",
};

describe("Competencia Crud 📑", () => {
  describe("#findAllCompetencias 🗂️", () => {
    it("find Competencias", (done) => {
      Competencia.find()
        .then((Competencias) => {
          if (Competencias.length === 0) {
            return done(
              new Error(
                "Should return Competencias " +
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
  describe("#CrudCompetencia 🧩", () => {
    it("add Competencia ➕", (done) => {
      Competencia.create(newCompetencia)
        .then((Competencia) => {
          if (!Competencia) {
            return done(
              new Error(
                "Should create Competencia test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          return done();
        })
        .catch(done);
    });
    it("FindCompetencia 🔍", (done) => {
      Persona.findOne(newCompetencia.nombre)
        .then((Competencia) => {
          if (!Competencia) {
            return done(
              new Error(
                "Should create Competencia test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Competencia.id) {
            newCompetencia.id = Competencia.id;
          }
          return done();
        })
        .catch(done);
    });
    it("DeleteCompetencia 🗑️", (done) => {
      Competencia.destroyOne(newCompetencia.id)
        .then((isDeleted) => {
          if (!isDeleted) {
            return done(
              new Error(
                "Should delete Competencia " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Competencia.id) {
            newCompetencia.id = Competencia.id;
          }
          return done();
        })
        .catch(done);
    });
  });
});
