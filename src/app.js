const express = require("express");
const userRoute = require("./routes/user.route.js");
const ticketRoute = require("./routes/tickets.route.js");
const clientRoute = require("./routes/client.route.js");
const exphbs = require('express-handlebars');
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
//middlewares
app.use(express.json());
//Archivos publicos
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));

app.engine(
  '.hbs',
  exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
  })
);

app.set("view engine", ".hbs");

//routes
app.use("/user", userRoute);
app.use("/ticket", ticketRoute);
app.use("/client", clientRoute);

app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
