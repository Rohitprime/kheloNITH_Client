import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notificationAction } from "../../store/notfications"
import { AiOutlineCloseCircle } from 'react-icons/ai'

const Notifications = () => {

    const dispatch = useDispatch()
    const { available, type, message } = useSelector(state => state.notification)

    useEffect(() => {

        setTimeout(() => {
            dispatch(notificationAction.setNotiToFalse())
        }, 5000);
    }, [])

    const closeHandler = () => {
        dispatch(notificationAction.setNotiToFalse())
    }

    return (

        <div className="relative">
            <div className={`w-screen  absolute z-[10] ${(type == 'error' && 'bg-rose-900') || (type == 'success' && 'bg-green-900')}
            flex flex-row justify-center items-center mt-[150px] md:mt-[82px] backdrop-blur-2xl rounded-b-xl shadow-lg 
            ${available && 'animate-slidedown'} ${!available && 'animate-slideup'}`}>
                <div className="w-10/12 flex flex-wrap p-2 justify-center items-center py-8">
                    <h1 className="text-white font-bold font-serif text-center text-xl md:text-4xl">{message.charAt(0).toUpperCase()}{message.slice(1)}</h1>
                </div>
                <AiOutlineCloseCircle className=" text-white text-center text-3xl ml-16 mt-1 hover:scale-110"
                    onClick={closeHandler} />
            </div>
        </div>

    )
}

export default Notifications