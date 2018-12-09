const localStrategy = require("passport-local").Strategy;

module.exports = passport => {
  passport.use(
    new localStrategy(
      {
        usernameField: "id",
        passwordField: "pw"
      },
      (id, pw, done) => {
        const user = {
          id: "whwlsvy12",
          pw: "1234"
        };

        if (id === user.id && pw === user.pw) {
          done(null, user);
        }
      }
    )
  );
};
