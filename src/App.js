import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    // suite au submit login
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1"); // storé lorsque le user click sur le btn Login
    setIsLoggedIn(true); // c'est cette donnée que je veux store dans le storage du browser (cookies ou local storage, de notre coté nous allons utiliser local storage pour sa simplicité d'utilisation) local storage que j'utilise juste au dessus.
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    // <React.Fragment>
    // ci-dessous pas besoin de props en passant par le Provider
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
        // chaque composant qui écoute AuthContext pourra utiliser le gestionnaire de déconnexion, logoutHandler, et ce a travers la valeur du context onLogout
      }}
    >
      {/* <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} /> */}
      {/* <MainHeader onLogout={logoutHandler} /> */}
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
    // </React.Fragment>
  );
}

export default App;
