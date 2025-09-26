import { useEffect } from 'react'
import { useAuthStore } from '../store/authStore'
import { useAlumniStore } from '../store/alumniStore';
import { useNavigate } from 'react-router-dom';


export default function Alumni() {
    const { alumni,fetchAlumni,isFetchingAlumni } = useAlumniStore()
    const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
        fetchAlumni();
    }, [checkAuth,fetchAlumni])

    if (!authUser || isCheckingAuth) {
        return (
            <>
                {isCheckingAuth? (
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

    if(isFetchingAlumni){
        return(
            <>
            <div>
                fetching alumni......
            </div>
            </>
        )
    }



    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Alumni Directory</h2>
            <div className="border border-black w-[95vw] h-screen grid grid-cols-1 md:grid-cols-2 gap-3">
                {alumni.map((person) => 
                    {
                        return <div className='text-white bg-black w-fit h-fit'>
                            <h3>name:{person.name}</h3>
                            <h3>email:{person.email}</h3>
                            <h3>role:{person.role}</h3>
                            <h3>mentor:{person.mentor}</h3>
                            <h3>mentee:{person.mentee}</h3>
                            <div>skils:{person.skills.map((skil)=>(
                                <div>
                                    {skil}
                                </div>
                            ))}</div>
                        </div>
                    }
                )}
            </div>
        </div>
    )
}