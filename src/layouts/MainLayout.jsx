//MainLayout.jsx

import React from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//set up toastify first

const MainLayout = () => {
  return (
    <div>
        <Navbar />
      <Outlet />

      <ToastContainer />
    </div>
  )
}

export default MainLayout
