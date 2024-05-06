// Purpose: Context to hold user information once logged in and update the user information when it changes.
// user information is passed to all the components that need it through the provider
import React, { createContext, useState } from "react";

// create context to hold user information once logged in
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //state to hold the user information
  const [user, setUser] = useState(null);

  //components call updateUser with the user object when user is changed
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
