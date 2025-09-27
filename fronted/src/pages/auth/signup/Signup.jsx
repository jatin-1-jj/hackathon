import {  useNavigate } from 'react-router-dom'
import Button from '../../../components/Button'

export default function Signup() {

const navigate = useNavigate()
    return (
        <>
            <div className="bg flex h-[80vh] border border-black rounded justify-center">
                <div className="flex flex-col justify-center items-center-safe">
                    <Button label="SignUp as Admin" className="m-3" onClick={() => navigate("/signup/admin")} />
                    <Button label="SignUp as Faculty" className="m-3" onClick={() => navigate("/signup/faculty")} />    
                    <Button label="SignUp as Alumni" className="m-3" onClick={() => navigate("/signup/alumni")} />
                </div>
            </div>
        </>
    )




















}