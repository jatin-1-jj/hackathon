import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import Alumni from './pages/Alumni'
import Donations from './pages/Donations'
import Events from './pages/Events'
import Admin from './pages/Admin'
import Signup from './pages/Signup'

// const router= createBrowserRouter([
//   {
//     path: '/',
//     element:<Home/>
//   },
//   {
//     path: '',
//     element:<Alumni/>
//   },
//   {
//     path: '/donations',
//     element:<Donations/>
//   },
//   {
//     path: '/events',
//     element:<Events/>
//   },
//   {
//     path: '/admin',
//     element:<Admin/>
//   },
//   {
//     path: '/login',
//     element:<Login/>
//   },
//   {
//     path: '/profile',
//     element:<Profile/>
//   },
//   {
//     path: '/signup',
//     element:<Signup/>
//   },
// ])
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router}/> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)