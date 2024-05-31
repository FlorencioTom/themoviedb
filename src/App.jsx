import React, { useState} from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

import {loginContext} from  './Login/loginContext';
import Login from './Login/LoginHome';

import GeneroPelis from './Peliculas/GeneroPelis';
import Peliculas from './Peliculas/Peliculas';
import Pelicula from './Peliculas/Pelicula';

import GeneroSeries from './Series/GeneroSeries';
import Series from './Series/Series';
import Serie from './Series/Serie';

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <>
      <loginContext.Provider value={{user, setUser, token, setToken}}>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/peliculas' element={<Peliculas/>} />
            <Route path='/peliculas/genero/:id' element={<GeneroPelis/>} />
            <Route path='/peliculas/pelicula/:id' element={<Pelicula/>} />

            <Route path='/series' element={<Series/>} />
            <Route path='/series/genero/:id' element={<GeneroSeries/>} />
            <Route path='/series/serie/:id' element={<Serie/>} />
            
          </Routes>
        </Router>
      </loginContext.Provider>
    </>
  );
};

export default App;
