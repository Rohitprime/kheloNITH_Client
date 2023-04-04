import { Link } from "react-router-dom"
import {IoMdCall} from 'react-icons/io'
import axios from "axios"
import { useDispatch } from "react-redux"
import { notificationAction } from "../../../store/notfications"
import { profileAction } from "../../../store/profile"
import backendURl from "../../helpers/backendUrl"

const NotisApply = ({ notis }) => {

        const dispatch = useDispatch()

        const cancelHandler = async(e)=>{
            const {name} = e.target
            dispatch(notificationAction.setFunction({functionMessage:'canceling your request '}))
            try {
                const res = await axios.get(`${backendURl}/kheloNITH/notification/team/cancel/${name}`) 
                if(res.data.error){
                    dispatch(notificationAction.setNotification({type:'error',message:res.data.error}))
                    dispatch(notificationAction.setDontFunction())
                    return
                }  
                dispatch(notificationAction.setNotification({type:'success',message:res.data.message}))
                dispatch(notificationAction.setDontFunction())
                dispatch(profileAction.setReRun())
             } 
            catch (error) {
                dispatch(notificationAction.setNotification({type:'error',message:error.message}))
                dispatch(notificationAction.setDontFunction())
            }
        }

    return (
        <div className="md:w-11/12 w-full md:h-[100px] h-[150px] bg-[#32104b] rounded-lg flex-none flex md:flex-row flex-col
                 relative" key={notis._id}>
            <div className='w-full md:w-9/12 h-full flex items-center justify-around md:pt-0 pt-10'>
                <Link to={`/specific/oneUser/${notis?.to?._id}`} className="font-bold text-2xl text-white font-serif
                   hover:bg-[#d8a6f4] rounded-lg px-2">To: {notis?.to?.name}</Link>
                <Link to={`/specific/oneTeam/${notis?.team?._id}`} className="font-bold text-2xl text-white font-serif
               hover:bg-[#d8a6f4] rounded-lg px-2">For: {notis?.team?.teamName}</Link>               
                <h1 className="font-bold text-xl text-white font-serif">{notis?.date}</h1>
            </div>
            <div className='w-full md:w-3/12 h-full  flex items-center  justify-center gap-3'>
                {notis.accept && <input type='button' value='Accepted' className='w-3/12 md:w-5/12 h-[35px] md:h-[50px]   flex justify-center items-center
                             text-white text-lg bg-green-300 rounded-lg cursor-not-allowed'/>}
                {notis.reject && <input type='button' value='Rejected' className='w-3/12 md:w-5/12 h-[35px] md:h-[50px]   flex justify-center items-center
                             text-white text-lg bg-rose-400 rounded-lg cursor-not-allowed'/>}
                <input type='button' value='Cancel' name={notis?._id} className='w-3/12 md:w-5/12 h-[35px] md:h-[50px]  flex justify-center items-center
                             text-white text-lg bg-rose-600 rounded-lg cursor-pointer hover:scale-105' onClick={cancelHandler}/>
            </div>
                <div className={`md:w-3/12 w-6/12 h-[40px] absolute -top-3 md:-left-2 rounded ${notis.accept && 'bg-green-600'} 
                  ${!notis.accept && 'bg-yellow-600'}  flex justify-center items-center text-white font-bold text-xl gap-3`}>
                    <IoMdCall/>
                    <h1>{notis.toNumber?notis.toNumber:'Mobile Number'}</h1>
                </div>
        </div>
    )
}

export default NotisApply