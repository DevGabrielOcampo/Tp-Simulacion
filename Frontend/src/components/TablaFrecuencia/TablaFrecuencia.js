import React, { useState, useEffect } from 'react';

function TablaFrecuencias({ data, numBins }) {
    const [frequencies, setFrequencies] = useState([]);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const min = data.reduce((a,b) => Math.min(a,b), Infinity);  // Definir min y max fuera de la función
        const max = data.reduce((a,b) => Math.max(a,b), -Infinity);
        const binWidth = (max - min) / numBins;

        const bins = Array(numBins).fill(0); // Inicializar los bins con 0 frecuencias
        const intervals = [];

        // Contar las frecuencias de cada intervalo
        data.forEach(value => {
            let binIndex = Math.floor((value - min) / binWidth);
            if (binIndex === numBins) binIndex--; // Ajustar el índice si es igual al número de bins
            bins[binIndex]++;
        });

        // Crear los intervalos con sus frecuencias
        for (let i = 0; i < numBins; i++) {
            const start = min + i * binWidth;
            const end = start + binWidth;
            intervals.push({
                interval: `${start.toFixed(2)} - ${end.toFixed(2)}`,
                frequency: bins[i],
            });
        }

        setFrequencies(intervals);
    }, [data, numBins]);

    return (
        <div>
            <h3>Tabla de Frecuencias</h3>
            <table border="1">
                <thead>
                    <tr>
                        <th>Intervalo</th>
                        <th>Frecuencia</th>
                    </tr>
                </thead>
                <tbody>
                    {frequencies.map((row, index) => (
                        <tr key={index}>
                            <td>{row.interval}</td>
                            <td>{row.frequency}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaFrecuencias;
