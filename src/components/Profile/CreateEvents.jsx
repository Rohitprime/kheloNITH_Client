
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { notificationAction } from '../../store/notfications'
import { profileAction } from '../../store/profile'
import backendURl from '../helpers/backendUrl'

const CreateEvents = () => {

    const dispatch = useDispatch()
    const [event, setevent] = useState({ type: 'cricket', date: null, time: null })
    const [eventError, seteventError] = useState({ etype: false, edate: false, etime: false })
    

    const typeHandler = (e) => {
        seteventError({ ...eventError, etype: false })
        setevent({ ...event, type: e.target.value })
    }

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

        if (event.type === '') {
            seteventError({ ...eventError, etype: true })
            return
        }
        if (event.date === null) {
            seteventError({ ...eventError, edate: true })
            return
        }
        if (event.time === null) {
            seteventError({ ...eventError, etime: true })
            return
        }

        try {
             dispatch(notificationAction.setFunction({functionMessage:'creating Event'}))
            const token = await localStorage.getItem('token')
            const res = await axios.post(`${backendURl}/kheloNITH/createSportEvents`,
                {
                    token,
                    ...event
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
             mt-5' >

                <form className='w-11/12 md:w-5/12  bg-gradient-to-b from-[#d577fd] to-[#dfe5eb] opacity-100 backdrop-blur-2xl rounded-3xl
                animate-slideup flex flex-col items-center shadow-2xl ' onSubmit={submintHandler}>
                    <h1 className='font-bold text-[40px] md:text-[50px] text-[#062147] mt-[15px] font-serif'>Create Event</h1>

                    <select type='' className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-black bg-transparent  ${eventError.etype && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='Name'
                        onChange={typeHandler}>
                        <option value='cricket' className=' bg-[#c98bf5]' >Cricket</option>
                        <option value='football' className=' bg-[#c98bf5]'>Football</option>
                        <option value='chess' className=' bg-[#c98bf5]'>Chess</option>
                        <option value='vollyball' className=' bg-[#c98bf5]' >Volleyball</option>
                        <option value='tennis' className=' bg-[#c98bf5]' >Tennis</option>
                        <option value='basketball' className=' bg-[#c98bf5]' >Basketball</option>
                        <option value='badminton' className=' bg-[#c98bf5]' >Badminton</option>
                    </select>

                    <input type='date' className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-black bg-transparent placeholder-[#062147] ${eventError.edate && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='date'
                        onChange={dateHandler} />

                    <input type='time' className={`w-9/12 h-[55px]  mt-[10px] text-start shadow-xl font-bold text-2xl focus:outline-none
                    border-b-[5px] text-black bg-transparent placeholder-[#062147] ${eventError.etime && 'border-b-8 border-b-rose-900 placeholder-rose-900'}`} placeholder='time'
                        onChange={timeHandler} />

                    <button type='submit' className='w-4/12 h-[55px] rounded-xl my-[40px] text-center bg-gradient-to-br from-[#cf83ff] to-[#6f118c] shadow-2xl
                     font-bold text-xl text-white hover:scale-105' >Create</button>

                </form>
            </div>
        </div>
    )
}

export default CreateEvents