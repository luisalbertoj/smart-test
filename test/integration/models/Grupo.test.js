var util = require("util");

const newGrupo = {
  nombre: "New Grupo",
  codigo: "test1234",
};

describe("Grupo Crud 📑", () => {
  describe("#findAllGrupos 🗂️", () => {
    it("find Grupos", (done) => {
      Grupo.find()
        .then((Grupos) => {
          if (Grupos.length === 0) {
            return done(
              new Error(
                "Should return Grupos " +
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
  describe("#CrudGrupo 🧩", () => {
    it("add Grupo ➕", (done) => {
      const rolDocente = await Rol.find({nombre: 'docente'});
      if(rolDocente.length) return done(
        new Error(
          "Should create Grupo test " +
            util.inspect(find, { depth: null }) +
            " Role teacher not exist"
        )
      );

      const docente = await Persona.find({idRol: rolDocente[0].id});
      if(docente.length) return done(
        new Error(
          "Should create Grupo test " +
            util.inspect(find, { depth: null }) +
            " teachers not exist"
        )
      );

      newGrupo.docente = docente[0].id;

      Grupo.create(newGrupo)
        .then((Grupo) => {
          if (!Grupo) {
            return done(
              new Error(
                "Should create Grupo test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          return done();
        })
        .catch(done);
    });
    it("FindGrupo 🔍", (done) => {
      Persona.findOne(newGrupo.nombre)
        .then((Grupo) => {
          if (!Grupo) {
            return done(
              new Error(
                "Should create Grupo test " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Grupo.id) {
            newGrupo.id = Grupo.id;
          }
          return done();
        })
        .catch(done);
    });
    it("DeleteGrupo 🗑️", (done) => {
      Grupo.destroyOne(newGrupo.id)
        .then((isDeleted) => {
          if (!isDeleted) {
            return done(
              new Error(
                "Should delete Grupo " +
                  util.inspect(find, { depth: null }) +
                  ""
              )
            );
          }
          if (Grupo.id) {
            newGrupo.id = Grupo.id;
          }
          return done();
        })
        .catch(done);
    });
  });
});
