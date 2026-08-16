function ResumenEstacionamiento({ espacios }) {
  const total = espacios.length;
  const libres = espacios.filter((e) => e.estado === "libre").length;
  const ocupados = espacios.filter((e) => e.estado === "ocupado").length;
  const porcentajeDisponible = total > 0 ? (libres / total) * 100 : 0;

  const tarjetas = [
    { titulo: "TOTAL", valor: total, detalle: "espacios monitoreados", color: "#e5e7eb" },
    { titulo: "DISPONIBLES", valor: libres, detalle: `${porcentajeDisponible.toFixed(0)}% del parqueadero`, color: "#22c55e" },
    { titulo: "OCUPADOS", valor: ocupados, detalle: `${(100 - porcentajeDisponible).toFixed(0)}% del parqueadero`, color: "#ef4444" },
    { titulo: "DISTRIBUCIÓN", valor: "4 × 20", detalle: "columnas x espacios", color: "#e5e7eb" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        margin: "24px 0",
      }}
    >
      {tarjetas.map((t) => (
        <div
          key={t.titulo}
          style={{
            background: "#1f2937",
            borderRadius: "12px",
            padding: "16px",
            color: "white",
          }}
        >
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{t.titulo}</p>
          <p style={{ fontSize: "32px", fontWeight: "bold", color: t.color, margin: "4px 0" }}>
            {t.valor}
          </p>
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>{t.detalle}</p>
        </div>
      ))}
    </div>
  );
}

export default ResumenEstacionamiento;