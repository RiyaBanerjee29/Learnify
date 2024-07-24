import React from 'react'
import useMyStore from "../../Store/ZustandStore";
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
    const logout = useMyStore((state) => state.logout)
    const navigate = useNavigate()
    const handleLogout  = () => {
         logout()
         navigate("/login")
    }
  return (
    <button onClick={handleLogout} className='bg-rose-400 hover:bg-rose-500 p-2 text-md text-white font-semibold rounded-md'>
        Logout
    </button>
  )
}

export default LogoutButton