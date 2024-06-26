import {useParams, NavLink, useNavigate} from 'react-router-dom';
import React, {useState, useEffect, useRef, useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faX} from '@fortawesome/free-solid-svg-icons';
import LoginCard from '../Login/LoginCard';
import RegisterCard from '../Login/RegisterCard';
import { loginContext } from '../Login/loginContext';
import {animate, motion} from 'framer-motion';
import SimpleBar from 'simplebar-react';
import Scrolltop from '../Scrolltop/Scrolltop';
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import Nav from '../Nav/Nav';
import axios from 'axios';
import Buttonn from '@mui/material/Button';
import {Paginator} from 'primereact/paginator';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const Actores = () => {
    const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
    const [loginVisible, setLoginVisible] = useState(false);
    const [actores, setActores] = useState(null);
    const [pagina, setPagina] = useState(1);
    const scrollableNodeRef = useRef(null);
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(20);
    const [total, setTotal] = useState(null);
    const [flip, setFlip] = useState(false);
    const [animatee, setAnimate] = useState(false);
    const containerLogin = useRef(null);
    const {user, tokenjwt} = useContext(loginContext);
    const navigate = useNavigate();

    useEffect(() => {
        getActores();
    }, [pagina]);

    const handleFlip = () => {
        setAnimate(!animatee);
        setFlip(!flip);
      }

    const getActores = async() => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/person/popular`, {
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${token}` 
              },
              params: {
                page: pagina
              },
            });
            let arrayG = [];

            response.data.results.filter((x) => {
              arrayG.push(x);
            });

            //console.log(arrayG);
            setActores(arrayG);
            setTotal(response.data.total_results); 
        } catch (error) {
            console.error('Error al obtener datos:', error);
        }         
    }

    const handleProfile = (data) => {
        setLoginVisible(data);
    }

    const goToActor = (ide) => {
        navigate(`/actor/${ide}`);
    }

    const goToPage = (event) => {
        setFirst(event.first);
        setRows(event.rows);
        setPagina(event.page+1);
    }

    const filtroPelisTexto = (texto) => {

    }

    return (
        <>
            <Nav info={handleProfile} actor={true} filtroPelisTexto={filtroPelisTexto} estado={!loginVisible}/>
            <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-actores' style={{marginTop:'10px'}}>
                <div className="fade-top"></div>
                <div className='grid-filmografi' style={{paddingRight:'50px', paddingLeft:'50px'}}>
                    {actores && actores.map((x, index) => {
                        return(
                            <Tooltip key={index+100} TransitionComponent={Zoom} title={x.name}>
                                <div onClick={() => {goToActor(x.id)}} style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    {x.profile_path == null && (
                                        <span onClick={() => {goToActor(x.id)}}> imagen no disponible</span>
                                    )}
                                    {x.profile_path != null && (
                                        <img onClick={() => {goToActor(x.id)}} className='img-filmografi' src={'https://image.tmdb.org/t/p/w500'+x.profile_path}/>
                                    )}                                
                                </div>
                            </Tooltip>
                        ) 
                    })} 
                </div>
                <Paginator template={{ layout: 'FirstPageLink PrevPageLink PageLinks NextPageLink' }}
                    first={first}
                    rows={rows}
                    pageLinkSize={5}
                    totalRecords={total}
                    onPageChange={goToPage}
                />
            </SimpleBar>
            {!user && (
        <div ref={containerLogin} className={`container-login animate__animated animate__faster ${loginVisible ? 'animate__fadeIn' : 'invisible'}`}>
          <div className='cerrar' onClick={() => setLoginVisible(!loginVisible)}>
            <FontAwesomeIcon className='cerrar-icono' icon={faX} />
          </div>
          
          <div className="flip-card">
            <motion.div 
              className='flip-card-inner'
              initial={false}
              animate={{rotateY: flip?180:360}}
              transition={{duration:0.3, animationDirection:'normal'}}
              onAnimationComplete={() => {setAnimate(false)}}>
                <div className="flip-card-front">
                  <LoginCard/>
                  <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'30px'}}>
                    <Buttonn variant="contained" color="secondary" onClick={() => {handleFlip()}}>¿Aun no tienes cuenta?</Buttonn>
                  </div>
                  {user && (
                    <div className='user-info'>
                      <p>Bienvenido, {user.user}</p>
                    </div>
                  )}
                </div>

                <div className="flip-card-back">
                  <RegisterCard/> 
                  <div style={{width:'100%', display:'flex', justifyContent:'center', marginTop:'30px'}}>
                    <Buttonn variant="contained" color="secondary" onClick={() => {handleFlip()}}>Volver al Login</Buttonn>
                  </div> 
                </div>
            </motion.div>
          </div>
        </div>
      )}
        </>
    )
}

export default Actores;
