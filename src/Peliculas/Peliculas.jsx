import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import SimpleBar from 'simplebar-react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from 'primereact/skeleton';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './peliculas.css';

const Peliculas = () => {
  const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
  const [generos, setGeneros] = useState(null);
  const [ids, setIds] = useState(null);
  const [pelis, setPelis] = useState(null);
  const [pelisTodas, setPelisTodas] = useState(null);

  useEffect(() => {
    getPeliculas();
  },[]);

  const pelisporgenero = async(generoId) => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          with_genres: generoId,
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
        }
      });
      //console.log(response.data.results);
      setPelis(response.data.results);
      //console.log(response.data.results);
      return response.data.results;
      //console.log(generoId);
      
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }   
  }

  const getPeliculas = async() => {
    try {
      //https://api.themoviedb.org/3/discover/movie?api_key=TU_API_KEY&language=es-ES&with_genres=28
      const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en', {
        params: {
          include_adult: 'false',
          include_video: 'false',
          language: 'en-US',
          page: '1',
          sort_by: 'popularity.desc'
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
        }
      });
      let arrayG = [];
      response.data.genres.filter((genero) => {
        arrayG.push(genero);
      });
      setGeneros(arrayG);
      //setIds(arrayI);

      let pelisClasificadas = [];
      arrayG.forEach(async x => {
        const movies = await pelisporgenero(x.id);
        pelisClasificadas.push([x.name, movies, true]);  
      });
      //console.log(pelisClasificadas);
      setPelisTodas(pelisClasificadas);

      
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  }

  const filtroPelisTexto = (texto) => {
    const peliculasFiltradas = pelisTodas.map((genero) => {
      if (genero[0].toLowerCase().includes(texto.toLowerCase())) {
        return [genero[0], genero[1], true];
      } else {
        return [genero[0], genero[1], false];
      }
    });
    setPelisTodas(peliculasFiltradas);
  }

  return (
    <>
      <Nav peli={true} filtroPelisTexto={filtroPelisTexto}/>
      <div className='container-generos'>
        <SimpleBar forceVisible="y" autoHide={false} className='simplebar-peliculas'>
          {!pelisTodas && (
            <>
              <div>
                <Skeleton className='skeleton-title' width="80px" height="25px"></Skeleton>
                <div className='skeleton-container' style={{width:'calc(100%)', paddingLeft:'50px',paddingRight:'50px',display:'flex', gap:'60px', justifyContent:'space-between', flexGrow:1}}>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                </div>
              </div>
              <div>
                <Skeleton className='skeleton-title' width="80px" height="25px"></Skeleton>
                <div className='skeleton-container' style={{width:'calc(100%)', paddingLeft:'50px',paddingRight:'50px',display:'flex', gap:'60px', justifyContent:'space-between', flexGrow:1}}>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                </div>
              </div>
            </>     
          )}
          {pelisTodas && pelisTodas.map((genero, index)=>{
            console.log('visible', genero[2]);
          if(genero[2]){
            return(
              <section  key={index}>
                <h1 className='genero animate__animated animate__fadeIn animate__faster'>{genero[0]}</h1>
                <div className='genero-content'>
                <Swiper modules={[Virtual, Navigation]}
                  slidesPerView={1}
                  centeredSlides={false}
                  spaceBetween={60}
                  pagination={{
                    type: 'fraction',
                  }}
                  navigation={false}
                  breakpoints={{
                    // when window width is >= 640px
                    600: {
                        slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    768: {
                        slidesPerView: 3,
                    },
                    // when window width is >= 1024px
                    1200: {
                        slidesPerView: 4,
                    },
                }}
                >
                  {genero[1].map((x, index) => {
                    //console.log(x);
                    
                      return(
                        <SwiperSlide key={index} virtualIndex={index+1} className='animate__animated animate__fadeIn'>
                          <img className='portada' src={'https://image.tmdb.org/t/p/w500'+x.backdrop_path} alt={x.title}/>
                        </SwiperSlide>
                      )
                    
                  })} 
                </Swiper>
                </div>
              </section>
            )

          } 
        })}
        {/*generos && generos.map((genero, index)=>{
          return(
            <div key={index}>
              <h1 className='genero'>{genero.name}</h1>
              <div className='genero-content'>
              <Swiper modules={[Virtual, Navigation, Pagination]}
                slidesPerView={4}
                centeredSlides={false}
                spaceBetween={30}
                pagination={{
                  type: 'fraction',
                }}
                navigation={true}
                virtual
              >
                {pelisTodas && pelisTodas.map((x, index) => {
                  //console.log(x[0] == genero.name);
                  //console.log(x[0], genero.name);
                  if(x[0] == genero.name){
                    return(
                      <SwiperSlide key={index} virtualIndex={index+1}>
                        <img className='card-img' src={'https://image.tmdb.org/t/p/w500'+x[1][1].backdrop_path} alt={x[1][1].title}/>
                      </SwiperSlide>
                    )
                  }
                })} 
              </Swiper>
              </div>
            </div>
          )
        })*/}
        </SimpleBar>
      </div>
    </>
  )
}

export default Peliculas;
