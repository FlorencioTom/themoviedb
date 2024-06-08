import React, {useEffect, useState, useRef, useContext} from 'react';
import {useParams,  useNavigate, NavLink} from 'react-router-dom';
import {Rating} from "primereact/rating";
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faHeartCirclePlus, faHeart} from '@fortawesome/free-solid-svg-icons';
import SimpleBar from 'simplebar-react';
import Scrolltop from '../Scrolltop/Scrolltop';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { loginContext } from '../Login/loginContext';
import '../Peliculas/peliculas.css';
import Swal from 'sweetalert2';
import { Toast } from 'primereact/toast';
const Serie = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);
  const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
  const [serie, setSerie] = useState(null);
  const [topScroll, setTopScroll] = useState(0);
  const [cast, setCast] = useState(null);
  const scrollableNodeRef = useRef(null);
  const navigate = useNavigate(); 
  const [misFav, setMisfav] = useState(null);
  let { id } = useParams();
  const {user, setUser} = useContext(loginContext);
  const toastBottomCenter = useRef(null);

  useEffect(() => {
    serieDetails();
    getCast();
    if(user){
      getUser();
    }
  }, [user]);
  const showToast = (severity, summary, detail) => {
    if (toastBottomCenter.current) {
      toastBottomCenter.current.show({ severity, summary, detail, life: 3000 });
    }
  }

  const serieDetails = async() => {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    setSerie(response.data);
    console.log(response.data);
  }

  const getCast = async() => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${token}` 
        }
      });
      let arrayG = [];
      response.data.cast.filter((x) => {
        arrayG.push(x);
      });
      console.log(arrayG);
      setCast(arrayG); 
    } catch (error) {
      console.error('Error al obtener datos:', error);
    } 
  }

  const back = () => {
    navigate('/series');
  }

  const goToActor = (ide) => {
    navigate(`/actor/${ide}`);
  }

  const handleScroll = () => {
    const scrollableNode = scrollableNodeRef.current;
    const scrollToop = scrollableNode.scrollTop;

    //console.log('Clicked. Scrolled to:', scrollToop);
    setTopScroll(scrollToop);
  }

  const goUp = (top) => {
    if(top>300){
      const scrollableNode = scrollableNodeRef.current;
      scrollableNode.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }   
  }

  const getUser = async() => {
    if(user){
      try {
        const response = await axios.get(`http://localhost:3002/usuarios/${user._id}`);
        console.log(response.data.data.favorites);
        setMisfav(response.data.data.favorites);
      } catch (error) {
        console.error('Error:', error);
      }
    }else{
      console.log('No estas logeado')
    }
  }

  const addFavorites = async(ide) => {
    //console.log(user._id);
    if(user){
      let data = {type:'serie', idPeli:ide, action:'add'}
      try {
        const response = await axios.post(`http://localhost:3002/usuarios/${user._id}/favoritos`, data);
        console.log(response.data.data);
        setUser(response.data.data);
        showToast('success', 'Serie añadida a favoritos', '');
      } catch (error) {
        console.error('Error:', error);
      }
    }else{
      Swal.fire({
        icon: "error",
        title: "Tienes que iniciar sesion para añadir series a tus favoritos"
      });
    }
  }
  const deleteFavorites = async(ide) => {
    //console.log(user._id);
    let data = {type:'serie', idPeli:ide, action:'delete'}
    try {
      const response = await axios.post(`http://localhost:3002/usuarios/${user._id}/favoritos`, data);
      console.log(response.data.data);
      setUser(response.data.data);
      showToast('info', 'serie eliminada de favoritos', '');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <Toast ref={toastBottomCenter} position="bottom-center" />
      <div style={{position:'absolute', marginTop:'25px', marginLeft:'25px', zIndex:'99'}}>
        <li onClick={()=>{back()}} className={`menu-list-item atras`} >
          <FontAwesomeIcon icon={faArrowLeft} />
        </li>
      </div>
      {!isMobile &&
      <section className='section-peli'>
        {serie && cast && (
          <>
          <div className='container-peli'>
            <img className='img-portada-peli' src={'https://image.tmdb.org/t/p/w500'+serie.poster_path} alt={serie.name}/>
              <div className='peli-info'>
              <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-peli'>
                <h1 className='titulo' style={{marginBottom:'5px'}}>{serie.name}</h1>
                {misFav && misFav.some(x => x.contentId == serie.id) ? (
                  <p style={{ margin: '5px', cursor: 'pointer' }}>
                    <FontAwesomeIcon
                      onClick={() => { deleteFavorites(serie.id) }}
                      icon={faHeart}
                      style={{
                        fontSize: '30px',
                        color: 'red',
                        cursor: 'pointer'
                      }}
                    />
                  </p>

                ) : (
                  <p style={{ margin: '5px', cursor: 'pointer' }}>
                  <FontAwesomeIcon
                    onClick={() => { addFavorites(serie.id) }}
                    icon={faHeartCirclePlus}
                    style={{
                      fontSize: '30px',
                      color: 'grey',
                      cursor: 'pointer'
                    }}
                  />
                </p>
                )}
                <span>{serie.first_air_date}</span>
                <br></br><br></br>
                <span>Temporadas: {serie.seasons.length}</span>
                <Rating style={{marginTop:'20px'}} value={serie.vote_average} readOnly cancel={false} stars={10} />
                <p>{serie.overview}</p>
                <ul className='menu-list-genres'>
                  {serie.genres.map((gen, index) => {
                      return(
                        <NavLink key={index} to={`/series/genero/${gen.id}`}>
                          <li className={'menu-list-item-genre'} key={index}>{gen.name}</li>
                        </NavLink>
                      ) 
                  })}
                </ul>
                <div className='grid-cast'>
                  {cast && cast.map((x, index) => {
                    if(x.profile_path != null && x.known_for_department=='Acting'){
                      return(
                        <div onClick={() => goToActor(x.id)} key={index} style={{display:'flex', justifyContent:'start'}}>
                          <Tooltip TransitionComponent={Zoom} title={x.name}>
                          <img className='img-cast' src={'https://image.tmdb.org/t/p/w500'+x.profile_path}/>
                          </Tooltip>
                        </div>
                      ) 
                    }
                  })} 
                </div>
                </SimpleBar>
              </div>
          </div>
          </>
        )}
      </section>
       }
      {isMobile && 
       <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-peli'>
       <section className='section-peli'>
         {serie && cast && (
           <>
           <div className='container-peli'>
             <img className='img-portada-peli' src={'https://image.tmdb.org/t/p/w500'+serie.poster_path} alt={serie.name}/>
               <div className='peli-info'>
                 <h1 className='titulo'>{serie.name}</h1>
                 <span>{serie.first_air_date}</span>
                 <br></br><br></br>
                  <span>Temporadas: {serie.seasons.length}</span>
                 <Rating style={{marginTop:'20px'}} value={serie.vote_average} readOnly cancel={false} stars={10} />
                 <p>{serie.overview}</p>
                 <ul className='menu-list-genres'>
                   {serie.genres.map((gen, index) => {
                       return(
                         <li className={'menu-list-item-genre'} key={index}>{gen.name}</li>
                       ) 
                   })}
                 </ul>
                 <div className='grid-cast'>
                   {cast && cast.map((x, index) => {
                     if(x.profile_path != null && x.known_for_department=='Acting'){
                       return(
                         <div onClick={() => goToActor(x.id)} key={index} style={{display:'flex', justifyContent:'start'}}>
                           <img className='img-cast' src={'https://image.tmdb.org/t/p/w500'+x.profile_path}/>
                         </div>
                       ) 
                     }
                   })} 
                 </div>
                 
               </div>
           </div>
           </>
         )}
       </section>
     </SimpleBar>     
      }
      
      <Scrolltop top={topScroll} funcion={goUp}/>
    </>
  )
}

export default Serie;
