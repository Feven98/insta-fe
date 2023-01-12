import React from 'react';
import './App.css';
import Header from "../Header/Header";
import Main from '../Main';
import { UserContext } from '../../data'
import { useState } from 'react';

console.log(UserContext)

function App() {

  const { Provider: UserInfo } = UserContext
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <div className="App">
      <UserInfo value={{
        isAuthenticated,
        setAuth: setIsAuthenticated,
        currentUser,
        setUser: setCurrentUser
      }}>
<Header />
      <Main />
      </UserInfo>
    </div>
  );
}

export default App;
