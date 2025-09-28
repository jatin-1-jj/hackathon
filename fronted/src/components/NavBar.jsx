import  { useEffect } from 'react'
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';

const NavBar = () => {

    const { authUser, checkAuth } = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth])

    console.log(`authUser is : `, authUser)



    return (
        <>
            <nav className="bg-blue-600 text-white p-4 flex items-center justify-between">
                <div className="flex gap-4 items-center">
                    <Link to="/" className="font-bold">Alumni Portal</Link>
                    <Link to="/alumni">Alumni</Link>
                    <Link to="/events">Events</Link>
                    <Link to="/donations">Donations</Link>
                    <Link to="/messages">Messages</Link>
                    <Link to="/Home">Home</Link>
                    <Link to="/home2">home2</Link>
                    {authUser?.role === 'admin' && <Link to="/admin">Admin</Link>}
                </div>
                <div>
                    {authUser ? (
                        <div className="flex items-center gap-3">
                            <span>{authUser ? authUser.user?.name : ""}</span>
                            <Link to="/profile" className="underline">Profile</Link>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <Link to="/login" className="underline">Login</Link>
                            <Link to="/signup" className="underline">Sign up</Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}

export default NavBar