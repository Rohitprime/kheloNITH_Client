import Navbar from "../navbar/Navbar"
import { Outlet, NavLink } from "react-router-dom"
import profileCover from '../../assets/dashBoard/profileCover.png'
const profile = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701304/kheloNIT/dummy/captain_zxkxvc.png'
import abg from '../../assets/dashBoard/abg1.png'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { notificationAction } from "../../store/notfications"
import { profileAction } from "../../store/profile"
import {VscEdit} from 'react-icons/vsc'
import Genral from "./genral/Genral"
import axios from "axios"
import backendURl from "../helpers/backendUrl"

let firstTime =true;
const ProfileLayout = () => {
     
    const navigate = useNavigate()
    const { user, reRun } = useSelector(state => state.profile)
    const dispatch = useDispatch()
    useEffect(() => {
        
        if(firstTime){
            dispatch(notificationAction.setFunction({functionMessage:'profile'}))
            firstTime=false
        }
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(notificationAction.setDontFunction())
            return navigate('/login')
        }
        else {

            axios.post(`${backendURl}/kheloNITH/profile`,{token})
            .then(
                    (res) => {
                        if (res.data.error) {
                            dispatch(notificationAction.setDontFunction())
                            dispatch(notificationAction.setNotification({ type: 'error', message: res.data.error }))
                            return navigate('/login');
                        }
                        else {
                            dispatch(notificationAction.setDontFunction())
                            dispatch(profileAction.setUser(res.data.user))
                        }
                    })
                .catch((e) => {
                    dispatch(notificationAction.setNotification({ type: 'success', message: e.message }))
                    dispatch(notificationAction.setDontFunction())
                    return navigate('/login')
                })

        }
    }, [reRun])


    return (
        <>
            <Navbar />
                <div className="  w-screen h-screen  flex flex-col md:flex-row gap-3 px-4 p-2 mt-[151px] md:mt-[81px] bg-[#210732]
             overflow-y-scroll scrollbar-hide">
                    <div className="w-full md:w-3/12 h-screen  flex flex-col gap-1 ">
                        <div className="bg-gradient-to-br from-[#32104b]">
                            <div className="w-full h-[250px] bg-white/10 relative animate-slidedown">
                                <div className="w-full h-full  flex items-center absolute">
                                    <img src={profileCover} className=" w-[140px] h-[140px] ml-3" />
                                </div>
                                <div className='w-full h-full  absolute flex flex-row  items-center z-[1] opacity-80' >
                                    <img src={user?.avtar?user?.avtar.avtar:profile} alt="" className="w-[120px] h-[120px] rounded-full bg-white/50 ml-[22px] mb-1" />
                                    <div className="w-6/12 h-full flex flex-col justify-center ml-5">
                                        <h1 className="font-bold font-serif text-4xl text-white">{user?.name}</h1>
                                        <h1 className="font-bold font-serif text-xl text-white/60">{user?.email}</h1>
                                        <h1 className="font-bold font-serif text-xl text-white/60">{user?.number}</h1>
                                    </div>
                                </div>
                                <NavLink to='/profile/editProfile' className='flex justify-end p-2'>
                                    <VscEdit className="text-white/80 text-4xl font-bold cursor-pointer hover:bg-white hover:rounded-full
                                   absolute z-[2] hover:text-black p-1"/>
                                </NavLink>
                            </div>
                            <div className="w-full bg-white/10 pb-5 px-4 ">
                                     <h1 className="text-white flex flex-wrap justify-center font-mono font-bold text-lg">{user?.description}</h1>
                            </div>
                        </div>

                     {/* Progress bars */}
                    
                        <div className="w-full bg-white/10 flex flex-col justify-center items-center text-[#ffffff] p-2 text-lg font-mono font-bold
                          animate-slidedown">
                         <label htmlFor="" >({user?.progress?.request}) Requests Over ({user?.progress?.numberOfEvents}) Events</label>                           
                        </div>
                        <div className="w-full  flex flex-row gap-1 p-1 py-4 bg-white/10 animate-slidedown">
                             <div className="w-5/12 h-full  flex flex-col items-center gap-2">
                                <h1 className="text-start text-white">Applied</h1>
                                <div className="w-6/12 h-[90px] md:h-[90px] rounded-full border-4 border-[#d89fec] flex justify-center items-center">
                                     <h1 className="text-white text-2xl font-mono font-extralight">{user?.progress?.applied}</h1>
                                </div>
                             </div>
                             <div className="w-7/12 h-full flex flex-col items-center">
                         
                                    <div className="w-full h-[60px] p-1 text-white font-mono">
                                        <label htmlFor="" >Accepted By Other ({user?.progress?.acceptByOther})</label>
                                        <progress className="w-full h-[12px] rounded-xl" max={user?.progress?.applied} value={user?.progress?.acceptByOther}/>
                                    </div>
                                    <div className="w-full h-[60px] p-1 text-white font-mono">
                                        <label htmlFor="" >Rejected By Other ({user?.progress?.rejectedByOther})</label>
                                        <progress className="w-full h-[12px] rounded-xl" max={user?.progress?.applied} value={user?.progress?.rejectedByOther}></progress>
                                    </div>
                             </div>
                        </div>

                   {/* profile navigation bar */}

                        <div className="w-full md:h-full h-[500px] bg-white/50 relative animate-slidedown">
                            <div className="w-full h-full bg-gradient-to-br from-[#32104b] flex items-center absolute">
                                <img src={abg} className="" />
                            </div>
                            <div className='w-full h-full  absolute flex flex-col gap-5 p-3 pt-5 z-[1] opacity-80' >

                                <NavLink to='/profile/genral' className="w-full h-[60px] bg-[#32104b] rounded-lg flex items-center justify-center
                            hover:bg-[#271237] hover:scale-105" >
                                    <h1 className="font-bold text-2xl text-white font-serif">General</h1>
                                </NavLink>

                                <NavLink to='/profile/notifications' className="w-full h-[60px] bg-[#32104b]  rounded-lg flex items-center justify-center
                            hover:bg-[#271237] hover:scale-105">
                                    <h1 className="font-bold text-2xl text-white font-serif">Event's Notis </h1>
                                </NavLink>
                            
                                <NavLink to='/profile/teamNotis' className="w-full h-[60px] bg-[#32104b]  rounded-lg flex items-center justify-center
                                hover:bg-[#271237] hover:scale-105">
                                    <h1 className="font-bold text-2xl text-white font-serif">Team's Notis </h1>
                                </NavLink>

                                <NavLink to='/profile/createEvents' className="w-full h-[60px] bg-[#32104b]  rounded-lg flex items-center justify-center
                            hover:bg-[#271237] hover:scale-105">
                                    <h1 className="font-bold text-2xl text-white font-serif">Create Event</h1>
                                </NavLink>
                                <NavLink to='/profile/createTeam' className="w-full h-[60px] bg-[#32104b]  rounded-lg flex items-center justify-center
                            hover:bg-[#271237] hover:scale-105">
                                    <h1 className="font-bold text-2xl text-white font-serif">Create Team</h1>
                                </NavLink>
                            </div>
                        </div>

                 {/* Outlate */}

                    </div>

                    <div className="w-full md:w-9/12 h-full flex flex-col animate-slidedown">
                        <div className='w-full h-full  flex flex-row sm:p-2 z-[1] opacity-80 bg-gradient-to-br from-[#32104b] to-[#2b0a3d]'>
                            <Outlet />
                        </div>
                        <div className="w-full h-[100px] bg-gradient-to-br from-[#2b0a3d]">

                        </div>
                    </div>
                </div>
        </>
    )
}

export default ProfileLayout