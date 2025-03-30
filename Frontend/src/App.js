import { useState } from 'react';
import Datos from './components/ObtenerSerie/ObtenerSerie';
import Histograma from './components/Histograma/Histograma';
import MostrarSerie from './components/MostrarSerie/MostrarSerie'

function App() {
  const [datosGenerados, setDatosGenerados] = useState(null);

  return (
    <div>
      {/* Enviamos setDatosGenerados a Datos para actualizar el estado en App */}
      <Datos setDatosGenerados={setDatosGenerados} />

      {/* Si los datos fueron generados, los pasamos a Histograma */}
      {datosGenerados ? (
        <>
          <Histograma data={datosGenerados} />
          <MostrarSerie serie={datosGenerados} />
        </>
      ) : (
        <p>Cargando datos...</p>  // Mostrar mensaje mientras se cargan los datos
      )}
    </div>
  );
}

export default App;

