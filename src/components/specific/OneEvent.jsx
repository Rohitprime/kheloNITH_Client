import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import EventCard from "../events/EventCard"
import backendURl from "../helpers/backendUrl"

const OneEvent = ()=>{
    
    const {id} = useParams()
    const [event,setEvent] = useState({
        type:'',
        date:'',
        time:'',
        creater:[{}],
    })
 
    useEffect(()=>{
       
        axios.get(`${backendURl}/kheloNITH/specific/oneEvent/${id}`)
        .then((res)=>{
             setEvent(res.data.event)
            })
            .catch((e)=>{
                console.log(e)
            })
            
        },[id])
        
    return(
        <div className="w-screen h-screen bg-[#1a0229] flex justify-center items-center">
            <EventCard event={event}/>
        </div>
    )
}

export default OneEvent