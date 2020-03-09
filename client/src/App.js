import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserForm from './components/UserForm';
import UserList from './components/UserList';

import {Button} from '@material-ui/core';
import './App.css';

function App() {
  const [isAdding, setIsAdding] = useState(false);
  const [users, setUsers] = useState([])

  const getUsers = () => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
      <div className="App">
        {isAdding ? (
          <UserForm setIsAdding={setIsAdding} getUsers={getUsers} />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsAdding(true)}
          >
            Add User
          </Button>
        )}
        <UserList users={users} getUsers={getUsers}/>
      </div>
  );
}

export default App;
