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
import ProtectedRoute from './components/ProtectedRoute'
import Messages from './pages/Massage'
import { useAuth } from './contexts/AuthContext'
 

export default function App() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link to="/" className="font-bold">Alumni Portal</Link>
          <Link to="/alumni">Alumni</Link>
          <Link to="/events">Events</Link>
          <Link to="/donations">Donations</Link>
          <Link to="/messages">Messages</Link>
          <Link to="/Home">Home</Link>
          <Link to="/home2">home2</Link>
          {user?.role === 'admin' && <Link to="/admin">Admin</Link>}
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-3">
              <span>{user.name}</span>
              <Link to="/profile" className="underline">Profile</Link>
              <button onClick={logout} className="ml-2 bg-red-500 px-3 py-1 rounded">Logout</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="underline">Login</Link>
              <Link to="/signup" className="underline">Sign up</Link>
            </div>
          )}
        </div>
      </nav>
      <main className="p-6">
<Routes>
  
<Route path="/" element={<Home />} />
{/* <Route path="/home2" element={<Home2/>} /> */}
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/messages" element={<Messages />} />
{/* <Route path="/home" element={<Home />} /> */}
<Route path="/alumni" element={<ProtectedRoute><Alumni /></ProtectedRoute>} />
<Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
<Route path="/donations" element={<ProtectedRoute><Donations /></ProtectedRoute>} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />


<Route path="/admin" element={<ProtectedRoute adminOnly={true}><Admin /></ProtectedRoute>} />
</Routes>
</main>
</div>
)
}