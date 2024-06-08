import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';
import { loginContext } from '../Login/loginContext';
import './favoritos.css';
import SimpleBar from 'simplebar-react';

const Favoritos = () => {
    const token = import.meta.env.VITE_TOKEN_THEMOVIEDB_API;
    const [topScroll, setTopScroll] = useState(0);
    const scrollableNodeRef = useRef(null);
    const [loginVisible, setLoginVisible] = useState(false);
    const { user } = useContext(loginContext);
    const navigate = useNavigate();
    const [contenido, setContenido] = useState([]);

    useEffect(() => {
        if (user && user.favorites) {
            getFavoritos();
        }
    }, [user]);

    const getFavoritos = async () => {
        try {
            const requests = user.favorites.map(x => {
                if (x.type === 'movie') {
                    return axios.get(`https://api.themoviedb.org/3/movie/${x.contentId}`, {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }).then(response => ({...response.data, type: 'movie'}))
                      .catch(error => {
                          console.error('Error al obtener película:', error);
                          return null;
                      });
                }
                
                if (x.type === 'serie') {
                    return axios.get(`https://api.themoviedb.org/3/tv/${x.contentId}`, {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }).then(response => ({...response.data, type: 'serie'}))
                      .catch(error => {
                          console.error('Error al obtener serie:', error);
                          return null;
                      });
                }

                if (x.type === 'actor') {
                    return axios.get(`https://api.themoviedb.org/3/person/${x.contentId}`, {
                        headers: {
                            accept: 'application/json',
                            Authorization: `Bearer ${token}`
                        }
                    }).then(response => ({...response.data, type: 'actor'}))
                      .catch(error => {
                          console.error('Error al obtener serie:', error);
                          return null;
                      });
                }
                return Promise.resolve(null);
            });

            const results = await Promise.all(requests);
            setContenido(results.filter(result => result !== null));
        } catch (error) {
            console.error('Error al obtener favoritos:', error);
        }
    };

    const details = (contenido) => {
        console.log(contenido);
        if(contenido.type == 'movie'){
            navigate(`/peliculas/pelicula/${contenido.id}`);
        }

        if(contenido.type == 'serie'){
            navigate(`/series/serie/${contenido.id}`);
        }

        if(contenido.type == 'actor'){
            navigate(`/actor/${contenido.id}`);
        }       
    };

    return (
        <>
            <Nav enFav={true} />
            <br />
            <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} forceVisible="y" autoHide={false} className='simplebar-fav'>
                <div className='fade-top'></div>
                <section className='contenido-fav animate__animated animate__fadeIn'>
                    {contenido.length > 0 ? (
                        contenido.map((x, index) => (
                            <div key={index} className='animate__animated animate__fadeIn'>
                                <div className='animate__animated animate__fadeIn' style={{display:'flex', justifyContent:'center'}}>
                                    <img 
                                        onClick={() => details(x)} 
                                        className='animate__bounceIn animate__faster portada-fav' 
                                        src={`https://image.tmdb.org/t/p/${x.type === 'actor' ? 'w200'+x.profile_path : 'w500'+x.poster_path}`}
                                        alt={x.title} 
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <p></p>
                    )}
                 </section>
            </SimpleBar> 
        </>
    );
};

export default Favoritos;
