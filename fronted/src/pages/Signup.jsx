import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import {  useAuthStore } from '../store/authStore'



export default function Signup() {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
const navigate = useNavigate()
const {register} = useAuthStore()


const submit = async e => {
e.preventDefault()
try {
    const data = {name,email,password}
    register(data);
navigate('/alumni')
} catch (err) {
setError(err.response?.data?.error || 'Signup failed')
}
}
return (
<div className="max-w-md mx-auto bg-white p-6 rounded shadow">
<h2 className="text-xl font-semibold mb-4">Sign up</h2>
{error && <div className="text-red-600 mb-3">{error}</div>}
<form onSubmit={submit} className="space-y-3">
<input value={name} onChange={e => setName(e.target.value)} placeholder="Full name" className="w-full p-2 border rounded" />
<input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
<input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
<button className="w-full bg-green-600 text-white p-2 rounded">Create account</button>
</form>
</div>
)
}