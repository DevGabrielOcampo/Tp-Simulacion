import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Histograma({ data }) {
    const [chartOptions, setChartOptions] = useState(null);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const getBins = (data, binWidth) => {
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

        setChartOptions({
            chart: { type: 'column' },
            title: { text: 'Histograma de Datos' },
            xAxis: {
                title: { text: 'Valor' },
                categories: bins.map(bin => `${bin.x.toFixed(1)} - ${(bin.x + binWidth).toFixed(1)}`),
            },
            yAxis: {
                title: { text: 'Frecuencia' },
            },
            series: [{ name: 'Datos', data: bins.map(bin => bin.y) }], // Datos de frecuencia
        });
    }, [data]);

    return (
        <div>
            {chartOptions && <HighchartsReact highcharts={Highcharts} options={chartOptions} />}
        </div>
    );
}

export default Histograma;
