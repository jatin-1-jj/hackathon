import { Routes, Route, Link } from 'react-router-dom'
// import Home2 from './pages/Home2'
import Home from './pages/Home'
import Alumni from './pages/Alumni'
import Events from './pages/Events'
import Donations from './pages/Donations'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Messages from './pages/Massage'
import NavBar from './components/NavBar'



export default function App() {


  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <main className="p-6">
        <Routes>

          <Route path="/" element={<Home />} />
          {/* <Route path="/home2" element={<Home2/>} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
  )
}