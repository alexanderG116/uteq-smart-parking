function EspacioCard({ espacio, onClick }) {
  const colores = {
    libre: { bg: "#22c55e", texto: "white" },
    ocupado: { bg: "#ef4444", texto: "white" },
  };

  const color = colores[espacio.estado] || { bg: "#6b7280", texto: "white" }; // gris si no hay info

  const fecha = new Date(espacio.fechaHora).toLocaleString("es-EC", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      onClick={() => onClick(espacio)}
      style={{
        background: color.bg,
        color: color.texto,
        borderRadius: "8px",
        padding: "10px",
        cursor: "pointer",
        fontSize: "12px",
        textAlign: "center",
        transition: "transform 0.15s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <p style={{ margin: 0, fontWeight: "bold" }}>
        {espacio.columna === 1 ? "A" : espacio.columna === 2 ? "B" : espacio.columna === 3 ? "C" : "D"}
        {String(espacio.numero).padStart(2, "0")}
      </p>
      <p style={{ margin: "2px 0", fontSize: "11px" }}>{espacio.distanciaDetectada} cm</p>
      <p style={{ margin: 0, fontSize: "9px", opacity: 0.85 }}>{fecha}</p>
    </div>
  );
}

export default EspacioCard;