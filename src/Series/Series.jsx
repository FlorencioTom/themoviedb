import React, {useEffect, useState} from 'react';
import './series.css';
import Nav from '../Nav/Nav';
import axios from 'axios';

const Series = () => {
    const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;

    const [generos, setGeneros] = useState(null);
    const [series, getSeries] = useState(null);

    useEffect(() => {
        getGenero();
        getSeriesByGenre();
    },[]);

    const getGenero = async() => {
        try {
            const response = await axios.get('https://api.themoviedb.org/3/genre/tv/list', {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
              }
            });

            console.log('Generos: ',response.data.genres);
            setGeneros(response.data.genres);
            
          } catch (error) {
            console.error('Error al obtener datos:', error);
          } 
    }

    const getSeriesByGenre = async() => {
        try { 
            const response = await axios.get('https://api.themoviedb.org/3/discover/tv?with_genres=10759', {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
              }
            });

            console.log('prueba de 1 genero' ,response.data);
            
          } catch (error) {
            console.error('Error al obtener datos:', error);
          } 
    }

    return (
        <>
            <Nav/>
            <div>

            </div>
        </>
    )
}

export default Series;
