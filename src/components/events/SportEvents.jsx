import EventCard from "./EventCard"
import { useParams } from "react-router-dom"
import {  useState } from "react"
import { useSelector } from "react-redux"


const SportEvents = () => {

    const { sport='cricket' } = useParams()
    const [loading, setLoding] = useState(false)
    const events = useSelector(state => state.events.events)
     


  
    return (

        <div className=" bg-[#210732] flex relative justify-center my-8">
            <div className="absolute bg-[#b274ff] top-16 rounded-r-lg backdrop-blur-lg opacity-75 
            flex justify-center items-center left-0 z-[1] w-[70px] md:w-[100px] h-[200px] md:h-[250px] animate-slideleft">
                <h1 className="font-bold text-sm md:text-md text-[#faf5ff] font-mono">
                    {sport.split("").map((c,i) => (
                        <>
                            {c.toUpperCase()}<br key={i} />
                        </>
                    ))}
                </h1>
            </div>
            {loading && <h1 className="text-white text-4xl font-bold font-serif">Loading...</h1>}
             <div className="w-9/12 h-full backdrop-blur-sm  flex flex-wrap px-5 justify-center
            gap-[50px]">
                {events?.length==0 && <h1 className="text-white text-4xl font-bold font-serif">No events yet</h1>}
                {
                   events?.length!=0 &&  events.map(event =>
                        <>
                            {event.type === sport && <EventCard event={event} key={event._id} /> }
                        </>
                    )
                }


            </div>
        </div>


    )
}

export default SportEvents