import React, { useState, useEffect } from 'react';
import ScrollUpButton from "react-scroll-up"; 
import { Button } from 'primereact/button';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css'; // Importa el tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Importa los estilos base de PrimeReact
import 'primeicons/primeicons.css'; // Importa los iconos de PrimeIcons
import './App.css';

const App = () => {
  const [data, setData] = useState(null);
  const [imagenes, setImagenes] = useState(null);

  useEffect(() => {
    fetchData();
    //images();
  }, []); // El segundo argumento del useEffect es un array vacío para que se ejecute solo una vez al montar el componente

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: '1',
          sort_by: 'popularity.desc'
        },
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODdmMWI1NzU2YjI2NWJlYjQ5OGRmNmE4NGE1ZTAwNCIsInN1YiI6IjY2MWNmYzdlOTMxZWExMDE4NjY1OGQ4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3XjXl-eRtZISl0qCp9c5R2mbH_jGfcMuhIEtxwfAlVk' // Reemplaza 'tu_token_de_autenticacion' con tu token real
        }
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  /*const images = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/movie/693134/images', {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ODdmMWI1NzU2YjI2NWJlYjQ5OGRmNmE4NGE1ZTAwNCIsInN1YiI6IjY2MWNmYzdlOTMxZWExMDE4NjY1OGQ4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3XjXl-eRtZISl0qCp9c5R2mbH_jGfcMuhIEtxwfAlVk' // Reemplaza 'tu_token_de_autenticacion' con tu token real
        }
      });
      setImagenes(response.data.logos);
      console.log(response.data);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };*/
  return (
    <>
    <div className='container-cards'>
      {/* Aquí puedes renderizar los datos obtenidos */}
      {data && data.results.map((movie, i) => (
          <div key={i} className="card">
            <img className='card-img' src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt={movie.title}/>
          </div>
       ))}
      
      {/*imagenes && (
        <ul>
          {imagenes.map((movie, i) => (
            <img key={i} src={'https://image.tmdb.org/t/p/w500'+movie.file_path}/>
          ))}
        </ul>
      )*/}
    </div>
    <ScrollUpButton showUnder={100} >
    <Button icon="pi pi-arrow-up
" rounded aria-label="Filter" />
    </ScrollUpButton>
    </>
  );
};

export default App;
