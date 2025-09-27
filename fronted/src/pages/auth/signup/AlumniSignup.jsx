
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../store/authStore'
import toast from 'react-hot-toast'
import { useDebounceCallback } from "usehooks-ts";
import { Loader } from "lucide-react"

const AlumniSignup = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [typedUsername, setTypedUsername] = useState('')
    const debouncedUsername = useDebounceCallback(setUserName, 400)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isUnique, setIsUnique] = useState(false);
    const { register, isValidUsername, isValidEmail, isCheckingUnique, checkUniqueUsername } = useAuthStore();
    const role = "alumni"


    useEffect(() => {
        const uniqueUsername = async () => {
            if (isValidUsername(username)) {
                const res = await checkUniqueUsername({ username});
                setIsUnique(res.data.success)
            }
        }
        uniqueUsername();
    }, [username])


    const submit = async e => {
        e.preventDefault()
        try {
            const data = { username, email, password, role }

            if (isValidEmail(email) && isValidUsername(username)) {
                const res = await register(data);
                if (res.data.success) {
                    setIsUnique(false)
                    navigate('/alumni')
                }
            }
            else {
                if (isValidEmail(email)) {
                    toast.error('username must not contain special charter')
                } else {
                    toast.error('wrong email format');
                }
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed')
        }
    }
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Sign up As Alumni</h2>
            {error && <div className="text-red-600 mb-3">{error}</div>}
            <form onSubmit={submit} className="space-y-3">
                <input name='username' value={typedUsername} onChange={e => { debouncedUsername(e.target.value); setTypedUsername(e.target.value) }} placeholder="username" className="w-full p-2 border rounded" />
                <label htmlFor="username"></label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
                <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
                {console.log('ttttttttttttttttttttttttt', isUnique, isCheckingUnique)}
                <button disabled={!isUnique || isCheckingUnique} className={`w-full  text-white p-2 ${(!isUnique || isCheckingUnique) ? `bg-gray-600/50 ` : `bg-green-600 hover:bg-green-700`} rounded`}>
                    {(isCheckingUnique) ?(
                        <div className='flex w-full justify-center'>
                            <Loader className='animate-spin' />
                        </div>
                ):(
                    <span>
                        Create account
                    </span>
                    )
                }
                </button>
                <h3 className='text-red-400'>
                    <span className='font-bold text-black'>NOTE:-</span>If not verified within 14-days account will be deleted automatically
                </h3>
            </form>
        </div>
    )
}

export default AlumniSignup;