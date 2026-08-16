import { Link } from "react-router-dom";

function Inicio() {
  return (
    <div style={{ padding: "60px 40px", color: "white", maxWidth: "800px", margin: "0 auto" }}>
      <p style={{ color: "#22c55e", fontWeight: "bold", letterSpacing: "1px", fontSize: "13px" }}>
        CAMPUS UTEQ · QUEVEDO
      </p>
      <h1 style={{ fontSize: "42px", margin: "8px 0" }}>Parqueadero inteligente</h1>
      <p style={{ color: "#9ca3af", fontSize: "16px", lineHeight: "1.6" }}>
        Simulación de 80 sensores ultrasónicos organizados en cuatro columnas. Cada espacio
        representa una plaza de estacionamiento y se actualiza en tiempo real como si recibiera
        eventos desde Firebase Realtime Database.
      </p>
      <p style={{ color: "#9ca3af", fontSize: "16px", lineHeight: "1.6" }}>
        Umbral de ocupación: se considera <strong style={{ color: "#ef4444" }}>ocupado</strong> si
        la distancia detectada es menor o igual a 50 cm, y{" "}
        <strong style={{ color: "#22c55e" }}>libre</strong> si es mayor.
      </p>

      <Link to="/estacionamiento">
        <button
          style={{
            marginTop: "24px",
            padding: "14px 28px",
            fontSize: "16px",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Ver estacionamiento →
        </button>
      </Link>
    </div>
  );
}

export default Inicio;