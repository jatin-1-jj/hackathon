import React, { useEffect, useState } from 'react'
import api from '../api'


export default function Alumni() {
const [alumni, setAlumni] = useState([])
useEffect(() => { api.get('/alumni/search').then(r => setAlumni(r.data)).catch(() => {}) }, [])


return (
<div>
<h2 className="text-xl font-semibold mb-4">Alumni Directory</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
{alumni.map(a => (
<div key={a._id} className="p-3 bg-white rounded shadow">
<div className="font-bold">{a.userId?.name}</div>
<div className="text-sm">{a.profession} @ {a.company}</div>
<div className="text-xs text-gray-600">{a.location}</div>
<div className="mt-2">Skills: {a.skills?.join(', ')}</div>
</div>
))}
</div>
</div>
)
}