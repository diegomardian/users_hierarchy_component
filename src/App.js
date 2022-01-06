import React, {useEffect, useState} from 'react';
import './App.css';
import StyledTree from "./StyledTree";
import Login from "./components/login/Login";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";

function App() {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Joe"
    },
    {
      id: 2,
      name: "Jane"
    },
    {
      id: 3,
      name: "John"
    },
    {
      id: 4,
      name: "Jack"
    },
    {
      id: 5,
      name: "Jill"
    },
    {
      id: 6,
      name: "Jenny"
    },
    {
      id: 7,
      name: "Jules"
    },
    {
      id: 8,
      name: "Julia"
    },
    {
      id: 9,
      name: "Diego"
    },
    {
      id: 10,
      name: "Vishal"
    }
  ]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [organizationName, setOrganizationName] = useState('Organization');

  const logout = () => {
    window.localStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  }

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("user");
    const treeData = window.localStorage.getItem('data');
    if (loggedInUser) {
      setLoggedInUser(JSON.parse(loggedInUser));
    }
    if (treeData) {
      setData(JSON.parse(treeData))
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  if (!loggedInUser) {
    return <Login setLoggedInUser={setLoggedInUser}/>
  }

  return (
    <div className="App">
      <Header logout={logout} loggedInUser={loggedInUser}/>
      <div className="App" style={{justifyContent: 'center', display: 'flex'}}>
        <div style={{width: '80%'}}>
          <Routes>
            <Route path="/" element={<StyledTree data={data} users={users} setData={setData} organizationName={organizationName} setOrganizationName={setOrganizationName} loggedInUser={loggedInUser}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;