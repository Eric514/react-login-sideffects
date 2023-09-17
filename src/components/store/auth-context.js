import React, { useEffect, useState } from "react";

// objet who managed the isLoggedIn state and put it to false. objet who contains components. AuthContent , i write it like that because it's an objet who contains a component
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
  // ci-dessous ajout d'une fonction factice/dummy, pour aider l'IDE
});

// ci-dessous création d'un composant qui manage le logIn State and sets up all the contexts
export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // récupération de la valeur de isLoggedIn dans le localStorage
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    // ci-dessous pas besoin de props en passant par le Provider
    // chaque composant qui écoute AuthContext pourra utiliser le gestionnaire de déconnexion, logoutHandler, et ce a travers la valeur du context onLogout
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

// we do not need it here but we need it in other scryRenderedComponentsWithType, therefore i export default. so now we can import this specific object
export default AuthContext;
