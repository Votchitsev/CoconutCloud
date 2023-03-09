import React, { useEffect, useState } from 'react'

function CSRFToken() {
  const [csrfToken, setCsrfToken] = useState()

  useEffect(() => {
    function getCookie(name) {
      let cookieValue = null;

      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }

      return cookieValue;
    }

    const cookie = getCookie('csrftoken')

    setCsrfToken(cookie)
  }, [])

  return (<input type='hidden' name='csrfmiddlewaretoken' value={ csrfToken }></input>)
}

export default CSRFToken
