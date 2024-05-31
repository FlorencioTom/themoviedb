import React, { useState, suspense } from 'react';

import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from './Login/LoginHome';
import Peliculas from './Peliculas/Peliculas';
import Series from './Series/Series';
import {loginContext} from  './Login/loginContext'
import GeneroPelis from './Peliculas/GeneroPelis';
import GeneroSeries from './Series/GeneroSeries';
import Pelicula from './Peliculas/Pelicula';

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
            <Route path='/series' element={<Series/>} />
            <Route path='/peliculas/genero/:id' element={<GeneroPelis/>} />
            <Route path='/series/genero/:id' element={<GeneroSeries/>} />
            <Route path='/peliculas/pelicula/:id' element={<Pelicula/>} />
            
          </Routes>
        </Router>
      </loginContext.Provider>
    </>
  );
};

export default App;
