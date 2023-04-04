import axios from "axios"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { notificationAction } from "../../../store/notfications"
import { profileAction } from "../../../store/profile"
import { IoMdCall } from "react-icons/io"
import backendURl from "../../helpers/backendUrl"

const Received = ({ notis }) => {

    const dispatch = useDispatch()

    const rejectHandler = async(e)=>{
       const {name} = e.target
       const id= name
       try {
            const res = await axios.get(`${backendURl}/kheloNITH/notification/event/reject/${id}`)
            dispatch(notificationAction.setNotification({type:'error',message:res.data.message}))
            dispatch(profileAction.setReRun())
       } 
       catch (error) {
        dispatch(notificationAction.setNotification({type:'error',message:error.message}))
       }
    }

    const acceptHandler = async(e)=>{
        const {name} = e.target
        const id= name
        try {
             const res = await axios.get(`${backendURl}/kheloNITH/notification/event/accept/${id}`)
             dispatch(notificationAction.setNotification({type:'success',message:res.data.message}))
             dispatch(profileAction.setReRun())

        } 
        catch (error) {
         dispatch(notificationAction.setNotification({type:'error',message:error.message}))
        }
    }

    return (
        <div className="md:w-11/12 w-full md:h-[100px] h-[150px] bg-[#32104b] rounded-lg flex-none flex md:flex-row flex-col
        relative" key={notis._id}>
            <div className='w-full md:w-9/12 h-full flex items-center justify-around md:pt-0 pt-10 '>
                <Link to={`/specific/oneUser/${notis?.from?._id}`} className="font-bold text-2xl text-white font-serif
               hover:bg-[#d8a6f4] rounded-lg px-2">From: {notis?.from?.name}</Link>
               <Link to={`/specific/oneEvent/${notis?.event?._id}`} className="font-bold text-2xl text-white font-serif
               hover:bg-[#d8a6f4] rounded-lg px-2">For: {notis?.event?.type}</Link>
                <h1 className="font-bold text-xl text-white font-serif">{notis?.date}</h1>
            </div>
            <div className='w-full md:w-3/12 h-full  flex items-center  justify-center gap-3'>
                {notis.apply && !notis.reject && <input type='button' value='Accept' name={notis?._id} className='w-3/12 md:w-5/12 h-[35px] md:h-[50px] flex justify-center items-center
                             text-white text-lg bg-green-500 rounded-lg cursor-pointer hover:scale-105' onClick={acceptHandler}/>}
                {notis.accept && <input type='button' value='Accepted' className='w-3/12 md:w-5/12 h-[35px] md:h-[50px]  flex justify-center items-center
                             text-white text-lg bg-green-300 rounded-lg cursor-not-allowed'/>}
                 {notis.reject && <input type='button' value='Rejected' className='w-3/12 md:w-5/12 h-[35px] md:h-[50px]  flex justify-center items-center
                             text-white text-lg bg-rose-400 rounded-lg cursor-not-allowed'/>}
                {!notis.reject && <input type='button' value='Reject' name={notis?._id} className='w-3/12 md:w-5/12 h-[35px] md:h-[50px]  flex justify-center items-center
                             text-white text-lg bg-rose-600 rounded-lg cursor-pointer hover:scale-105' onClick={rejectHandler} />}
            </div>
            <div className={`md:w-3/12 w-6/12 h-[40px] absolute -top-3 md:-left-2 rounded ${notis.accept && 'bg-green-600'} 
                  ${!notis.accept && 'bg-yellow-600'}  flex justify-center items-center text-white font-bold text-xl gap-3`}>
                    <IoMdCall/>
                    <h1>{notis.fromNumber?notis.fromNumber:'Mobile Number'}</h1>
             </div>
        </div>
    )
}

export default Received