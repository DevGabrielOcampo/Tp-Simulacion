import React, { useState } from 'react';
import './serie.css';

const SerieConGuiones = ({ serie }) => {
    const [verMas, setVerMas] = useState(false);
    const serieConGuiones = serie.join(' - ');
    const serieReducida = serie.slice(0, 100).join(' - ');

    const copiarAlPortapapeles = () => {
        navigator.clipboard.writeText(serieConGuiones).then(() => {
            alert("Serie copiada al portapapeles");
        }).catch(err => {
            console.error("Error al copiar: ", err);
        });
    };

    return (
        <div className="container">
            <div className="header">
                <h2 className="title">Serie Generada</h2>
                <button onClick={copiarAlPortapapeles} className="button">
                    Copiar Serie
                </button>
            </div>
            <p className="text">
                {verMas ? serieConGuiones : serieReducida}
            </p>
            {serie.length > 100 && (
                <button onClick={() => setVerMas(!verMas)} className="button ver-mas">
                    {verMas ? "Ver menos" : "Ver más"}
                </button>
            )}
        </div>
    );
};

export default SerieConGuiones;
