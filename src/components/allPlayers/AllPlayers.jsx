import { useEffect, useState } from "react"
import Navbar from "../navbar/Navbar"
import { Link } from "react-router-dom"
import axios from "axios"
import backendURl from "../helpers/backendUrl"
const profile = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701304/kheloNIT/dummy/captain_zxkxvc.png'
import { notificationAction } from "../../store/notfications"
import { useDispatch } from "react-redux"


const AllPlayers = ()=>{


    const [allPlayers,setAllPlayers] = useState([])
    const dispatch = useDispatch()


     useEffect(()=>{
        dispatch(notificationAction.setFunction({functionMessage:''}))
        axios.get(`${backendURl}/kheloNITH/allPlayers`)
            .then((res) => {
                // console.log(res.data)
                setAllPlayers(res.data.allPlayers)
                dispatch(notificationAction.setDontFunction())
            })
            .catch((e) => {
                console.log(e.message)
                dispatch(notificationAction.setNotification({ type: 'error', message:'somthing went wrong :(' }))
                dispatch(notificationAction.setDontFunction())
            })

     },[])

    return(
        <>
           <Navbar/>
            <div className="w-screen h-screen  flex flex-col gap-3 px-5 p-2 mt-[150px] md:mt-[81px] bg-[#210732]
             overflow-y-scroll pt-10 scrollbar-hide py-5">

              {
                allPlayers.map((player,i)=>(

                    <div className="w-full bg-white/10 rounded-md flex flex-col md:flex-row md:justify-evenly justify-center
               items-center md:p-2 p-5 gap-2" key={i}>

                
                <h1 className="font-bold text-2xl text-white font-serif
                              px-2 rounded-lg">{i+1}</h1>

                <img src={player?.avtar?player?.avtar.avtar:profile} alt="" className=" w-[120px] h-[120px] rounded-full bg-white/50
                            border-2 border-[#d178f5]" />
              
                
                <Link to={`/specific/oneUser/${player._id}`} className="font-bold text-2xl text-white font-serif
                                         hover:bg-[#de7bfc] px-2 rounded-lg">{player?.name}
                </Link>
                <h1 className="font-bold text-2xl text-white font-serif
                              px-2 rounded-lg">{player?.email}</h1>

              </div>   
                ))
              }
             
             <div className="w-full h-[200px]"></div>

            </div>
        </>
    )
}

export default AllPlayers