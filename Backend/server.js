const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.static(path.join(__dirname, "../Frontend")));

const db = new sqlite3.Database("./database.db");

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/index.html"));
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