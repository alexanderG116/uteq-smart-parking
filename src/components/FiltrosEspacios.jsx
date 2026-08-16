function FiltrosEspacios({ filtroColumna, setFiltroColumna, filtroEstado, setFiltroEstado }) {
  const columnas = [
    { valor: "todas", texto: "Todas" },
    { valor: 1, texto: "A" },
    { valor: 2, texto: "B" },
    { valor: 3, texto: "C" },
    { valor: 4, texto: "D" },
  ];

  const estados = [
    { valor: "todos", texto: "Todos" },
    { valor: "libre", texto: "Libres" },
    { valor: "ocupado", texto: "Ocupados" },
  ];

  const estiloBoton = (activo) => ({
    padding: "6px 14px",
    borderRadius: "6px",
    border: "1px solid #374151",
    background: activo ? "#22c55e" : "#1f2937",
    color: "white",
    cursor: "pointer",
    fontSize: "13px",
  });

  return (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", margin: "16px 0" }}>
      <div>
        <p style={{ color: "#9ca3af", fontSize: "12px", margin: "0 0 6px 0" }}>Columna</p>
        <div style={{ display: "flex", gap: "6px" }}>
          {columnas.map((c) => (
            <button
              key={c.valor}
              style={estiloBoton(filtroColumna === c.valor)}
              onClick={() => setFiltroColumna(c.valor)}
            >
              {c.texto}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p style={{ color: "#9ca3af", fontSize: "12px", margin: "0 0 6px 0" }}>Estado</p>
        <div style={{ display: "flex", gap: "6px" }}>
          {estados.map((e) => (
            <button
              key={e.valor}
              style={estiloBoton(filtroEstado === e.valor)}
              onClick={() => setFiltroEstado(e.valor)}
            >
              {e.texto}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FiltrosEspacios;