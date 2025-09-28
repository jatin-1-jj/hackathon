import React, { useEffect } from 'react'
// import { useAlumniStore } from '../store/alumniStore'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import Button from '../components/Button';


export default function Profile() {

    // const { profile } = useAlumniStore();
    const { checkAuth, authUser, isCheckingAuth, logout } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    if (!authUser || isCheckingAuth) {
        return (
            <>
                {isCheckingAuth ? (
                    <>
                        <div>
                            Loading.....
                        </div>
                        <div>
                            for better view add a Loader
                        </div>
                    </>
                ) : (
                    navigate("/login")
                )}
            </>
        )
    }
    const handleLogOut = async () => {
        try {
            const res = await logout();
            console.log('lloooooooooooooooofffffffffffff', res)
            if (res.data.success) {
                navigate("/")
            }
        } catch (error) {
            console.log('error in handleLogout ==> ', error);
            toast.error(error)
        }
    }


    const confirmLogOut = () => {

        toast.custom((t) => (
            <div className='fixed min-h-screen inset-[-18px] bg-black/50 p-5 flex items-center justify-center z-50'>
                <div className='p-5 bg-white rounded-3xl'>
                    <h3>Are you sure you want to log out?</h3>
                    <div className='flex justify-self-end'>
                        <Button label="No" className="bg-sky-500 m-1" onClick={() => toast.remove(t.id)} />
                        <Button label="yes" className="bg-red-400 hover:bg-red-600 m-1" onClick={() => { handleLogOut(); toast.remove(t.id) }} />
                    </div>
                </div>
            </div>
        ), { duration: Infinity })
    }

    return (
        <>
            <div className='flex justify-center w-full h-full'>
                <div className=" flex flex-col items-center-safe justify-around w-[80vw] h-[80vh] max-h-[90vh] min-h-[20vh] max-w-[90vw] min-w-[20vw] bg-white p-4 rounded shadow">
                    <div>
                        insert profile image
                    </div>
                    <div className='p-10 border border-black'>
                        <h2 className="text-xl font-semibold">NAME :{authUser.name}</h2>
                        <div className="text-sm">EMAIL : {authUser.email}</div>
                        <div className="mt-3">BIO : {authUser.bio}</div>
                    </div>
                    <div>
                        <button onClick={confirmLogOut} className="ml-2 bg-red-500 px-3 py-1 rounded">Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}