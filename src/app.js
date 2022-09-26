import express from "express";
import userRoute from "./routes/user.route.js";
import { engine } from "express-handlebars";
import * as path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
    extname: '.hbs'
  })
);

app.set('view engine', '.hbs');


//routes
app.use(userRoute);

app.get("/", (req, res) => {
  res.render("index");
});

export default app;
