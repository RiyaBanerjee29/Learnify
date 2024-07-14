import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './components/Authentication/Login.jsx'
import Register from './components/Authentication/Register.jsx'
import Adopt from './pages/Adopt.jsx'

const router = createBrowserRouter([

  {
    path : "/",
    element: <App/>,
    children :[
      {
        path : "/",
        element : <Home/>,
      },
      {
         path  : "/login",
         element : <Login/>
      },
      {
        path : "/register",
        element: <Register/>
      },
      {
         path: "/adopt",
         element: <Adopt/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>,
)
