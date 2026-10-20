const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "konyvtar_db",
    port: 3307
});

db.connect((err) => {
    if (err) {
        console.log("Adatbázis hiba:", err);
    } else {
        console.log("Sikeres kapcsolat az adatbázishoz!");
    }
});

app.get("/konyvek", (req, res) => {
    db.query("Select * mufaj_id from konyvek;", (err, result) => {
        if (err) {
            return res.status(500).json({
                hiba: "Szerverhiba"
            });
        }
        res.json(result);
    });
});

app.get("/konyvek/elerheto", (req, res) => {
    db.query("Select * from konyvek where kolcsonozheto = 1 & kiadasi_ev < 2000;", (err, result) => {
        if (err) {
            return res.status(500).json({
                hiba: "Szerverhiba"
            });
        }
        res.json(result);
    });
});
app.get("/konyvek/kereses/:szoveg", (req, res) => {
    db.query("Select * from konyvek", (err, result) => {
        if (err) {
            return res.status(500).json({
                hiba: "Szerverhiba"
            });
        }
        res.json(result);
    });
});app.get("/mufajok/hosszuak", (req, res) => {
    db.query("Select * from mufajok", (err, result) => {
        if (err) {
            return res.status(500).json({
                hiba: "Szerverhiba"
            });
        }
        res.json(result);
    });
});


app.get("/konyvek/hosszuak", (req, res) => {
    db.query("Select cim, kiadasi_ev, oldalszam from konyvek where oldalszam > 400 ORDER by DESC;", (err, result) => {
        if (err) {
            return res.status(500).json({
                hiba: "Szerverhiba"
            });
        }
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Szerver fut a 3000-es porton");
});