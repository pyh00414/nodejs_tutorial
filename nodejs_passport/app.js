const express = require("express");
const session = require("express-session");
const passport = require("passport");
const passportConfig = require("./passport");
const path = require("path");

const app = express();
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "pyh",
    cookie: {
      httpOnly: true,
      secure: false
    }
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.get("/", (req, res) => {
  res.render("index");
});

passportConfig(passport);

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    return req.login(user, loginError => {
      if (loginError) {
        console.error(loginError);
      }
    });
  })(req, res, next);

  res.redirect("/success");
});

app.get("/success", (req, res, next) => {
  res.render("success", {
    user: req.user
  });
});
app.listen(3000, () => {
  console.log("server running on 3000port");
});
