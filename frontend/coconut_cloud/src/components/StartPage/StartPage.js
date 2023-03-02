import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './StartPage.css'
import img from './coconut-tree.svg'

function StartPage () {
  const navigate = useNavigate()
  const token = useSelector(state => state.auth.authToken)

  const onClickHandler = () => {
    navigate('/sign-up/')
  }

  useEffect(() => {
    if (token) {
      navigate('/my-storage/')
    }
  }, [])

  return (
    !token
      ? <section className='start-page'>
          <div className='start-page--welcome'>
            <h1 className='start-page--welcome--title'>Upload, download and manage your files.</h1>
            <h2 className='start-page--welcome--subtitle'>Try new file storage</h2>
            <div className='start-page--welcome--content'>
              CoconutCloud is a new simple file storage.
              You can keep and manage your files here. Try it right now!
              </div>
              <button className='sing-up-button' onClick={ onClickHandler }>Try</button>
          </div>
          <img className='start-page--image' src={img} />
        </section>
      : null
  )
}

export default StartPage
