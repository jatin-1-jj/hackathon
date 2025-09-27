import React, { useEffect, useState } from 'react'


export default function Donations() {
const [donations, setDonations] = useState([])



return (
<div>
<h2 className="text-xl font-semibold mb-4">Donations</h2>
<div className="space-y-2">
{donations.map(d => (
<div key={d._id} className="p-3 bg-white rounded shadow">
<div><strong>{d.donor?.name}</strong> donated ₹{d.amount}</div>
<div className="text-sm">{new Date(d.date).toLocaleString()}</div>
<div>{d.message}</div>
</div>
))}
</div>
</div>
)
}