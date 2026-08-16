import { useHistorialEspacio } from "../hooks/useHistorialEspacio";

function HistorialEspacio({ espacioId }) {
  const { historial, cargando } = useHistorialEspacio(espacioId);

  if (cargando) return <p style={{ color: "#9ca3af" }}>Cargando historial...</p>;

  if (historial.length === 0) {
    return <p style={{ color: "#9ca3af" }}>Aún no hay historial registrado para este espacio.</p>;
  }

  return (
    <div style={{ marginTop: "16px" }}>
      <h3 style={{ color: "white" }}>Historial reciente ({historial.length} eventos)</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", color: "white" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid #374151" }}>
            <th style={{ padding: "8px" }}>Estado</th>
            <th style={{ padding: "8px" }}>Distancia</th>
            <th style={{ padding: "8px" }}>Fecha y hora</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((registro) => (
            <tr key={registro.fechaHora} style={{ borderBottom: "1px solid #1f2937" }}>
              <td style={{ padding: "8px" }}>
                <span
                  style={{
                    color: registro.estado === "libre" ? "#22c55e" : "#ef4444",
                    fontWeight: "bold",
                  }}
                >
                  ● {registro.estado}
                </span>
              </td>
              <td style={{ padding: "8px" }}>{registro.distanciaDetectada} cm</td>
              <td style={{ padding: "8px" }}>
                {new Date(registro.fechaHora).toLocaleString("es-EC")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HistorialEspacio;