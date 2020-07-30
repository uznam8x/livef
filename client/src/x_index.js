import "./styles/app.scss";
import app from "./app";
import model from "./model";

app.model(model);
app.mount({ gridline: true }, "#app");
