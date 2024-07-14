import { useState } from 'react'
import './App.css'
import NavBar from './components/Header/NavBar'
import { Footer } from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <NavBar/>
    <main>
      <Outlet/>
    </main>
      <Footer/>
        
    </>
  )
}

export default App
