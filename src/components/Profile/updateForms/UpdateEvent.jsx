

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { notificationAction } from '../../../store/notfications'
import { profileAction } from '../../../store/profile'
import backendURl from '../../helpers/backendUrl'

const UpdateEvent = ({id}) => {
    const dispatch = useDispatch()
    const [event, setevent] = useState({ type: 'Type', date: null, time: null })
    const [eventError, seteventError] = useState({ edate: false, etime: false })
    
    useEffect(()=>{
        
        axios.get(`${backendURl}/kheloNITH/specific/oneEvent/${id}`)
        .then(res => {
            setevent(res.data.event)
        })
        .catch(e => console.log(e.message))

    },[id])
   
 

    const dateHandler = (e) => {
        seteventError({ ...eventError, edate: false })
        setevent({ ...event, date: e.target.value })
    }

    const timeHandler = (e) => {
        seteventError({ ...eventError, etime: false })
        setevent({ ...event, time: e.target.value })
    }

    const currentTime = new Date();

    const currentOffset = currentTime.getTimezoneOffset();

    const ISTOffset = 330;   // IST offset UTC +5:30 

    const ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset) * 60000);

    // ISTTime now represents the time in IST coordinates

    const hoursIST = ISTTime.getHours()
    const minutesIST = ISTTime.getMinutes()
    let month = ISTTime.getMonth()+1
    if(month<10){month = '0'+month}
    const cdate = currentTime.getFullYear()+'-'+month+'-'+currentTime.getDate()
    

    

    const submintHandler = async (e) => {
        e.preventDefault()

      
        if (event.date === null) {
            seteventError({ ...eventError, edate: true })
            return
        }
        if (event.time === null) {
            seteventError({ ...eventError, etime: true })
            return
        }

        try {
             dispatch(notificationAction.setFunction({functionMessage:'updating Event'}))
           
             const res = await axios.post(`${backendURl}/kheloNITH/oneEvent/update`,
                {
                    ...event,
                    id
                })
              
                if(res.data.error){
                    dispatch(notificationAction.setNotification({type:'error',message:res.data.error}))
                    dispatch(notificationAction.setDontFunction())
                    return 
                }
                dispatch(notificationAction.setNotification({type:'success',message:res.data.message}))
                dispatch(profileAction.setReRun())
                dispatch(notificationAction.setDontFunction())
              
        } catch (error) {
            dispatch(notificationAction.setNotification({type:'error',message:error.message}))
            dispatch(notificationAction.setDontFunction())

        }
    }


    return (
        <div className='w-full h-full'>
            <div className='w-full h-full flex flex-col  items-center z-[1] backdrop-blur-sm opacity-100 shadow-lg justify-center
            ' >

                <form className='w-11/12 md:w-5/12  bg-gradient-to-b from-[#bd4aef] to-[#866b8f] opacity-100 backdrop-blur-2xl rounded-3xl
                animate-slideup flex flex-col items-center shadow-2xl ' onSubmit={submintHandler}>
                    <h1 className='font-bold text-[50px] text-[#ffffff] mt-[15px] font-serif'>Update Event</h1>

                    <input type='text' className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#062147] `} placeholder='Event Type'
                     value={event?.type}/>

                    <input type='date' className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#062147] ${eventError.edate && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='date'
                        onChange={dateHandler} defaultValue={event.date}/>

                    <input type='time' className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-white bg-transparent placeholder-[#062147] ${eventError.etime && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='time'
                        onChange={timeHandler} defaultValue={event.time}/>

                    <button type='submit' className='w-4/12 h-[55px] rounded-xl my-[40px] text-center bg-gradient-to-br from-[#cf83ff] to-[#6f118c] shadow-2xl
                     font-bold text-xl text-white hover:scale-105' >Update</button>

                </form>
            </div>
        </div>
    )
}

export default UpdateEvent