# UTEQ Smart Parking 🅿️

Simulación de un estacionamiento inteligente para el campus UTEQ (Quevedo), desarrollada con **React + Vite** y **Firebase Realtime Database**. El sistema simula 80 sensores ultrasónicos (organizados en 4 columnas de 20 espacios) que reportan distancia y estado (libre/ocupado) en tiempo real.

## 🚀 Demo funcional

- Dashboard en tiempo real con estadísticas (total, libres, ocupados)
- Cuadrícula de 80 espacios con colores según estado
- Filtros por columna y por estado
- Detalle e historial de cada espacio
- Mapa satelital con la ubicación real del parqueadero (coordenadas geográficas)
- Simulación automática de cambios de sensores cada 10 segundos
- Descarga de los datos actuales en formato JSON

## 🛠️ Tecnologías

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [React Router DOM](https://reactrouter.com/)
- [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) (Google Maps JavaScript API)

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── ResumenEstacionamiento.jsx
│   ├── CuadriculaEstacionamiento.jsx
│   ├── EspacioCard.jsx
│   ├── FiltrosEspacios.jsx
│   ├── HistorialEspacio.jsx
│   └── MapaEstacionamiento.jsx
├── hooks/
│   ├── useEspacios.jsx
│   ├── useHistorialEspacio.jsx
│   └── useSimulador.jsx
├── pages/
│   ├── Inicio.jsx
│   ├── Estacionamiento.jsx
│   └── DetalleEspacio.jsx
├── services/
│   └── firebase.js
├── utils/
│   ├── generarEspacios.js
│   ├── simularSensores.js
│   └── descargarJSON.js
└── App.jsx
```

## ⚙️ Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/alexanderG116/uteq-smart-parking.git
cd uteq-smart-parking
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto con tus propias credenciales de Firebase y Google Maps:

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://tu_proyecto-default-rtdb.firebaseio.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_GOOGLE_MAPS_API_KEY=tu_google_maps_api_key
```

> Puedes obtener las credenciales de Firebase en [console.firebase.google.com](https://console.firebase.google.com) → Configuración del proyecto → Tus apps → SDK de Firebase.
>
> La API key de Google Maps se obtiene en [console.cloud.google.com](https://console.cloud.google.com), habilitando la **Maps JavaScript API** para tu proyecto.

### 4. Configurar Firebase Realtime Database

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com)
2. Habilita **Realtime Database** (en modo de prueba para desarrollo)
3. La app generará automáticamente los 80 espacios la primera vez que uses el botón **"Inicializar espacios en Firebase"** dentro de la página de Estacionamiento

### 5. Ejecutar en modo desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### 6. Compilar para producción (opcional)

```bash
npm run build
```

## 📍 Ubicación simulada

El parqueadero está delimitado por 4 puntos geográficos reales dentro del campus UTEQ (Quevedo), usados para calcular —mediante interpolación bilineal— las coordenadas y bounding box de cada uno de los 80 espacios.

## 📊 Regla de estado del sensor

```js
const estado = distanciaDetectada <= 50 ? 'ocupado' : 'libre';
```

## 👤 Autor

Proyecto académico desarrollado para la materia de Desarrollo de Aplicaciones — UTEQ.