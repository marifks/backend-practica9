const fs = require("fs");
require('dotenv').config(); // Cargar variables de entorno desde el archivo .env

// Función para guardar frutas en el archivo de base de datos
function guardarFrutas(frutas) {
  const datos = JSON.stringify(frutas); // Convertir el arreglo de frutas a formato JSON
  fs.writeFileSync(__dirname + process.env.DATABASE_PATH, datos); // Escribir los datos en el archivo definido en la variable de entorno DATABASE_PATH
}

// Función para leer frutas desde el archivo de base de datos
function leerFrutas() {
  const frutasString = fs.readFileSync(__dirname + process.env.DATABASE_PATH, "utf8"); // Leer los datos del archivo definido en la variable de entorno DATABASE_PATH como una cadena de texto
  const frutas = JSON.parse(frutasString); // Convertir la cadena de texto JSON a un arreglo de frutas
  return frutas; // Devolver el arreglo de frutas
}


async function getIdFruta(id) {
  if (!id) throw new Error("Error. El Id está indefinido.");

  const database = await leerFrutas();
  const idFrutaDatabase  = database.find((database) => database.id === id);

  if (!idFrutaDatabase) throw new Error("Error. El Id no corresponde a una fruta existente en la base de datos.");

  return idFrutaDatabase;}

  async function postFruta(fruta) {
    let database  = await leerFrutas();

    const idFrutaDatabase  = database.find((database) => database.id === id);

    database.sort((a,b)=>{
      if(a.id < b.id)
      {return -1}
      if(a.id < b.id)
      {return 1}
      return 0
      
      })

      return database

  }




  async function updateFruta(fruta) {
    if (!fruta?.id || !fruta?.imagen || !fruta?.nombre || !fruta?.importe || !fruta?.stock) throw new Error("Error. Datos incompletos.");

    let database  = await leerFrutas();
    const idFrutaDatabase = database.findIndex((database) => database.id === fruta.id);

    if (idFrutaDatabase < 0) throw new Error("Error. El Id no corresponde a una fruta existente en la base de datos");

    database[idFrutaDatabase] = fruta;
    await guardarFrutas(database);

    return database[idFrutaDatabase];
}






  async function deleteFruta(id) {
    if (!id) throw new Error("Error. El Id no corresponde a una fruta existente en la base de datos");

    let database   = await leerFrutas();
    const idFrutaDatabase = database.findIndex((database) => database.id === id);

    if (idFrutaDatabase < 0) throw new Error("Error. El Id no corresponde a una fruta existente en la base de datos");

    const  eliminarFruta= database[idFrutaDatabase];
    database.splice(idFrutaDatabase, 1);
    await guardarFrutas(database);
    return eliminarFruta;
}








// Exportar las funciones para ser utilizadas por otros módulos
module.exports = {
  leerFrutas,
  guardarFrutas,
  getIdFruta,
  deleteFruta,
  updateFruta,
};
