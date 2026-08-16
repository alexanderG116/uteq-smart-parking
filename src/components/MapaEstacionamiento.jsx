import { GoogleMap, LoadScript, Polygon, Marker } from "@react-google-maps/api";

const P1 = { lat: -1.0122617572453996, lng: -79.4682858877737 };
const P2 = { lat: -1.0125032549290254, lng: -79.4682998912032 };
const P3 = { lat: -1.0125709715003960, lng: -79.46748620024898 };
const P4 = { lat: -1.0123403901396444, lng: -79.46746240847104 };

const centro = {
  lat: (P1.lat + P2.lat + P3.lat + P4.lat) / 4,
  lng: (P1.lng + P2.lng + P3.lng + P4.lng) / 4,
};

const contenedorEstilo = {
  width: "100%",
  height: "400px",
  borderRadius: "12px",
};

// Ícono simple en SVG, como texto codificado en base64.
// No depende de que window.google ya esté cargado.
function iconoCirculo(color) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
      <circle cx="7" cy="7" r="6" fill="${color}" stroke="white" stroke-width="1"/>
    </svg>
  `;
  return {
    url: `data:image/svg+xml;base64,${btoa(svg)}`,
  };
}

function MapaEstacionamiento({ espacios }) {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={contenedorEstilo}
        center={centro}
        zoom={19}
        mapTypeId="satellite"
      >
        <Polygon
          paths={[P1, P2, P3, P4]}
          options={{
            fillColor: "#22c55e",
            fillOpacity: 0.15,
            strokeColor: "#22c55e",
            strokeWeight: 2,
          }}
        />

        {espacios.map((espacio) => (
          <Marker
            key={espacio.id}
            position={{
              lat: espacio.ubicacion.latitud,
              lng: espacio.ubicacion.longitud,
            }}
            icon={iconoCirculo(espacio.estado === "libre" ? "#22c55e" : "#ef4444")}
            title={`${espacio.id} - ${espacio.estado}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}

export default MapaEstacionamiento;