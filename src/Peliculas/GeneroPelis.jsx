import React, {useEffect, useState, useRef} from 'react';
import NavGenero from '../Nav/NavGenero.jsx';
import SimpleBar from 'simplebar-react';
import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from 'primereact/skeleton';
import Scrolltop from '../Scrolltop/Scrolltop';
import { useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Paginator } from 'primereact/paginator';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const GeneroPelis = () => {
  const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
  const [pelis, setPelis] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [topScroll, setTopScroll] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(20);
  const [total, setTotal] = useState(null);
  const scrollableNodeRef = useRef(null);
  const navigate = useNavigate();  
  let { id } = useParams();

  useEffect(() => {
    moviesByGenre(id);
  },[id, pagina]);

  const movieDetails = (id) => {
    navigate(`/peliculas/pelicula/${id}`);
  }

  const moviesByGenre = async(id) => {
    const scrollableNode = scrollableNodeRef.current;
    scrollableNode.addEventListener('scroll', handleScroll);
    try {
      const response = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
          with_genres: id,
          page: pagina
        },
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}` // Reemplaza 'tu_token_de_autenticacion' con tu token real
        }
      });
      //console.log(response.data);
      setTotal(response.data.total_results);
      setPelis(response.data.results);
      
      return response.data.results;
      
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }   
  }

  const handleScroll = () => {
    const scrollableNode = scrollableNodeRef.current;
    const scrollToop = scrollableNode.scrollTop;

    //console.log('Clicked. Scrolled to:', scrollToop);
    setTopScroll(scrollToop);
  };

  const goUp = (top) => {
    if(top>300){
      const scrollableNode = scrollableNodeRef.current;
      scrollableNode.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }   
  }

  const goToPage = (event) => {
    setFirst(event.first);
    setRows(event.rows);
    setPagina(event.page+1);
  }                            

  return (
    <>
      <NavGenero id={id} generos={'pelis'}/>
      <div className='container-generos'>
        <SimpleBar onScroll={() => handleScroll()} scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-peliculas'>
        <div className='fade-top'></div>
        <br/>
          {!pelis && (
            <div>
              <div style={{marginBottom:'40px'}}>
                <div className='skeleton-container' style={{width:'calc(100%)', paddingLeft:'50px',paddingRight:'50px',display:'flex', gap:'60px', justifyContent:'space-between', flexGrow:1}}>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                </div>
              </div>
              <div>
                <div className='skeleton-container' style={{width:'calc(100%)', paddingLeft:'50px',paddingRight:'50px',display:'flex', gap:'60px', justifyContent:'space-between', flexGrow:1}}>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                  <Skeleton className='skeleton'></Skeleton>
                </div>
              </div>
            </div>     
          )}
          <section className='peliculas-de-genero animate__animated animate__fadeIn'>
            {pelis && pelis.map((peli, index)=>{
              return(
                  <div key={index} className='animate__animated animate__fadeIn'>
                    <div className='animate__animated animate__fadeIn'>
                      <img onClick={() => {movieDetails(peli.id)}} className='animate__bounceIn animate__faster portada' src={'https://image.tmdb.org/t/p/w500'+peli.backdrop_path} alt={peli.title}/>
                    </div>
                  </div> 
              )
            })}
          </section>
        
        <Scrolltop top={topScroll} funcion={goUp}/>
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
  )
}

export default GeneroPelis;
