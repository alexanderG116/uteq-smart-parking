import EspacioCard from "./EspacioCard";

function CuadriculaEstacionamiento({ espacios, onSeleccionar }) {
  // Agrupamos los espacios por columna (1,2,3,4)
  const columnas = [1, 2, 3, 4];
  const letras = { 1: "A", 2: "B", 3: "C", 4: "D" };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginTop: "24px",
      }}
    >
      {columnas.map((col) => {
        // Filtramos y ordenamos los espacios de esta columna por número (1 a 20)
        const espaciosColumna = espacios
          .filter((e) => e.columna === col)
          .sort((a, b) => a.numero - b.numero);

        return (
          <div key={col}>
            <h3 style={{ textAlign: "center", color: "#e5e7eb" }}>
              Columna {letras[col]}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {espaciosColumna.map((espacio) => (
                <EspacioCard key={espacio.id} espacio={espacio} onClick={onSeleccionar} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CuadriculaEstacionamiento;