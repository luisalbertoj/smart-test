var util = require("util");

const newPreconcepto = {
  titulo: "New Preconcepto",
  concepto: "test",
};

describe("Preconcepto Crud 📑", () => {
  describe("#findAllPreconceptos 🗂️", () => {
    it("find Preconceptos", (done) => {
      Preconcepto.find()
        .then((Preconceptos) => {
          if (Preconceptos.length === 0) {
            return done(
              new Error(
                "Should return Preconceptos " +
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
  describe("#CrudPreconcepto 🧩", () => {
    it("add Preconcepto ➕", (done) => {
      Preconcepto.create(newPreconcepto)
        .then((Preconcepto) => {
          if (!Preconcepto) {
            return done(
              new Error(
                "Should create Preconcepto test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          return done();
        })
        .catch(done);
    });
    it("FindPreconcepto 🔍", (done) => {
      Persona.findOne(newPreconcepto.titulo)
        .then((Preconcepto) => {
          if (!Preconcepto) {
            return done(
              new Error(
                "Should create Preconcepto test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Preconcepto.id) {
            newPreconcepto.id = Preconcepto.id;
          }
          return done();
        })
        .catch(done);
    });
    it("DeletePreconcepto 🗑️", (done) => {
      Preconcepto.destroyOne(newPreconcepto.id)
        .then((isDeleted) => {
          if (!isDeleted) {
            return done(
              new Error(
                "Should delete Preconcepto " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Preconcepto.id) {
            newPreconcepto.id = Preconcepto.id;
          }
          return done();
        })
        .catch(done);
    });
  });
});
