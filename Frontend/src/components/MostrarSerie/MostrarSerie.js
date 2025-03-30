import React from 'react';

const SerieConGuiones = ({ serie }) => {
    // Unir los números de la serie con guiones
    const serieConGuiones = serie.join(' - ');

    return (
        <div>
            <h2>Serie Generada</h2>
            <p>{serieConGuiones}</p>
        </div>
    );
};

export default SerieConGuiones;