import express from "express";
import userRoute from "./routes/user.route.js";
import ticketRoute from "./routes/tickets.route.js";
import clientRoute from "./routes/client.route.js";
import { engine } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import helpers from "./lib/handlebars.js";
import bodyParser from "body-parser"


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
//middlewares
app.use(express.json());
//Archivos publicos
app.use(express.static(path.join(__dirname, "public")));
app.set('views', path.join(__dirname, 'views'));


app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: helpers,
  })
);

app.set('view engine', '.hbs');


//routes
app.use('/user',userRoute);
app.use('/ticket',ticketRoute)
app.use('/client',clientRoute)

app.get("/", (req, res) => {
  res.render("index");
});

export default app;
