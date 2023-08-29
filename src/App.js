import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


useEffect(() => {
  const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
  if (storedUserLoggedInInformation === '1') {
    setIsLoggedIn(true);
  }
}, []);

  const loginHandler = (email, password) => { // suite au submit login
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1'); // storé lorsque le user click sur le btn Login
    setIsLoggedIn(true); // c'est cette donnée que je veux store dans le storage du browser (cookies ou local storage, de notre coté nous allons utiliser local storage pour sa simplicité d'utilisation) local storage que j'utilise juste au dessus.
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;
