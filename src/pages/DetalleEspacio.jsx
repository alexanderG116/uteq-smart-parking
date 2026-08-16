import { useParams, Link } from "react-router-dom";
import { useEspacios } from "../hooks/useEspacios";
import HistorialEspacio from "../components/HistorialEspacio";

function DetalleEspacio() {
  const { id } = useParams(); // saca el "ESP-C01-01" de la URL
  const { espacios, cargando } = useEspacios();

  if (cargando) return <p style={{ color: "white", padding: "40px" }}>Cargando...</p>;

  const espacio = espacios.find((e) => e.id === id);

  if (!espacio) {
    return (
      <div style={{ padding: "40px", color: "white" }}>
        <p>No se encontró el espacio "{id}".</p>
        <Link to="/estacionamiento" style={{ color: "#22c55e" }}>← Volver al estacionamiento</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", background: "#111827", minHeight: "100vh", color: "white" }}>
      <Link to="/estacionamiento" style={{ color: "#22c55e" }}>← Volver al estacionamiento</Link>

      <div style={{ background: "#1f2937", borderRadius: "12px", padding: "24px", marginTop: "16px" }}>
        <h1 style={{ margin: 0 }}>{espacio.id}</h1>
        <p><strong>Columna/Número:</strong> {espacio.columna} / {espacio.numero}</p>
        <p>
          <strong>Estado:</strong>{" "}
          <span style={{ color: espacio.estado === "libre" ? "#22c55e" : "#ef4444" }}>
            {espacio.estado}
          </span>
        </p>
        <p><strong>Distancia detectada:</strong> {espacio.distanciaDetectada} cm</p>
        <p><strong>Última actualización:</strong> {new Date(espacio.fechaHora).toLocaleString("es-EC")}</p>
        <p><strong>Ubicación:</strong> {espacio.ubicacion.nombre} — {espacio.ubicacion.latitud.toFixed(6)}, {espacio.ubicacion.longitud.toFixed(6)}</p>
        <p>
          <strong>Bounding box:</strong> N: {espacio.ubicacion.boundingBox.norte.toFixed(6)} |
          S: {espacio.ubicacion.boundingBox.sur.toFixed(6)} |
          E: {espacio.ubicacion.boundingBox.este.toFixed(6)} |
          O: {espacio.ubicacion.boundingBox.oeste.toFixed(6)}
        </p>

        <HistorialEspacio espacioId={espacio.id} />
      </div>
    </div>
  );
}

export default DetalleEspacio;