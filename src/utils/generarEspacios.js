// src/utils/generarEspacios.js

// Las 4 esquinas del terreno (P1, P2, P3, P4)
const P1 = { lat: -1.0122617572453996, lng: -79.4682858877737 };
const P2 = { lat: -1.0125032549290254, lng: -79.4682998912032 };
const P3 = { lat: -1.0125709715003960, lng: -79.46748620024898 };
const P4 = { lat: -1.0123403901396444, lng: -79.46746240847104 };

const COLUMNAS = 4;
const ESPACIOS_POR_COLUMNA = 20;

// Interpolación bilineal: mezcla los 4 puntos según pesos (u, v)
function interpolar(u, v) {
  const lat =
    P1.lat * (1 - u) * (1 - v) +
    P4.lat * u * (1 - v) +
    P2.lat * (1 - u) * v +
    P3.lat * u * v;

  const lng =
    P1.lng * (1 - u) * (1 - v) +
    P4.lng * u * (1 - v) +
    P2.lng * (1 - u) * v +
    P3.lng * u * v;

  return { lat, lng };
}

// Genera el bounding box (4 esquinas) de una celda específica
function calcularBoundingBox(columna, numero) {
  // u1/u2: borde izquierdo y derecho de la columna
  const u1 = (columna - 1) / COLUMNAS;
  const u2 = columna / COLUMNAS;

  // v1/v2: borde superior e inferior del espacio
  const v1 = (numero - 1) / ESPACIOS_POR_COLUMNA;
  const v2 = numero / ESPACIOS_POR_COLUMNA;

  const esquinaNO = interpolar(u1, v1); // noroeste
  const esquinaNE = interpolar(u2, v1); // noreste
  const esquinaSE = interpolar(u2, v2); // sureste
  const esquinaSO = interpolar(u1, v2); // suroeste

  return {
    norte: Math.max(esquinaNO.lat, esquinaNE.lat),
    sur: Math.min(esquinaSO.lat, esquinaSE.lat),
    oeste: Math.min(esquinaNO.lng, esquinaSO.lng),
    este: Math.max(esquinaNE.lng, esquinaSE.lng),
  };
}

// Genera el centro (lat/lng) de una celda
function calcularCentro(columna, numero) {
  const u = (columna - 0.5) / COLUMNAS;
  const v = (numero - 0.5) / ESPACIOS_POR_COLUMNA;
  return interpolar(u, v);
}

// Genera un ID tipo ESP-C01-01
function generarId(columna, numero) {
  const col = String(columna).padStart(2, "0");
  const num = String(numero).padStart(2, "0");
  return `ESP-C${col}-${num}`;
}

// Genera una distancia aleatoria y su estado derivado
function generarDistanciaYEstado() {
  const distanciaDetectada = Math.round((Math.random() * 300 + 10) * 10) / 10; // 10 a 310 cm
  const estado = distanciaDetectada <= 50 ? "ocupado" : "libre";
  return { distanciaDetectada, estado };
}

// Genera los 80 espacios completos
export function generarEspacios() {
  const espacios = {};

  for (let columna = 1; columna <= COLUMNAS; columna++) {
    for (let numero = 1; numero <= ESPACIOS_POR_COLUMNA; numero++) {
      const id = generarId(columna, numero);
      const centro = calcularCentro(columna, numero);
      const boundingBox = calcularBoundingBox(columna, numero);
      const { distanciaDetectada, estado } = generarDistanciaYEstado();

      espacios[id] = {
        id,
        columna,
        numero,
        distanciaDetectada,
        estado,
        fechaHora: Date.now(),
        ubicacion: {
          nombre: "Parqueadero UTEQ",
          latitud: centro.lat,
          longitud: centro.lng,
          boundingBox,
        },
      };
    }
  }

  return espacios;
}