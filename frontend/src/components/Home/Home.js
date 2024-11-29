import React, { useEffect } from 'react'
import { AuthUser } from '../AuthRouter'
import Navbar from '../Navbar/Navbar'
import Footer from './Footer'
import './style.css'

export default function Home() {
  const auth = AuthUser()
  useEffect(() => {
    auth.checkUser()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="background">
            <h1 className="content"><h1 style={{ color: 'white',fontSize: '3rem'}}>Celebrating Life ,</h1> One Beautiful Memory at a Time </h1>
        </div>
      <Footer />

    </div>
  )
}
