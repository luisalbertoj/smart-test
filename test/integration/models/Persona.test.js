var util = require('util');

const newUser = {
  nombre: 'New User',
  apellido: 'test',
  email: 'test@mail.com',
  cedula: '123456789',
  codigo: '123456789',
  password: 'password',
  username: 'test',
};

describe('Persona Crud 📑', () => {
  describe('#findAllUsers()', () => {
    it('find users', (done) => {
      Persona.find()
        .then((users) => {
          if (users.length === 0) {
            return done(
              new Error(
                'Should return users ' +
                util.inspect(find, { depth: null }) +
                ''
              )
            );
          }
          return done();
        })
        .catch(done);
    });
  });
  describe('#CrudUser 🤵', () => {
    it('add user', (done) => {
      Persona.create(newUser)
        .then((user) => {
          if (!user) {
            return done(
              new Error(
                'Should create user test ' +
                util.inspect(find, { depth: null }) +
                ''
              )
            );
          }
          return done();
        })
        .catch(done);
    });
    it('FindUser 😃', (done) => {
      Persona.findOne(newUser.username)
        .then((user) => {
          if (!user) {
            return done(
              new Error(
                'Should create user test ' +
                util.inspect(find, { depth: null }) +
                ''
              )
            );
          }
          if (user.id) {
            newUser.id = user.id;
          }
          return done();
        })
        .catch(done);
    });
    it('DeleteUser 🖲️', (done) => {
      Persona.destroyOne(newUser.id)
        .then((isDeleted) => {
          if (!isDeleted) {
            return done(
              new Error(
                'Should delete user ' +
                util.inspect(find, { depth: null }) +
                ''
              )
            );
          }
          if (user.id) {
            newUser.id = user.id;
          }
          return done();
        })
        .catch(done);
    });

  });

});
