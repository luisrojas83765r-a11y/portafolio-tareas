const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());

const db = new sqlite3.Database("./database.db");

app.get("/", (req, res) => {
    res.send(`
        <div style="font-family: Arial; text-align:center; margin-top:50px;">
            <h1>📚 Portafolio de Tareas</h1>

            <h2>Luis Humberto Rojas Montoya</h2>

            <p>🚀 Servidor funcionando correctamente</p>
            <p>Ingeniería en Software</p>

            <hr>

            <a 
            href="/tareas" 
            style="font-size:20px;">
                Ver API de tareas
            </a>
        </div>
    `);
});

app.get("/tareas", (req, res) => {

    db.all("SELECT * FROM tareas", [], (err, rows) => {

        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(rows);
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);

});