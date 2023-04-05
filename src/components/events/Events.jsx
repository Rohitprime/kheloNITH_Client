import UpcomingEvents from "./UpcomingEvent"
import Navbar from "../navbar/Navbar"
import {Outlet } from "react-router-dom"
import EventNavbar from "./EventNavbar"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { notificationAction } from "../../store/notfications"
import { eventsAction } from "../../store/event"
import backendURl from "../helpers/backendUrl"

const Events = () => {


    const dispatch = useDispatch()
    const events = useSelector(state=>state.events.events)

    useEffect(() => {
        dispatch(notificationAction.setFunction({functionMessage:''}))
        axios.get(`${backendURl}/kheloNITH/getSportEvents`)
            .then((res) => {
                const arr = res.data.events
                dispatch(eventsAction.setEvents(arr))
                dispatch(notificationAction.setDontFunction())
            })
            .catch((e) => {
                dispatch(notificationAction.setNotification({ type: 'error', message: res.data.error }))
                dispatch(notificationAction.setDontFunction())

            })
    }, [])


    return (
        <>
            <Navbar />
            <div className="w-screen h-screen mt-[150px] md:mt-[80px] overflow-y-scroll scrollbar-hide bg-[#210732]">
               
                  {/* <UpcomingEvents/> */}
                <h1 className="text-white font-bold text-4xl text-center my-5 font-serif">Possible Events</h1>
                    <EventNavbar />             
                    <Outlet />
               
                  <div className="w-screen h-[400px] "></div>
            </div>
        </>
    )
}

export default Events