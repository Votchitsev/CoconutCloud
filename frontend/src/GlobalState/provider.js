import React, { useState, useEffect } from 'react';
import Context from './state';
import Cookies from 'js-cookie';
import { userMe } from '../api/requests'
import { getCsrfCookie } from '../api/requests'

export default function ContextProvider({ children }) {
  const [sessionId, setSessionId] = useState()
  const [username, setUsername] = useState()
  const [isAdmin, setIsAdmin] = useState()

  useEffect(() => {
    setSessionId(Cookies.get('sessionid'));
    getUserData();  
  }, [sessionId])

  useEffect(() => {
    const fetchData = async () => {
      await getCsrfCookie();
    }

    if (!Cookies.get('csrftoken')) {
      fetchData();
    }
  }, [])

  const getUserData = async () => {
    const response = await userMe();
    const data = await response.json();
    setUsername(data.username);
    setIsAdmin(data.isAdmin);
  }

  return (
    <Context.Provider value={{ sessionId, setSessionId, username, setUsername, isAdmin }}>
      { children }
    </Context.Provider>
  )
};
