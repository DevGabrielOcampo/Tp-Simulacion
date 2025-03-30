import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Histograma({ data, numBins }) {
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const min = Math.min(...data);  // Definir min y max fuera de la función
        const max = Math.max(...data);

        const getBins = (data, min, max, numBins) => {
            // Aseguramos que los intervalos no sean menores que 0
            const binWidth = (max - min) / numBins;
            const bins = [];
            let binStart = min;

            // Creamos los bins (intervalos)
            for (let i = 0; i < numBins; i++) {
                bins.push({ x: binStart, y: 0 });
                binStart += binWidth;
            }

            // Contamos la cantidad de datos en cada intervalo
            data.forEach(value => {
                const binIndex = Math.floor((value - min) / binWidth);
                if (binIndex >= 0 && binIndex < bins.length) {
                    bins[binIndex].y++;
                }
            });

            return bins;
        };

        const bins = getBins(data, min, max, numBins);  // Pasar min y max a la función

        setChartOptions({
            chart: { type: 'column' },
            title: { text: 'Histograma de Datos' },
            xAxis: {
                title: { text: 'Valor' },
                categories: bins.map((bin, index) => {
                    const start = bin.x.toFixed(1);
                    const end = (bin.x + (max - min) / numBins).toFixed(1);
                    return `${start} - ${end}`;
                }),
            },
            yAxis: {
                title: { text: 'Frecuencia' },
            },
            series: [{ name: 'Datos', data: bins.map(bin => bin.y) }],
        });
    }, [data, numBins]);

    return (
        <div>
            {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
        </div>
    );
}

export default Histograma;
