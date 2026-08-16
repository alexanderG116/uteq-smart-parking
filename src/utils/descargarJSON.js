// src/utils/descargarJSON.js

export function descargarJSON(data, nombreArchivo = "espacios-rtdb.json") {
  // Convertimos el objeto/array a texto JSON, bien formateado (2 espacios de indentación)
  const contenido = JSON.stringify(data, null, 2);

  // Creamos un "Blob" (un archivo temporal en memoria del navegador)
  const blob = new Blob([contenido], { type: "application/json" });

  // Creamos una URL temporal que apunta a ese blob
  const url = URL.createObjectURL(blob);

  // Creamos un link invisible, le asignamos esa URL, y simulamos un click
  // (truco típico para forzar una descarga de archivo desde JS)
  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);

  // Liberamos la URL temporal de memoria
  URL.revokeObjectURL(url);
}