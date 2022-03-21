var util = require("util");

const newLeccion = {
  titulo: "New Leccion",
  introduccion: "Leccion de test",
  conclusiones: "Leccion de test",
  aprender: "Leccion de test",
};

describe("Leccion Crud 📑", () => {
  describe("#findAllLeccions 🗂️", () => {
    it("find Leccions", (done) => {
      Leccion.find()
        .then((Leccions) => {
          if (Leccions.length === 0) {
            return done(
              new Error(
                "Should return Leccions " +
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
  describe("#CrudLeccion 🧩", () => {
    it("add Leccion ➕", (done) => {
      Leccion.create(newLeccion)
        .then((Leccion) => {
          if (!Leccion) {
            return done(
              new Error(
                "Should create Leccion test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          return done();
        })
        .catch(done);
    });
    it("FindLeccion 🔍", (done) => {
      Persona.findOne(newLeccion.titulo)
        .then((Leccion) => {
          if (!Leccion) {
            return done(
              new Error(
                "Should create Leccion test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Leccion.id) {
            newLeccion.id = Leccion.id;
          }
          return done();
        })
        .catch(done);
    });
    it("DeleteLeccion 🗑️", (done) => {
      Leccion.destroyOne(newLeccion.id)
        .then((isDeleted) => {
          if (!isDeleted) {
            return done(
              new Error(
                "Should delete Leccion " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Leccion.id) {
            newLeccion.id = Leccion.id;
          }
          return done();
        })
        .catch(done);
    });
  });
});
