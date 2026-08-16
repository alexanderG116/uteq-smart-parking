import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";

export function useEspacios() {
  const [espacios, setEspacios] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Referencia al nodo "espacios" en la Realtime Database
    const espaciosRef = ref(db, "espacios");

    // onValue "escucha" cambios en tiempo real.
    // Cada vez que algo cambia en Firebase, esta función se vuelve a ejecutar sola.
    const unsubscribe = onValue(espaciosRef, (snapshot) => {
      const data = snapshot.val(); // objeto { ESP-C01-01: {...}, ESP-C01-02: {...}, ... }

      if (data) {
        // Convertimos el objeto en un array, para que sea más fácil
        // recorrerlo con .map(), .filter(), etc en los componentes
        const listaEspacios = Object.values(data);
        setEspacios(listaEspacios);
      } else {
        setEspacios([]);
      }

      setCargando(false);
    });

    // Cleanup: cuando el componente que usa este hook se "desmonta"
    // (deja de mostrarse en pantalla), dejamos de escuchar cambios,
    // para no dejar conexiones abiertas innecesarias.
    return () => unsubscribe();
  }, []);

  return { espacios, cargando };
}