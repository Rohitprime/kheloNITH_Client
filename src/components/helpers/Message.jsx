import { useSelector } from "react-redux"
import Navbar from "../navbar/Navbar"

const Message = ()=>{

    const{functionMessage} = useSelector(state => state.notification)

    return (
        <div className="w-screen h-screen bg-[#1a0229] absolute z-50 mt-[151px] md:mt-[81px] backdrop-blur-3xl">
            <div className={`w-full bg-yellow-600 flex flex-row justify-center items-center  
                  backdrop-blur-2xl rounded-b-xl shadow-lg `}>
                <div className="w-10/12 flex flex-wrap p-2 justify-center items-center py-6">
                    <h1 className="text-white font-bold font-serif text-2xl md:text-4xl">{functionMessage.charAt(0).toUpperCase()}{functionMessage.slice(1)}</h1>
                </div>
            </div>
        </div>
    )
}

export default Message