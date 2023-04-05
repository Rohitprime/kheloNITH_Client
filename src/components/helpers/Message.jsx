import { useSelector } from "react-redux"
const sportLoading = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680699931/kheloNIT/gifs/sportLoading_vlb4pr.gif'
const profile = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680703203/kheloNIT/gifs/profileLoading1_loqvoa.gif'
const profile1 = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680703199/kheloNIT/gifs/profileLoading2_ntihsj.gif'

const Message = ()=>{

    const{functionMessage} = useSelector(state => state.notification)

    return (
        <div className="w-screen h-screen bg-[#1a0229] absolute z-50 mt-[151px] md:mt-[81px] backdrop-blur-3xl opacity-90">
            {functionMessage && functionMessage !== 'profile' && <div className={`w-full bg-yellow-600 flex flex-row justify-center items-center  
                  backdrop-blur-2xl rounded-b-xl shadow-lg `}>
                <div className="w-10/12 flex flex-wrap p-2 justify-center items-center py-6">
                    <h1 className="text-white font-bold font-serif text-2xl md:text-4xl">{functionMessage.charAt(0).toUpperCase()}{functionMessage.slice(1)}</h1>
                </div>
            </div>}
            {!functionMessage && <div className="w-full h-full flex items-center justify-center">
                <img src={sportLoading} className="w-[300px] h-[300px] rounded-full"/>
            </div>}
            {functionMessage == 'profile' && <div className="w-full h-full flex items-center justify-center">
                <img src={profile1} className="w-[300px] h-[300px] rounded-full"/>
            </div>}
        </div>
    )
}

export default Message