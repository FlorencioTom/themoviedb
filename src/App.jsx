import React, { useState } from 'react';
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Login from './Login/LoginHome';
import Peliculas from './Peliculas/Peliculas';
import {loginContext} from  './Login/loginContext'

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
          </Routes>
        </Router>
      </loginContext.Provider>
    </>
  );
};

export default App;
