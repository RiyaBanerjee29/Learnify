import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/Header/NavBar'
import { Footer } from './components/Footer/Footer'
import Card from './components/Card/Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <div className='flex flex-row justify-evenly'>
      <Card/>
      <Card/>
      <Card/></div>
      <Footer/>
        
    </>
  )
}

export default App
