import { useState } from "react"
import { Link } from "react-router-dom"



const SportCard = ({ logo, sport }) => {

    const [show, setShow] = useState(false)
    const handler = () => {

        setShow(true)
    }

    const closeHadler = () => {
        setShow(false)
    }

    return (
        <Link to={`/sports/${sport}`}><div className="w-[300px] h-[350px] flex flex-col bg-[#0d0511] rounded-xl shadow-lg shadow-white/50
        hover:scale-110 hover:shadow-[#a558ed] animate-slideup" onMouseEnter={handler} onMouseLeave={closeHadler}>
            <div className="relative w-[300px] h-[300px] ">
                <img className="w-full h-full rounded-t-xl absolute" src={logo} />
                <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-80 flex rounded-xl
              ${show ? 'block' : 'hidden'}`}>
                    <h1 className="text-white text-[50px] font-bold">{sport.charAt(0).toUpperCase()}{sport.slice(1)}</h1>
                </div>
            </div>

           </div>
        </Link>
    )
}

export default SportCard