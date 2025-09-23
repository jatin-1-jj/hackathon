import React, { useEffect, useState } from 'react'
import api from '../api'
import { useAuth } from '../contexts/AuthContext'


export default function Profile() {
const { user } = useAuth()
const [profile, setProfile] = useState(null)


useEffect(() => {
api.get('/alumni/me').then(r => setProfile(r.data)).catch(() => {})
}, [])


if (!user) return null


return (
<div className="max-w-2xl bg-white p-4 rounded shadow">
<h2 className="text-xl font-semibold">{user.name}</h2>
<div className="text-sm">{user.email}</div>
<div className="mt-3">{profile?.bio}</div>
</div>
)
}