import { useEffect, useState } from "react"
import Navbar from "../navbar/Navbar"
import { Link } from "react-router-dom"
import axios from "axios"
import backendURl from "../helpers/backendUrl"
const profile = 'https://res.cloudinary.com/diszakm5s/image/upload/v1680701304/kheloNIT/dummy/captain_zxkxvc.png'
import { notificationAction } from "../../store/notfications"
import { useDispatch } from "react-redux"
const rank1 = 'https://res.cloudinary.com/diszakm5s/image/upload/v1684092356/kheloNIT/dummy/rank1_rhjshj.png'
const rank2  = 'https://res.cloudinary.com/diszakm5s/image/upload/v1684092364/kheloNIT/dummy/rank2_cpeejt.png'
const rank3  = 'https://res.cloudinary.com/diszakm5s/image/upload/v1684092370/kheloNIT/dummy/rank3_xsogml.png'
const normalRank = 'https://res.cloudinary.com/diszakm5s/image/upload/v1684092376/kheloNIT/dummy/normalRank_qkgsw4.png'
const masterOf  = 'https://res.cloudinary.com/diszakm5s/image/upload/v1684092385/kheloNIT/dummy/masterOf_vn9vrn.png'




const AllPlayers = ()=>{


    const [allPlayers,setAllPlayers] = useState([])
    const dispatch = useDispatch()


     useEffect(()=>{
        dispatch(notificationAction.setFunction({functionMessage:''}))
        axios.get(`${backendURl}/kheloNITH/allPlayers`)
            .then((res) => {
                // console.log(res.data)
                let players = res.data.allPlayers
                players.sort((a,b)=>a.rank-b.rank)
                setAllPlayers(players)
                console.log(players)
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
               
                <div className="w-full md:w-3/12 h-full flex items-center justify-center">
                    {player?.rank ==1 && <img src={rank1} className="w-[70px] h-[90px]"/>} 
                    {player?.rank ==2 && <img src={rank2} className="w-[70px] h-[90px]"/>} 
                    {player?.rank ==3 && <img src={rank3} className="w-[70px] h-[90px]"/>} 

                    {
                        player?.rank >=4 &&  
                        <div className='relative w-full h-[100px] flex justify-center items-center '>
                            <img src={normalRank} className="w-[75px] h-[95px] absolute z-[2] "/>
                            <h1 className="font-bold text-3xl text-[#a91d1d] font-serif px-2 rounded-lg absolute z-[3]  mb-5 mr-1">{player?.rank}</h1>
                        </div>
                    }

                </div>
                <div className="w-full md:w-3/12 h-full flex justify-center">
                    <img src={player?.avtar?player?.avtar.avtar:profile} alt="" className=" w-[120px] h-[120px] rounded-full bg-white/50
                                border-2 border-[#d178f5]" />
              
                </div>
                <div className="w-full md:w-3/12 h-full  flex items-center justify-center">
                    <Link to={`/specific/oneUser/${player._id}`} className="font-bold text-2xl text-white font-serif
                                            hover:bg-[#de7bfc] px-2 rounded-lg">{player?.name}
                    </Link>
                </div>
                <div className="w-full md:w-3/12 h-full  flex items-center justify-center">
                   <h1 className="font-bold text-2xl text-white font-serif
                              px-2 rounded-lg">{player?.email}</h1>
                </div>

                <div className="w-full md:w-3/12 h-full  flex flex-col items-center justify-center">
                    <img src={masterOf} className="w-[40px] h-[40px]"/>
                   <h1 className="font-bold text-3xl text-white font-serif
                              px-2 rounded-lg">{player?.masterOf}</h1>
                </div>

              </div>   
                ))
              }
             
             <div className="w-full h-[200px]"></div>

            </div>
        </>
    )
}

export default AllPlayers