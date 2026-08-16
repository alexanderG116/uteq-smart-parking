import { useEffect } from "react";
import { simularCambios } from "../utils/simularSensores";

const INTERVALO_MS = 10000; // cada 10 segundos (ajústalo si quieres más rápido/lento)

export function useSimulador() {
  useEffect(() => {
    const intervalo = setInterval(() => {
      simularCambios().catch((error) =>
        console.error("Error simulando cambios:", error)
      );
    }, INTERVALO_MS);

    // Cleanup: si el componente se desmonta, paramos el intervalo
    return () => clearInterval(intervalo);
  }, []);
}