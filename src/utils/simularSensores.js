// src/utils/simularSensores.js
import { ref, get, update } from "firebase/database";
import { db } from "../services/firebase";

// Cuántos espacios se actualizan en cada "tick" de la simulación (no todos a la vez)
const CANTIDAD_A_ACTUALIZAR = 8;

function generarDistanciaYEstado() {
  const distanciaDetectada = Math.round((Math.random() * 300 + 10) * 10) / 10; // 10 a 310 cm
  const estado = distanciaDetectada <= 50 ? "ocupado" : "libre";
  return { distanciaDetectada, estado };
}

// Elige N espacios al azar de un array
function elegirAlAzar(array, cantidad) {
  const copia = [...array];
  const elegidos = [];
  for (let i = 0; i < cantidad && copia.length > 0; i++) {
    const indice = Math.floor(Math.random() * copia.length);
    elegidos.push(copia[indice]);
    copia.splice(indice, 1);
  }
  return elegidos;
}

export async function simularCambios() {
  // 1. Leemos los espacios actuales
  const snapshot = await get(ref(db, "espacios"));
  const data = snapshot.val();
  if (!data) return;

  const espacios = Object.values(data);
  const seleccionados = elegirAlAzar(espacios, CANTIDAD_A_ACTUALIZAR);

  // 2. Armamos un objeto de actualizaciones "multi-path"
  // Esto permite actualizar VARIOS lugares distintos de la base de datos en una sola llamada
  const actualizaciones = {};

  seleccionados.forEach((espacioViejo) => {
    const { distanciaDetectada, estado } = generarDistanciaYEstado();
    const fechaHora = Date.now();

    // a) Actualizamos el espacio actual (lo que se ve en la cuadrícula)
    actualizaciones[`espacios/${espacioViejo.id}/distanciaDetectada`] = distanciaDetectada;
    actualizaciones[`espacios/${espacioViejo.id}/estado`] = estado;
    actualizaciones[`espacios/${espacioViejo.id}/fechaHora`] = fechaHora;

    // b) Guardamos la lectura ANTERIOR en el historial (antes de sobrescribirla)
    actualizaciones[`historial/${espacioViejo.id}/${espacioViejo.fechaHora}`] = {
      distanciaDetectada: espacioViejo.distanciaDetectada,
      estado: espacioViejo.estado,
      fechaHora: espacioViejo.fechaHora,
    };
  });

  // 3. Una sola llamada a Firebase que actualiza todo junto (más eficiente)
  await update(ref(db), actualizaciones);
}