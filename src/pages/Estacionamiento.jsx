import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { ref, set } from "firebase/database";
import { generarEspacios } from "../utils/generarEspacios";
import { useEspacios } from "../hooks/useEspacios";
import { useSimulador } from "../hooks/useSimulador";
import ResumenEstacionamiento from "../components/ResumenEstacionamiento";
import CuadriculaEstacionamiento from "../components/CuadriculaEstacionamiento";
import FiltrosEspacios from "../components/FiltrosEspacios";
import MapaEstacionamiento from "../components/MapaEstacionamiento";
import { descargarJSON } from "../utils/descargarJSON";

function Estacionamiento() {
  const { espacios, cargando } = useEspacios();
  const navigate = useNavigate();
  useSimulador();

  const [filtroColumna, setFiltroColumna] = useState("todas");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  const handleInicializar = async () => {
    const nuevosEspacios = generarEspacios();
    try {
      await set(ref(db, "espacios"), nuevosEspacios);
      alert("¡Listo! Se subieron los 80 espacios a Firebase 🎉");
    } catch (error) {
      console.error("Error subiendo a Firebase:", error);
      alert("Hubo un error, revisa la consola (F12)");
    }
  };

  const handleDescargarJSON = () => {
    // Armamos el mismo formato que tiene Firebase: un objeto { "ESP-C01-01": {...}, ... }
    const espaciosComoObjeto = {};
    espacios.forEach((e) => {
      espaciosComoObjeto[e.id] = e;
    });

    descargarJSON({ espacios: espaciosComoObjeto }, "espacios-rtdb.json");
  };

  const espaciosFiltrados = espacios.filter((e) => {
    const pasaColumna = filtroColumna === "todas" || e.columna === filtroColumna;
    const pasaEstado = filtroEstado === "todos" || e.estado === filtroEstado;
    return pasaColumna && pasaEstado;
  });

  return (
    <div style={{ padding: "40px", background: "#111827", minHeight: "100vh" }}>
      <h1 style={{ color: "white" }}>Estacionamiento</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleInicializar} style={{ padding: "8px 16px", cursor: "pointer" }}>
          Reinicializar espacios en Firebase
        </button>
        <button
          onClick={handleDescargarJSON}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "6px",
          }}
        >
          Descargar JSON para RTDB
        </button>
      </div>

      {cargando ? (
        <p style={{ color: "white" }}>Cargando espacios...</p>
      ) : (
        <>
          <ResumenEstacionamiento espacios={espacios} />

          {/* Leyenda de colores */}
          <div style={{ display: "flex", gap: "16px", color: "white", fontSize: "13px", margin: "16px 0" }}>
            <span><span style={{ color: "#22c55e" }}>●</span> Libre</span>
            <span><span style={{ color: "#ef4444" }}>●</span> Ocupado</span>
            <span><span style={{ color: "#6b7280" }}>●</span> Sin información</span>
          </div>

          <FiltrosEspacios
            filtroColumna={filtroColumna}
            setFiltroColumna={setFiltroColumna}
            filtroEstado={filtroEstado}
            setFiltroEstado={setFiltroEstado}
          />

          <CuadriculaEstacionamiento
            espacios={espaciosFiltrados}
            onSeleccionar={(espacio) => navigate(`/espacios/${espacio.id}`)}
          />

          <h2 style={{ color: "white", marginTop: "32px" }}>Ubicación del parqueadero</h2>
          <MapaEstacionamiento espacios={espacios} />
        </>
      )}
    </div>
  );
}

export default Estacionamiento;