import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import { Paginator } from 'primereact/paginator';
import Scrolltop from '../Scrolltop/Scrolltop';
import NavBuscar from '../Nav/NavBuscar';
import './Buscar.css'

const BuscarPelis = () => {
  const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
  const [resultados, setResultados] = useState([]);
  let { text } = useParams();
  const [pagina, setPagina] = useState(1);
  const [topScroll, setTopScroll] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(20);
  const [total, setTotal] = useState(0);
  const scrollableNodeRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (text) {
      serachMovie();
    }
  }, [text, pagina]);

  const serachMovie = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
        params: {
          query: text,
          include_adult: 'false',
          language: 'en-US',
          page: pagina
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.results);
      setResultados(response.data.results);
      setTotal(response.data.total_results);
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const handleScroll = () => {
    const scrollableNode = scrollableNodeRef.current;
    setTopScroll(scrollableNode.scrollTop);
  };

  const goUp = (top) => {
    if (top > 300) {
      const scrollableNode = scrollableNodeRef.current;
      scrollableNode.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const goToPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPagina(event.page + 1);
  };

  const movieDetails = (id) => {
    navigate(`/peliculas/pelicula/${id}`);
  };

  return (
    <>
      <NavBuscar buscar={'pelis'}/>
      <div className='container-generos'>
        <SimpleBar onScroll={handleScroll} scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-peliculas'>
          <div className='fade-top'></div>
          <br />
          <section className='peliculas-de-buscar animate__animated animate__fadeIn'>
            {resultados.map((resultado, index) => {
              const posterUrl = resultado.poster_path ? `https://image.tmdb.org/t/p/w200${resultado.poster_path}` : 
                                (resultado.backdrop_path ? `https://image.tmdb.org/t/p/w200${resultado.backdrop_path}` : 
                                'https://via.placeholder.com/500x750?text=No+Image');

              return (
                <div key={index} className='animate__animated animate__fadeIn'>
                  <div className='animate__animated animate__fadeIn'>
                    <img 
                      onClick={() => movieDetails(resultado.id)}
                      className='animate__bounceIn animate__faster portada'
                      src={posterUrl}
                      alt={resultado.title} />
                  </div>
                </div>
              );
            })}
          </section>
          <Scrolltop top={topScroll} funcion={goUp} />
          <Paginator
            template={{ layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink' }}
            first={first}
            rows={rows}
            pageLinkSize={5}
            totalRecords={total}
            onPageChange={goToPage}
          />
        </SimpleBar>
      </div>
    </>
  );
};

export default BuscarPelis;
