import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

function Datos() {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            // Define los valores de ejemplo para la URL
            const muestra = 1000;
            const distribucion = 1;
            const a = 10;
            const b = 20;
            const desviacion = 0;
            const media = 0;
            const lambda = 0;

            // Construir la URL correctamente con las variables
            const url = `http://localhost:8080/api/muestra/${muestra},${distribucion},${a},${b},${desviacion},${media},${lambda}`;

            const response = await axios.get(url);

            // Almacena los datos obtenidos en el estado
            setData(response.data);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    const getBins = (data, binWidth) => {
        if (!data || data.length === 0) return [];

        const min = Math.min(...data);
        const max = Math.max(...data);
        const bins = [];
        let binStart = min;

        while (binStart <= max) {
            bins.push({ x: binStart, y: 0 });
            binStart += binWidth;
        }

        data.forEach(value => {
            const binIndex = Math.floor((value - min) / binWidth);
            if (binIndex >= 0 && binIndex < bins.length) {
                bins[binIndex].y++;
            }
        });

        return bins;
    };

    const binWidth = 0.2;
    const bins = getBins(data, binWidth);

    const options = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Histograma de Datos',
        },
        xAxis: {
            title: {
                text: 'Valor',
            },
            categories: bins.map(bin => `${bin.x.toFixed(1)} - ${(bin.x + binWidth).toFixed(1)}`),

        },
        yAxis: {
            title: {
                text: 'Frecuencia',
            },
        },
        series: [
            {
                name: 'Datos',
                data: bins.map(bin => bin.y),
            },
        ],
    };

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={fetchData}>Obtener Datos</button>

            {bins.length > 0 && (
                <div style={{ marginTop: '30px' }}>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                        containerProps={{ style: { width: '1000px', height: '500px' } }}
                    />
                </div>
            )}
        </div>
    );
}

export default Datos;