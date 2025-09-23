import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'


const AuthContext = createContext()


export function AuthProvider({ children }) {
const [user, setUser] = useState(() => {
try {
return JSON.parse(localStorage.getItem('user'))
} catch { return null }
})


useEffect(() => {
if (user) localStorage.setItem('user', JSON.stringify(user))
else localStorage.removeItem('user')
}, [user])
const login = async (email, password) => {
const res = await api.post('/auth/login', { email, password })
const token = res.data.token
const u = res.data.user
localStorage.setItem('token', token)
setUser(u)
return u
}


const signup = async (name, email, password) => {
await api.post('/auth/register', { name, email, password })
return login(email, password)
}
const logout = () => {
localStorage.removeItem('token')
localStorage.removeItem('user')
setUser(null)
window.location.href = '/login'
}


return (
<AuthContext.Provider value={{ user, login, signup, logout }}>
{children}
</AuthContext.Provider>
)
}


export const useAuth = () => useContext(AuthContext)