import { Routes, Route, Link } from 'react-router-dom'
// import Home2 from './pages/Home2'
import Home from './pages/Home'
import Alumni from './pages/alumni/Alumni'
import Events from './pages/Events'
import Donations from './pages/Donations'
import Admin from './pages/admin/Admin'
import Login from './pages/auth/login/Login'
import Signup from './pages/auth/signup/Signup'
import Profile from './pages/Profile'
import Messages from './pages/Massage'
import NavBar from './components/NavBar'
import { Toaster } from 'react-hot-toast'
import AdminLogin from './pages/auth/login/AdminLogin'
import AlumniLogin from './pages/auth/login/AlumniLogin'
import AdminSignup from './pages/auth/signup/AdminSignup'
import AlumniSignup from './pages/auth/signup/AlumniSignup'
import FacultyLogin from './pages/auth/login/FacultyLogin'
import FacultySignup from './pages/auth/signup/FacultySignup'



export default function App() {


  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <main className="p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/login/admin" element={<AdminLogin />} />
            <Route path="/login/faculty" element={<FacultyLogin />} />
            <Route path="/login/alumni" element={<AlumniLogin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/admin" element={<AdminSignup />} />
            <Route path="/signup/faculty" element={<FacultySignup />} />
            <Route path="/signup/alumni" element={<AlumniSignup />} />
            <Route path="/" element={<Home />} />
            {/* <Route path="/home2" element={<Home2/>} /> */}
            <Route path="/messages" element={<Messages />} />
            {/* <Route path="/home" element={<Home />} /> */}
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/events" element={<Events />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
      <Toaster position='top-center' />
    </>
  )
}