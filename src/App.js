import React, {useEffect, useState} from 'react';
import './App.css';
import StyledTree from "./StyledTree";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const treeData = window.localStorage.getItem('data');
    if (treeData) {
      setData(JSON.parse(treeData))
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('data', JSON.stringify(data))
  }, [data])

  const [organizationName, setOrganizationName] = useState('Organization');

  return (
    <div className="mt-5">
      <StyledTree data={data} setData={setData} organizationName={organizationName} setOrganizationName={setOrganizationName}/>
    </div>
  );
}

export default App;