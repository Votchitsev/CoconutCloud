import React, { useState, useEffect } from 'react';
import Context from './state';
import Cookies from 'js-cookie';
import { userMe } from '../api/requests'
import { getCsrfCookie } from '../api/requests'

export default function ContextProvider({ children }) {
  const [sessionId, setSessionId] = useState()
  const [username, setUsername] = useState()

  useEffect(() => {
    setSessionId(Cookies.get('sessionid'));
    getUsername();  
  }, [sessionId])

  useEffect(() => {
    const fetchData = async () => {
      await getCsrfCookie();
    }

    if (!Cookies.get('csrftoken')) {
      fetchData();
    }
  }, [])

  const getUsername = async () => {
    const response = await userMe();
    const data = await response.json();
    setUsername(data.username);
  }

  return (
    <Context.Provider value={{ sessionId, setSessionId, username, setUsername }}>
      { children }
    </Context.Provider>
  )
};
