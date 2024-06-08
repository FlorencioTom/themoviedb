import React, { useState, useContext } from 'react';
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Swal from 'sweetalert2';

import { loginContext } from './Login/loginContext';
import Login from './Login/LoginHome';

import GeneroPelis from './Peliculas/GeneroPelis';
import Peliculas from './Peliculas/Peliculas';
import Pelicula from './Peliculas/Pelicula';

import GeneroSeries from './Series/GeneroSeries';
import Series from './Series/Series';
import Serie from './Series/Serie';

import Actor from './Actores/Actor';
import Actores from './Actores/Actores';

import Favoritos from './Favoritos/Favoritos';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Función para verificar si el usuario está autenticado
  const isUserAuthenticated = () => {
    //console.log(user, token);
    if (user && token) {
      return true;
    }
    return false;
  };

  // Componente de función para renderizar Favoritos si el usuario está autenticado, de lo contrario, redirigir a la página de inicio de sesión
  const RenderFavoritosRoute = () => {
    if (isUserAuthenticated()) {
      return <Favoritos />;
    } else {
      // Redirigir a la página de inicio de sesión si el usuario no está autenticado
      return null;
    }
  };

  return (
    <>
      <loginContext.Provider value={{ user, setUser, token, setToken }}>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/peliculas' element={<Peliculas />} />
            <Route path='/peliculas/genero/:id' element={<GeneroPelis />} />
            <Route path='/peliculas/pelicula/:id' element={<Pelicula />} />

            <Route path='/series' element={<Series />} />
            <Route path='/series/genero/:id' element={<GeneroSeries />} />
            <Route path='/series/serie/:id' element={<Serie />} />

            <Route path='/actores' element={<Actores />} />
            <Route path='/actor/:id' element={<Actor />} />

            <Route path='/favoritos' element={<RenderFavoritosRoute />} /> {/* Llama al componente RenderFavoritosRoute */}
          </Routes>
        </Router>
      </loginContext.Provider>
    </>
  );
};

export default App;

