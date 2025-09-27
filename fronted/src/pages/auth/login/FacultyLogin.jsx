import React, { useState } from 'react'
import { useAuthStore } from '../../../store/authStore'
import { useNavigate } from 'react-router-dom'



const FacultyLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const { authUser, login } = useAuthStore();
    const navigate = useNavigate();
    if (authUser?.user) {
        navigate("/alumni")
    }

    const submit = async e => {
        e.preventDefault()
        try {
            const role="faculty"
            const data = { email, password,role };
            const res = await login(data);
            if (res.data.success) {
                navigate('/alumni');
            }

        } catch (err) {
            setError(err.response?.data?.error || 'Login failed')
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Login As Faculty</h2>
            {error && <div className="text-red-600 mb-3">{error}</div>}
            <form onSubmit={submit} className="space-y-3">
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
                <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
            </form>
        </div>
    )
}

export default FacultyLogin