import React from "react";

// objet who managed the isLoggedIn state and put it to false. objet who contains components. AuthContent , i write it like that because it's an objet who contains a component
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}
  // ci-dessous ajout d'une fonction factice/dummy, pour aider l'IDE
});

// we do not need it here but we need it in other scryRenderedComponentsWithType, therefore i export default. so now we can import this specific object
export default AuthContext;
