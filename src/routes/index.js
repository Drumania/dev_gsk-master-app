const express = require("express");
const router = express.Router();

const MAP_KEY =
  process.env.MAP_KEY || "AIzaSyDIAnwD3_GfYCCf2ZfubjTPOyMuvr4WYKA";

router.get("/", (req, res) => {
  res.render("index.html", {
    title: "Inicio",
  });
});

router.get("/vacunas-recomendadas", (req, res) => {
  res.render("vacunas-recomendadas.html", {
    title: "Vacunas Recomendadas",
  });
});

router.get("/lo-clave-de-la-vacunacion", (req, res) => {
  res.render("lo-clave-de-la-vacunacion.html", {
    title: "Lo clave de la vacunacion",
  });
});

router.get("/por-que-es-importante-la-vacunacion", (req, res) => {
  res.render("por-que-es-importante-la-vacunacion.html", {
    title: "Por que es importante la vacunacion",
  });
});

// Ejemplo de ruta que usa parámetros de consulta para obtener el grupo
router.get("/enfermedades-prevenibles", (req, res) => {
  const group = req.query.group; // Recibe el parámetro 'group' desde la URL

  res.render("enfermedades_prevenibles", {
    title: "Por que es importante la vacunacion",
    group: group, // Pasamos la variable a la vista
  });
});

router.get("/los-adolescentes-tambien-deben-vacunarse", (req, res) => {
  res.render("los-adolescentes-tambien-deben-vacunarse.html", {
    title: "Los adolescentes tambien deben vacunarse",
  });
});

router.get("/descubre-los-beneficios-de-las-vacunas-combinadas", (req, res) => {
  res.render("descubre-los-beneficios-de-las-vacunas-combinadas.html", {
    title: "Descubre los beneficios de las vacunas combinadas",
  });
});

router.get("/razones-para-vacunarse", (req, res) => {
  res.render("razones-para-vacunarse.html", {
    title: "Razones para vacunarse",
  });
});

router.get("/tener-todas-las-vacunas-recomendadas", (req, res) => {
  res.render("tener-todas-las-vacunas-recomendadas.html", {
    title: "Tener todas las vacunas recomendadas",
  });
});

router.get("/encuentra-un-punto-de-vacunacion", (req, res) => {
  res.render("encuentra-un-punto-de-vacunación.html", {
    title: "Encuentra un punto de vacunación",
  });
});

module.exports = router;
