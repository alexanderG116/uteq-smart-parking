import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "../services/firebase";

export function useHistorialEspacio(espacioId) {
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!espacioId) return;

    const historialRef = ref(db, `historial/${espacioId}`);

    const unsubscribe = onValue(historialRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        // data es un objeto { "1786905278756": {...}, "1786905300000": {...} }
        // lo convertimos en array y lo ordenamos del más reciente al más antiguo
        const lista = Object.values(data).sort((a, b) => b.fechaHora - a.fechaHora);
        setHistorial(lista);
      } else {
        setHistorial([]);
      }

      setCargando(false);
    });

    return () => unsubscribe();
  }, [espacioId]);

  return { historial, cargando };
}