import Button from '../../../components/Button'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../store/authStore'
import toast from 'react-hot-toast'
import { useDebounceCallback } from "usehooks-ts";
import { Loader } from "lucide-react"
import { useEmailStore } from '../../../store/emailStore';

const FacultySignup = () => {
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [typedUsername, setTypedUsername] = useState('')
    const debouncedUsername = useDebounceCallback(setUserName, 400)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [isModalOpen, setIsModalOpen] = useState();
    const [error, setError] = useState(null);
    const [isUnique, setIsUnique] = useState(false);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const { register, isValidUsername, isValidEmail, isValidOtp, isCheckingUnique, checkUniqueUsername,checkOtp } = useAuthStore();
    const { sendOTP, otpGenerator, exTime  } = useEmailStore();
    const role = "faculty"




    useEffect(() => {
        const uniqueUsername = async () => {
            if (isValidUsername(username)) {
                const res = await checkUniqueUsername({ username });
                setIsUnique(res.data.success)
            }
        }
        uniqueUsername();
    }, [username])


    const registerData = async (data) => {
        try {
            const res = await register(data);
            if (res.data.success) {
                setIsUnique(false)
                navigate('/alumni')
            }
        } catch (error) {
            setError(error.response?.data?.error || 'verification failed')
        }
    }


    const otpSubmit = async () => {
        try {
            if (isValidOtp(otp)) {
                const res = await checkOtp({email,otp});
                if (res.data.success) {
                    setIsModalOpen(false)
                    const data = { username, email, password, role }
                    registerData(data)
                } else {
                    toast.error('verification failed')
                }
            }
        } catch (error) {
            setError(error.response?.data?.error || 'verification failed')
        }
    }

    const submit = async e => {
        e.preventDefault()
        try {
            if (isValidEmail(email) && isValidUsername(username)) {

                const emailRes = await sendOTP(email, username, otpGenerator(), exTime())
                if (emailRes.success) {
                    console.log('emailres^^^^^^^^^^^^^^^^^^^^^^^^^', emailRes)
                    toast.success('otp Sent to email', { duration: 600 });
                    setIsModalOpen(true);
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

        isModalOpen ? (
            <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50'>
                <div className='bg-white rounded-4xl p-10 w-[70vw]'>
                    <h2 className="text-xl font-semibold mb-4">Verify Email</h2>
                    {error && <div className="text-red-600 mb-3">{error}</div>}

                    <form onSubmit={e => { e.preventDefault(); otpSubmit(); }}>
                        <div>
                            <label htmlFor="text"> Enter OTP</label>
                            <input
                                autoFocus
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                                placeholder="OTP"
                                type="text"
                                className="w-full p-2 border rounded m-4 text-black"
                            />
                            <div>
                                <button
                                    type="submit"
                                    disabled={otp.length !== 6}
                                    className={`w-fit px-4 py-2 mx-2 rounded text-white ${otp.length !== 6 ? 'bg-gray-600/50' : 'bg-green-600 hover:bg-green-700'
                                        }`}
                                >
                                    {otp.length !== 6 ? 'OTP must be 6 numbers' : 'Verify'}
                                </button>
                                <button
                                    className='bg-red-400 hover:bg-red-600 w-fit px-4 py-2 mx-2 mt-4 rounded' onClick={() => setIsModalOpen(false)}>
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div >
        ) : (
            <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Sign up As Faculty</h2>
                {error && <div className="text-red-600 mb-3">{error}</div>}
                <form onSubmit={submit} className="space-y-3">
                    <input name='username' value={typedUsername} onChange={e => { debouncedUsername(e.target.value); setTypedUsername(e.target.value) }} placeholder="username" className="w-full p-2 border rounded" />
                    <label htmlFor="username"></label>
                    <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
                    <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
                    {console.log('ttttttttttttttttttttttttt', isUnique, isCheckingUnique)}
                    <button
                        disabled={!isUnique || isCheckingUnique}
                        type='submit'
                        onClick={() => setIsSubmiting(true)}
                        className={`w-full  text-white p-2 ${(!isUnique || isCheckingUnique) ? `bg-gray-600/50 ` : `bg-green-600 hover:bg-green-700`} rounded`}
                    >
                        {(isCheckingUnique || isSubmiting) ? (
                            <div className='flex w-full justify-center'>
                                <Loader className='animate-spin' />
                            </div>
                        ) : (
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
    )
}

export default FacultySignup;