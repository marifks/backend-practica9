// Cargar las variables de entorno del archivo .env
require("dotenv").config();

// Importar el módulo Express
const express = require("express");
const app = express();

// Importar las funciones del gestor de frutas
const { leerFrutas, guardarFrutas,getIdFruta,deleteFruta,updateFruta,postFruta } = require("./src/frutasManager");

// Configurar el número de puerto para el servidor
const PORT = process.env.PORT || 3000;

// Crear un arreglo vacío para almacenar los datos de las frutas
let BD = [];

// Configurar el middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Middleware para leer los datos de las frutas antes de cada solicitud
app.use((req, res, next) => {
  BD = leerFrutas(); // Leer los datos de las frutas desde el archivo
  next(); // Pasar al siguiente middleware o ruta
});

// Ruta principal que devuelve los datos de las frutas
app.get("/", (req, res) => {
   res.send(BD);
});

app.get('/id/:id', (req, res) => {
  const { id } = req.params;

  getIdFruta(Number(id))
      .then((BD) => res.status(200).send(BD))
      .catch((error) => res.status(400).send(error.message));
});


//agregar fruta
app.post("/", (req, res) => {
    const nuevaFruta = req.body;
    postFruta(nuevaFruta)
  .then((nuevaFruta) => res.status(201).send(nuevaFruta))
    .catch((error) => res.status(400).send(error.message));
});


// Actualizar una fruta especificando su id en la url
app.put('/id/:id', (req, res) => {
  const { id } = req.params;
  const { imagen, nombre, importe, stock} = req.body;

  updateFruta({ id: Number(id), imagen, nombre, importe,stock })
      .then((BD) => res.status(200).send(BD))
      .catch((error) => res.status(400).send(error.message));
});


//borrar fruta 
app.delete('/id/:id', (req, res) => {
  const { id } = req.params;

  deleteFruta(Number(id))
      .then((BD) => res.status(200).send(BD))
      .catch((error) => res.status(400).send(error.message));
});




// Ruta para manejar las solicitudes a rutas no existentes
app.get("*", (req, res) => {
  res.status(404).send("Lo sentimos, la página que buscas no existe.");
});

// Iniciar el servidor y escuchar en el puerto especificado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
