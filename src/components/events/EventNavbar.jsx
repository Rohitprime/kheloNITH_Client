import { Link,NavLink } from "react-router-dom"
import './eventNavlink.css'
const EventNavbar =()=>{
    return(
        <div className="flex flex-row overflow-x-scroll scrollbar-hide w-screen h-[150px] items-start px-4 border-t-4 border-[#b274ff]
        gap-10 justify-between">
                <NavLink to='/events/cricket'><div className=" bg-[#b274ff] rounded-b-xl backdrop-blur-lg opacity-75 
                     flex justify-center items-center left-0 z-[1] w-[220px] md:w-[250px] h-[75px] md:h-[85px] hover:scale-105 isActive">
                     <h1 className="font-bold text-xl font-mono text-[#fffeff]">Cricket</h1>
                  </div>
                </NavLink>
                <NavLink to='/events/football'><div className=" bg-[#b274ff] rounded-b-xl backdrop-blur-lg opacity-75 
                     flex justify-center items-center left-0 z-[1]  w-[220px] md:w-[250px] h-[75px] md:h-[85px] hover:scale-105">
                     <h1 className="font-bold text-xl font-mono text-[#fffeff]">Football</h1>
                  </div>
                </NavLink>
                <NavLink to='/events/chess'><div className=" bg-[#b274ff] rounded-b-xl backdrop-blur-lg opacity-75 
                     flex justify-center items-center left-0 z-[1]  w-[220px] md:w-[250px] h-[75px] md:h-[85px] hover:scale-105">
                     <h1 className="font-bold text-xl font-mono text-[#fffeff]">chess</h1>
                  </div>
                </NavLink>
                <NavLink to='/events/vollyball'><div className=" bg-[#b274ff] rounded-b-xl backdrop-blur-lg opacity-75 
                     flex justify-center items-center left-0 z-[1]  w-[220px] md:w-[250px] h-[75px] md:h-[85px] hover:scale-105">
                     <h1 className="font-bold text-xl font-mono text-[#fffeff]">vollyball</h1>
                  </div>
                </NavLink>
                <NavLink to='/events/tennis'><div className=" bg-[#b274ff] rounded-b-xl backdrop-blur-lg opacity-75 
                     flex justify-center items-center left-0 z-[1]  w-[220px] md:w-[250px] h-[75px] md:h-[85px] hover:scale-105">
                     <h1 className="font-bold text-xl font-mono text-[#fffeff]">tennis</h1>
                  </div>
                </NavLink>
                <NavLink to='/events/badminton'><div className=" bg-[#b274ff] rounded-b-xl backdrop-blur-lg opacity-75 
                     flex justify-center items-center left-0 z-[1]  w-[220px] md:w-[250px] h-[75px] md:h-[85px] hover:scale-105">
                     <h1 className="font-bold text-xl font-mono text-[#fffeff]">badminton</h1>
                  </div>
                </NavLink>
             </div>
    )
}

export default EventNavbar