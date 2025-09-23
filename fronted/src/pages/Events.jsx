import React, { useEffect, useState } from 'react'
import api from '../api'


export default function Events() {
const [events, setEvents] = useState([])
useEffect(() => { api.get('/events').then(r => setEvents(r.data)).catch(() => {}) }, [])


return (
<div>
<h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
<div className="space-y-3">
{events.map(e => (
<div key={e._id} className="p-3 bg-white rounded shadow">
<div className="font-bold">{e.title}</div>
<div>{new Date(e.date).toLocaleString()}</div>
<div className="mt-2">{e.description}</div>
</div>
))}
</div>
</div>
)
}