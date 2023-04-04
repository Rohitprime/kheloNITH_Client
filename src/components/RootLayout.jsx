import {Outlet} from 'react-router-dom'
import Navbar from './navbar/Navbar'
import '../index.css'

const RootLayout = ()=>{
    return (
    <>
        <Navbar/>
      <div className="w-screen h-screen  overflow-hidden overflow-y-scrol scrollbar-hide">
        <Outlet/>
      </div>
    </>
    )
}

export default RootLayout