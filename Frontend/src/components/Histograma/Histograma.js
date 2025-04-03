import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './histograma.css';

function Histograma({ data, numBins }) {
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const min = data.reduce((a,b) => Math.min(a,b), Infinity);  // Definir min y max fuera de la función
        const max = data.reduce((a,b) => Math.max(a,b), -Infinity);
        console.log("Min:", min, "Max:", max);  // Verificar los valores de min y max

        const getBins = (data, min, max, numBins) => {
            const binWidth = (max - min) / numBins;
            const bins = [];
            let binStart = min;
        
            for (let i = 0; i < numBins; i++) {
                bins.push({ x: binStart, y: 0 });
                binStart += binWidth;
            }
        
            data.forEach(value => {
                let binIndex = Math.floor((value - min) / binWidth);
                if (binIndex === numBins) binIndex--; // Ajustar para incluir el valor máximo
                bins[binIndex].y++;
            });
        
            return bins;
        };

        const bins = getBins(data, min, max, numBins);  // Pasar min y max a la función

        setChartOptions({
            chart: { type: 'column' },
            title: { text: '' },
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
        <div className='histograma'>
            <h2>Histograma</h2>
            {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
        </div>
    );
}

export default Histograma;
