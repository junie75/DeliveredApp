import React, { createContext, useState } from "react";

//context to hold user information once logged in

const UserContext = createContext();

export const UserProvider = ({ children }) => {
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
