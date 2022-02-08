var util = require('util');

describe('Persona (model)', () => {
  describe('#findAllUsers()', () => {
    it('find users', (done) => {
      console.log('entro');
      Persona.find()
        .then((users) => {
          if (users.length === 0) {
            return done(
              new Error(
                'Should return users ' +
                  'from our test fixtures who are considered the "best".  ' +
                  'But instead, got: ' +
                  util.inspect(find, { depth: null }) +
                  ''
              )
            );
          } //-•

          return done();
        })
        .catch(done);
    });
  });
});
