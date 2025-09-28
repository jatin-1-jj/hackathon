import { useNavigate } from "react-router-dom"
import Button from "../../../components/Button"

export default function Login() {

    const navigate = useNavigate()
    return (
        <>
            <div className="flex h-[80vh] border border-black rounded justify-center">
                <div className="flex flex-col justify-center items-center-safe">
                    <Button label="Login as Admin" className="m-3" onClick={() => navigate("/login/admin")} />
                    <Button label="Login as Faculty" className="m-3" onClick={() => navigate("/login/faculty")} />
                    <Button label="Login as Alumni" className="m-3" onClick={() => navigate("/login/alumni")} />
                </div>
            </div>
        </>
    )

}