import React, { useEffect, useState } from 'react'


export default function Admin() {
const [users, setUsers] = useState([])



return (
<div>
<h2 className="text-xl font-semibold mb-4">Admin Panel</h2>
<ul className="space-y-2">
{users.map(u => (
<li key={u._id} className="p-2 bg-white rounded shadow">{u.name} - {u.email} - {u.role}</li>
))}
</ul>
</div>
)
}