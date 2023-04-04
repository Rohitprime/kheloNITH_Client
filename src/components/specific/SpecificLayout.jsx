import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"

const SpecificLayout = ()=>{
    return(
        <>
           <Navbar />
           <Outlet/>
        </>
    )
}

export default SpecificLayout